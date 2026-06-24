'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { MapPin, Building2, Wallet, CalendarDays, ArrowRight, BriefcaseBusiness } from 'lucide-react'
import { SectionEyebrow } from '../../components/ui'
import { staggerContainer, fadeInUp } from '../../lib/motion'
import type { TimelineBlockProps, JobOpening, ProcessStep } from './types'

// 1. Define the dictionary for dynamic text
const labels: Record<string, { noOpenings: string; howWeWork: string }> = {
  en: { 
    noOpenings: 'No openings available at the moment.', 
    howWeWork: 'How We Work' 
  },
  ja: { 
    noOpenings: '現在、募集中の求人はありません。', 
    howWeWork: '採用プロセス' 
  },
  bn: { 
    noOpenings: 'বর্তমানে কোনো শূন্যপদ নেই।', 
    howWeWork: 'আমরা যেভাবে কাজ করি' 
  },
}

function JobCard({ job }: { job: JobOpening }) {
  const isUrgent = job.tag?.toLowerCase() === 'urgent'
  
  // Apply now text (hardcoded in the link)
  return (
    <motion.article
      variants={fadeInUp}
      className="group relative bg-white border border-border-default
                 hover:border-brand-primary/40 hover:shadow-md
                 transition-all duration-300 text-left overflow-hidden rounded-xl"
    >
      <div className="bg-gradient-to-r from-bg-tertiary/80 to-white/30 px-6 py-5 
                      border-b border-border-default flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center
                          rounded-lg bg-brand-primary text-white shadow-xs">
            <BriefcaseBusiness size={18} strokeWidth={2.2} />
          </div>
          <h3 className="text-[15px] font-bold tracking-tight text-text-primary 
                         leading-snug transition-colors duration-200">
            {job.title}
          </h3>
        </div>

        {job.tag && (
          <span className={[
            'shrink-0 inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-widest',
            isUrgent
              ? 'bg-brand-dark text-white'
              : 'bg-brand-primary text-white'
          ].join(' ')}>
            {job.tag}
          </span>
        )}
      </div>

      <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-y-2.5 gap-x-4 bg-white">
        {job.company && (
          <div className="flex items-center gap-2.5">
            <Building2 size={14} className="text-brand-primary/80 shrink-0" />
            <span className="text-[13px] font-medium text-text-secondary">{job.company}</span>
          </div>
        )}
        {job.location && (
          <div className="flex items-center gap-2.5">
            <MapPin size={14} className="text-brand-primary/80 shrink-0" />
            <span className="text-[13px] font-medium text-text-secondary">{job.location}</span>
          </div>
        )}
        {job.salary && (
          <div className="flex items-center gap-2.5">
            <Wallet size={14} className="text-brand-primary/80 shrink-0" />
            <span className="text-[13px] font-bold font-mono text-brand-primary">
              {job.salary}
            </span>
          </div>
        )}
      </div>

      <div className="border-t border-border-default bg-bg-secondary/50 
                      flex items-center justify-between pl-6 h-12 overflow-hidden">
        {job.postedDate && (
          <div className="flex items-center gap-2 text-xs font-medium text-text-muted tabular-nums">
            <CalendarDays size={13} className="shrink-0 text-text-muted" />
            <span>{job.postedDate}</span>
          </div>
        )}
        
        <Link
          href={job.applyHref}
          className="inline-flex items-center justify-center gap-2 px-6 h-full
                     bg-brand-primary text-white text-xs font-bold tracking-wide
                     hover:bg-brand-primary-dark transition-colors duration-200 ml-auto"
        >
          Apply Now
          <ArrowRight size={13} className="transition-transform duration-200 
                                           group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  )
}

function ProcessStep({
  step,
  index,
  isLast,
}: {
  step: ProcessStep
  index: number
  isLast: boolean
}) {
  return (
    <motion.div variants={fadeInUp} className="relative flex gap-6 group">
      <div className="flex flex-col items-center">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md
                        bg-brand-primary text-white text-xs font-mono font-bold shadow-xs">
          {String(index + 1).padStart(2, '0')}
        </div>
        {!isLast && (
          <div className="w-[1.5px] flex-1 bg-border-default mt-3 group-hover:bg-brand-primary-light transition-colors duration-300" />
        )}
      </div>

      <div className="text-left pb-10">
        <h4 className="text-[14px] font-bold text-text-primary tracking-tight mb-2">
          {step.title}
        </h4>
        <p className="text-[13px] text-text-secondary leading-relaxed font-normal">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export function OpeningsProcessBlock({
  eyebrow,
  heading = 'Our Latest Opening',
  openings = [],
  processEyebrow = 'Recruitment Process',
  processSteps = [],
}: TimelineBlockProps) {
  
  // 2. Setup localization
  const locale = useLocale()
  const t = (labels[locale] || labels['en']) as { noOpenings: string; howWeWork: string }

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          <div className="flex-1 min-w-0">
            <div className="mb-12">
              {eyebrow && (
                <p className="text-xs font-bold tracking-widest uppercase
                              text-brand-primary mb-2">
                  {eyebrow}
                </p>
              )}
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight
                             text-text-primary">
                {heading}
              </h2>
              <div className="mt-3.5 h-[3px] w-10 bg-brand-primary rounded-full" />
            </div>

            {openings.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="flex flex-col gap-5"
              >
                {openings.map((job, idx) => (
                  <JobCard key={idx} job={job} />
                ))}
              </motion.div>
            ) : (
              <div className="border border-dashed border-border-default rounded-xl p-12 text-center bg-bg-secondary/50">
                {/* 3. Dynamic Text */}
                <p className="text-sm font-medium text-text-muted">
                  {t.noOpenings}
                </p>
              </div>
            )}
          </div>

          <div className="hidden lg:block w-[1px] bg-border-default self-stretch" />

          {processSteps.length > 0 && (
            <div className="lg:w-80 xl:w-[400px] shrink-0">
              <div className="mb-12">
                <p className="text-xs font-bold tracking-widest uppercase
                              text-brand-primary mb-2">
                  {processEyebrow}
                </p>
                {/* 4. Dynamic Text */}
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight
                               text-text-primary">
                  {t.howWeWork}
                </h2>
                <div className="mt-3.5 h-[3px] w-10 bg-brand-primary rounded-full" />
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="flex flex-col"
              >
                {processSteps.map((step, idx) => (
                  <ProcessStep
                    key={idx}
                    step={step}
                    index={idx}
                    isLast={idx === processSteps.length - 1}
                  />
                ))}
              </motion.div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}