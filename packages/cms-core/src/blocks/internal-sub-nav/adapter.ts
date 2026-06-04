import type { InternalSubNavBlockProps, SubNavItem } from './types'

export function adaptInternalSubNavBlock(raw: unknown): InternalSubNavBlockProps {
  const data = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>

  const rawItems = Array.isArray(data['items']) ? data['items'] : []
  const items: SubNavItem[] = rawItems
    .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
    .map((item) => ({
      label: typeof item['label'] === 'string' ? item['label'] : '',
      href: typeof item['href'] === 'string' ? item['href'] : '#',
    }))
    .filter((item) => item.label)

  const rawStyle = data['style']
  const style: InternalSubNavBlockProps['style'] =
    rawStyle === 'tabs' || rawStyle === 'pills' || rawStyle === 'underline' ? rawStyle : 'underline'

  return {
    items,
    style,
    stickyOnScroll: typeof data['stickyOnScroll'] === 'boolean' ? data['stickyOnScroll'] : false,
  }
}
