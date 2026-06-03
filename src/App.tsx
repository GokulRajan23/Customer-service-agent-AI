import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SecurityModeProvider } from './contexts/SecurityModeContext'
import { AppLayout } from './components/layout/AppLayout'
import { ArchitecturePage } from './pages/ArchitecturePage'
import { DemoPage } from './pages/DemoPage'
import { GovernanceDashboard } from './pages/GovernanceDashboard'
import { LandingPage } from './pages/LandingPage'

export default function App() {
  return (
    <SecurityModeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="architecture" element={<ArchitecturePage />} />
            <Route path="demo" element={<DemoPage />} />
            <Route path="governance" element={<GovernanceDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SecurityModeProvider>
  )
}
