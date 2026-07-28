import type { Payload, Where } from 'payload'

export const DEMO_PAGE_SLUGS = ['demo-home', 'demo-about', 'demo-services']

// Collections keyed by their unique `slug` field — demo docs always use a
// `demo-` prefixed slug, so a `contains` match safely isolates them from any
// real content without needing a schema change.
const SLUG_TAGGED_COLLECTIONS = ['services', 'faqs', 'news', 'blog', 'downloads', 'team'] as const

export interface ClearOptions {
  hasEvents: boolean
  hasGallery: boolean
}

async function deleteWhere(payload: Payload, collection: string, where: Where): Promise<number> {
  const found = await payload.find({ collection, where, limit: 1000, depth: 0 })
  for (const doc of found.docs) {
    await payload.delete({ collection, id: doc.id })
  }
  return found.docs.length
}

/**
 * Removes every doc previously created by this demo seed so re-running the
 * script never duplicates content. Pages are cleared first (they may hold
 * relationships to the other collections/media), then the tagged
 * collections, then media last.
 */
export async function clearDemoContent(payload: Payload, options: ClearOptions): Promise<void> {
  payload.logger.info('🧹 Clearing previously seeded demo content...')

  for (const slug of DEMO_PAGE_SLUGS) {
    await deleteWhere(payload, 'pages', { slug: { equals: slug } })
  }

  for (const collection of SLUG_TAGGED_COLLECTIONS) {
    const count = await deleteWhere(payload, collection, { slug: { contains: 'demo-' } })
    if (count) payload.logger.info(`  – ${collection}: removed ${count} demo doc(s)`)
  }

  const testimonialCount = await deleteWhere(payload, 'testimonials', { company: { equals: 'Demo Company Ltd' } })
  if (testimonialCount) payload.logger.info(`  – testimonials: removed ${testimonialCount} demo doc(s)`)

  if (options.hasGallery) {
    const galleryCount = await deleteWhere(payload, 'gallery', { category: { equals: 'demo-gallery' } })
    if (galleryCount) payload.logger.info(`  – gallery: removed ${galleryCount} demo doc(s)`)
  }

  if (options.hasEvents) {
    const eventCount = await deleteWhere(payload, 'events', { slug: { contains: 'demo-' } })
    if (eventCount) payload.logger.info(`  – events: removed ${eventCount} demo doc(s)`)
  }

  const mediaCount = await deleteWhere(payload, 'media', { filename: { contains: 'demo-' } })
  if (mediaCount) payload.logger.info(`  – media: removed ${mediaCount} demo file(s)`)

  payload.logger.info('🧹 Clear complete.\n')
}
