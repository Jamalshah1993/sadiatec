import 'server-only'
import { unstable_cache } from 'next/cache'
import { getCachedPayload } from './payload'

export interface CaseStudyItem {
  slug: string
  name: string
  role?: string
  tagline?: string
  metric?: { value: string; caption: string }
  challenge?: string
  solution?: string
  photoUrl?: string
}

function extractRichText(rt: unknown): string {
  if (typeof rt === 'string') return rt
  if (typeof rt !== 'object' || rt === null) return ''
  const root = (rt as Record<string, unknown>)['root']
  if (typeof root !== 'object' || root === null) return ''
  const children = (root as Record<string, unknown>)['children']
  if (!Array.isArray(children)) return ''
  return (children as unknown[]).map(extractNodeText).join(' ').trim()
}

function extractNodeText(node: unknown): string {
  if (typeof node !== 'object' || node === null) return ''
  const n = node as Record<string, unknown>
  if (typeof n['text'] === 'string') return n['text']
  if (Array.isArray(n['children'])) return (n['children'] as unknown[]).map(extractNodeText).join('')
  return ''
}

function mapCaseStudy(doc: Record<string, unknown>): CaseStudyItem | null {
  const slug = typeof doc['slug'] === 'string' ? doc['slug'] : ''
  const name = typeof doc['clientName'] === 'string' ? doc['clientName'] : ''
  if (!slug || !name) return null

  const role = typeof doc['role'] === 'string' && doc['role'] ? doc['role'] : undefined
  const metricValue = typeof doc['metricValue'] === 'string' ? doc['metricValue'] : ''
  const metricCaption = typeof doc['metricCaption'] === 'string' ? doc['metricCaption'] : ''

  const photo = doc['photo'] as Record<string, unknown> | null | undefined
  const photoUrl = photo && typeof photo['url'] === 'string' ? photo['url'] : undefined

  const tagline = extractRichText(doc['tagline'])
  const challenge = extractRichText(doc['challenge'])
  const solution = extractRichText(doc['solution'])

  return {
    slug,
    name,
    ...(role ? { role } : {}),
    ...(metricValue && metricCaption ? { metric: { value: metricValue, caption: metricCaption } } : {}),
    ...(challenge ? { challenge } : {}),
    ...(solution ? { solution } : {}),
    ...(photoUrl ? { photoUrl } : {}),
    ...(tagline ? { tagline } : {}),
  }
}

export const getCaseStudies = unstable_cache(
  async (locale: string) => {
    const payload = await getCachedPayload()
    const result = await payload.find({
      collection: 'case-studies',
      where: { active: { equals: true } },
      sort: '-publishedAt',
      locale: locale as 'en' | 'ja' | 'bn',
      limit: 100,
    })
    return result.docs
      .map((doc) => mapCaseStudy(doc as unknown as Record<string, unknown>))
      .filter((s): s is CaseStudyItem => s !== null)
  },
  ['case-studies-list'],
  { tags: ['case-studies'] },
)

export const getCaseStudyBySlug = unstable_cache(
  async (slug: string, locale: string) => {
    const payload = await getCachedPayload()
    const result = await payload.find({
      collection: 'case-studies',
      where: { slug: { equals: slug }, active: { equals: true } },
      locale: locale as 'en' | 'ja' | 'bn',
      limit: 1,
    })
    const doc = result.docs[0]
    return doc ? mapCaseStudy(doc as unknown as Record<string, unknown>) : null
  },
  ['case-study-detail'],
  { tags: ['case-studies'] },
)
