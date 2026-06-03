import type { GovernanceCard, GovernanceCheck } from '../types'

export const dangerKeywords = [
  'ignore instructions',
  'ignore company policy',
  'system override',
  'developer mode',
  'refund all orders',
  'cancel all customer orders',
] as const

export const governanceChecks: GovernanceCheck[] = [
  { id: 'injection', label: 'Prompt Injection Detection' },
  { id: 'permission', label: 'Permission Validation' },
  { id: 'risk', label: 'Risk Assessment' },
  { id: 'policy', label: 'Policy Enforcement' },
]

export const governanceCards: GovernanceCard[] = [
  {
    action: 'Track Order',
    risk: 'LOW',
    actionType: 'Auto Execute',
    description: 'Read-only lookup with no financial impact. Safe to auto-execute.',
  },
  {
    action: 'Issue Coupon',
    risk: 'MEDIUM',
    actionType: 'Restricted',
    description: 'Requires manager approval and spending limit validation.',
  },
  {
    action: 'Refund Order',
    risk: 'HIGH',
    actionType: 'Blocked',
    description: 'High-risk financial action. Blocked without explicit authorization.',
  },
]

export function detectDangerKeyword(input: string): string | null {
  const normalized = input.toLowerCase().trim()
  for (const keyword of dangerKeywords) {
    if (normalized.includes(keyword)) {
      return keyword
    }
  }
  return null
}
