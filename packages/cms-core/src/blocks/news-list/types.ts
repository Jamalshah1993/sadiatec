export interface NewsItem {
  date: string
  category?: string
  headline: string
  href: string
}

export interface NewsListBlockProps {
  blockType?: 'news-list'
  eyebrow?: string
  heading?: string
  intro?: string
  items: NewsItem[]
  viewAllCta?: { label: string; href: string }
  locale?: string
}
