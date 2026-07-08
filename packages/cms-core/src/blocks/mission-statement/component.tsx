'use client'

import { useLocale } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '../../lib/motion'
import type { MissionStatementBlockProps, MissionPhotoSize } from './types'

const sizeMap: Record<MissionPhotoSize, string> = {
  small: 'h-[90px] md:h-[110px] lg:h-[130px] w-[130px] md:w-[160px] lg:w-[190px]',
  medium: 'h-[130px] md:h-[150px] lg:h-[180px] w-[180px] md:w-[210px] lg:w-[250px]',
  large: 'h-[170px] md:h-[200px] lg:h-[220px] w-[240px] md:w-[280px] lg:w-[310px]',
}

export function MissionStatementBlock({
  missionHeading,
  missionBody,
  photos,
}: MissionStatementBlockProps) {
  
  return (
    <section className="relative w-full overflow-hidden bg-[#EBF5FF] py-16 px-6 md:py-24 md:px-12 lg:px-20">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Updated Layout: Title on left, Details on right (pushed down) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 md:mb-24">
          
          {/* Title Column */}
          <motion.div variants={fadeInUp} className="flex flex-col">
            <h2 className="text-3xl md:text-4xl lg:text-[45px] font-bold text-gray-900 tracking-tight leading-tight">
              {missionHeading}
            </h2>
          </motion.div>

          {/* Details Column (Pushed down with md:pt-16) */}
          <motion.div variants={fadeInUp} className="flex flex-col md:pt-16">
            <p className="text-[16px] md:text-[18px] text-gray-600 font-normal leading-relaxed whitespace-pre-line">
              {missionBody}
            </p>
          </motion.div>
        </div>

        {/* Gallery Section remains the same */}
        {photos && photos.length > 0 && (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative mt-16 w-full flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6"
          >
            {photos.map((photo, i) => {
              const mobileMargins = [
                "mr-auto ml-4",
                "ml-auto mr-4 -mt-16",
                "mr-auto ml-10 -mt-10",
                "ml-auto mr-6 -mt-12"
              ];

              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.04, y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className={`
                    relative rounded-[24px] overflow-hidden shadow-sm bg-slate-50 z-10
                    ${sizeMap[photo.size]}
                    md:mt-0 md:ml-0 md:mr-0
                    ${mobileMargins[i] || ""}
                  `}
                >
                  <Image
                    src={photo.imageUrl}
                    alt={photo.alt || 'Gallery Presentation Image'}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 768px) 50vw, 25vw"
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