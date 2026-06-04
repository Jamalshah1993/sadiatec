import type { Block } from 'payload'

export const OrgChartBlockConfig: Block = {
  slug: 'org-chart',
  interfaceName: 'OrgChartBlock',
  labels: { singular: 'Org Chart', plural: 'Org Charts' },
  fields: [
    { name: 'heading', type: 'text', localized: true, admin: { description: 'Max 100 characters' } },
    { name: 'chartImage', type: 'upload', relationTo: 'media' },
    { name: 'chartImageAlt', type: 'text', localized: true, admin: { description: 'Max 150 characters' } },
    {
      name: 'departments',
      type: 'array',
      maxRows: 20,
      fields: [
        { name: 'name', type: 'text', required: true, localized: true, admin: { description: 'Max 80 characters' } },
        { name: 'head', type: 'text', localized: true, admin: { description: 'Max 80 characters' } },
        { name: 'description', type: 'textarea', localized: true, admin: { description: 'Max 200 characters' } },
      ],
    },
    {
      name: 'renderMode',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Image upload', value: 'image' },
        { label: 'Department list', value: 'list' },
      ],
    },
  ],
}
