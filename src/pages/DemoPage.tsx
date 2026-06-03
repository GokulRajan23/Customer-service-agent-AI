import { ChatInterface } from '../components/chat/ChatInterface'
import { SecurityPanel } from '../components/layout/SecurityPanel'
import { SecurityBadge } from '../components/ui/Badge'
import { ModeToggle } from '../components/ui/ModeToggle'

export function DemoPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">Interactive Demo</h1>
        <p className="mt-2 text-slate-600">
          Toggle between Unsafe and Protected modes, then try the example prompts
          to see how governance changes agent behavior.
        </p>
      </section>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <ModeToggle />
        <SecurityBadge />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChatInterface />
        </div>
        <SecurityPanel />
      </div>
    </div>
  )
}
