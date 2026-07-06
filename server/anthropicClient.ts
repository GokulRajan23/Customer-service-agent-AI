export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

interface CallAnthropicParams {
  apiKey: string
  model: string
  systemInstruction: string
  turns: ChatTurn[]
}

export type LlmResult = { ok: true; text: string } | { ok: false; error: string }

interface AnthropicResponse {
  error?: { message?: string }
  content?: { type: string; text?: string }[]
}

export function toChatTurns(
  history: { role: 'user' | 'agent'; content: string }[],
): ChatTurn[] {
  return history.map((turn) => ({
    role: turn.role === 'agent' ? 'assistant' : 'user',
    content: turn.content,
  }))
}

export async function callAnthropic({
  apiKey,
  model,
  systemInstruction,
  turns,
}: CallAnthropicParams): Promise<LlmResult> {
  let res: Response
  try {
    res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        system: systemInstruction,
        messages: turns,
        max_tokens: 300,
      }),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown network error'
    return { ok: false, error: `Failed to reach Anthropic: ${message}` }
  }

  const data = (await res.json().catch(() => null)) as AnthropicResponse | null

  if (!res.ok) {
    const message = data?.error?.message ?? `HTTP ${res.status}`
    return { ok: false, error: `Anthropic API error: ${message}` }
  }

  const text = data?.content?.find((block) => block.type === 'text')?.text ?? ''
  if (!text) {
    return { ok: false, error: 'Anthropic returned an empty response.' }
  }

  return { ok: true, text }
}
