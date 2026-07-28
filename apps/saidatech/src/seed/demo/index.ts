import { getPayload } from 'payload'
import config from '../../../payload.config'
import siteConfig from '../../../site.config'
import { clearDemoContent } from './lib/clear'
import { seedDemoMedia } from './media'
import { seedDemoServices } from './services'
import { seedDemoFAQs } from './faqs'
import { seedDemoNews } from './news'
import { seedDemoBlog } from './blog'
import { seedDemoTestimonials } from './testimonials'
import { seedDemoDownloads } from './downloads'
import { seedDemoTeam } from './team'
import { seedDemoEvents } from './events'
import { seedDemoGallery } from './gallery'
import { seedDemoHomePage } from './pages/home'
import { seedDemoAboutPage } from './pages/about'
import { seedDemoServicesPage } from './pages/services'

/**
 * Generic placeholder-content seed for this template. Separate from
 * src/seed/index.ts (the real Sadiatec content seed, run via `pnpm seed`) —
 * run this one via `pnpm seed:demo`. See README.md "Demo Seed" section.
 */
async function seedDemo(): Promise<void> {
  if (process.env['NODE_ENV'] === 'production' || process.env['NEXT_PHASE'] === 'phase-production-build') {
    console.log('⏭️ Skipping demo seed in production build')
    return
  }

  const dbUri = process.env['DATABASE_URI'] ?? ''
  const isLocalSqlite = dbUri.startsWith('file:') || dbUri.endsWith('.db')
  if (!isLocalSqlite) {
    console.error(
      `🛑 Refusing to run: DATABASE_URI does not look like a local SQLite file (got "${dbUri}"). ` +
        'pnpm seed:demo is only intended for a local file:./local.db database — it will never run against Postgres. Aborting.',
    )
    process.exit(1)
  }

  const payload = await getPayload({ config })
  payload.logger.info(`🌱 Seeding demo/placeholder content into ${dbUri}...\n`)

  const hasGallery = siteConfig.features.gallery
  const hasEvents = siteConfig.features.events

  await clearDemoContent(payload, { hasEvents, hasGallery })

  const media = await seedDemoMedia(payload, { hasGallery, hasEvents })

  await seedDemoServices(payload, media.services)
  const faqIds = await seedDemoFAQs(payload)
  await seedDemoNews(payload, media.news)
  const blogIds = await seedDemoBlog(payload, media.blog)
  await seedDemoTestimonials(payload, media.testimonials)
  const downloadIds = await seedDemoDownloads(payload, media.downloads)
  await seedDemoTeam(payload, media.team)

  if (hasGallery) {
    await seedDemoGallery(payload, media.gallery)
  } else {
    payload.logger.info('⏭️  Skipping gallery collection — siteConfig.features.gallery is disabled for this site')
  }

  if (hasEvents) {
    await seedDemoEvents(payload, media.events)
  } else {
    payload.logger.info('⏭️  Skipping events collection — siteConfig.features.events is disabled for this site')
  }

  await seedDemoHomePage(payload, media, faqIds, blogIds, downloadIds)
  await seedDemoAboutPage(payload, media)
  await seedDemoServicesPage(payload, media, faqIds)

  payload.logger.info('\n✅ Demo seed complete.')
  payload.logger.info('   Preview: /demo-home, /demo-about, /demo-services (also under /en/... and /bn/...)')
  process.exit(0)
}

seedDemo().catch((err: unknown) => {
  console.error('Demo seed failed:', err)
  process.exit(1)
})
