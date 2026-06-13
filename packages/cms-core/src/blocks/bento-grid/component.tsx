'use client'

import { motion } from 'framer-motion'
import { SectionEyebrow } from '../../components/ui'
import { staggerContainer, fadeInUp } from '../../lib/motion'
import type { BentoGridBlockProps, BentoGridItem, BentoLayout } from './types'

interface BentoCardProps {
  item: BentoGridItem
  index: number
  layout: BentoLayout
}

function BentoCard({ item, index, layout }: BentoCardProps) {
  const isFeatured = layout === 'asymmetric' && index === 0

  return (
    <motion.article
      variants={fadeInUp}
      className={[
        'relative text-left transition-all duration-300',
        isFeatured 
          ? 'border-l-[3px] border-brand-primary pl-8 py-2 max-w-2xl' 
          : 'py-1 flex flex-col justify-start'
      ].join(' ')}
    >
      {/* ── Oversized Crisp Accent Numeral ── */}
      <span
        className="block text-[64px] font-bold tracking-tight text-brand-primary/10 leading-none mb-3 font-sans"
        aria-hidden="true"
      >
        {item.number}
      </span>

      {/* ── Clean Header ── */}
      <h3 className="text-[17px] font-bold tracking-tight text-text-primary md:text-[19px]">
        {item.title}
      </h3>

      {/* ── High-Legibility Description Block ── */}
      {item.description && (
        <p className="mt-3 text-[13px] md:text-[14px] leading-relaxed text-text-muted font-normal tracking-wide max-w-xl">
          {item.description}
        </p>
      )}
    </motion.article>
  )
}

export function BentoGridBlock({
  eyebrow,
  heading,
  intro,
  items,
  layout = 'asymmetric',
  // Dynamic background style token mapped directly from types / block configurations
  bgVariant = 'tertiary', 
}: BentoGridBlockProps & { bgVariant?: 'primary' | 'secondary' | 'white' | 'tertiary' }) {
  if (!items || items.length === 0) return null

  // Clean lookup dictionary map referencing your semantic CSS tokens
  const bgStyleMap = {
    primary: 'bg-bg-primary',
    secondary: 'bg-bg-secondary',
    white: 'bg-white',
    tertiary:  'bg-bg-tertiary',
  }

  const featuredItem = items[0]
  const restItems = layout === 'asymmetric' ? items.slice(1) : items

  return (
    /* ⚡ DYNAMIC LIGHT BACKGROUND: Utilizes structural config variant tokens instead of hardcoded white */
    <section className={`pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden ${bgStyleMap[bgVariant]}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">

        {/* ── Centered Strategic Minimalist Header Section ── */}
        <div className="mx-auto mb-12 md:mb-14 max-w-3xl text-center">
          {eyebrow && (
            <div className="mb-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                {eyebrow}
              </span>
            </div>
          )}
          <h2 className="text-3xl md:text-[40px] font-bold tracking-tight text-text-primary leading-[1.2]">
            {heading}
          </h2>
          {intro && (
            <p className="mx-auto mt-3 max-w-2xl text-[14px] md:text-[15px] leading-relaxed text-text-muted font-normal">
              {intro}
            </p>
          )}
        </div>

        {/* ── Structural Distribution Grid ── */}
        {layout === 'asymmetric' && featuredItem ? (
          <div className="space-y-12">
            
            {/* Row 1: Featured Card */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="lg:pl-12"
            >
              <BentoCard item={featuredItem} index={0} layout={layout} />
            </motion.div>

            {/* Row 2: Secondary Content Matrix Array */}
            {restItems.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 lg:pl-12"
              >
                {restItems.map((item, i) => (
                  <BentoCard
                    key={item.number || i + 1}
                    item={item}
                    index={i + 1}
                    layout={layout}
                  />
                ))}
              </motion.div>
            )}

          </div>
        ) : (
          /* Uniform standard grid layout fallback block */
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12"
          >
            {items.map((item, i) => (
              <BentoCard key={item.number || i} item={item} index={i} layout={layout} />
            ))}
          </motion.div>
        )}
        
      </div>
    </section>
  )
}