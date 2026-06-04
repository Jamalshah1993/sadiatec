import type { MapEmbedBlockProps, HoursRow } from './types'

export function adaptMapEmbedBlock(raw: unknown): MapEmbedBlockProps {
  const data = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>

  const rawHours = Array.isArray(data['hours']) ? data['hours'] : []
  const hours: HoursRow[] = rawHours
    .filter((h): h is Record<string, unknown> => typeof h === 'object' && h !== null)
    .map((h) => ({
      days: typeof h['days'] === 'string' ? h['days'] : '',
      time: typeof h['time'] === 'string' ? h['time'] : '',
    }))
    .filter((h) => h.days && h.time)

  const rawHeight = data['mapHeight']
  const mapHeight: MapEmbedBlockProps['mapHeight'] =
    rawHeight === 'sm' || rawHeight === 'md' || rawHeight === 'lg' ? rawHeight : 'md'

  const rawLayout = data['layout']
  const layout: MapEmbedBlockProps['layout'] =
    rawLayout === 'map-left' || rawLayout === 'map-right' || rawLayout === 'map-top'
      ? rawLayout
      : 'map-left'

  const rawEmbedUrl = typeof data['embedUrl'] === 'string' ? data['embedUrl'] : ''
  // Only accept Google Maps embed URLs to prevent javascript: or arbitrary iframe injection
  const embedUrl = rawEmbedUrl.startsWith('https://www.google.com/maps/embed') ? rawEmbedUrl : ''

  return {
    embedUrl,
    address: typeof data['address'] === 'string' ? data['address'] : '',
    mapHeight,
    layout,
    ...(typeof data['heading'] === 'string' && data['heading'] ? { heading: data['heading'] } : {}),
    ...(typeof data['phone'] === 'string' && data['phone'] ? { phone: data['phone'] } : {}),
    ...(typeof data['email'] === 'string' && data['email'] ? { email: data['email'] } : {}),
    ...(hours.length > 0 ? { hours } : {}),
  }
}
