import { Outlet } from 'react-router-dom'
import { useSecurityMode } from '../../contexts/SecurityModeContext'
import { Navbar } from './Navbar'

export function AppLayout() {
  const { theme } = useSecurityMode()

  return (
    <div
      className={`min-h-screen bg-gradient-to-br transition-all duration-700 ${theme.background}`}
    >
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
}
