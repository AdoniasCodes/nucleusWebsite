import type { Block } from 'payload'

/**
 * Lead-capture form block. The chosen `formType` determines which collection a
 * submission writes to (admissions inquiry, tour booking, camp registration).
 *
 * The old `fee-request` type is deliberately gone: parents kept finding the gated fee-sheet form
 * through stray links instead of registering. Historic submissions keep their `fee-request`
 * interest value in `admissions-inquiries`; no new one can be created.
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
    { name: 'successMessage', type: 'text', defaultValue: 'Thank you. We will be in touch shortly.' },
    {
      name: 'anchor',
      type: 'text',
      admin: { description: 'Optional HTML id for in-page links (e.g. "register" → #register).' },
    },
  ],
}
