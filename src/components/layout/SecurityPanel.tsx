import { Check, X } from 'lucide-react'
import { useSecurityMode } from '../../contexts/SecurityModeContext'

interface SecurityPanelProps {
  className?: string
}

export function SecurityPanel({ className = '' }: SecurityPanelProps) {
  const { isProtected, theme, governanceChecks } = useSecurityMode()

  return (
    <div
      className={`rounded-xl border p-5 shadow-sm transition-all duration-700 ${theme.panelBg} ${className}`}
    >
      <h3 className="mb-1 text-sm font-semibold text-slate-800">
        Governance Status
      </h3>
      <p
        className={`mb-4 text-xs font-medium transition-colors duration-700 ${theme.accentText}`}
      >
        {theme.statusText}
      </p>
      <ul className="space-y-2">
        {governanceChecks.map((check, index) => (
          <li
            key={check.id}
            className="flex items-center gap-2 text-sm transition-all duration-700"
            style={{ transitionDelay: `${index * 75}ms` }}
          >
            {isProtected ? (
              <Check className="h-4 w-4 shrink-0 text-emerald-600" />
            ) : (
              <X className="h-4 w-4 shrink-0 text-red-500" />
            )}
            <span className={isProtected ? 'text-slate-700' : 'text-slate-400'}>
              {check.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
