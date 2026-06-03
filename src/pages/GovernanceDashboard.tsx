import { AlertTriangle } from 'lucide-react'
import { governanceCards } from '../data/governanceRules'
import { useSecurityMode } from '../contexts/SecurityModeContext'
import { Card } from '../components/ui/Card'
import type { GovernanceAction, RiskLevel } from '../types'

const riskStyles: Record<RiskLevel, { bg: string; text: string; border: string }> = {
  LOW: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  MEDIUM: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  HIGH: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
}

const actionStyles: Record<GovernanceAction, string> = {
  'Auto Execute': 'text-green-700 bg-green-100',
  Restricted: 'text-amber-700 bg-amber-100',
  Blocked: 'text-red-700 bg-red-100',
}

export function GovernanceDashboard() {
  const { isProtected } = useSecurityMode()

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">Governance Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Visual overview of governance decisions for common CRM actions.
        </p>
      </section>

      {!isProtected && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          Governance is inactive in Unsafe mode. All actions would execute without
          validation.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {governanceCards.map((card) => {
          const styles = riskStyles[card.risk]
          return (
            <Card
              key={card.action}
              className={`transition-all duration-700 ${
                !isProtected ? 'opacity-60 grayscale' : ''
              } ${styles.border}`}
            >
              <h2 className="text-lg font-semibold text-slate-900">{card.action}</h2>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.bg} ${styles.text}`}
                >
                  Risk: {card.risk}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${actionStyles[card.actionType]}`}
                >
                  Action: {card.actionType}
                </span>
              </div>
            </Card>
          )
        })}
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Governance Functions</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            'Risk Assessment — evaluates the potential impact of each request',
            'Permission Validation — verifies the agent has authorization for the action',
            'Policy Enforcement — applies company rules before tool execution',
            'Prompt Injection Detection — identifies manipulation attempts in user input',
          ].map((item) => (
            <li
              key={item}
              className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
