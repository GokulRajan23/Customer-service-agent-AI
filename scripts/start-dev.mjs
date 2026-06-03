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

console.log('')
console.log('==================================================')
console.log('  Secure AI Customer Service Agent')
console.log('  Open in your browser:  http://localhost:5173')
console.log('  Press Ctrl+C to stop the server')
console.log('==================================================')
console.log('')

const viteBin = join(root, 'node_modules', '.bin', 'vite')

const vite = spawn(viteBin, ['--port', '5173'], {
  cwd: root,
  stdio: 'inherit',
})

vite.on('close', (code) => process.exit(code ?? 0))
