import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig, type Plugin } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections (see project-docs/content-models.md)
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Playlists } from './collections/Playlists'
import { Gallery } from './collections/Gallery'
import { Testimonials } from './collections/Testimonials'
import { FAQ } from './collections/FAQ'
import { StaffProfiles } from './collections/StaffProfiles'
import { AdmissionsInquiries } from './collections/AdmissionsInquiries'
import { TourBookings } from './collections/TourBookings'
import { SummerCampRegistrations } from './collections/SummerCampRegistrations'
import { Redirects } from './collections/Redirects'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { SEOSettings } from './globals/SEOSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Trusted origins for CORS/CSRF: the canonical site + Vercel's auto-set deployment URLs
// (so the admin login works on the *.vercel.app URL before/after the custom domain is attached).
const VERCEL_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
const ORIGINS = [SERVER_URL, VERCEL_URL ? `https://${VERCEL_URL}` : null].filter(Boolean) as string[]

/**
 * Storage: media lives in Supabase Storage (S3-compatible) in every environment where the
 * S3_* env vars are present. When they're absent (fresh local dev), Payload falls back to
 * local disk so the app still boots without cloud credentials. See project-docs/deployment.md.
 */
const s3Enabled = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_ENDPOINT &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY,
)

/**
 * Email: lead-form notifications go out over the school's cPanel SMTP mailbox (mail.<domain>),
 * so every enquiry lands in the same webmail inbox the school already checks. Enabled only when
 * the SMTP_* env vars are present; otherwise Payload uses its default mock transport (console)
 * so local dev still boots without credentials — mirrors the S3 graceful-fallback pattern.
 * cPanel: host = mail.<domain>, port 465 (SSL) or 587 (STARTTLS), user/pass = a real mailbox.
 */
const smtpEnabled = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
)
const smtpPort = Number(process.env.SMTP_PORT || 465)

const emailAdapter = smtpEnabled
  ? nodemailerAdapter({
      defaultFromName: 'Nucleus International Schools',
      defaultFromAddress: process.env.EMAIL_FROM || (process.env.SMTP_USER as string),
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: smtpPort === 465, // 465 = implicit SSL; 587 = STARTTLS
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        // cPanel AutoSSL certs sometimes mismatch the mail hostname; set
        // SMTP_REJECT_UNAUTHORIZED=false to tolerate that if sending fails on a cert error.
        tls: { rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false' },
      },
    })
  : undefined

const storagePlugins: Plugin[] = s3Enabled
  ? [
      s3Storage({
        collections: { media: true },
        bucket: process.env.S3_BUCKET as string,
        config: {
          endpoint: process.env.S3_ENDPOINT,
          region: process.env.S3_REGION || 'us-east-1',
          // Supabase Storage's S3 endpoint requires path-style addressing.
          forcePathStyle: true,
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
          },
        },
      }),
    ]
  : []

export default buildConfig({
  serverURL: SERVER_URL,
  email: emailAdapter,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '| Nucleus International Schools',
    },
  },
  // Order here = order in the admin sidebar (within each `admin.group`).
  collections: [
    Pages,
    Posts,
    Playlists,
    Media,
    Gallery,
    Testimonials,
    FAQ,
    StaffProfiles,
    AdmissionsInquiries,
    TourBookings,
    SummerCampRegistrations,
    Redirects,
    Users,
  ],
  globals: [SiteSettings, SEOSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  // CSRF/CORS locked to the canonical site origin — admin + API only trust our own origin.
  cors: ORIGINS,
  csrf: ORIGINS,
  // The site uses the Local API, never GraphQL — disable it to remove the /api/graphql and
  // public /api/graphql-playground surface entirely. (The admin UI runs on REST, unaffected.)
  graphQL: {
    disable: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      // Runtime connection. In production this is the Supabase transaction pooler (port 6543).
      // Migrations run with DATABASE_URI pointed at the direct connection (5432) — see deployment.md.
      connectionString: process.env.DATABASE_URI || '',
      // Cap connections so we never exhaust Supabase's pooler client limit (session mode = 15).
      // Idle connections are released back to the pooler quickly so dev hot-reloads don't leak.
      max: 5,
      idleTimeoutMillis: 20000,
      // TCP keepalives + a bounded connect timeout: the local link to eu-west-2 drops idle
      // connections intermittently, which otherwise surfaces as read ETIMEDOUT mid-query.
      keepAlive: true,
      keepAliveInitialDelayMillis: 5000,
      connectionTimeoutMillis: 15000,
    },
    // Never auto-push schema in production; prod schema changes go through committed migrations.
    // PAYLOAD_SKIP_PUSH=1 lets data-only scripts (e.g. refresh:gallery) skip the slow drizzle
    // schema pull — it runs ~100 sequential queries and dies on flaky connections.
    push: process.env.NODE_ENV !== 'production' && !process.env.PAYLOAD_SKIP_PUSH,
  }),
  sharp,
  plugins: [
    // SEO meta (title/description/OG/Twitter) on every public, indexable collection.
    seoPlugin({
      collections: ['pages', 'posts'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) =>
        doc?.title ? `${doc.title} | Nucleus International Schools` : 'Nucleus International Schools',
      generateDescription: ({ doc }) => doc?.excerpt || '',
      generateURL: ({ doc }) => `${SERVER_URL}/${doc?.slug ?? ''}`,
    }),
    // Parent/child page hierarchy → powers breadcrumbs + Breadcrumb JSON-LD (see schema.md).
    nestedDocsPlugin({
      collections: ['pages'],
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
      generateLabel: (_, doc) => doc.title as string,
    }),
    ...storagePlugins,
  ],
})
