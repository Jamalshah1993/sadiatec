export interface HoursRow {
  days: string
  time: string
}

export interface MapEmbedBlockProps {
  blockType?: 'map-embed'
  heading?: string
  embedUrl: string
  address: string
  phone?: string
  email?: string
  hours?: HoursRow[]
  mapHeight?: 'sm' | 'md' | 'lg'
  layout?: 'map-left' | 'map-right' | 'map-top'
  labelAddress?: string
  labelPhone?: string
  labelEmail?: string
  labelHours?: string
}
