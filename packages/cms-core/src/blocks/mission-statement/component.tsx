'use client'

import { useLocale } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '../../lib/motion'
import type { MissionStatementBlockProps, MissionPhotoSize } from './types'

// Compact dynamic sizing for mobile and desktop
const sizeMap: Record<MissionPhotoSize, string> = {
  small: 'h-[90px] w-[50%] sm:w-[45%] md:h-[120px] lg:h-[140px] md:w-auto md:flex-1 md:max-w-[200px]',
  medium: 'h-[110px] w-[60%] sm:w-[55%] md:h-[150px] lg:h-[180px] md:w-auto md:flex-1 md:max-w-[250px]',
  large: 'h-[130px] w-[70%] sm:w-[65%] md:h-[180px] lg:h-[210px] md:w-auto md:flex-1 md:max-w-[300px]',
}

export function MissionStatementBlock({
  missionHeading,
  missionBody,
  photos,
}: MissionStatementBlockProps) {
  
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-surface-alt)] py-12 px-6 md:py-20 md:px-12 lg:px-20">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 max-w-7xl mx-auto w-full"
      >
        {/* Title & Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start mb-10 md:mb-20">
          
          {/* Title Column */}
          <motion.div variants={fadeInUp} className="flex flex-col">
            <h2 className="text-3xl md:text-4xl lg:text-[45px] font-bold text-gray-900 tracking-tight leading-tight">
              {missionHeading}
            </h2>
          </motion.div>

          {/* Details Column */}
          <motion.div variants={fadeInUp} className="flex flex-col md:pt-16">
            <p className="text-[16px] md:text-[18px] text-gray-600 font-normal leading-relaxed whitespace-pre-line">
              {missionBody}
            </p>
          </motion.div>
        </div>

        {/* Compact Staggered Gallery */}
        {photos && photos.length > 0 && (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative mt-6 md:mt-16 w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 lg:gap-8"
          >
            {photos.map((photo, i) => {
              // Alternating alignment with reduced height & width footprint
              const mobilePositions = [
                'self-start ml-2',
                'self-end mr-2 -mt-2 md:mt-0',
                'self-start ml-4 -mt-2 md:mt-0',
                'self-end mr-4 -mt-2 md:mt-0',
              ]

              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className={`
                    relative rounded-[20px] md:rounded-[24px] overflow-hidden shadow-sm bg-slate-50 z-10
                    ${sizeMap[photo.size]}
                    ${mobilePositions[i % 4]}
                    md:self-auto md:ml-0 md:mr-0
                  `}
                >
                  <Image
                    src={photo.imageUrl}
                    alt={photo.alt || 'Gallery Presentation Image'}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 768px) 60vw, 25vw"
                  />
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}