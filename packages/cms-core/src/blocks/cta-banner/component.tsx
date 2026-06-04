'use client'
// Client boundary: scroll-triggered fade-up animation

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { MotionStyle } from 'framer-motion'
import { SectionEyebrow } from '../../components/ui'
import { fadeInUp } from '../../lib/motion'
import type {
  CTABannerBlockProps,
  CTABannerVariant,
  CTABannerBackgroundStyle,
} from './types'

function resolveCardStyle(
  variant: CTABannerVariant,
  backgroundStyle: CTABannerBackgroundStyle,
  backgroundImageUrl?: string,
): MotionStyle {
  if (variant === 'image' && backgroundImageUrl) {
    return {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('${backgroundImageUrl}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }
  if (variant === 'gradient' || backgroundStyle === 'brand') {
    return {
      backgroundImage: `linear-gradient(to bottom right, var(--color-primary), color-mix(in srgb, var(--color-primary) 60%, black))`,
    }
  }
  return {}
}

function resolveSectionBg(
  variant: CTABannerVariant,
  backgroundStyle: CTABannerBackgroundStyle,
): string {
  if (variant === 'image') return ''
  if (variant === 'gradient' || backgroundStyle === 'brand') return ''
  if (backgroundStyle === 'dark') return 'bg-[var(--color-neutral-900)]'
  if (backgroundStyle === 'light') return 'bg-[var(--color-neutral-100,#f5f5f5)]'
  if (variant === 'solid') return 'bg-[var(--color-primary)]'
  return ''
}

export function CTABannerBlock({
  eyebrow,
  heading,
  body,
  primaryButton,
  primaryButtonVariant = 'solid',
  secondaryButton,
  secondaryButtonVariant = 'outline',
  variant = 'gradient',
  backgroundStyle = 'brand',
  backgroundImageUrl,
  layout = 'centered',
}: CTABannerBlockProps) {
  const cardStyle = resolveCardStyle(variant, backgroundStyle, backgroundImageUrl)
  const sectionBg = resolveSectionBg(variant, backgroundStyle)
  const isDark = backgroundStyle !== 'light'
  const textColor = isDark ? 'text-white' : 'text-[var(--color-neutral-900)]'
  const subtextColor = isDark ? 'text-white/80' : 'text-[var(--color-muted)]'
  const eyebrowColor = isDark ? 'text-white/70' : 'text-[var(--color-primary)]'

  const isSplit = layout === 'split'
  const contentAlign = isSplit
    ? 'flex-col md:flex-row md:items-center md:justify-between text-left'
    : 'flex-col items-center text-center'

  function primaryBtnClass(): string {
    if (primaryButtonVariant === 'outline') {
      return 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border-2 border-white bg-transparent px-7 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
    }
    return isDark
      ? 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-white px-7 py-3.5 text-base font-semibold text-[var(--color-primary)] transition-opacity duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
      : 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[var(--color-primary)] px-7 py-3.5 text-base font-semibold text-white transition-opacity duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]'
  }

  function secondaryBtnClass(): string {
    if (secondaryButtonVariant === 'solid') {
      return 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[var(--color-primary)] px-7 py-3.5 text-base font-semibold text-white transition-opacity duration-150 hover:opacity-90'
    }
    return 'inline-flex min-h-[44px] items-center justify-center gap-1 px-7 py-3.5 text-base font-semibold text-white transition-opacity duration-150 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
  }

  return (
    <section className={`py-16 md:py-20 ${sectionBg}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={cardStyle}
          className="rounded-3xl p-10 md:p-16"
        >
          <div className={`flex gap-8 ${contentAlign}`}>
            <div className={isSplit ? 'max-w-xl' : 'max-w-2xl'}>
              {eyebrow && (
                <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${eyebrowColor}`}>
                  {eyebrow}
                </p>
              )}
              <h2 className={`text-3xl font-bold md:text-4xl ${textColor}`}>{heading}</h2>
              {body && (
                <p className={`mt-4 text-lg leading-relaxed ${subtextColor}`}>{body}</p>
              )}
            </div>

            {(primaryButton.label || secondaryButton) && (
              <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row md:items-start">
                {primaryButton.label && (
                  <Link href={primaryButton.href} className={primaryBtnClass()}>
                    {primaryButton.label}
                  </Link>
                )}
                {secondaryButton && (
                  <Link href={secondaryButton.href} className={secondaryBtnClass()}>
                    {secondaryButton.label}
                    {secondaryButtonVariant === 'outline' && (
                      <span aria-hidden="true" className="text-lg">→</span>
                    )}
                  </Link>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
