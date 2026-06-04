import Link from 'next/link'
import type { PageHeroBlockProps } from './types'

const minHeightMap: Record<string, string> = {
  sm: 'min-h-[240px]',
  md: 'min-h-[360px]',
  lg: 'min-h-[480px]',
}

const overlayColorMap: Record<string, string> = {
  black: 'bg-black',
  brand: 'bg-[var(--color-primary)]',
  none: '',
}

export function PageHeroBlock({
  title,
  subtitle,
  backgroundImageUrl,
  overlayOpacity = 50,
  overlayColor = 'black',
  showBreadcrumb = true,
  breadcrumbItems,
  textAlignment = 'center',
  minHeight = 'md',
}: PageHeroBlockProps) {
  const minHeightClass = minHeightMap[minHeight] ?? minHeightMap['md']
  const overlayClass = overlayColorMap[overlayColor] ?? overlayColorMap['black']
  const overlayStyle = overlayColor !== 'none' ? { opacity: overlayOpacity / 100 } : {}
  const alignClass = textAlignment === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <section
      aria-labelledby="page-hero-heading"
      className={`relative flex w-full flex-col justify-end overflow-hidden ${minHeightClass} bg-[var(--color-neutral-900)]`}
    >
      {backgroundImageUrl && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
        />
      )}

      {overlayColor !== 'none' && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${overlayClass}`}
          style={overlayStyle}
        />
      )}

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        <div className={`flex flex-col gap-3 ${alignClass}`}>
          {showBreadcrumb && breadcrumbItems && breadcrumbItems.length > 0 && (
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
                {breadcrumbItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-1">
                    {i > 0 && <span aria-hidden="true" className="text-white/40">/</span>}
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="hover:text-white transition-colors duration-150"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-white/90">{item.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <h1
            id="page-hero-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {title}
          </h1>

          {subtitle && (
            <p className="max-w-2xl text-base text-white/80 md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
