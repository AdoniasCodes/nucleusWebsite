import type { Block } from 'payload'

/**
 * Lead-capture form block. The chosen `formType` determines which collection a
 * submission writes to (admissions inquiry, tour booking, or gated fee-sheet request).
 * Rendering + submission handling live in the frontend (Phase 4).
 */
export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlockType',
  labels: { singular: 'Form', plural: 'Forms' },
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      defaultValue: 'inquiry',
      options: [
        { label: 'Admissions inquiry', value: 'inquiry' },
        { label: 'Visit Now (tour)', value: 'tour' },
        { label: 'Start Registration', value: 'registration' },
        { label: 'Request fee sheet (gated)', value: 'fee-request' },
        { label: 'Summer Camp registration', value: 'summer-camp' },
      ],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'offwhite',
      options: [
        { label: 'Off-white', value: 'offwhite' },
        { label: 'White', value: 'white' },
        { label: 'Purple gradient', value: 'purple' },
      ],
    },
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    { name: 'successMessage', type: 'text', defaultValue: 'Thank you — we will be in touch shortly.' },
    {
      name: 'anchor',
      type: 'text',
      admin: { description: 'Optional HTML id for in-page links (e.g. "register" → #register).' },
    },
  ],
}
