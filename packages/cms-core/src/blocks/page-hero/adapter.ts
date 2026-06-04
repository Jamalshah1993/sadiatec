import type { PageHeroBlockProps, PageHeroBreadcrumbItem } from './types'

export function adaptPageHeroBlock(raw: unknown): PageHeroBlockProps {
  const data = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>

  const bgImage = data['backgroundImage'] as Record<string, unknown> | null | undefined
  const rawBgUrl = bgImage && typeof bgImage['url'] === 'string' ? bgImage['url'] : ''
  // Accept only relative paths (Payload media) or absolute https URLs
  const bgUrl = rawBgUrl && (rawBgUrl.startsWith('/') || rawBgUrl.startsWith('https://'))
    ? rawBgUrl
    : undefined

  const rawItems = Array.isArray(data['breadcrumbItems']) ? data['breadcrumbItems'] : []
  const breadcrumbItems: PageHeroBreadcrumbItem[] = rawItems
    .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
    .map((item) => ({
      label: typeof item['label'] === 'string' ? item['label'] : '',
      ...(typeof item['href'] === 'string' && item['href'] ? { href: item['href'] } : {}),
    }))
    .filter((item) => item.label)

  const rawOverlayColor = data['overlayColor']
  const overlayColor: PageHeroBlockProps['overlayColor'] =
    rawOverlayColor === 'black' || rawOverlayColor === 'brand' || rawOverlayColor === 'none'
      ? rawOverlayColor
      : 'black'

  const rawAlignment = data['textAlignment']
  const textAlignment: PageHeroBlockProps['textAlignment'] =
    rawAlignment === 'left' || rawAlignment === 'center' ? rawAlignment : 'center'

  const rawMinHeight = data['minHeight']
  const minHeight: PageHeroBlockProps['minHeight'] =
    rawMinHeight === 'sm' || rawMinHeight === 'md' || rawMinHeight === 'lg' ? rawMinHeight : 'md'

  const rawOpacity = data['overlayOpacity']
  const overlayOpacity = typeof rawOpacity === 'number' ? rawOpacity : 50

  return {
    title: typeof data['title'] === 'string' ? data['title'] : '',
    overlayOpacity,
    overlayColor,
    textAlignment,
    minHeight,
    showBreadcrumb: typeof data['showBreadcrumb'] === 'boolean' ? data['showBreadcrumb'] : true,
    ...(typeof data['subtitle'] === 'string' && data['subtitle'] ? { subtitle: data['subtitle'] } : {}),
    ...(bgUrl ? { backgroundImageUrl: bgUrl } : {}),
    ...(breadcrumbItems.length > 0 ? { breadcrumbItems } : {}),
  }
}
