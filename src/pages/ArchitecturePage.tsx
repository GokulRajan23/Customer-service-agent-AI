import { FlowDiagram } from '../components/architecture/FlowDiagram'
import { Card } from '../components/ui/Card'

const layers = [
  {
    title: 'Customer Interface',
    description:
      'End users interact through a chat interface, submitting natural language requests.',
  },
  {
    title: 'LLM Agent',
    description:
      'The AI agent interprets user intent and decides which CRM tools to invoke.',
  },
  {
    title: 'Governance Layer',
    description:
      'Our core contribution — validates permissions, detects prompt injection, assesses risk, and enforces policy before any tool execution.',
    highlight: true,
  },
  {
    title: 'CRM Tools & Database',
    description:
      'Business tools (refunds, order tracking, coupons) connect to the CRM database only after governance approval.',
  },
]

export function ArchitecturePage() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">System Architecture</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          The governance layer sits between the AI agent and business tools,
          ensuring every action is validated before execution.
        </p>
      </section>

      <Card>
        <FlowDiagram />
      </Card>

      <section className="grid gap-4 sm:grid-cols-2">
        {layers.map((layer) => (
          <Card key={layer.title} highlight={layer.highlight}>
            <h2 className="text-lg font-semibold text-slate-900">{layer.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{layer.description}</p>
          </Card>
        ))}
      </section>
    </div>
  )
}
