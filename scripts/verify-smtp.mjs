/**
 * Standalone SMTP credential test — proves whether the cPanel mailbox login works,
 * independent of Vercel/Payload. Reads SMTP_* from the environment.
 *
 * Usage (creds in .env):   node --env-file=.env scripts/verify-smtp.mjs
 * Usage (inline):          SMTP_HOST=mail.nucleusinternationalschoolsystem.com SMTP_PORT=465 \
 *                          SMTP_USER=info@nucleusinternationalschoolsystem.com SMTP_PASS='THEPASSWORD' \
 *                          node scripts/verify-smtp.mjs
 *
 * It verifies the login, then sends ONE test email to LEAD_NOTIFY_TO (or the mailbox itself).
 */
import nodemailer from 'nodemailer'

const port = Number(process.env.SMTP_PORT || 465)
const host = process.env.SMTP_HOST
const user = process.env.SMTP_USER

if (!host || !user || !process.env.SMTP_PASS) {
  console.error('❌ Missing SMTP_HOST / SMTP_USER / SMTP_PASS in the environment.')
  process.exit(1)
}

const transport = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false' },
})

console.log(`Testing ${user} @ ${host}:${port} (secure=${port === 465}) ...`)

try {
  await transport.verify()
  console.log('✅ SMTP AUTH OK — the username/password are valid.')

  const to = process.env.LEAD_NOTIFY_TO || user
  const info = await transport.sendMail({
    from: `"Nucleus SMTP test" <${process.env.EMAIL_FROM || user}>`,
    to,
    subject: 'Nucleus SMTP test ✅',
    text: 'If you can read this in the inbox, SMTP sending works end-to-end.',
  })
  console.log(`✅ Test email accepted by the server: ${info.messageId} → ${to}`)
  console.log('   Now check that inbox. If it arrives, the credentials are 100% correct.')
} catch (err) {
  console.error('❌ SMTP FAILED:', err.message)
  console.error('   535 / "authentication failed" → the password is wrong (re-check Vercel vs cPanel).')
  console.error('   ETIMEDOUT / ECONNREFUSED → port blocked; try SMTP_PORT=587.')
  console.error('   self-signed / cert error → add SMTP_REJECT_UNAUTHORIZED=false.')
  process.exit(1)
}
