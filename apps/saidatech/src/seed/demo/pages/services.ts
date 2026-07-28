import type { Payload } from 'payload'
import type { DemoMediaIds } from '../media'

/** Demo services page — slug `demo-services`. Visit /demo-services to preview. */
export async function seedDemoServicesPage(payload: Payload, media: DemoMediaIds, faqIds: string[]): Promise<void> {
  await payload.create({
    collection: 'pages',
    locale: 'ja',
    data: {
      title: 'Demo Services',
      slug: 'demo-services',
      status: 'published',
      layout: [
        {
          blockType: 'page-hero',
          variant: 'page-title',
          pageTitle: 'This is a sample services page title',
          showBreadcrumb: false,
        },
        {
          blockType: 'services-grid',
          eyebrow: 'Sample Services',
          heading: 'This is a sample services grid heading (corporate banner layout)',
          layout: 'corporate-banner',
          services: [
            {
              title: 'Demo Service One',
              subheadline: 'Sample subheadline',
              description: 'This is a sample service description — replace with real content.',
              image: media.services[3],
              cta: { label: 'Learn more', href: '/contact' },
            },
            {
              title: 'Demo Service Two',
              subheadline: 'Sample subheadline',
              description: 'This is a sample service description — replace with real content.',
              image: media.services[4],
              cta: { label: 'Learn more', href: '/contact' },
            },
            {
              title: 'Demo Service Three',
              subheadline: 'Sample subheadline',
              description: 'This is a sample service description — replace with real content.',
              image: media.services[5],
              cta: { label: 'Learn more', href: '/contact' },
            },
          ],
        },
        {
          blockType: 'faq',
          sectionHeading: 'This is a sample FAQ section heading',
          items: faqIds,
          variant: 'grid',
        },
        {
          blockType: 'cta-banner',
          heading: 'This is a sample call-to-action heading',
          body: 'This is sample CTA body copy — replace with real content.',
          primaryButton: { label: 'Contact Us', href: '/contact' },
          backgroundStyle: 'brand',
          variant: 'gradient',
        },
      ],
    },
  })
}
