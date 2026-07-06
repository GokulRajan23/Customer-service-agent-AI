import type { AgentResult, SecurityMode } from '../types'

export const GOVERNANCE_CHECK_DELAY_MS = 400

interface RequestAgentReplyParams {
  mode: SecurityMode
  message: string
  history: { role: 'user' | 'agent'; content: string }[]
}

export async function requestAgentReply({
  mode,
  message,
  history,
}: RequestAgentReplyParams): Promise<AgentResult> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode, message, history }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error ?? `Request failed with status ${res.status}.`)
  }

  return res.json() as Promise<AgentResult>
}
