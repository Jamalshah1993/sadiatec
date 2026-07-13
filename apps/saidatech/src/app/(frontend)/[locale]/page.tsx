import { notFound } from 'next/navigation'
import { getCachedPayload } from '@/lib/payload'
import { blockRegistry } from '@saidatech/cms-core/blocks'
export const revalidate = 3600

const SUPPORTED_LOCALES = ['en', 'ja', 'bn'] as const
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

function isSupportedLocale(s: string): s is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(s)
}

type RawBlock = { 
  blockType: string
  id?: string 
  source?: string
  selectedItems?: unknown[]
  count?: number
  resolvedItems?: unknown[]   // add this
} & Record<string, unknown>

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) notFound()

  const payload = await getCachedPayload()

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    locale,
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) return null

  let blocks = (page.layout ?? []) as RawBlock[]

  // === RESOLVE NEWS LIST BLOCK FALLBACK ===
blocks = await Promise.all(
  blocks.map(async (block) => {
    if (block.blockType === 'news-list') {
      const source = block.source as string | undefined
      const selectedItems = block.selectedItems as any[] | undefined

      if (source === 'collection' && (!selectedItems || selectedItems.length === 0)) {
        const count = typeof block.count === 'number' ? block.count : 5

        const latest = await payload.find({
          collection: 'news',
          where: {
            // Check if the 'title' field has a value for the current locale
            // Replace 'title' with any mandatory field in your collection
            'title': {
              exists: true,
              not_equals: null, // Ensure it's not empty
            },
          },
          sort: '-publishedAt',
          limit: count,
          depth: 1,
          locale: locale,          // Tell Payload to return localized data
          fallbackLocale: false,   // CRITICAL: Prevent fallback to default language
        })

        return { 
          ...block, 
          resolvedItems: latest.docs 
        } as RawBlock
      }
    }
    return block
  })
)

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