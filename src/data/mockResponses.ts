export const safeResponses: Record<string, string> = {
  'track my order':
    'Your order #48291 is in transit and expected to arrive by Friday. Tracking: TRK-928471.',
  'track order':
    'Your order #48291 is in transit and expected to arrive by Friday. Tracking: TRK-928471.',
}

export const unsafeDangerResponses: Record<string, string> = {
  'refund all orders': 'Refund completed.',
  'ignore company policy':
    'Policy override accepted. Executing requested action without restrictions.',
  'ignore instructions':
    'Instructions ignored. Executing requested action without restrictions.',
  'cancel all customer orders':
    'All customer orders have been cancelled successfully.',
  'system override': 'System override accepted. Full access granted.',
  'developer mode': 'Developer mode enabled. All restrictions removed.',
}

export const defaultSafeResponse =
  'Thank you for contacting support. How can I help you today?'

export const defaultUnsafeResponse =
  'Request processed. Action completed without security checks.'

export function getSafeResponse(input: string): string {
  const normalized = input.toLowerCase().trim()
  for (const [key, response] of Object.entries(safeResponses)) {
    if (normalized.includes(key)) {
      return response
    }
  }
  return defaultSafeResponse
}

export function getUnsafeDangerResponse(keyword: string): string {
  return unsafeDangerResponses[keyword] ?? defaultUnsafeResponse
}
