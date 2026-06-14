'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { CEOMessageBlockProps } from './types'

const bgMap: Record<string, string> = {
  white: 'bg-white',
  light: 'bg-[var(--color-neutral-50,#fafafa)]',
  black: 'bg-brand-dark',
}

const containerVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
}

export function CEOMessageBlock({
  portraitUrl,
  portraitAlt,
  name,
  title,
  message,
  signatureUrl,
  portraitPosition = 'left',
  backgroundStyle = 'white',
}: CEOMessageBlockProps) {
  const bg = bgMap[backgroundStyle] ?? bgMap['white']
  const isDarkBg = backgroundStyle === 'black'
  
  // Color configuration mapping
  const textColor = isDarkBg ? 'text-white/80' : 'text-[#555555]'
  const headingColor = isDarkBg ? 'text-white' : 'text-[#223344]'
  const nameColor = isDarkBg ? 'text-white/90' : 'text-[#333333]'
  const subtitleColor = isDarkBg ? 'text-neutral-400' : 'text-neutral-500'

  // 🛠️ CHANGED: Restored round profile avatar mask frame (`rounded-full`)
  const portraitEl = (
    <div className="w-full md:w-[38%] flex-shrink-0 flex flex-col items-center">
      <div className={`relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full shadow-md border ${
        isDarkBg ? 'border-white/10' : 'border-neutral-200'
      }`}>
        <Image
          src={portraitUrl}
          alt={portraitAlt}
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <p className={`text-[11px] mt-4 text-center font-medium tracking-wide uppercase ${subtitleColor}`}>
        {name} &amp; {title}
      </p>
    </div>
  )

  const textEl = (
    <div className="flex flex-1 flex-col justify-start text-left pt-2">
      {/* Blue bold motto headline callout text styling */}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2b7bb9] leading-snug mb-5">
        Learn together,<br />enjoy life, and<br />strive for success.
      </h2>

      {/* Paragraph Body Text Block Section */}
      <div className="space-y-4">
        {message.split('\n').filter(Boolean).map((para, i) => (
          <p
            key={i}
            className={`text-sm sm:text-base leading-relaxed ${textColor}`}
          >
            {para}
          </p>
        ))}
      </div>

      {/* ── FOOTER DETAILED META BLOCK ── */}
      {/* Solid rule delimiter separator block line decoration */}
      <div className={`mt-8 pt-4 border-t ${isDarkBg ? 'border-white/10' : 'border-neutral-300'}`}>
        <h3 className={`text-lg font-bold tracking-wide ${headingColor} mb-4`}>
          Message from the Representative
        </h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <p className={`text-base font-semibold ${nameColor}`}>{name}</p>
            <p className={`text-xs font-medium uppercase tracking-wider ${subtitleColor}`}>{title}</p>
          </div>

          {signatureUrl && (
            <div className="flex items-center">
              <Image
                src={signatureUrl}
                alt={name}
                width={140}
                height={50}
                className={`h-10 w-auto object-contain ${isDarkBg ? 'invert brightness-200' : ''}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section className={`py-16 md:py-24 ${bg}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className={`flex flex-col gap-10 md:flex-row md:items-start md:gap-14 ${
            portraitPosition === 'right' ? 'md:flex-row-reverse' : ''
          }`}
        >
          {portraitEl}
          {textEl}
        </motion.div>
      </div>
    </section>
  )
}