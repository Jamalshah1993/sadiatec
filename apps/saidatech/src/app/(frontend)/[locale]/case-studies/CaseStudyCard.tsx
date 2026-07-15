import Image from 'next/image'
import Link from 'next/link'
import type { CaseStudyItem } from '@/lib/case-studies'

const BADGE_COLORS = ['bg-brand-primary', 'bg-brand-accent', 'bg-brand-dark']
const DOT_COLORS = ['bg-brand-accent', 'bg-brand-dark', 'bg-brand-primary']

interface CaseStudyCardProps {
  study: CaseStudyItem
  index: number
  href: string
  viewLabel: string
}

export function CaseStudyCard({ study, index, href, viewLabel }: CaseStudyCardProps) {
  const badgeColor = BADGE_COLORS[index % BADGE_COLORS.length]
  const dotColor = DOT_COLORS[index % DOT_COLORS.length]

  return (
    <Link href={href} className="group relative block pb-10">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100 shadow-sm">
        {study.photoUrl ? (
          <Image
            src={study.photoUrl}
            alt={study.name}
            fill
            sizes="(max-width: 768px) 90vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-text-muted">
            No Image
          </div>
        )}

        {study.tagline && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-primary/85 p-6 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-lg font-semibold leading-snug text-white">{study.tagline}</p>
            <span className="mt-3 text-sm font-medium text-white underline underline-offset-4">
              {viewLabel} →
            </span>
          </div>
        )}
      </div>

      <span
        aria-hidden="true"
        className={`absolute left-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white shadow-md ${badgeColor}`}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <span
        aria-hidden="true"
        className={`absolute -right-3 top-1/4 z-10 hidden h-8 w-8 rounded-full sm:block ${dotColor}`}
      />

      <div className="absolute bottom-8 left-4 z-10 flex max-w-[85%] flex-col items-start gap-2">
        <span className="rounded-full bg-brand-dark px-4 py-1.5 text-sm font-bold text-white shadow-md">
          {study.name}
        </span>
        {study.role && (
          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-text-primary shadow-md">
            {study.role}
          </span>
        )}
      </div>
    </Link>
  )
}
