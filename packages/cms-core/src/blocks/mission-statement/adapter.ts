import type { MissionStatementBlockProps, MissionPhoto, MissionPhotoSize } from './types'

export function adaptMissionStatementBlock(raw: unknown): MissionStatementBlockProps {
  const data = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>

  const rawPhotos = Array.isArray(data['photos']) ? data['photos'] : []
  const photos: MissionPhoto[] = rawPhotos
    .filter((p): p is Record<string, unknown> => typeof p === 'object' && p !== null)
    .map((p) => {
      const img = p['image'] as Record<string, unknown> | null | undefined
      const rawSize = p['size']
      const size: MissionPhotoSize =
        rawSize === 'small' || rawSize === 'large' ? rawSize : 'medium'
      return {
        imageUrl: img && typeof img['url'] === 'string' ? img['url'] : '',
        alt: typeof p['alt'] === 'string' ? p['alt'] : '',
        size,
      }
    })
    .filter((p) => p.imageUrl)

  const bodyStr = typeof data['body'] === 'string' && data['body'] ? data['body'] : undefined

  return {
    heading: typeof data['heading'] === 'string' ? data['heading'] : '',
    ...(bodyStr ? { body: bodyStr } : {}),
    ...(photos.length > 0 ? { photos } : {}),
  }
}
