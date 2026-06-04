import type { Block } from 'payload'

export const StatsBarBlockConfig: Block = {
  slug: 'stats-bar',
  interfaceName: 'StatsBarBlock',
  labels: { singular: 'Stats Bar', plural: 'Stats Bars' },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'Max 20 characters, e.g. "17+" or "¥30M"' } },
        { name: 'label', type: 'text', required: true, localized: true, admin: { description: 'Max 60 characters' } },
        { name: 'icon', type: 'text', admin: { description: 'Lucide icon name (optional)' } },
      ],
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'brand',
      options: [
        { label: 'Brand', value: 'brand' },
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'row',
      options: [
        { label: 'Row', value: 'row' },
        { label: 'Grid', value: 'grid' },
      ],
    },
  ],
}
