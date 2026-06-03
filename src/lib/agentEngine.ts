import { detectDangerKeyword } from '../data/governanceRules'
import { getSafeResponse, getUnsafeDangerResponse } from '../data/mockResponses'
import type { AgentResult, SecurityMode } from '../types'

const BLOCKED_MESSAGE = 'Governance Layer Blocked Request'

export function processMessage(input: string, mode: SecurityMode): AgentResult {
  const keyword = detectDangerKeyword(input)

  if (mode === 'unsafe') {
    if (keyword) {
      return {
        blocked: false,
        message: getUnsafeDangerResponse(keyword),
        matchedKeyword: keyword,
      }
    }
    return {
      blocked: false,
      message: getSafeResponse(input),
    }
  }

  if (keyword) {
    return {
      blocked: true,
      message: BLOCKED_MESSAGE,
      matchedKeyword: keyword,
    }
  }

  return {
    blocked: false,
    message: getSafeResponse(input),
  }
}

export const GOVERNANCE_CHECK_DELAY_MS = 400
