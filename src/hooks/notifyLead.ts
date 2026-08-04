import type { CollectionAfterChangeHook } from 'payload'

/**
 * Emails the school when a public lead form is submitted (admissions inquiry or tour booking).
 * Wired as an `afterChange` hook so it fires no matter how the doc is created (website form,
 * REST/Local API, admin). It NEVER throws: the lead is already saved in the DB, so a mail
 * failure must not roll back the submission or surface an error to the parent; we just log it.
 *
 * Requires an email adapter to be configured in payload.config.ts (cPanel SMTP via the
 * SMTP_* env vars). With no adapter, Payload's default mock transport logs to the console.
 */

const FIELD_ORDER = [
  'parentName',
  'email',
  'phone',
  'childAge',
  'childGrade',
  'interest',
  'preferredDate',
  'preferredTime',
  'message',
  'notes',
  'sourcePage',
] as const

const LABELS: Record<string, string> = {
  parentName: 'Parent name',
  email: 'Email',
  phone: 'Phone',
  childAge: "Child's age",
  childGrade: 'Grade applying for',
  interest: 'Interest',
  preferredDate: 'Preferred date',
  preferredTime: 'Preferred time',
  message: 'Message',
  notes: 'Notes',
  sourcePage: 'Submitted from',
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const notifyLead = (kind: string): CollectionAfterChangeHook =>
  async ({ doc, operation, req }) => {
    if (operation !== 'create') return doc

    const to = process.env.LEAD_NOTIFY_TO || 'info@nucleusinternationalschoolsystem.com'
    const adminUrl = `${(process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/$/, '')}/admin`

    const rows = FIELD_ORDER.filter(
      (k) => doc?.[k] != null && String(doc[k]).trim() !== '',
    ).map((k) => ({ label: LABELS[k] ?? k, value: String(doc[k]) }))

    const text =
      `New ${kind} from the website:\n\n` +
      rows.map((r) => `${r.label}: ${r.value}`).join('\n') +
      `\n\nManage it here: ${adminUrl}`

    const html =
      `<h2 style="font-family:Arial,sans-serif;color:#11024d;margin:0 0 12px">New ${escapeHtml(kind)}</h2>` +
      `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">` +
      rows
        .map(
          (r) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top;white-space:nowrap"><strong>${escapeHtml(
              r.label,
            )}</strong></td><td style="padding:4px 0;color:#111">${escapeHtml(r.value)}</td></tr>`,
        )
        .join('') +
      `</table>` +
      `<p style="font-family:Arial,sans-serif;font-size:14px;margin-top:16px"><a href="${adminUrl}" style="color:#E0A93B">Open in admin →</a></p>`

    try {
      await req.payload.sendEmail({
        to,
        // Staff can hit "Reply" and write straight back to the parent.
        replyTo: typeof doc?.email === 'string' ? doc.email : undefined,
        subject: `New ${kind}: ${doc?.parentName ?? 'Unknown'}`,
        text,
        html,
      })
    } catch (err) {
      req.payload.logger.error(
        `[notifyLead] failed to send "${kind}" notification: ${(err as Error)?.message ?? err}`,
      )
    }

    return doc
  }
