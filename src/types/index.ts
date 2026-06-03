export type SecurityMode = 'unsafe' | 'protected'

export interface Message {
  id: string
  role: 'user' | 'agent' | 'system'
  content: string
  timestamp: Date
  blocked?: boolean
}

export interface AgentResult {
  blocked: boolean
  message: string
  matchedKeyword?: string
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export type GovernanceAction = 'Auto Execute' | 'Restricted' | 'Blocked'

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
