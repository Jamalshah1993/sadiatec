import Image from 'next/image'
import type { OrgChartBlockProps } from './types'

export function OrgChartBlock({
  heading,
  chartImageUrl,
  chartImageAlt,
  departments,
  renderMode = 'image',
}: OrgChartBlockProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl">
            {heading}
          </h2>
        )}

        {renderMode === 'image' && chartImageUrl && (
          <div className="overflow-hidden rounded-2xl border border-[var(--color-neutral-200,#e5e7eb)]">
            <Image
              src={chartImageUrl}
              alt={chartImageAlt ?? (heading ?? 'Organisation chart')}
              width={1200}
              height={800}
              className="h-auto w-full object-contain"
            />
          </div>
        )}

        {renderMode === 'list' && departments && departments.length > 0 && (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {departments.map((dept, i) => (
              <li
                key={i}
                className="flex flex-col gap-1 rounded-xl border border-[var(--color-neutral-200,#e5e7eb)] bg-[var(--color-surface)] p-5 shadow-sm"
              >
                <h3 className="text-sm font-bold text-[var(--color-text)]">{dept.name}</h3>
                {dept.head && (
                  <p className="text-xs text-[var(--color-primary)] font-medium">{dept.head}</p>
                )}
                {dept.description && (
                  <p className="text-xs leading-relaxed text-[var(--color-muted)]">{dept.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
