'use client'
// Client boundary: scroll-triggered stagger animation via Framer Motion whileInView

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionEyebrow } from '../../components/ui'
import { staggerContainer, fadeInUp } from '../../lib/motion'
import type { CaseStudiesGridBlockProps, CaseStudyCardItem, CaseStudiesLayout } from './types'

interface StudyCardProps {
  study: CaseStudyCardItem
  layout: CaseStudiesLayout
  challengeLabel: string
  solutionLabel: string
}

function StudyCard({ study, layout, challengeLabel, solutionLabel }: StudyCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      className="space-y-6 rounded-2xl border border-(--color-neutral-200) bg-white p-8 md:p-10"
    >
      {/* Header: avatar + name + role */}
      <div className="flex items-center gap-4">
        {study.photoUrl ? (
          <Image
            src={study.photoUrl}
            alt={study.name}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-primary)/10 text-sm font-bold text-(--color-primary)"
          >
            {study.name.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="text-base font-bold text-(--color-text)">{study.name}</h3>
          {study.role && (
            <p className="text-sm text-(--color-muted)">{study.role}</p>
          )}
        </div>
      </div>

      {/* Metric callout */}
      {study.metric && (
        <div className="flex items-baseline gap-3 rounded-xl bg-(--color-surface) p-4">
          <span className="text-3xl font-bold text-(--color-primary)" aria-label={study.metric.caption}>
            {study.metric.value}
          </span>
          <span className="text-sm text-(--color-muted)">{study.metric.caption}</span>
        </div>
      )}

      {/* Challenge + Solution two-column on md when stacked layout */}
      {(study.challenge || study.solution) && (
        <div
          className={
            layout === 'stacked'
              ? 'grid grid-cols-1 gap-6 md:grid-cols-2'
              : 'space-y-4'
          }
        >
          {study.challenge && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-(--color-primary)">
                {challengeLabel}
              </p>
              <p className="text-sm leading-relaxed text-(--color-muted)">{study.challenge}</p>
            </div>
          )}
          {study.solution && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-(--color-primary)">
                {solutionLabel}
              </p>
              <p className="text-sm leading-relaxed text-(--color-muted)">{study.solution}</p>
            </div>
          )}
        </div>
      )}
    </motion.article>
  )
}

export function CaseStudiesGridBlock({
  eyebrow,
  heading,
  studies,
  layout = 'stacked',
  challengeLabel = 'Challenge',
  solutionLabel = 'Solution',
}: CaseStudiesGridBlockProps) {
  if (studies.length === 0) return null

  const listClass =
    layout === 'grid'
      ? 'grid grid-cols-1 gap-8 md:grid-cols-2'
      : layout === 'carousel'
        ? 'flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory'
        : 'mx-auto flex max-w-5xl flex-col gap-8'

  return (
    <section aria-labelledby="case-studies-heading" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || heading) && (
          <div className="mb-12 text-center">
            {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
            {heading && (
              <h2
                id="case-studies-heading"
                className="mt-4 text-3xl font-bold text-(--color-text) md:text-4xl"
              >
                {heading}
              </h2>
            )}
          </div>
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className={listClass}
        >
          {studies.map((study, i) => (
            <StudyCard
              key={i}
              study={study}
              layout={layout}
              challengeLabel={challengeLabel}
              solutionLabel={solutionLabel}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
