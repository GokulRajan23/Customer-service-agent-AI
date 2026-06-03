import {
  ArrowDown,
  ArrowRight,
  Bot,
  Database,
  MessageSquare,
  Shield,
  User,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../ui/Card'

const nodes = [
  { id: 'customer', label: 'Customer', icon: User, color: 'text-slate-600' },
  { id: 'chat', label: 'Chat UI', icon: MessageSquare, color: 'text-blue-600' },
  { id: 'agent', label: 'LLM Agent', icon: Bot, color: 'text-blue-600' },
  {
    id: 'governance',
    label: 'Governance Layer',
    icon: Shield,
    color: 'text-orange-600',
    highlight: true,
  },
  { id: 'tools', label: 'CRM Tools', icon: Wrench, color: 'text-slate-600' },
  { id: 'database', label: 'CRM Database', icon: Database, color: 'text-slate-600' },
]

interface FlowDiagramProps {
  compact?: boolean
}

export function FlowDiagram({ compact = false }: FlowDiagramProps) {
  return (
    <div className={compact ? 'space-y-3' : 'space-y-4'}>
      <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-stretch lg:justify-center lg:gap-2">
        {nodes.map((node, index) => {
          const Icon = node.icon
          const isLast = index === nodes.length - 1

          return (
            <div
              key={node.id}
              className="flex flex-col items-center gap-3 lg:flex-row lg:gap-2"
            >
              <Card
                highlight={node.highlight}
                className={`w-full min-w-[140px] text-center transition-all duration-700 ${
                  compact ? 'p-4' : 'p-5'
                } ${node.highlight ? 'lg:min-w-[180px]' : ''}`}
              >
                <div
                  className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 ${node.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-slate-800">{node.label}</p>
                {node.highlight && (
                  <span className="mt-2 inline-block rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                    Core Contribution
                  </span>
                )}
              </Card>

              {!isLast && (
                <>
                  <ArrowDown className="h-5 w-5 shrink-0 text-slate-400 lg:hidden" />
                  <ArrowRight className="hidden h-5 w-5 shrink-0 text-slate-400 lg:block" />
                </>
              )}
            </div>
          )
        })}
      </div>

      {compact && (
        <div className="text-center">
          <Link
            to="/architecture"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View full architecture →
          </Link>
        </div>
      )}
    </div>
  )
}
