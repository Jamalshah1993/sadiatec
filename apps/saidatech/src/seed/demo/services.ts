import type { Payload } from 'payload'
import { richText } from './lib/rich-text'

const SERVICES = [
  { title: 'Demo Service One — Consulting', icon: 'briefcase' },
  { title: 'Demo Service Two — Placement', icon: 'users' },
  { title: 'Demo Service Three — Training', icon: 'graduation-cap' },
  { title: 'Demo Service Four — Compliance', icon: 'shield-check' },
  { title: 'Demo Service Five — Support', icon: 'life-buoy' },
  { title: 'Demo Service Six — Onboarding', icon: 'clipboard-check' },
]

export async function seedDemoServices(payload: Payload, thumbnailIds: string[]): Promise<string[]> {
  const ids: string[] = []
  for (const [i, service] of SERVICES.entries()) {
    const doc = await payload.create({
      collection: 'services',
      locale: 'ja',
      data: {
        title: service.title,
        excerpt: 'This is a sample service excerpt — replace with real content describing this service.',
        thumbnail: thumbnailIds[i]!,
        icon: service.icon,
        slug: `demo-service-${i + 1}`,
        sort: i + 1,
        active: true,
        body: richText(
          'This is a sample services page — replace with real content.',
          'Add pricing, process steps, and supporting detail specific to this service here.',
        ),
        stats: [
          { value: 100 + i * 10, suffix: '+', label: 'Sample Metric A', icon: 'trending-up' },
          { value: 50 + i * 5, suffix: '%', label: 'Sample Metric B', icon: 'percent' },
        ],
        cta: {
          heading: 'Interested in this service?',
          subheading: 'Get in touch to learn more.',
          buttonLabel: 'Contact Us',
          buttonHref: '/contact',
        },
        aiVisible: true,
      },
    })
    ids.push(doc.id as string)
  }
  return ids
}
