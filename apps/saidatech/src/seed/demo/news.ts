import type { Payload } from 'payload'
import { richText } from './lib/rich-text'

const NEWS_ITEMS = [
  { title: 'Demo News Item One', category: 'Announcement', publishedAt: '2026-06-01' },
  { title: 'Demo News Item Two', category: 'Event', publishedAt: '2026-05-20' },
  { title: 'Demo News Item Three', category: 'Press Release', publishedAt: '2026-05-05' },
  { title: 'Demo News Item Four', category: 'Announcement', publishedAt: '2026-04-18' },
  { title: 'Demo News Item Five', category: 'Jobs', publishedAt: '2026-04-01' },
]

export async function seedDemoNews(payload: Payload, thumbnailIds: string[]): Promise<string[]> {
  const ids: string[] = []
  for (const [i, item] of NEWS_ITEMS.entries()) {
    const doc = await payload.create({
      collection: 'news',
      locale: 'ja',
      data: {
        title: item.title,
        excerpt: 'This is a sample news excerpt — replace with real content.',
        content: richText('This is a sample news article — replace with real content.'),
        thumbnail: thumbnailIds[i]!,
        category: item.category,
        publishedAt: item.publishedAt,
        slug: `demo-news-${i + 1}`,
        aiVisible: true,
      },
    })
    ids.push(doc.id as string)
  }
  return ids
}
