import { AlertTriangle, Bot, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FlowDiagram } from '../components/architecture/FlowDiagram'
import { Card } from '../components/ui/Card'

const problemCards = [
  {
    title: 'AI Tool Access',
    description:
      'Modern AI agents can invoke business tools like CRM systems, payment processors, and order management APIs.',
    icon: Bot,
  },
  {
    title: 'Prompt Injection',
    description:
      'Attackers can manipulate agent behavior through crafted prompts that override system instructions.',
    icon: AlertTriangle,
  },
  {
    title: 'Unauthorized Execution',
    description:
      'Without safeguards, agents may execute dangerous actions like mass refunds or order cancellations.',
    icon: AlertTriangle,
  },
  {
    title: 'Governance Mitigation',
    description:
      'A governance layer validates requests, assesses risk, and blocks unauthorized tool execution.',
    icon: ShieldCheck,
  },
]

export function LandingPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Secure AI Customer Service Agent
          <span className="mt-2 block text-xl font-semibold text-slate-600 sm:text-2xl">
            with Governance Layer
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          A demonstration of how AI customer service agents can be manipulated — and
          how a governance layer protects against prompt injection and unauthorized
          tool execution.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/demo"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Try the Demo
          </Link>
          <Link
            to="/architecture"
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            View Architecture
          </Link>
        </div>
      </section>

      {/* Team members section can be added here via a config array */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          Problem Statement
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {problemCards.map((card) => {
            const Icon = card.icon
            return (
              <Card key={card.title}>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{card.description}</p>
              </Card>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          Architecture Preview
        </h2>
        <Card>
          <FlowDiagram compact />
        </Card>
      </section>
    </div>
  )
}
