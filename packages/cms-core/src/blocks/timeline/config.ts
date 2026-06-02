import type { Block } from 'payload'

export const TimelineBlockConfig: Block = {
  slug: 'timeline', // Keep the slug matching what your database already has
  interfaceName: 'TimelineBlock',
  labels: { 
    singular: 'Latest Openings & Process', 
    plural: 'Latest Openings & Processes' 
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Our Latest Opening',
    },
    {
      name: 'openings',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'company', type: 'text', required: true },
        { name: 'location', type: 'text', required: true, localized: true },
        { name: 'salary', type: 'text', required: true },
        { name: 'postedDate', type: 'text', required: true },
        {
          name: 'tag',
          type: 'select',
          defaultValue: 'standard',
          options: [
            { label: 'Urgent', value: 'urgent' },
            { label: 'Standard', value: 'standard' },
          ],
        },
        { name: 'applyHref', type: 'text', required: true, defaultValue: '#' },
      ],
    },
    {
      name: 'processEyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'Recruitement Process',
    },
    {
      name: 'processSteps',
      type: 'array',
      required: true,
      fields: [
        { name: 'number', type: 'number', required: true },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
      ],
    },
  ],
}
