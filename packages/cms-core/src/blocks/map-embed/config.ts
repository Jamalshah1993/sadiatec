import type { Block } from 'payload'

export const MapEmbedBlockConfig: Block = {
  slug: 'map-embed',
  interfaceName: 'MapEmbedBlock',
  labels: { singular: 'Map Embed', plural: 'Map Embeds' },
  fields: [
    { name: 'heading', type: 'text', localized: true, admin: { description: 'Max 100 characters' } },
    {
      name: 'embedUrl',
      type: 'text',
      required: true,
      admin: { description: 'Google Maps embed URL (use the "Embed a map" share option)' },
    },
    { name: 'address', type: 'textarea', required: true, localized: true, admin: { description: 'Max 300 characters' } },
    { name: 'phone', type: 'text', admin: { description: 'Max 30 characters' } },
    { name: 'email', type: 'email' },
    {
      name: 'hours',
      type: 'array',
      maxRows: 7,
      fields: [
        { name: 'days', type: 'text', required: true, localized: true, admin: { description: 'Max 60 characters, e.g. "Mon–Fri"' } },
        { name: 'time', type: 'text', required: true, localized: true, admin: { description: 'Max 60 characters, e.g. "9:00–18:00"' } },
      ],
    },
    {
      name: 'mapHeight',
      type: 'select',
      defaultValue: 'md',
      options: [
        { label: 'Small (300px)', value: 'sm' },
        { label: 'Medium (450px)', value: 'md' },
        { label: 'Large (600px)', value: 'lg' },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'map-left',
      options: [
        { label: 'Map left, info right', value: 'map-left' },
        { label: 'Map right, info left', value: 'map-right' },
        { label: 'Map on top, info below', value: 'map-top' },
      ],
    },
  ],
}
