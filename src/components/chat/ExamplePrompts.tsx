import { examplePrompts } from '../../data/examplePrompts'

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void
  disabled?: boolean
}

export function ExamplePrompts({ onSelect, disabled = false }: ExamplePromptsProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-slate-500">Example prompts</p>
      <div className="flex flex-wrap gap-2">
        {examplePrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(prompt)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
