import type { PullQuoteBlockProps } from './types'

export function PullQuoteBlock({
  quote,
  attribution,
  style = 'large',
  alignment = 'center',
}: PullQuoteBlockProps) {
  const alignClass = alignment === 'left' ? 'text-left items-start' : 'text-center items-center'

  const quoteClass =
    style === 'large'
      ? 'text-2xl font-bold leading-snug text-[var(--color-text)] sm:text-3xl'
      : style === 'subtle'
      ? 'text-lg font-medium leading-relaxed text-[var(--color-muted)] italic'
      : 'text-xl font-semibold leading-snug text-[var(--color-text)] sm:text-2xl'

  const wrapperClass =
    style === 'bordered'
      ? 'border-l-4 border-[var(--color-primary)] pl-6'
      : ''

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <blockquote className={`flex flex-col gap-4 ${alignClass}`}>
          <div className={wrapperClass}>
            <p className={quoteClass}>
              {style !== 'subtle' && (
                <span aria-hidden="true" className="mr-1 text-[var(--color-primary)] opacity-50 text-4xl leading-none">"</span>
              )}
              {quote}
              {style !== 'subtle' && (
                <span aria-hidden="true" className="ml-1 text-[var(--color-primary)] opacity-50 text-4xl leading-none">"</span>
              )}
            </p>
          </div>
          {attribution && (
            <footer className="text-sm font-semibold text-[var(--color-muted)]">
              — {attribution}
            </footer>
          )}
        </blockquote>
      </div>
    </section>
  )
}
