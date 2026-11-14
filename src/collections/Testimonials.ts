import type { Access, CollectionConfig, FieldAccess } from 'payload'

import { isAdminOrStaff } from '../access'
import { notifyLead } from '../hooks/notifyLead'

/** Staff and admins see every testimonial; the public only ever gets approved ones. */
const readApprovedOrStaff: Access = (args) => {
  if (isAdminOrStaff(args)) return true
  return { status: { equals: 'approved' } }
}

/** Private parent contact details: staff and admins only, never exposed by the public API. */
const staffOnlyField: FieldAccess = ({ req }) => Boolean(isAdminOrStaff({ req } as Parameters<Access>[0]))

/** Only website submissions email the school; staff-created rows stay silent. */
const notifyWebsiteTestimonial: ReturnType<typeof notifyLead> = async (args) => {
  if (args.operation !== 'create' || args.doc?.source !== 'website') return args.doc
  return notifyLead('Parent Testimonial')(args)
}

/** Parent & student testimonials (social proof for the admissions funnel). */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'status', 'rating', 'relationship', 'featured', 'createdAt'],
    group: 'Content',
  },
  access: {
    read: readApprovedOrStaff,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  hooks: {
    afterChange: [notifyWebsiteTestimonial],
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'authorName', type: 'text', required: true },
    {
      name: 'relationship',
      type: 'text',
      admin: { description: 'e.g. "Parent of Year 4 (Grade 3) student" or "Alumnus, Class of 2024".' },
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'rating', type: 'number', min: 1, max: 5, admin: { description: 'Optional star rating, 1 to 5.' } },
    { name: 'childYear', type: 'text', admin: { description: 'Shown publicly, e.g. "Year 4 (Grade 3)".' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      index: true,
      options: [
        { label: 'Pending review', value: 'pending' },
        { label: 'Approved (shown on the site)', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: { position: 'sidebar', description: 'Only approved testimonials appear on the website.' },
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'staff',
      options: [
        { label: 'Website form', value: 'website' },
        { label: 'Staff', value: 'staff' },
      ],
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'consent',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Parent agreed to publish their first name and quote.' },
    },
    {
      name: 'email',
      type: 'email',
      access: { read: staffOnlyField },
      admin: { description: 'Private. Never shown on the website.' },
    },
    {
      name: 'phone',
      type: 'text',
      access: { read: staffOnlyField },
      admin: { description: 'Private. Never shown on the website.' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
