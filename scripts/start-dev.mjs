import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

if (!existsSync(join(root, 'node_modules'))) {
  console.log('Installing dependencies...\n')
  await new Promise((resolve, reject) => {
    const install = spawn('npm', ['install'], { cwd: root, stdio: 'inherit', shell: true })
    install.on('close', (code) => (code === 0 ? resolve() : reject(new Error('npm install failed'))))
  })
}

if (!existsSync(join(root, '.env'))) {
  console.log('No .env file found. Copy .env.example to .env and add your GEMINI_API_KEY.\n')
}

console.log('')
console.log('==================================================')
console.log('  Secure AI Customer Service Agent')
console.log('  Open in your browser:  http://localhost:5173')
console.log('  Press Ctrl+C to stop the server')
console.log('==================================================')
console.log('')

const tsxBin = join(root, 'node_modules', '.bin', 'tsx')
const viteBin = join(root, 'node_modules', '.bin', 'vite')

const server = spawn(tsxBin, ['server/index.ts'], {
  cwd: root,
  stdio: 'inherit',
})

const vite = spawn(viteBin, ['--port', '5173'], {
  cwd: root,
  stdio: 'inherit',
})

let shuttingDown = false
function shutdown(code) {
  if (shuttingDown) return
  shuttingDown = true
  server.kill()
  vite.kill()
  process.exit(code ?? 0)
}

server.on('close', (code) => shutdown(code))
vite.on('close', (code) => shutdown(code))
process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))
