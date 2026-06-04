import Image from 'next/image'
import Link from 'next/link'
import type { BusinessLineListBlockProps, BusinessLineItem } from './types'

function resolveImageSide(item: BusinessLineItem, index: number): 'left' | 'right' {
  if (item.imagePosition === 'left') return 'left'
  if (item.imagePosition === 'right') return 'right'
  return index % 2 === 0 ? 'left' : 'right'
}

function AlternatingItem({ item, index }: { item: BusinessLineItem; index: number }) {
  const imgSide = resolveImageSide(item, index)

  const imgEl = item.imageUrl ? (
    <div className="overflow-hidden rounded-2xl lg:col-span-5">
      <Image
        src={item.imageUrl}
        alt={item.imageAlt ?? item.title}
        width={640}
        height={480}
        className="h-full w-full object-cover"
      />
    </div>
  ) : null

  const textEl = (
    <div className="flex flex-col justify-center gap-4 lg:col-span-7">
      {item.eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
          {item.eyebrow}
        </p>
      )}
      <h3 className="text-xl font-bold text-[var(--color-text)] sm:text-2xl">{item.title}</h3>
      {item.description.split('\n').filter(Boolean).map((para, i) => (
        <p key={i} className="text-base leading-relaxed text-[var(--color-muted)]">{para}</p>
      ))}
      {item.features && item.features.length > 0 && (
        <ul className="space-y-2">
          {item.features.map((feat, fi) => (
            <li key={fi} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
              <span aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] flex items-center justify-center text-xs">✓</span>
              {feat.text}
            </li>
          ))}
        </ul>
      )}
      {item.ctaLabel && item.ctaHref && (
        <Link
          href={item.ctaHref}
          className="inline-flex w-fit min-h-[44px] items-center gap-2 rounded-md bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
        >
          {item.ctaLabel}
        </Link>
      )}
    </div>
  )

  return (
    <li className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
      {imgSide === 'left' ? (
        <>
          {imgEl}
          {textEl}
        </>
      ) : (
        <>
          {textEl}
          {imgEl ?? <div className="hidden lg:block lg:col-span-5" />}
        </>
      )}
    </li>
  )
}

function CardItem({ item }: { item: BusinessLineItem }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-neutral-200,#e5e7eb)] bg-[var(--color-surface)] shadow-sm">
      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          alt={item.imageAlt ?? item.title}
          width={400}
          height={240}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {item.eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            {item.eyebrow}
          </p>
        )}
        <h3 className="text-lg font-bold text-[var(--color-text)]">{item.title}</h3>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">{item.description}</p>
        {item.ctaLabel && item.ctaHref && (
          <Link
            href={item.ctaHref}
            className="mt-auto inline-flex min-h-[40px] w-fit items-center gap-1 text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            {item.ctaLabel} →
          </Link>
        )}
      </div>
    </li>
  )
}

function ListItem({ item }: { item: BusinessLineItem }) {
  return (
    <li className="flex flex-col gap-2 border-b border-[var(--color-neutral-100,#f5f5f5)] py-6 last:border-0 sm:flex-row sm:gap-6">
      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          alt={item.imageAlt ?? item.title}
          width={80}
          height={80}
          className="h-16 w-16 shrink-0 rounded-xl object-cover"
        />
      )}
      <div className="flex flex-col gap-2">
        {item.eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            {item.eyebrow}
          </p>
        )}
        <h3 className="text-base font-bold text-[var(--color-text)]">{item.title}</h3>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">{item.description}</p>
        {item.ctaLabel && item.ctaHref && (
          <Link href={item.ctaHref} className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
            {item.ctaLabel} →
          </Link>
        )}
      </div>
    </li>
  )
}

export function BusinessLineListBlock({
  heading,
  intro,
  items,
  displayMode = 'alternating',
}: BusinessLineListBlockProps) {
  if (items.length === 0) return null

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || intro) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl">
                {heading}
              </h2>
            )}
            {intro && (
              <p className="mt-4 mx-auto max-w-2xl text-base text-[var(--color-muted)]">{intro}</p>
            )}
          </div>
        )}

        {displayMode === 'alternating' && (
          <ul className="space-y-16 md:space-y-24">
            {items.map((item, i) => (
              <AlternatingItem key={i} item={item} index={i} />
            ))}
          </ul>
        )}

        {displayMode === 'cards' && (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <CardItem key={i} item={item} />
            ))}
          </ul>
        )}

        {displayMode === 'list' && (
          <ul>
            {items.map((item, i) => (
              <ListItem key={i} item={item} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
