import type { Block } from 'payload'

export const HeroBlockConfig: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'headline', type: 'text', localized: true, required: true },
    { name: 'subheadline', type: 'textarea', localized: true },
    {
      name: 'inlineStats',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        { name: 'value', type: 'text', localized: true, required: true },
        { name: 'label', type: 'text', localized: true, required: true },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroSlides',
      label: 'Hero Image Slides',
      type: 'array',
      minRows: 1,
      maxRows: 5,
      admin: {
        description: 'Full-width slider images — 2 to 4 recommended. If empty, falls back to Background Image.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'alt',
          type: 'text',
          localized: true,
        },
      ],
    },
     {
      name: 'sideCards',
      label: 'Side Cards (Seminar / Resources / Consultation)',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Side Card', plural: 'Side Cards' },
      admin: {
        description: 'The 3 small cards shown next to / below the hero slider.',
      },
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'ctaLabel', type: 'text', localized: true, required: true },
        { name: 'ctaHref', type: 'text', required: true, defaultValue: '#' },
      ],
    },
     {
      name: 'promoCards',
      label: 'Promo Cards',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Promo Card', plural: 'Promo Cards' },
      admin: {
        description: 'The 3 colored banner cards shown below the hero section.',
      },
      fields: [
        {
          name: 'avatar',
          label: 'Avatar / Illustration',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'avatarPosition',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
        { name: 'badge', type: 'text', localized: true },
        { name: 'headline', type: 'text', localized: true, required: true },
        { name: 'subheadline', type: 'text', localized: true },
        { name: 'highlight', type: 'text', localized: true },
        { name: 'ctaHref', type: 'text', required: true, defaultValue: '#' },
      ],
    },
    {
      name: 'showScrollIndicator',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}