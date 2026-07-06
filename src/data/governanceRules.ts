import type { GovernanceCard, GovernanceCheck, GovernanceRule } from '../types'

export const ruleList: GovernanceRule[] = [
  {
    id: 'ignore-instructions',
    pattern: 'ignore instructions',
    category: 'injection',
    riskLevel: 'HIGH',
    action: 'Blocked',
    description: 'Attempts to override the agent’s system instructions are never followed.',
  },
  {
    id: 'ignore-company-policy',
    pattern: 'ignore company policy',
    category: 'injection',
    riskLevel: 'HIGH',
    action: 'Blocked',
    description: 'Attempts to bypass company policy are never followed.',
  },
  {
    id: 'system-override',
    pattern: 'system override',
    category: 'injection',
    riskLevel: 'HIGH',
    action: 'Blocked',
    description: 'Claims of system-level override authority are never honored.',
  },
  {
    id: 'developer-mode',
    pattern: 'developer mode',
    category: 'injection',
    riskLevel: 'HIGH',
    action: 'Blocked',
    description: 'Requests to enable an unrestricted "developer mode" are never honored.',
  },
  {
    id: 'refund-all-orders',
    pattern: 'refund all orders',
    category: 'permission',
    riskLevel: 'HIGH',
    action: 'Blocked',
    description: 'Bulk refunds require explicit management authorization the agent does not have.',
  },
  {
    id: 'cancel-all-customer-orders',
    pattern: 'cancel all customer orders',
    category: 'permission',
    riskLevel: 'HIGH',
    action: 'Blocked',
    description: 'Bulk order cancellation requires explicit management authorization the agent does not have.',
  },
  {
    id: 'issue-discount-coupon',
    pattern: 'issue a discount coupon',
    category: 'financial',
    riskLevel: 'MEDIUM',
    action: 'Restricted',
    description: 'Coupon issuance requires manager approval and spending limit validation.',
  },
]

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
