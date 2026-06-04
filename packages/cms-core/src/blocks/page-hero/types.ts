export interface PageHeroBreadcrumbItem {
  label: string
  href?: string
}

export interface PageHeroBlockProps {
  blockType?: 'page-hero'
  title: string
  subtitle?: string
  backgroundImageUrl?: string
  overlayOpacity?: number
  overlayColor?: 'black' | 'brand' | 'none'
  showBreadcrumb?: boolean
  breadcrumbItems?: PageHeroBreadcrumbItem[]
  textAlignment?: 'left' | 'center'
  minHeight?: 'sm' | 'md' | 'lg'
}
