import type { Block } from 'payload'

export const CompanyProfileTableBlockConfig: Block = {
  slug: 'company-profile-table',
  interfaceName: 'CompanyProfileTableBlock',
  labels: { singular: 'Company Profile Table', plural: 'Company Profile Tables' },
  fields: [
    { name: 'heading', type: 'text', localized: true, admin: { description: 'Max 100 characters' } },
    {
      name: 'rows',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 30,
      fields: [
        { name: 'label', type: 'text', required: true, localized: true, admin: { description: 'Max 80 characters' } },
        { name: 'value', type: 'richText', required: true, localized: true },
        { name: 'isHighlighted', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'tableStyle',
      type: 'select',
      defaultValue: 'striped',
      options: [
        { label: 'Bordered', value: 'bordered' },
        { label: 'Striped', value: 'striped' },
        { label: 'Clean', value: 'clean' },
      ],
    },
    {
      name: 'labelWidth',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Narrow (25%)', value: 'narrow' },
        { label: 'Medium (33%)', value: 'medium' },
        { label: 'Wide (40%)', value: 'wide' },
      ],
    },
  ],
}
