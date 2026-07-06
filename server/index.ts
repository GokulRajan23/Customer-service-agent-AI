import 'dotenv/config'
import express, { type ErrorRequestHandler } from 'express'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleChat } from './chat'

const root = dirname(fileURLToPath(import.meta.url))
const distDir = join(root, '..', 'dist')

const app = express()
app.use(express.json())

app.post('/api/chat', (req, res) => {
  handleChat(req, res).catch((err) => {
    console.error('Unhandled error in /api/chat:', err)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error.' })
    }
  })
})

if (existsSync(distDir)) {
  app.use(express.static(distDir))
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) {
      next()
      return
    }
    res.sendFile(join(distDir, 'index.html'))
  })
}

const jsonErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(err)
    return
  }
  res.status(400).json({ error: 'Invalid request.' })
}
app.use(jsonErrorHandler)

const port = Number(process.env.PORT) || 8787
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})
