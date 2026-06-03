import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { governanceChecks } from '../data/governanceRules'
import type { SecurityMode, ThemeClasses } from '../types'

interface SecurityModeContextValue {
  mode: SecurityMode
  setMode: (mode: SecurityMode) => void
  toggleMode: () => void
  theme: ThemeClasses
  governanceChecks: typeof governanceChecks
  isProtected: boolean
}

const unsafeTheme: ThemeClasses = {
  background: 'from-amber-50 to-orange-100',
  accent: 'amber',
  accentText: 'text-amber-700',
  badge: 'UNSAFE AGENT',
  badgeBg: 'bg-amber-500 text-white',
  statusText: 'Prompt Injection Vulnerable',
  cardBorder: 'border-amber-200',
  panelBg: 'bg-amber-50/80 border-amber-200',
}

const protectedTheme: ThemeClasses = {
  background: 'from-blue-50 to-green-50',
  accent: 'emerald',
  accentText: 'text-emerald-700',
  badge: 'PROTECTED AGENT',
  badgeBg: 'bg-emerald-600 text-white',
  statusText: 'Governance Layer Active',
  cardBorder: 'border-emerald-200',
  panelBg: 'bg-white/80 border-emerald-200',
}

const SecurityModeContext = createContext<SecurityModeContextValue | null>(null)

export function SecurityModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<SecurityMode>('protected')

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () =>
        setMode((current) => (current === 'unsafe' ? 'protected' : 'unsafe')),
      theme: mode === 'unsafe' ? unsafeTheme : protectedTheme,
      governanceChecks,
      isProtected: mode === 'protected',
    }),
    [mode],
  )

  return (
    <SecurityModeContext.Provider value={value}>
      {children}
    </SecurityModeContext.Provider>
  )
}

export function useSecurityMode() {
  const context = useContext(SecurityModeContext)
  if (!context) {
    throw new Error('useSecurityMode must be used within SecurityModeProvider')
  }
  return context
}
