'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionEyebrow } from '../../components/ui'
import { fadeInUp } from '../../lib/motion'
import type { ServicesGridBlockProps, ServiceItem } from './types'

interface OverlapRowProps {
  service: ServiceItem
  index: number
}

function OverlapRow({ service, index }: OverlapRowProps) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      /* Reduced overall minimum row heights for a leaner profile */
      className="relative w-full min-h-[300px] md:min-h-[340px] flex flex-col justify-center items-stretch"
    >
      {/* ── Background Image Section (Slightly shorter height & pushed further left/right) ── */}
      <div 
        className={[
          'w-full md:w-[62%] h-[200px] sm:h-[260px] md:h-[320px] relative rounded-2xl overflow-hidden shadow-sm z-0',
          isEven ? 'md:ml-auto' : 'md:mr-auto'
        ].join(' ')}
      >
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.imageName || service.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 62vw"
          />
        ) : (
          <div className="w-full h-full bg-slate-100" />
        )}
      </div>

      {/* ── Overlapping Content Card (More left/right spread & tight sizing) ── */}
      <div
        className={[
          /* Narrowed down to md:w-[44%] to expose more background width */
          'w-full md:w-[44%] bg-[#EBF5FF] p-5 sm:p-7 md:p-8 rounded-2xl md:shadow-md text-left space-y-3 z-10',
          'mt-[-30px] md:mt-0 mx-4 sm:mx-6 md:mx-0 md:absolute md:top-1/2 md:-translate-y-1/2',
          /* Hard locked directly against opposite screen walls to look extremely expansive */
          isEven ? 'md:left-0' : 'md:right-0'
        ].join(' ')}
      >
        <div className="space-y-0.5">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
            {service.title}
          </h3>
          {service.subheadline && (
            <p className="text-[12px] font-semibold text-blue-400 tracking-wider capitalize">
              {service.subheadline}
            </p>
          )}
        </div>

        {service.description && (
          <p className="text-[14px] leading-relaxed text-gray-700 font-normal">
            {service.description}
          </p>
        )}

        {service.cta.label && (
          <div className="pt-2">
            <Link
              href={service.cta.href}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#5EA6E6] hover:bg-[#4B93D3] active:scale-[0.98] text-white text-[12px] font-medium rounded-lg transition-all duration-200 shadow-sm group focus:outline-none"
            >
              <span>{service.cta.label}</span>
              <svg 
                className="h-3.5 w-3.5 transform transition-transform duration-200 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function ServicesGridBlock({
  eyebrow,
  heading,
  services,
}: ServicesGridBlockProps) {
  if (!services || services.length === 0) return null

  return (
    <section className="pt-12 pb-20 md:pt-16 md:pb-24 bg-white overflow-hidden">
      {/* Expanded to max-w-full with wide padding layers to maximize edge boundaries */}
      <div className="mx-auto max-w-full px-6 md:px-16 lg:px-24">
        
        {/* Minimalist Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto space-y-2">
          {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
          <h2 className="text-2xl md:text-[34px] font-bold tracking-tight text-gray-900 leading-tight">
            {heading}
          </h2>
        </div>

        {/* Content Rows Matrix with tighter step gap values */}
        <div className="space-y-16 md:space-y-24 max-w-[1500px] mx-auto">
          {services.map((service, i) => (
            <OverlapRow key={service.title || i} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}