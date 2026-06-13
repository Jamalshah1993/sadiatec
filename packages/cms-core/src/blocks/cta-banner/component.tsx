'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, PhoneCall, ArrowRight, MessageSquare } from 'lucide-react'
import { fadeInUp } from '../../lib/motion'
import type { CTABannerBlockProps } from './types'

export function CTABannerBlock({
  eyebrow = 'Contact',
  heading = 'inquiry',
  body,
  primaryButton,
}: CTABannerBlockProps) {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">

        {/* Outer wrapper — relative for the overlapping card */}
        <div className="relative flex items-center">

          {/* ── LEFT: Main visual card (~60% width) ── */}
          <div className="w-full lg:w-[62%] min-h-[320px] lg:min-h-[380px]
                          bg-brand-primary relative overflow-hidden
                          flex items-center">

            {/* Background pattern — subtle grid lines */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-white"
                  style={{ left: `${(i + 1) * 16.66}%` }}
                />
              ))}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 h-px bg-white"
                  style={{ top: `${(i + 1) * 25}%` }}
                />
              ))}
            </div>

            {/* Large decorative icon — left side */}
            <div className="relative z-10 flex items-center 
                            justify-center gap-10 lg:gap-16 
                            w-full px-12 md:px-20">
              
              {/* Mail icon box */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 md:h-24 md:w-24 
                                items-center justify-center 
                                bg-white/10 border border-white/20
                                text-white backdrop-blur-sm">
                  <Mail className="w-9 h-9 md:w-11 md:h-11" 
                        strokeWidth={1.2} />
                </div>
                <span className="text-white/70 text-xs font-medium 
                                 tracking-widest uppercase">
                  Email
                </span>
              </div>

              {/* Divider */}
              <div className="h-16 w-px bg-white/20 hidden sm:block" />

              {/* Phone icon box */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 md:h-24 md:w-24 
                                items-center justify-center 
                                bg-white/10 border border-white/20
                                text-white backdrop-blur-sm">
                  <PhoneCall className="w-9 h-9 md:w-11 md:h-11" 
                              strokeWidth={1.2} />
                </div>
                <span className="text-white/70 text-xs font-medium 
                                 tracking-widest uppercase">
                  Phone
                </span>
              </div>

              {/* Divider */}
              <div className="h-16 w-px bg-white/20 hidden sm:block" />

              {/* Chat icon box */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 md:h-24 md:w-24 
                                items-center justify-center 
                                bg-white/10 border border-white/20
                                text-white backdrop-blur-sm">
                  <MessageSquare className="w-9 h-9 md:w-11 md:h-11" 
                                  strokeWidth={1.2} />
                </div>
                <span className="text-white/70 text-xs font-medium 
                                 tracking-widest uppercase">
                  Chat
                </span>
              </div>

            </div>

            {/* Bottom brand strip */}
            <div className="absolute bottom-0 left-0 right-0 h-1 
                            bg-brand-primary-dark" />
          </div>

          {/* ── RIGHT: Floating overlap card ── */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="relative z-20
                       lg:absolute lg:right-0
                       lg:w-[45%]
                       mt-0 lg:mt-0
                       self-stretch lg:self-auto"
          >
            <div className="bg-bg-tertiary border border-border-default
                            shadow-xl h-full lg:h-auto
                            p-8 md:p-12 lg:p-14
                            flex flex-col justify-center
                            lg:min-h-[340px]">

              {/* Eyebrow */}
              {eyebrow && (
                <p className="text-xs font-bold tracking-widest uppercase
                              text-brand-primary mb-3">
                  {eyebrow}
                </p>
              )}

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-extrabold 
                             tracking-tight text-text-primary 
                             leading-tight">
                {heading}
              </h2>

              {/* Accent line */}
              <div className="mt-4 mb-5 h-0.5 w-10 bg-brand-primary" />

              {/* Body */}
              {body && (
                <p className="text-sm md:text-base leading-relaxed 
                              text-text-secondary">
                  {body}
                </p>
              )}

              {/* CTA Button */}
              {primaryButton?.label && (
                <div className="mt-8">
                  <Link
                    href={primaryButton.href}
                    className="inline-flex items-center gap-2
                               bg-brand-primary text-white
                               text-sm font-semibold
                               px-6 py-3
                               hover:bg-brand-primary-dark
                               transition-colors duration-200
                               group"
                  >
                    <span>{primaryButton.label}</span>
                    <ArrowRight 
                      size={15} 
                      className="transition-transform duration-200 
                                 group-hover:translate-x-1" 
                    />
                  </Link>
                </div>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}