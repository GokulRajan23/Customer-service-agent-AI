export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

interface CallOpenRouterParams {
  apiKey: string
  model: string
  systemInstruction: string
  turns: ChatTurn[]
}

export type LlmResult = { ok: true; text: string } | { ok: false; error: string }

interface OpenRouterResponse {
  error?: { message?: string }
  choices?: { message?: { content?: string }; finish_reason?: string }[]
}

export function toChatTurns(
  history: { role: 'user' | 'agent'; content: string }[],
): ChatTurn[] {
  return history.map((turn) => ({
    role: turn.role === 'agent' ? 'assistant' : 'user',
    content: turn.content,
  }))
}

export async function callOpenRouter({
  apiKey,
  model,
  systemInstruction,
  turns,
}: CallOpenRouterParams): Promise<LlmResult> {
  let res: Response
  try {
    res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: systemInstruction }, ...turns],
        max_tokens: 500,
      }),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown network error'
    return { ok: false, error: `Failed to reach OpenRouter: ${message}` }
  }

  const data = (await res.json().catch(() => null)) as OpenRouterResponse | null

  if (!res.ok) {
    const message = data?.error?.message ?? `HTTP ${res.status}`
    return { ok: false, error: `OpenRouter API error: ${message}` }
  }

  if (data?.error) {
    return { ok: false, error: `OpenRouter error: ${data.error.message ?? 'Unknown error'}` }
  }

  const text = data?.choices?.[0]?.message?.content ?? ''
  if (!text) {
    return { ok: false, error: 'OpenRouter returned an empty response.' }
  }

  return { ok: true, text }
}
