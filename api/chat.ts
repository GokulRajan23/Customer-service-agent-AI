import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleChat } from '../server/chat'

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  try {
    await handleChat(req, res)
  } catch (err) {
    console.error('Unhandled error in /api/chat:', err)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error.' })
    }
  }
}
