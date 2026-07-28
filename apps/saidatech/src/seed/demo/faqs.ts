import type { Payload } from 'payload'
import { richText } from './lib/rich-text'

const FAQ_ITEMS = [
  { question: 'What is this demo FAQ item about?', category: 'General', homepage: true },
  { question: 'How do I replace this placeholder content?', category: 'General', homepage: true },
  { question: 'Sample question about pricing or fees?', category: 'Pricing', homepage: true },
  { question: 'Sample question about the application process?', category: 'Process', homepage: false },
  { question: 'Sample question about turnaround time?', category: 'Process', homepage: false },
  { question: 'Sample question about support availability?', category: 'Support', homepage: false },
  { question: 'Sample question about eligibility requirements?', category: 'Eligibility', homepage: false },
]

export async function seedDemoFAQs(payload: Payload): Promise<string[]> {
  const ids: string[] = []
  for (const [i, item] of FAQ_ITEMS.entries()) {
    const doc = await payload.create({
      collection: 'faqs',
      locale: 'ja',
      data: {
        question: item.question,
        answer: richText('This is a sample FAQ answer — replace with real content.'),
        category: item.category,
        homepage: item.homepage,
        sortOrder: i + 1,
        active: true,
        slug: `demo-faq-${i + 1}`,
        aiVisible: true,
      },
    })
    ids.push(doc.id as string)
  }
  return ids
}
