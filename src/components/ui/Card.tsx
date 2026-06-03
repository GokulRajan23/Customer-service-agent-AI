import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  highlight?: boolean
}

export function Card({ children, className = '', highlight = false }: CardProps) {
  return (
    <div
      className={`rounded-xl border bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-700 ${
        highlight
          ? 'border-orange-400 ring-2 ring-orange-200 shadow-md scale-[1.02]'
          : 'border-slate-200'
      } ${className}`}
    >
      {children}
    </div>
  )
}
