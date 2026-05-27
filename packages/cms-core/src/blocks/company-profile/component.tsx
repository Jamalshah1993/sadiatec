import Link from 'next/link'
import Image from 'next/image'
import { SectionEyebrow } from '../../components/ui'
import type { CompanyProfileBlockProps } from './types'

export function CompanyProfileBlock({
  eyebrow,
  heading,
  rows,
  photoUrl,
  photoAlt,
  photoFallbackText = 'Office photo coming soon',
  yearsBadge,
  viewFullPageCta,
}: CompanyProfileBlockProps) {
  if (rows.length === 0) return null

  return (
    <section
      aria-labelledby="company-profile-heading"
      className="bg-(--color-surface) py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header — left-aligned */}
        <div className="mb-10">
          {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
          {heading && (
            <h2
              id="company-profile-heading"
              className="mt-3 text-3xl font-bold text-(--color-text) md:text-4xl"
            >
              {heading}
            </h2>
          )}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: key-value table */}
          <div>
            <dl className="divide-y divide-(--color-neutral-200)">
              {rows.map((row) => (
                <div key={row.label} className="flex gap-4 py-4">
                  <dt className="w-1/3 shrink-0 text-sm font-semibold uppercase tracking-wider text-(--color-muted)">
                    {row.label}
                  </dt>
                  <dd className="flex-1 text-base text-(--color-text)">{row.value}</dd>
                </div>
              ))}
            </dl>

            {viewFullPageCta && (
              <Link
                href={viewFullPageCta.href}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary) hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
              >
                {viewFullPageCta.label}
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>

          {/* Right: photo + badge */}
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-2xl">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={photoAlt ?? heading ?? 'Company office'}
                  width={640}
                  height={480}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-neutral-100">
                  <p className="text-center text-sm text-(--color-muted)">{photoFallbackText}</p>
                </div>
              )}
            </div>

            {yearsBadge && (
              <div className="rounded-xl bg-(--color-primary) px-6 py-5 text-center text-white">
                <p className="text-4xl font-bold leading-none">{yearsBadge.years}+</p>
                <p className="mt-1 text-sm font-medium opacity-90">{yearsBadge.label}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
