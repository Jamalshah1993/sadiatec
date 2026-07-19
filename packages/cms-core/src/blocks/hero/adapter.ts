import type { HeroBlockProps, HeroSlide, SideCard, PromoCard } from './types'

export function adaptHeroBlock(raw: unknown): HeroBlockProps {
  const data = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>

  const bgImage = data['backgroundImage'] as Record<string, unknown> | null | undefined

  const rawStats = Array.isArray(data['inlineStats']) ? data['inlineStats'] : []
  const inlineStats = rawStats
    .filter((s): s is Record<string, unknown> => typeof s === 'object' && s !== null)
    .map((s) => ({
      value: typeof s['value'] === 'string' ? s['value'] : '',
      label: typeof s['label'] === 'string' ? s['label'] : '',
    }))
    .filter((s) => s.value && s.label)

  const rawSlides = Array.isArray(data['heroSlides']) ? data['heroSlides'] : []
  const heroSlides: HeroSlide[] = rawSlides
    .filter((s): s is Record<string, unknown> => typeof s === 'object' && s !== null)
    .map((s) => {
      const img = s['image'] as Record<string, unknown> | null | undefined
      return {
        imageUrl: img && typeof img['url'] === 'string' ? img['url'] : '',
        title: typeof s['title'] === 'string' ? s['title'] : '',
        subtitle: typeof s['subtitle'] === 'string' ? s['subtitle'] : '',
        alt: typeof s['alt'] === 'string' ? s['alt'] : '',
      }
    })
    .filter((s) => s.imageUrl)

  const rawSideCards = Array.isArray(data['sideCards']) ? data['sideCards'] : []
  const sideCards: SideCard[] = rawSideCards
    .filter((c): c is Record<string, unknown> => typeof c === 'object' && c !== null)
    .map((c) => ({
      title: typeof c['title'] === 'string' ? c['title'] : '',
      description: typeof c['description'] === 'string' ? c['description'] : '',
      ctaLabel: typeof c['ctaLabel'] === 'string' ? c['ctaLabel'] : '',
      ctaHref: typeof c['ctaHref'] === 'string' ? c['ctaHref'] : '#',
    }))
    .filter((c) => c.title)

  const rawPromoCards = Array.isArray(data['promoCards']) ? data['promoCards'] : []
  const promoCards: PromoCard[] = rawPromoCards
    .filter((c): c is Record<string, unknown> => typeof c === 'object' && c !== null)
    .map((c): PromoCard => {
      const avatar = c['avatar'] as Record<string, unknown> | null | undefined
      const position = c['avatarPosition']
      const avatarPosition: 'left' | 'right' = position === 'right' ? 'right' : 'left'

      return {
        avatarUrl: avatar && typeof avatar['url'] === 'string' ? avatar['url'] : '',
        avatarPosition,
        badge: typeof c['badge'] === 'string' ? c['badge'] : '',
        headline: typeof c['headline'] === 'string' ? c['headline'] : '',
        subheadline: typeof c['subheadline'] === 'string' ? c['subheadline'] : '',
        highlight: typeof c['highlight'] === 'string' ? c['highlight'] : '',
        ctaHref: typeof c['ctaHref'] === 'string' ? c['ctaHref'] : '#',
      }
    })
    .filter((c) => c.headline)

  const eyebrowStr = typeof data['eyebrow'] === 'string' && data['eyebrow'] ? data['eyebrow'] : ''
  const subheadlineStr = typeof data['subheadline'] === 'string' && data['subheadline'] ? data['subheadline'] : ''
  const bgImageUrl = bgImage && typeof bgImage['url'] === 'string' ? bgImage['url'] : ''

  return {
    headline: typeof data['headline'] === 'string' ? data['headline'] : '',
    showScrollIndicator:
      typeof data['showScrollIndicator'] === 'boolean' ? data['showScrollIndicator'] : true,
    ...(eyebrowStr ? { eyebrow: eyebrowStr } : {}),
    ...(subheadlineStr ? { subheadline: subheadlineStr } : {}),
    ...(inlineStats.length > 0 ? { inlineStats } : {}),
    ...(bgImageUrl ? { backgroundImageUrl: bgImageUrl } : {}),
    ...(heroSlides.length > 0 ? { heroSlides } : {}),
    ...(sideCards.length > 0 ? { sideCards } : {}),
    ...(promoCards.length > 0 ? { promoCards } : {}),
  }
}