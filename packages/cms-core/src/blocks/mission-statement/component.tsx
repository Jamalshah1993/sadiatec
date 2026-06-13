'use client' // Required for Framer Motion interactive execution hooks

import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '../../lib/motion' // Reusing your existing motion presets
import type { MissionStatementBlockProps, MissionPhotoSize } from './types'

// Compact image sizing maps to match the design reference
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
    <section className="relative w-full overflow-hidden bg-white py-16 px-6 md:py-20 md:px-12 lg:px-20">

      {/* ── Premium Ambient Background Blurs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-10 w-72 h-72 rounded-full bg-teal-100/40 mix-blend-multiply filter blur-3xl opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-100/40 mix-blend-multiply filter blur-3xl opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-orange-100/30 mix-blend-multiply filter blur-3xl opacity-50"
      />

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* ── Two-Column Header Layout (Animated) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-14 md:mb-20">

          {/* Left Side: Dynamic Headline split by Quote Marks */}
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <h2 className="text-4xl md:text-5xl lg:text-[45px] font-bold text-gray-900 tracking-tight leading-[1.2]">
              {quotedText && <span className="block mb-1">{quotedText}</span>}
              <span className="block text-gray-800">{remainingText}</span>
            </h2>
          </motion.div>

          {/* Right Column: Dynamic Description */}
          {body && (
            <motion.div variants={fadeInUp} className="lg:col-span-5 pt-2 lg:pt-35">
              <p className="text-sm md:text-[23px] text-gray-600 font-normal leading-[1.65]">
                {body}
              </p>
            </motion.div>
          )}

        </div>

        {/* ── Bottom Section: Axis Aligned Small Card Gallery (Animated and Staggered) ── */}
        {photos && photos.length > 0 && (
          <motion.div 
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center lg:justify-between gap-4 md:gap-5 lg:gap-6 pt-15"
          >
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className={`relative rounded-[20px] md:rounded-[24px] overflow-hidden shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-slate-100 shrink-0 ${sizeMap[photo.size]}`}
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.alt || 'Gallery Presentation Image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, 25vw"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

      </motion.div>
    </section>
  )
}