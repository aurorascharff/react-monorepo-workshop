import { execSync } from 'node:child_process'

export default async function globalSetup() {
  console.log('[e2e] Reseeding database for a clean run...')
  execSync('npm run db:seed --workspace=apps/api', {
    cwd: new URL('../../', import.meta.url).pathname,
    stdio: 'inherit',
  })
}
