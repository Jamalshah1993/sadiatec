'use client'
// Client boundary: scroll-triggered stagger animation via Framer Motion whileInView

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionEyebrow } from '../../components/ui'
import { staggerContainer, fadeInUp } from '../../lib/motion'
import type { NewsListBlockProps, NewsItem } from './types'

function formatNewsDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

function NewsItemRow({ item }: { item: NewsItem }) {
  return (
    <motion.li variants={fadeInUp}>
      <Link
        href={item.href}
        className="group flex flex-col gap-1 border-b border-(--color-neutral-200) py-4 sm:flex-row sm:items-start sm:gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
      >
        {/* Date */}
        <span className="w-28 shrink-0 tabular-nums text-sm text-(--color-muted)">
          {formatNewsDate(item.date)}
        </span>

        {/* Category badge */}
        {item.category && (
          <span className="inline-flex shrink-0 items-center rounded bg-(--color-surface) px-2 py-1 text-xs font-semibold uppercase tracking-wider text-(--color-primary)">
            {item.category}
          </span>
        )}

        {/* Headline */}
        <span className="flex-1 text-base font-medium text-(--color-text) group-hover:text-(--color-primary) transition-colors duration-150">
          {item.headline}
        </span>
      </Link>
    </motion.li>
  )
}

export function NewsListBlock({
  eyebrow,
  heading,
  intro,
  items,
  viewAllCta,
}: NewsListBlockProps) {
  if (items.length === 0) return null

  return (
    <section aria-labelledby="news-list-heading" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
            {heading && (
              <h2
                id="news-list-heading"
                className="mt-3 text-3xl font-bold text-(--color-text) md:text-4xl"
              >
                {heading}
              </h2>
            )}
            {intro && (
              <p className="mt-2 text-base text-(--color-muted)">{intro}</p>
            )}
          </div>
          {viewAllCta && (
            <Link
              href={viewAllCta.href}
              className="shrink-0 text-sm font-semibold text-(--color-primary) hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
            >
              {viewAllCta.label}
            </Link>
          )}
        </div>

        {/* News list */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          role="list"
          className="divide-y-0"
        >
          {items.map((item, i) => (
            <NewsItemRow key={i} item={item} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
