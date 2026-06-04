import type { Block } from 'payload'

export const InternalSubNavBlockConfig: Block = {
  slug: 'internal-sub-nav',
  interfaceName: 'InternalSubNavBlock',
  labels: { singular: 'Internal Sub-Navigation', plural: 'Internal Sub-Navigations' },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 10,
      fields: [
        { name: 'label', type: 'text', required: true, localized: true, admin: { description: 'Max 60 characters' } },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'underline',
      options: [
        { label: 'Tabs', value: 'tabs' },
        { label: 'Pills', value: 'pills' },
        { label: 'Underline', value: 'underline' },
      ],
    },
    { name: 'stickyOnScroll', type: 'checkbox', defaultValue: false },
  ],
}
