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
        <div className="w-full px-4 pb-4 md:px-6 md:pb-6 lg:px-10 lg:pb-8">
          <div className="relative w-full overflow-hidden bg-bg-secondary rounded-2xl md:rounded-3xl aspect-[3/2] md:h-[calc(100vh-160px)] md:min-h-[500px]">
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
                  sizes="(max-width: 768px) 100vw, 95vw"
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


        </div>

      )}


    </div>
  )
}