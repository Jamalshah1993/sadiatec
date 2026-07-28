import type { Payload } from 'payload'
import { richText } from './lib/rich-text'

const MEMBERS = [
  { name: 'Demo Person One', title: 'Chief Executive Officer' },
  { name: 'Demo Person Two', title: 'Head of Operations' },
  { name: 'Demo Person Three', title: 'HR & Recruitment Lead' },
  { name: 'Demo Person Four', title: 'Client Services Manager' },
  { name: 'Demo Person Five', title: 'Language Training Coordinator' },
  { name: 'Demo Person Six', title: 'Compliance Officer' },
]

export async function seedDemoTeam(payload: Payload, photoIds: string[]): Promise<string[]> {
  const ids: string[] = []
  for (const [i, member] of MEMBERS.entries()) {
    const doc = await payload.create({
      collection: 'team',
      locale: 'ja',
      data: {
        name: member.name,
        title: member.title,
        photo: photoIds[i]!,
        bio: richText(`This is a sample bio for ${member.name} — replace with real content.`),
        slug: `demo-team-${i + 1}`,
        featured: true,
        sortOrder: i + 1,
        aiVisible: true,
      },
    })
    ids.push(doc.id as string)
  }
  return ids
}
