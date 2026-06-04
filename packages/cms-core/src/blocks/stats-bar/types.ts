export interface StatsBarItem {
  value: string
  label: string
  icon?: string
}

export interface StatsBarBlockProps {
  blockType?: 'stats-bar'
  items: StatsBarItem[]
  backgroundStyle?: 'brand' | 'dark' | 'light'
  layout?: 'row' | 'grid'
}
