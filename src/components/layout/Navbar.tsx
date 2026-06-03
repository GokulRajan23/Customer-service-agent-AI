import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSecurityMode } from '../../contexts/SecurityModeContext'
import { SecurityBadge } from '../ui/Badge'
import { ModeToggle } from '../ui/ModeToggle'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/architecture', label: 'Architecture' },
  { to: '/demo', label: 'Demo' },
  { to: '/governance', label: 'Governance' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme } = useSecurityMode()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${
      isActive
        ? theme.accentText + ' bg-white/60'
        : 'text-slate-600 hover:bg-white/40 hover:text-slate-900'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="text-sm font-bold text-slate-900 sm:text-base">
          Secure AI Agent
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ModeToggle />
          <SecurityBadge size="sm" />
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-slate-600 hover:bg-white/60 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/40 bg-white/90 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <ModeToggle className="w-full" />
            <SecurityBadge size="sm" />
          </div>
        </div>
      )}
    </header>
  )
}
