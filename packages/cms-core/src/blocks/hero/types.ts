export interface HeroSlide {
  imageUrl: string
  alt: string
  title?: string
  subtitle?: string
}

export interface HeroInlineStat {
  value: string
  label: string
}

export interface HeroBlockProps {
  blockType?: 'hero'
  eyebrow?: string
  headline?: string
  subheadline?: string
  inlineStats?: HeroInlineStat[]
  backgroundImageUrl?: string
  heroSlides?: HeroSlide[]
  showScrollIndicator?: boolean
  // Legacy support fallback tokens
  heading?: string
  subheading?: string
  tagline?: string
  overlayOpacity?: number
  variant?: string
  minHeight?: string
  transparentHeader?: boolean
  heroImageUrl?: string
  highlights?: string[]
  floatingBadge?: { text: string; subtext?: string }
}