import type { Block } from 'payload'

export const PullQuoteBlockConfig: Block = {
  slug: 'pull-quote',
  interfaceName: 'PullQuoteBlock',
  labels: { singular: 'Pull Quote', plural: 'Pull Quotes' },
  fields: [
    { name: 'quote', type: 'textarea', required: true, localized: true, admin: { description: 'Max 300 characters' } },
    { name: 'attribution', type: 'text', localized: true, admin: { description: 'Max 100 characters' } },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'large',
      options: [
        { label: 'Large', value: 'large' },
        { label: 'Subtle', value: 'subtle' },
        { label: 'Bordered', value: 'bordered' },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
  ],
}
