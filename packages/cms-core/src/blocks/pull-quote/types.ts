export interface PullQuoteBlockProps {
  blockType?: 'pull-quote'
  quote: string
  attribution?: string
  style?: 'large' | 'subtle' | 'bordered'
  alignment?: 'left' | 'center'
}
