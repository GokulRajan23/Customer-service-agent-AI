import type { Message } from '../../types'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isSystem = message.role === 'system'

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-500">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-all duration-500 ${
          isUser
            ? 'bg-blue-600 text-white'
            : message.blocked
              ? 'border border-red-200 bg-red-50 text-red-800'
              : 'border border-slate-200 bg-white text-slate-800'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
