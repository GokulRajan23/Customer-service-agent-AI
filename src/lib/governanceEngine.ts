import { ruleList } from '../data/governanceRules'
import type { GovernanceAction, GovernanceRule, RiskLevel } from '../types'

export interface GovernanceEvaluation {
  riskLevel: RiskLevel
  decision: GovernanceAction
  matchedRule?: GovernanceRule
}

export function evaluateGovernance(input: string): GovernanceEvaluation {
  const normalized = input.toLowerCase().trim()
  const matchedRule = ruleList.find((rule) => normalized.includes(rule.pattern))

  if (!matchedRule) {
    return { riskLevel: 'LOW', decision: 'Auto Execute' }
  }

  return {
    riskLevel: matchedRule.riskLevel,
    decision: matchedRule.action,
    matchedRule,
  }
}
