import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Creates (or resets) the first super-admin user.
 * Run: `ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run seed:admin`
 * Defaults are used if env vars are absent. Change the password after first login.
 */
const email = process.env.ADMIN_EMAIL || 'admin@nucleusinternationalschool.com'
const password = process.env.ADMIN_PASSWORD || 'changeme-please'
const name = process.env.ADMIN_NAME || 'Nucleus Admin'

const run = async () => {
  const payload = await getPayload({ config })
  await payload.delete({ collection: 'users', where: { email: { equals: email } } }).catch(() => {})
  await payload.create({
    collection: 'users',
    data: { name, email, password, role: 'super-admin' },
  })
  console.log('\n✅ Super-admin created:')
  console.log('   URL:      /admin')
  console.log('   Email:   ', email)
  console.log('   Password:', password)
  console.log('   (Change the password after first login.)\n')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
