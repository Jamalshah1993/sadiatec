import type { PullQuoteBlockProps } from './types'

export function adaptPullQuoteBlock(raw: unknown): PullQuoteBlockProps {
  const data = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>

  const rawStyle = data['style']
  const style: PullQuoteBlockProps['style'] =
    rawStyle === 'large' || rawStyle === 'subtle' || rawStyle === 'bordered' ? rawStyle : 'large'

  const rawAlign = data['alignment']
  const alignment: PullQuoteBlockProps['alignment'] =
    rawAlign === 'left' || rawAlign === 'center' ? rawAlign : 'center'

  return {
    quote: typeof data['quote'] === 'string' ? data['quote'] : '',
    style,
    alignment,
    ...(typeof data['attribution'] === 'string' && data['attribution'] ? { attribution: data['attribution'] } : {}),
  }
}
