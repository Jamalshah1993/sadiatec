import type { StatsBarBlockProps } from './types'

const bgMap: Record<string, string> = {
  brand: 'bg-[var(--color-primary)]',
  dark: 'bg-[var(--color-neutral-900)]',
  light: 'bg-[var(--color-neutral-50,#fafafa)]',
}

const valueColorMap: Record<string, string> = {
  brand: 'text-white',
  dark: 'text-white',
  light: 'text-[var(--color-primary)]',
}

const labelColorMap: Record<string, string> = {
  brand: 'text-white/80',
  dark: 'text-white/70',
  light: 'text-[var(--color-muted)]',
}

export function StatsBarBlock({
  items,
  backgroundStyle = 'brand',
  layout = 'row',
}: StatsBarBlockProps) {
  if (items.length === 0) return null

  const bg = bgMap[backgroundStyle] ?? bgMap['brand']
  const valueColor = valueColorMap[backgroundStyle] ?? valueColorMap['brand']
  const labelColor = labelColorMap[backgroundStyle] ?? labelColorMap['brand']

  const gridClass = layout === 'grid'
    ? 'grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6'
    : 'flex flex-wrap justify-center gap-8 lg:gap-12'

  return (
    <section className={`py-10 md:py-12 ${bg}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className={gridClass} role="list">
          {items.map((item, i) => (
            <li key={i} className="flex flex-col items-center gap-1 text-center">
              <span className={`text-3xl font-extrabold tracking-tight md:text-4xl ${valueColor}`}>
                {item.value}
              </span>
              <span className={`text-sm font-medium ${labelColor}`}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
