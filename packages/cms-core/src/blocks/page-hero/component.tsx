'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import type { PageHeroBlockProps, PageHeroBreadcrumbItem } from './types'

function withLocale(locale: string, href: string): string {
  if (!href || href.startsWith('http') || href.startsWith('#')) return href
  const path = href.startsWith('/') ? href : `/${href}`
  return path.startsWith(`/${locale}/`) || path === `/${locale}` ? path : `/${locale}${path}`
}

function minHeightClass(h: string | undefined): string {
  if (h === 'sm') return 'min-h-[85px] md:min-h-[130px]'
  if (h === 'lg') return 'min-h-[180px] md:min-h-[280px]'
  return 'min-h-[105px] md:min-h-[165px]' 
}

function PageTitleVariant({
  pageTitle,
  showBreadcrumb,
  breadcrumbItems,
}: {
  pageTitle: string
  showBreadcrumb?: boolean | undefined
  breadcrumbItems?: PageHeroBreadcrumbItem[] | undefined
}) {
  const locale = useLocale()
  return (
    <section aria-labelledby="page-title-heading" className="bg-white pt-8 pb-3 md:pt-16 md:pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
        {showBreadcrumb && breadcrumbItems && breadcrumbItems.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-1">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-[var(--color-muted)]">
              {breadcrumbItems.map((item, i) => (
                <li key={i} className="flex items-center gap-1">
                  {i > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
                  {item.href ? (
                    <Link href={withLocale(locale, item.href)} className="hover:text-[var(--color-text)] transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1
          id="page-title-heading"
          className="text-2xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl"
        >
          {pageTitle}
        </h1>
      </div>
    </section>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
}

/* ── Infinite Horizontal Marquee Animation ── */
const marqueeVariants = {
  animate: {
    x: ['0%', '-33.333%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 15, // Slightly faster rotation since the string is a bit shorter
        ease: 'linear',
      },
    },
  },
}

export function PageHeroBlock({
  variant = 'hero',
  heading,
  coloredSubtitle,
  pageTitle,
  showBreadcrumb = false,
  breadcrumbItems,
  textAlignment = 'left',
  minHeight = 'md',
}: PageHeroBlockProps) {
  const locale = useLocale()

  if (variant === 'page-title') {
    return (
      <PageTitleVariant
        pageTitle={pageTitle ?? ''}
        showBreadcrumb={showBreadcrumb}
        breadcrumbItems={breadcrumbItems}
      />
    )
  }

  const mhClass = minHeightClass(minHeight)
  const alignClass = textAlignment === 'center' ? 'text-center items-center' : 'text-left items-start'

  

  return (
    <section
      aria-labelledby="page-hero-heading"
      className={`relative flex w-full flex-col justify-between overflow-hidden ${mhClass} bg-[#2b7bb9] pb-0`}
    >
      {/* Main Content Title Block Area */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-4 pb-3 md:pt-10 md:pb-6 sm:px-6 lg:px-8 z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={fadeUpVariants}
            className={`flex flex-col gap-2 ${alignClass}`}
          >
            {showBreadcrumb && breadcrumbItems && breadcrumbItems.length > 0 && (
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1 text-[11px] md:text-sm text-white/70">
                  {breadcrumbItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-1">
                      {i > 0 && <span aria-hidden="true" className="text-white/40">/</span>}
                      {item.href ? (
                        <Link href={withLocale(locale, item.href)} className="hover:text-white transition-colors duration-150">
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

            {heading && (
              <h1
                id="page-hero-heading"
                className="text-2xl font-bold tracking-tight text-white leading-tight sm:text-3xl md:text-4xl lg:text-5xl"
              >
                {heading}
                {coloredSubtitle && (
                  <>
                    <br />
                    <span className="text-white/90 sm:text-2xl md:text-3xl lg:text-4xl">{coloredSubtitle}</span>
                  </>
                )}
              </h1>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}