import { useSecurityMode } from '../../contexts/SecurityModeContext'

interface ModeToggleProps {
  className?: string
}

export function ModeToggle({ className = '' }: ModeToggleProps) {
  const { mode, setMode } = useSecurityMode()

  return (
    <div
      className={`inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm ${className}`}
      role="group"
      aria-label="Security mode toggle"
    >
      <button
        type="button"
        onClick={() => setMode('unsafe')}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-500 ${
          mode === 'unsafe'
            ? 'bg-amber-500 text-white shadow-sm'
            : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        Unsafe Agent
      </button>
      <button
        type="button"
        onClick={() => setMode('protected')}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-500 ${
          mode === 'protected'
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        Protected Agent
      </button>
    </div>
  )
}
