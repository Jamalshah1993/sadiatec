import type { Payload } from 'payload'
import type { DemoMediaIds } from '../media'

/**
 * Demo homepage — slug `demo-home` (deliberately NOT `home`, so this never
 * collides with or overwrites the real Sadiatec homepage seeded by
 * src/seed/pages/home.ts). Visit /demo-home (or /en/demo-home, /bn/demo-home)
 * to preview it.
 */
export async function seedDemoHomePage(
  payload: Payload,
  media: DemoMediaIds,
  faqIds: string[],
  blogIds: string[],
  downloadIds: string[],
): Promise<void> {
  await payload.create({
    collection: 'pages',
    locale: 'ja',
    data: {
      title: 'Demo Home',
      slug: 'demo-home',
      status: 'published',
      layout: [
        {
          blockType: 'hero',
          eyebrow: 'Demo Company Ltd',
          headline: 'This is a sample hero headline — replace with real content',
          subheadline:
            'This is a sample hero subheadline. It demonstrates the hero block with an eyebrow, headline, subheadline, background image, and inline stats.',
          backgroundImage: media.heroBg,
          inlineStats: [
            { value: '1,000+', label: 'Sample Metric' },
            { value: '100%', label: 'Sample Rate' },
            { value: '24/7', label: 'Sample Support' },
          ],
          showScrollIndicator: true,
        },
        {
          blockType: 'stats',
          eyebrow: 'Why Sample Clients Choose Us',
          sectionHeading: 'This is a sample stats section heading',
          items: [
            { value: 1000, suffix: '+', label: 'Sample Stat One', icon: 'users' },
            { value: 250, suffix: '+', label: 'Sample Stat Two', icon: 'building' },
            { value: 100, suffix: '%', label: 'Sample Stat Three', icon: 'check' },
            { value: 15, suffix: '+', label: 'Sample Stat Four', icon: 'calendar' },
          ],
        },
        {
          blockType: 'services-grid',
          eyebrow: 'Sample Services',
          heading: 'This is a sample services grid heading',
          layout: 'alternating',
          services: [
            {
              title: 'Demo Service One',
              subheadline: 'Sample subheadline',
              description: 'This is a sample service description — replace with real content.',
              image: media.services[0],
              cta: { label: 'Learn more', href: '/demo-services' },
            },
            {
              title: 'Demo Service Two',
              subheadline: 'Sample subheadline',
              description: 'This is a sample service description — replace with real content.',
              image: media.services[1],
              cta: { label: 'Learn more', href: '/demo-services' },
            },
            {
              title: 'Demo Service Three',
              subheadline: 'Sample subheadline',
              description: 'This is a sample service description — replace with real content.',
              image: media.services[2],
              cta: { label: 'Learn more', href: '/demo-services' },
            },
          ],
        },
        // NOTE: 6 `featured: true` team docs are seeded (see team.ts) and this
        // block is configured per the "leave empty to show featured members"
        // admin description, but packages/cms-core/src/blocks/team-grid/adapter.ts
        // is currently a stub that always returns `memberIds: []` regardless of
        // input — a pre-existing framework gap, not a seed data issue. This
        // section will start rendering members once that adapter is implemented.
        {
          blockType: 'team-grid',
          sectionHeading: 'This is a sample team section heading',
          members: [],
          columns: '3',
          showBio: false,
        },
        {
          blockType: 'faq',
          sectionHeading: 'This is a sample FAQ section heading',
          items: faqIds,
          variant: 'accordion',
        },
        {
          blockType: 'company-profile',
          eyebrow: 'About Us',
          heading: 'This is a sample company profile heading',
          source: 'inline',
          inlineProfile: {
            companyName: 'Demo Company Ltd',
            founded: 'January 2020',
            ceo: 'Demo Representative Director',
            address: '1-2-3 Sample Street, Sample City, Sample Prefecture',
            capital: '¥10,000,000 (sample)',
            licenseNumber: 'Sample License No. XX-XXXXXX',
            headcount: '50 employees (sample)',
            businessDescription: 'This is a sample business description — replace with real content.',
          },
          photo: media.companyPhoto,
          photoFallbackText: 'Sample office photo',
          yearsBadge: { years: 5, label: 'In business for {years} years (sample)' },
          viewFullPageCta: { label: 'View full company page', href: '/demo-about' },
        },
        {
          blockType: 'downloads-grid',
          eyebrow: 'Sample Downloads',
          heading: 'This is a sample downloads grid heading',
          intro: 'This is a sample intro for the downloads section — replace with real content.',
          source: 'collection',
          selectedDownloads: downloadIds,
          downloadLabel: 'Free Download',
          viewAllCta: { label: 'View all resources', href: '/downloads' },
        },
        {
          blockType: 'blog-teaser',
          eyebrow: 'Sample Blog',
          heading: 'This is a sample blog teaser heading',
          intro: 'This is a sample intro for the blog section — replace with real content.',
          postsSource: 'selected',
          selectedPosts: blogIds,
          readMoreLabel: 'Read more',
          minReadSuffix: 'min read',
          viewAllCta: { label: 'View all articles', href: '/blog' },
        },
        {
          blockType: 'news-list',
          layout: 'list',
          eyebrow: 'Sample News',
          heading: 'This is a sample news list heading',
          intro: 'This is a sample intro for the news section — replace with real content.',
          source: 'collection',
          count: 5,
          viewAllCta: { label: 'View all', href: '/news' },
        },
        {
          blockType: 'cta-banner',
          eyebrow: 'Sample CTA',
          heading: 'This is a sample call-to-action heading',
          body: 'This is sample CTA body copy — replace with real content.',
          primaryButton: { label: 'Contact Us', href: '/contact' },
          secondaryButton: { label: 'Learn More', href: '/demo-about' },
          variant: 'gradient',
        },
      ],
    },
  })
}
