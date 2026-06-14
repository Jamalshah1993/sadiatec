'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '../../lib/motion'
import type { MissionStatementBlockProps, MissionPhotoSize } from './types'

const sizeMap: Record<MissionPhotoSize, string> = {
  small: 'h-[90px] md:h-[110px] lg:h-[130px] w-[130px] md:w-[160px] lg:w-[190px]',
  medium: 'h-[130px] md:h-[150px] lg:h-[180px] w-[180px] md:w-[210px] lg:w-[250px]',
  large: 'h-[170px] md:h-[200px] lg:h-[220px] w-[240px] md:w-[280px] lg:w-[310px]',
}

export function MissionStatementBlock({ heading, body, photos }: MissionStatementBlockProps) {
  const parts = heading ? heading.split('"') : []
  const quotedText = parts[1] ? `"${parts[1]}"` : ''
  const remainingText = parts[2] ? parts[2].trim() : heading

  return (
    <section className="relative w-full overflow-hidden bg-[#FAFAFA] py-16 px-6 md:py-24 md:px-12 lg:px-20">

      {/* ── Premium Global Ambient Background Blurs ── */}
      
      {/* 1. NEW: Top Left Pure Light Sky Blue Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 w-96 h-96 rounded-full bg-sky-400/20 mix-blend-multiply filter blur-[110px]"
      />

      {/* 2. Central Soft Blue/Indigo Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[35%] left-[45%] -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-sky-200/25 filter blur-[120px]"
      />

      {/* 3. Mid-Right Giant Pink/Lavender Soft Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[20%] -right-20 w-[600px] h-[600px] rounded-full bg-rose-200/20 filter blur-[140px]"
      />

      {/* 4. Bottom Right Deep Pink Accent Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-10 w-96 h-96 rounded-full bg-pink-300/15 filter blur-[90px]"
      />


      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* ── Two-Column Header Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-16 md:mb-28">
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <h2 className="text-3xl md:text-5xl lg:text-[46px] font-bold text-gray-900 tracking-tight leading-[1.2]">
              {quotedText && <span className="block mb-1">{quotedText}</span>}
              <span className="block text-gray-800">{remainingText}</span>
            </h2>
          </motion.div>

          {body && (
            <motion.div variants={fadeInUp} className="lg:col-span-5 pt-2 lg:pt-40">
              <p className="text-sm md:text-[20px] text-gray-600 font-normal leading-[1.7]">
                {body}
              </p>
            </motion.div>
          )}
        </div>

        {/* ── Bottom Section: Staggered Floating Gallery ── */}
        {photos && photos.length > 0 && (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="
              relative mt-12 pt-4 w-full
              grid grid-cols-2 gap-x-4 gap-y-12 
              md:flex md:flex-wrap md:items-end md:justify-center lg:justify-between md:gap-5 lg:gap-6 md:pt-15
            "
          >
            {photos.map((photo, i) => {
              // Updated micro-flares to match the new sky blue theme anchor
              const microGlows = [
                'bg-sky-400/35 -bottom-6 -left-6 w-20 h-20 filter blur-xl',     // Photo 1: Light Sky Blue flare
                'bg-pink-400/25 -top-8 left-1/2 w-24 h-24 filter blur-2xl',       // Photo 2: Soft pink balance
                'bg-amber-400/45 -top-6 -right-4 w-20 h-20 filter blur-xl',      // Photo 3: Soft warm gold accent
                ''                                                               // Photo 4: Neutral
              ]

              return (
                <div key={i} className="relative shrink-0">
                  {microGlows[i % microGlows.length] && (
                    <div 
                      aria-hidden="true" 
                      className={`absolute pointer-events-none rounded-full mix-blend-multiply ${microGlows[i % microGlows.length]}`}
                    />
                  )}

                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.04, y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    className={`
                      relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm bg-slate-50 z-10
                      ${sizeMap[photo.size]}
                      
                      /* Structural Offsets */
                      ${i === 0 ? 'justify-self-start mt-12 md:mt-16' : ''}
                      ${i === 1 ? 'justify-self-end mt-0' : ''}
                      ${i === 2 ? 'justify-self-start mt-8 md:mt-4' : ''}
                      ${i === 3 ? 'justify-self-end mt-0 md:mt-12' : ''}
                      
                      md:justify-self-auto
                    `}
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={photo.alt || 'Gallery Presentation Image'}
                      fill
                      className="object-cover pointer-events-none"
                      sizes="(max-width: 768px) 45vw, 25vw"
                    />
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        )}

      </motion.div>
    </section>
  )
}