import { AlertTriangle, Shield } from 'lucide-react'
import { useSecurityMode } from '../../contexts/SecurityModeContext'

interface BadgeProps {
  size?: 'sm' | 'lg'
}

export function SecurityBadge({ size = 'lg' }: BadgeProps) {
  const { mode, theme } = useSecurityMode()
  const isLarge = size === 'lg'

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-700 ${
        theme.badgeBg
      } ${isLarge ? 'px-4 py-2 text-sm' : 'px-3 py-1 text-xs'}`}
    >
      {mode === 'unsafe' ? (
        <AlertTriangle className={isLarge ? 'h-5 w-5' : 'h-4 w-4'} />
      ) : (
        <Shield className={isLarge ? 'h-5 w-5' : 'h-4 w-4'} />
      )}
      <span>{theme.badge}</span>
    </div>
  )
}
