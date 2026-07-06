export type SecurityMode = 'unsafe' | 'protected'

export interface Message {
  id: string
  role: 'user' | 'agent' | 'system'
  content: string
  timestamp: Date
  blocked?: boolean
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export type GovernanceAction = 'Auto Execute' | 'Restricted' | 'Blocked'

export type GovernanceCategory = 'injection' | 'permission' | 'financial'

export interface GovernanceRule {
  id: string
  pattern: string
  category: GovernanceCategory
  riskLevel: RiskLevel
  action: GovernanceAction
  description: string
}

export interface GovernanceCheckResult {
  id: string
  status: 'clear' | 'flagged'
}

export interface AgentResult {
  reply: string
  blocked: boolean
  riskLevel: RiskLevel
  decision: GovernanceAction
  matchedRuleId?: string
  checks: GovernanceCheckResult[]
}

export interface GovernanceCard {
  action: string
  risk: RiskLevel
  actionType: GovernanceAction
  description: string
}

export interface GovernanceCheck {
  id: string
  label: string
}

export interface ThemeClasses {
  background: string
  accent: string
  accentText: string
  badge: string
  badgeBg: string
  statusText: string
  cardBorder: string
  panelBg: string
}
