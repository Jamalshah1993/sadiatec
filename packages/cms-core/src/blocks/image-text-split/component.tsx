import Link from 'next/link'
import Image from 'next/image'
import type { ImageTextSplitBlockProps } from './types'

const bgMap: Record<string, string> = {
  white: 'bg-white',
  light: 'bg-[var(--color-neutral-50,#fafafa)]',
  dark: 'bg-[var(--color-neutral-900)]',
}

const textColorMap: Record<string, string> = {
  white: 'text-[var(--color-text)]',
  light: 'text-[var(--color-text)]',
  dark: 'text-white',
}

const splitColsMap: Record<string, { image: string; text: string }> = {
  '40/60': { image: 'lg:col-span-5', text: 'lg:col-span-7' },
  '50/50': { image: 'lg:col-span-6', text: 'lg:col-span-6' },
  '60/40': { image: 'lg:col-span-7', text: 'lg:col-span-5' },
}

export function ImageTextSplitBlock({
  imageUrl,
  imageAlt,
  imagePosition = 'left',
  eyebrow,
  heading,
  body,
  primaryButtonLabel,
  primaryButtonHref,
  imageSplit = '50/50',
  backgroundStyle = 'white',
  verticalAlign = 'center',
}: ImageTextSplitBlockProps) {
  const bg = bgMap[backgroundStyle] ?? bgMap['white']
  const textColor = textColorMap[backgroundStyle] ?? textColorMap['white']
  const isDark = backgroundStyle === 'dark'
  const cols = splitColsMap[imageSplit] ?? { image: 'lg:col-span-6', text: 'lg:col-span-6' }
  const alignItems = verticalAlign === 'top' ? 'items-start' : 'items-center'

  const imageCol = (
    <div className={`${cols.image} overflow-hidden rounded-2xl`}>
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={800}
        height={600}
        className="h-full w-full object-cover"
      />
    </div>
  )

  const textCol = (
    <div className={`${cols.text} flex flex-col justify-center gap-5 ${textColor}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{heading}</h2>
      <p className={`text-base leading-relaxed ${isDark ? 'text-white/80' : 'text-[var(--color-muted)]'}`}>
        {body}
      </p>
      {primaryButtonLabel && primaryButtonHref && (
        <Link
          href={primaryButtonHref}
          className="inline-flex w-fit min-h-[44px] items-center gap-2 rounded-md bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
        >
          {primaryButtonLabel}
        </Link>
      )}
    </div>
  )

  return (
    <section className={`py-16 md:py-24 ${bg}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 gap-10 lg:grid-cols-12 ${alignItems}`}>
          {imagePosition === 'left' ? (
            <>
              {imageCol}
              {textCol}
            </>
          ) : (
            <>
              {textCol}
              {imageCol}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
