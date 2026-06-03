import { Loader2, Send } from 'lucide-react'
import { useCallback, useRef, useState, type FormEvent } from 'react'
import { useSecurityMode } from '../../contexts/SecurityModeContext'
import { governanceChecks } from '../../data/governanceRules'
import { GOVERNANCE_CHECK_DELAY_MS, processMessage } from '../../lib/agentEngine'
import type { Message } from '../../types'
import { ExamplePrompts } from './ExamplePrompts'
import { MessageBubble } from './MessageBubble'

function createMessage(
  role: Message['role'],
  content: string,
  blocked?: boolean,
): Message {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: new Date(),
    blocked,
  }
}

export function ChatInterface() {
  const { mode, isProtected } = useSecurityMode()
  const [messages, setMessages] = useState<Message[]>([
    createMessage(
      'agent',
      'Hello! I am your customer service agent. How can I help you today?',
    ),
  ])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeChecks, setActiveChecks] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const runGovernanceChecks = async (): Promise<void> => {
    for (const check of governanceChecks) {
      setActiveChecks((prev) => [...prev, check.id])
      await new Promise((resolve) => setTimeout(resolve, GOVERNANCE_CHECK_DELAY_MS))
    }
  }

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isProcessing) return

    const userMessage = createMessage('user', trimmed)
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsProcessing(true)
    setActiveChecks([])
    scrollToBottom()

    const result = processMessage(trimmed, mode)

    if (isProtected) {
      await runGovernanceChecks()
    }

    const agentMessage = createMessage('agent', result.message, result.blocked)
    setMessages((prev) => [...prev, agentMessage])
    setActiveChecks([])
    setIsProcessing(false)
    scrollToBottom()
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    void sendMessage(input)
  }

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm">
      <div className="flex-1 space-y-3 overflow-y-auto p-4" style={{ minHeight: 320, maxHeight: 420 }}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isProcessing && isProtected && activeChecks.length > 0 && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <p className="mb-2 text-xs font-semibold text-emerald-800">
              Running governance checks...
            </p>
            <ul className="space-y-1">
              {governanceChecks.map((check) => (
                <li
                  key={check.id}
                  className={`flex items-center gap-2 text-xs transition-all duration-300 ${
                    activeChecks.includes(check.id)
                      ? 'text-emerald-700'
                      : 'text-slate-400'
                  }`}
                >
                  {activeChecks.includes(check.id) ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <span className="h-3 w-3" />
                  )}
                  {check.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {isProcessing && !isProtected && (
          <div className="flex items-center gap-2 text-xs text-amber-600">
            <Loader2 className="h-3 w-3 animate-spin" />
            Processing without governance checks...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-100 p-4">
        <ExamplePrompts
          onSelect={(prompt) => void sendMessage(prompt)}
          disabled={isProcessing}
        />

        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={isProcessing}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
