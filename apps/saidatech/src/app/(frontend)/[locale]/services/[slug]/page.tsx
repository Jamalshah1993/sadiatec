import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCachedPayload } from '@/lib/payload'
import { blockRegistry } from '@saidatech/cms-core/blocks'
import siteConfig from '../../../../../../site.config'

function isSupportedLocale(s: string): boolean {
  return (siteConfig.locales.enabled as string[]).includes(s)
}

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

type RawBlock = { blockType: string; id?: string } & Record<string, unknown>

export async function generateStaticParams() {
  const payload = await getCachedPayload()
  const result = await payload.find({
    collection: 'services',
    where: { active: { equals: true } },
    limit: 100,
  })
  return siteConfig.locales.enabled.flatMap((locale) =>
    result.docs.map((service) => ({
      locale,
      slug: service.slug as string,
    })),
  )
}

export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isSupportedLocale(locale)) return {}

  const payload = await getCachedPayload()
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    locale,
    limit: 1,
  })
  const service = result.docs[0]
  if (!service) return {}

  const title = typeof service['title'] === 'string' ? service['title'] : ''
  const description = typeof service['excerpt'] === 'string' ? service['excerpt'] : ''
  const thumbnail = service['thumbnail'] as Record<string, unknown> | null | undefined
  const thumbnailUrl =
    thumbnail && typeof thumbnail['url'] === 'string' ? thumbnail['url'] : undefined

  const base = `https://${siteConfig.site.domain}`
  const defaultLocale = siteConfig.locales.default
  const canonicalPath =
    locale === defaultLocale ? `/services/${slug}` : `/${locale}/services/${slug}`

  const languages: Record<string, string> = {
    'x-default': `${base}/services/${slug}`,
  }
  for (const loc of siteConfig.locales.enabled) {
    languages[loc] =
      loc === defaultLocale ? `${base}/services/${slug}` : `${base}/${loc}/services/${slug}`
  }

  return {
    title,
    ...(description ? { description } : {}),
    openGraph: {
      title,
      ...(description ? { description } : {}),
      url: `${base}${canonicalPath}`,
      siteName: siteConfig.site.name,
      locale,
      type: 'website',
      ...(thumbnailUrl ? { images: [{ url: thumbnailUrl }] } : {}),
    },
    alternates: {
      canonical: `${base}${canonicalPath}`,
      languages,
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  if (!siteConfig.features.services) notFound()

  const { locale, slug } = await params
  if (!slug) notFound()
  if (!isSupportedLocale(locale)) notFound()

  const payload = await getCachedPayload()
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    locale,
    limit: 1,
  })

  const service = result.docs[0]
  if (!service) notFound()

  const blocks = (service['layout'] ?? []) as RawBlock[]

  return (
    <>
      {blocks.map((block, index) => {
        const renderer = blockRegistry[block.blockType]
        if (!renderer) return null
        return <div key={block.id ?? index}>{renderer(block)}</div>
      })}
    </>
  )
}
