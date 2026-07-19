'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { HeroBlockProps, SideCard, PromoCard } from './types'

function withLocale(locale: string, href: string): string {
  if (!href || href.startsWith('http') || href.startsWith('#')) return href
  const path = href.startsWith('/') ? href : `/${href}`
  return path.startsWith(`/${locale}/`) || path === `/${locale}` ? path : `/${locale}${path}`
}


export function HeroBlock({
  eyebrow,
  headline,
  subheadline,
  heading,
  heroSlides,
  backgroundImageUrl,
  heroImageUrl,
  sideCards,
  promoCards,
}: HeroBlockProps & {
  locale?: string
}) {
  const [current, setCurrent] = useState(0)

  const resolvedHeadline = headline ?? heading ?? ''
  const resolvedBgImage = backgroundImageUrl ?? heroImageUrl

  const slides = heroSlides?.length
    ? heroSlides
    : resolvedBgImage
      ? [{ imageUrl: resolvedBgImage, alt: '', title: '', subtitle: '' }]
      : []

  const total = slides.length

  useEffect(() => {
    if (total <= 1) return
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % total)
    }, 5000)
    return () => clearInterval(id)
  }, [total])

  const crossFadeVariants = {
    enter: { opacity: 0, scale: 1.05 },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 1.4, ease: [0.25, 1, 0.5, 1] },
        scale: { duration: 1.6, ease: [0.25, 1, 0.5, 1] },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      transition: {
        opacity: { duration: 1.0, ease: 'linear' },
        scale: { duration: 1.4, ease: [0.25, 1, 0.5, 1] },
      },
    },
  }

  const locale = useLocale()

  // Placeholder side cards — replace with real CMS content
  const defaultCards: SideCard[] = [
    {
      title: 'Seminar',
      description: 'Watch our free seminar on system reforms and case studies, at your convenience.',
      ctaLabel: 'Watch the seminar',
      ctaHref: '#',
    },
    {
      title: 'Useful Resources',
      description: 'A document packed with tips for accepting and utilizing foreign talent is available for free.',
      ctaLabel: 'View helpful resources',
      ctaHref: '#',
    },
    {
      title: 'Consultation / Inquiry',
      description: "We will provide proposals tailored to your company's challenges.",
      ctaLabel: 'For inquiries,click here',
      ctaHref: '#',
    },
  ]

  const cards = sideCards?.length ? sideCards : defaultCards

  // Placeholder promo card content — replace with real CMS content later
  const defaultPromoCards: PromoCard[] = [
    {
      avatarUrl: '/card1.png', // swap with your actual asset path
      avatarPosition: 'left',
      headline: 'Introducing Foreign Talent',
      subheadline: 'Japanese communication support included!Japanese communication support included!',
      highlight: 'Reliable Onboarding Support',
      ctaHref: '#',
    },
    {
      avatarUrl: '/card2.png',
      avatarPosition: 'left',
      headline: 'System Reforms Explained Simply',
      subheadline: 'Includes real case studies',
      highlight: 'Watch Now',
      ctaHref: '#',
    },
    {
      avatarUrl: '/card3.png',
      avatarPosition: 'left',
      headline: 'Proposals Tailored to Your Needs',
      subheadline: 'Feel free to reach out anytime',
      highlight: 'Contact Us',
      ctaHref: '#',
    },
  ]

  const resolvedPromoCards = promoCards?.length ? promoCards : defaultPromoCards

  return (
    <div aria-label="Hero" role="region" className="flex flex-col bg-white overflow-hidden">
      {slides.length > 0 && (
        <div className="w-full pb-4 md:pb-6 lg:pb-8">
          <div className="flex flex-col lg:flex-row w-full">
            {/* LEFT 80%: Image Slider */}
            <div className="relative w-full lg:w-[80%] overflow-hidden bg-bg-secondary aspect-[3/2] lg:aspect-auto lg:h-[calc(100vh-280px)] lg:min-h-[420px]">
              <AnimatePresence initial={true} mode="popLayout">
                <motion.div
                  key={current}
                  variants={crossFadeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={slides[current]?.imageUrl || ''}
                    alt={slides[current]?.alt || ''}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 1024px) 100vw, 80vw"
                  />
                  <div className="absolute inset-0 bg-black/20 p-8 sm:p-12 md:p-16 text-left">
                    {current !== slides.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 md:bottom-16 md:left-16 max-w-3xl space-y-4 text-white"
                      >
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tight drop-shadow-md">
                          {resolvedHeadline}
                        </h1>
                        {subheadline && (
                          <div className="mt-2">
                            <span
                              className="text-white text-[15px] md:text-xl font-bold leading-relaxed px-3 py-1 rounded-md"
                              style={{ backgroundColor: 'rgba(56, 189, 248, 0.9)' }}
                            >
                              {subheadline}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    )}
                    {(slides[current]?.title || slides[current]?.subtitle) && (
                      <div className="absolute top-3 right-8 sm:top-3 sm:right-10 md:top-3 md:right-10 max-w-2xl text-white">
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                          className="space-y-2"
                        >
                          {slides[current].title && (
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                              {slides[current].title}
                            </h2>
                          )}
                          {slides[current].subtitle && (
                            <p className="text-sm sm:text-base md:text-lg text-white/90 font-normal leading-relaxed">
                              {slides[current].subtitle}
                            </p>
                          )}
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT 20% on desktop / OVERLAPPING BELOW on mobile: Cards */}
            <div className="relative z-10 -mt-3 sm:-mt-4 w-full lg:mt-0 lg:w-[20%] bg-transparent lg:bg-primary grid grid-cols-3 gap-2 px-4 sm:px-6 lg:px-3 lg:p-3 lg:flex lg:flex-col lg:gap-3 lg:h-[calc(100vh-280px)] lg:min-h-[420px]">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center text-center gap-1.5 md:gap-2 shadow-lg min-h-[110px] sm:min-h-[130px] lg:min-h-0 lg:flex-1"
                >
                  <h3 className="font-bold text-[11px] md:text-base leading-tight">{card.title}</h3>
                  <p className="hidden md:block text-xs text-gray-600 leading-relaxed">
                    {card.description}
                  </p>

                  <Link
                    href={withLocale(locale, card.ctaHref)}
                    className="mt-1 bg-brand-accent hover:bg-brand-accent-hover text-white text-[9px] md:text-xs font-semibold px-2 md:px-4 py-1 md:py-2 rounded-full transition-colors leading-tight"
                  >
                    {card.ctaLabel}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Promo Cards Section */}
      <div className="w-full px-6 md:px-12 lg:px-20 pb-8">
        {/* Changed grid-cols-1 md:grid-cols-3 to grid-cols-1 lg:grid-cols-3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {resolvedPromoCards.map((card, i) => (
            <div
              key={i}
              className="relative flex items-start rounded-xl overflow-hidden p-3 md:p-4 gap-3 min-h-[120px] md:min-h-[140px] bg-brand-accent"
            >
              {/* Avatar - left position */}
              {card.avatarUrl && card.avatarPosition !== 'right' && (
                <div className="flex-shrink-0 w-16 h-16 md:w-25 md:h-30 relative">
                  <Image
                    src={card.avatarUrl}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              {/* Text content */}
              <div className="flex-1 min-w-0 text-white">
                {card.badge && (
                  <span className="inline-block bg-white/15 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1">
                    {card.badge}
                  </span>
                )}
                <h3 className="text-sm md:text-base font-extrabold leading-tight">
                  {card.headline}
                </h3>
                {card.subheadline && (
                  <p className="text-xs md:text-sm text-white/90 font-medium leading-snug mt-0.5">
                    {card.subheadline}
                  </p>
                )}
                {card.highlight && (
                  <p className="text-sm md:text-base font-extrabold mt-1" style={{ color: 'var(--brand-accent, #ffd23f)' }}>
                    {card.highlight}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}