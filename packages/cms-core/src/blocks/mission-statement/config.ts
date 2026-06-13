import type { Block } from 'payload'

export const MissionStatementBlockConfig: Block = {
  slug: 'mission-statement',
  interfaceName: 'MissionStatementBlock',
  labels: {
    singular: 'Mission Statement',
    plural: 'Mission Statements',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description: 'Large heading — left column. Use line breaks for multi-line effect.',
        rows: 3,
      },
    },
    {
      name: 'body',
      label: 'Body Text',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Supporting paragraph — right column.',
        rows: 4,
      },
    },
    {
      name: 'photos',
      label: 'Photos',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      admin: {
        description: 'Staggered photos at the bottom — 3 to 4 recommended',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          localized: true,
        },
        {
          name: 'size',
          label: 'Display Size',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
          admin: {
            description: 'Controls the height of this photo in the staggered row',
          },
        },
      ],
    },
  ],
}
