import type { Block } from 'payload'

export const PageHeroBlockConfig: Block = {
  slug: 'page-hero',
  interfaceName: 'PageHeroBlock',
  labels: { singular: 'Page Hero', plural: 'Page Heroes' },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      admin: { description: 'Max 200 characters' },
    },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'overlayOpacity',
      type: 'number',
      defaultValue: 50,
      admin: { description: '0–100', step: 5 },
      min: 0,
      max: 100,
    },
    {
      name: 'overlayColor',
      type: 'select',
      defaultValue: 'black',
      options: [
        { label: 'Black', value: 'black' },
        { label: 'Brand', value: 'brand' },
        { label: 'None', value: 'none' },
      ],
    },
    { name: 'showBreadcrumb', type: 'checkbox', defaultValue: true },
    {
      name: 'breadcrumbItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true, admin: { description: 'Max 60 characters' } },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'textAlignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'minHeight',
      type: 'select',
      defaultValue: 'md',
      options: [
        { label: 'Small (240px)', value: 'sm' },
        { label: 'Medium (360px)', value: 'md' },
        { label: 'Large (480px)', value: 'lg' },
      ],
    },
  ],
}
