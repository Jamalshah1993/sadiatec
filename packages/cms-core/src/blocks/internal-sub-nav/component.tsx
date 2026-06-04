'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import type { InternalSubNavBlockProps } from './types'

function itemClasses(
  isActive: boolean,
  style: 'tabs' | 'pills' | 'underline',
): string {
  const base = 'inline-flex min-h-[44px] items-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]'
  if (style === 'pills') {
    return isActive
      ? `${base} rounded-full bg-[var(--color-primary)] text-white`
      : `${base} rounded-full text-[var(--color-muted)] hover:bg-[var(--color-neutral-100,#f5f5f5)] hover:text-[var(--color-text)]`
  }
  if (style === 'tabs') {
    return isActive
      ? `${base} rounded-t-md border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]`
      : `${base} rounded-t-md border-b-2 border-transparent text-[var(--color-muted)] hover:border-[var(--color-neutral-300,#d1d5db)] hover:text-[var(--color-text)]`
  }
  return isActive
    ? `${base} border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]`
    : `${base} border-b-2 border-transparent text-[var(--color-muted)] hover:text-[var(--color-text)]`
}

export function InternalSubNavBlock({
  items,
  style = 'underline',
  stickyOnScroll = false,
}: InternalSubNavBlockProps) {
  const pathname = usePathname()
  const stickyClass = stickyOnScroll ? 'sticky top-0 z-30' : ''

  return (
    <nav
      aria-label="Section navigation"
      className={`bg-[var(--color-surface)] border-b border-[var(--color-neutral-200,#e5e7eb)] ${stickyClass}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul
          role="list"
          className="flex overflow-x-auto scrollbar-none gap-1 md:gap-2"
        >
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={itemClasses(isActive, style)}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
