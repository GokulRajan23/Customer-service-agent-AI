import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-red-50 p-6">
          <div className="max-w-lg rounded-xl border border-red-200 bg-white p-6 shadow-sm">
            <h1 className="text-lg font-bold text-red-800">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-600">{this.state.error.message}</p>
            <p className="mt-4 text-xs text-slate-500">
              Try restarting with: <code className="rounded bg-slate-100 px-1">npm start</code>
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
