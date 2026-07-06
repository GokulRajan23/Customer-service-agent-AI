import type { Request, Response } from 'express'
import { ruleList } from '../src/data/governanceRules'
import { evaluateGovernance, type GovernanceEvaluation } from '../src/lib/governanceEngine'
import type { AgentResult, GovernanceCheckResult, SecurityMode } from '../src/types'
import { callAnthropic, toChatTurns } from './anthropicClient'
import { buildProtectedSystemPrompt, buildUnsafeSystemPrompt } from './systemPrompts'

const BLOCKED_MESSAGE = 'Governance Layer Blocked Request'
const RESTRICTED_MESSAGE =
  'This action requires manager approval and cannot be completed automatically. Your request has been logged for review.'

interface ChatRequestBody {
  mode: SecurityMode
  message: string
  history?: { role: 'user' | 'agent'; content: string }[]
}

function isValidBody(body: unknown): body is ChatRequestBody {
  if (!body || typeof body !== 'object') return false
  const candidate = body as Record<string, unknown>
  if (candidate.mode !== 'unsafe' && candidate.mode !== 'protected') return false
  if (typeof candidate.message !== 'string' || !candidate.message.trim()) return false
  if (candidate.history !== undefined && !Array.isArray(candidate.history)) return false
  return true
}

function buildChecks(evaluation: GovernanceEvaluation): GovernanceCheckResult[] {
  const category = evaluation.matchedRule?.category
  return [
    { id: 'injection', status: category === 'injection' ? 'flagged' : 'clear' },
    { id: 'permission', status: category === 'permission' ? 'flagged' : 'clear' },
    { id: 'risk', status: evaluation.riskLevel !== 'LOW' ? 'flagged' : 'clear' },
    { id: 'policy', status: evaluation.decision !== 'Auto Execute' ? 'flagged' : 'clear' },
  ]
}

export async function handleChat(req: Request, res: Response): Promise<void> {
  if (!isValidBody(req.body)) {
    res.status(400).json({ error: 'Invalid request body.' })
    return
  }

  const { mode, message, history = [] } = req.body
  const apiKey = process.env.ANTHROPIC_API_KEY
  const model = process.env.ANTHROPIC_MODEL ?? 'claude-haiku-4-5-20251001'
  const turns = [...toChatTurns(history), { role: 'user' as const, content: message }]

  if (mode === 'unsafe') {
    if (!apiKey) {
      res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured on the server.' })
      return
    }

    const result = await callAnthropic({
      apiKey,
      model,
      systemInstruction: buildUnsafeSystemPrompt(),
      turns,
    })

    if (!result.ok) {
      res.status(502).json({ error: result.error })
      return
    }

    const response: AgentResult = {
      reply: result.text,
      blocked: false,
      riskLevel: 'LOW',
      decision: 'Auto Execute',
      checks: [],
    }
    res.json(response)
    return
  }

  const evaluation = evaluateGovernance(message)
  const checks = buildChecks(evaluation)

  if (evaluation.decision === 'Blocked') {
    const response: AgentResult = {
      reply: BLOCKED_MESSAGE,
      blocked: true,
      riskLevel: evaluation.riskLevel,
      decision: evaluation.decision,
      matchedRuleId: evaluation.matchedRule?.id,
      checks,
    }
    res.json(response)
    return
  }

  if (evaluation.decision === 'Restricted') {
    const response: AgentResult = {
      reply: RESTRICTED_MESSAGE,
      blocked: false,
      riskLevel: evaluation.riskLevel,
      decision: evaluation.decision,
      matchedRuleId: evaluation.matchedRule?.id,
      checks,
    }
    res.json(response)
    return
  }

  if (!apiKey) {
    res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured on the server.' })
    return
  }

  const result = await callAnthropic({
    apiKey,
    model,
    systemInstruction: buildProtectedSystemPrompt(ruleList),
    turns,
  })

  if (!result.ok) {
    res.status(502).json({ error: result.error })
    return
  }

  const response: AgentResult = {
    reply: result.text,
    blocked: false,
    riskLevel: evaluation.riskLevel,
    decision: evaluation.decision,
    checks,
  }
  res.json(response)
}
