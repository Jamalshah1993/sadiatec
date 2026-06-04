'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { GalleryGridBlockProps, GalleryImageItem } from './types'

const colsMap: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
}

const ratioMap: Record<string, string> = {
  square: 'aspect-square',
  '4:3': 'aspect-[4/3]',
  '3:2': 'aspect-[3/2]',
  auto: '',
}

interface LightboxProps {
  item: GalleryImageItem
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption ?? 'Gallery image'}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        autoFocus
        aria-label="Close gallery"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        onClick={onClose}
      >
        ✕
      </button>
      <button
        aria-label="Previous image"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
      >
        ←
      </button>
      <div
        className="relative max-h-[90vh] max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.imageUrl}
          alt={item.caption ?? ''}
          width={1200}
          height={900}
          className="max-h-[85vh] w-full object-contain"
        />
        {item.caption && (
          <p className="mt-3 text-center text-sm text-white/70">{item.caption}</p>
        )}
      </div>
      <button
        aria-label="Next image"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        onClick={(e) => { e.stopPropagation(); onNext() }}
      >
        →
      </button>
    </div>
  )
}

export function GalleryGridBlock({
  heading,
  intro,
  showFilter = false,
  filterAllLabel = 'All',
  categories,
  items,
  columns = '3',
  enableLightbox = true,
  aspectRatio = 'square',
}: GalleryGridBlockProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items

  const colsClass = colsMap[columns] ?? colsMap['3']
  const ratioClass = ratioMap[aspectRatio] ?? ''

  function handleCategoryChange(slug: string | null) {
    setActiveCategory(slug)
    setLightboxIndex(null)
  }

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const prevItem = useCallback(() => {
    setLightboxIndex((idx) => idx !== null ? (idx - 1 + filtered.length) % filtered.length : null)
  }, [filtered.length])

  const nextItem = useCallback(() => {
    setLightboxIndex((idx) => idx !== null ? (idx + 1) % filtered.length : null)
  }, [filtered.length])

  function openLightbox(index: number) {
    if (enableLightbox) setLightboxIndex(index)
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || intro) && (
          <div className="mb-10 text-center">
            {heading && (
              <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl">
                {heading}
              </h2>
            )}
            {intro && (
              <p className="mt-4 mx-auto max-w-2xl text-base text-[var(--color-muted)]">{intro}</p>
            )}
          </div>
        )}

        {showFilter && categories && categories.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
            <button
              onClick={() => handleCategoryChange(null)}
              aria-pressed={activeCategory === null}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === null
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-neutral-100,#f5f5f5)] text-[var(--color-muted)] hover:bg-[var(--color-neutral-200,#e5e7eb)]'
              }`}
            >
              {filterAllLabel}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                aria-pressed={activeCategory === cat.slug}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-neutral-100,#f5f5f5)] text-[var(--color-muted)] hover:bg-[var(--color-neutral-200,#e5e7eb)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        <ul className={`grid gap-3 ${colsClass}`} role="list">
          {filtered.map((item, i) => (
            <li key={i}>
              <button
                disabled={!enableLightbox}
                onClick={() => openLightbox(i)}
                className={`group relative w-full overflow-hidden rounded-xl ${ratioClass} block bg-[var(--color-neutral-100,#f5f5f5)] ${enableLightbox ? 'cursor-pointer' : 'cursor-default'}`}
                aria-label={item.caption ?? `Gallery image ${i + 1}`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.caption ?? ''}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover transition-transform duration-300 ${enableLightbox ? 'group-hover:scale-105' : ''}`}
                />
                {item.caption && (
                  <span className="absolute bottom-0 left-0 right-0 translate-y-full bg-black/70 p-2 text-xs text-white transition-transform duration-200 group-hover:translate-y-0">
                    {item.caption}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {enableLightbox && lightboxIndex !== null && filtered[lightboxIndex] && (
        <Lightbox
          item={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </section>
  )
}
