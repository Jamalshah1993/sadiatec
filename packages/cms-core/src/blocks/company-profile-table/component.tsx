import type { CompanyProfileTableBlockProps } from './types'

const labelWidthMap: Record<string, string> = {
  narrow: 'w-1/4',
  medium: 'w-1/3',
  wide: 'w-2/5',
}

export function CompanyProfileTableBlock({
  heading,
  rows,
  tableStyle = 'striped',
  labelWidth = 'medium',
}: CompanyProfileTableBlockProps) {
  if (rows.length === 0) return null

  const labelW = labelWidthMap[labelWidth] ?? labelWidthMap['medium']
  const isBordered = tableStyle === 'bordered'
  const isStriped = tableStyle === 'striped'

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl">
            {heading}
          </h2>
        )}
        <dl
          className={[
            'overflow-hidden',
            isBordered ? 'rounded-xl border border-[var(--color-neutral-200,#e5e7eb)]' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {rows.map((row, i) => {
            const rowBg = isStriped && i % 2 === 0
              ? 'bg-[var(--color-neutral-50,#fafafa)]'
              : 'bg-[var(--color-surface)]'
            const highlightClass = row.isHighlighted
              ? 'border-l-4 border-l-[var(--color-primary)]'
              : ''
            const dividerClass = isBordered
              ? i > 0 ? 'border-t border-[var(--color-neutral-200,#e5e7eb)]' : ''
              : 'border-t border-[var(--color-neutral-100,#f5f5f5)]'

            return (
              <div
                key={i}
                className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-4 ${rowBg} ${highlightClass} ${i > 0 ? dividerClass : ''}`}
              >
                <dt className={`${labelW} shrink-0 text-sm font-semibold text-[var(--color-text)]`}>
                  {row.label}
                </dt>
                <dd className="flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {row.value}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
