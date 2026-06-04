export interface SubNavItem {
  label: string
  href: string
}

export interface InternalSubNavBlockProps {
  blockType?: 'internal-sub-nav'
  items: SubNavItem[]
  style?: 'tabs' | 'pills' | 'underline'
  stickyOnScroll?: boolean
}
