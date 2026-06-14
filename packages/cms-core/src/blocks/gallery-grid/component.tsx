'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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

/* ── ADVANCED FRAMER MOTION VARIANTS ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Creating a beautiful cascading effect item by item
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1], // Premium snappy easing curves
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2 } 
  },
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
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors z-50"
        onClick={onClose}
      >
        ✕
      </button>
      <button
        aria-label="Previous image"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors z-50"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
      >
        ←
      </button>
      
      {/* Lightbox pop-in zoom animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative max-h-[90vh] max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.imageUrl}
          alt={item.caption ?? ''}
          width={1200}
          height={900}
          className="max-h-[85vh] w-full object-contain rounded-sm"
        />
        {item.caption && (
          <p className="mt-3 text-center text-sm text-white/70">{item.caption}</p>
        )}
      </motion.div>
      
      <button
        aria-label="Next image"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors z-50"
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
    <section className="pt-10 pb-16 md:pt-10 md:pb-24 overflow-hidden">
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
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 z-10 ${
                activeCategory === null
                  ? 'text-white'
                  : 'bg-[var(--color-neutral-100,#f5f5f5)] text-[var(--color-muted)] hover:bg-[var(--color-neutral-200,#e5e7eb)]'
              }`}
            >
              {/* Pill background morph sliding animation */}
              {activeCategory === null && (
                <motion.span 
                  layoutId="activeFilterPill"
                  className="absolute inset-0 rounded-full bg-[var(--color-primary)] -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {filterAllLabel}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                aria-pressed={activeCategory === cat.slug}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 z-10 ${
                  activeCategory === cat.slug
                    ? 'text-white'
                    : 'bg-[var(--color-neutral-100,#f5f5f5)] text-[var(--color-muted)] hover:bg-[var(--color-neutral-200,#e5e7eb)]'
                }`}
              >
                {activeCategory === cat.slug && (
                  <motion.span 
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full bg-[var(--color-primary)] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* 🛠️ ADVANCED: Turned layout lists to motion grids with fluid AnimatePresence mechanics */}
        <motion.ul 
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className={`grid gap-4 ${colsClass}`} 
          role="list"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.li 
                layout
                key={item.imageUrl} // Custom unique key to prevent layout mismatch when switching views
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <button
                  disabled={!enableLightbox}
                  onClick={() => openLightbox(i)}
                  className={`group relative w-full overflow-hidden rounded-xl ${ratioClass} block bg-[var(--color-neutral-100,#f5f5f5)] shadow-sm hover:shadow-md transition-shadow duration-300 ${enableLightbox ? 'cursor-pointer' : 'cursor-default'}`}
                  aria-label={item.caption ?? `Gallery image ${i + 1}`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.caption ?? ''}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-500 ease-out ${enableLightbox ? 'group-hover:scale-105' : ''}`}
                  />
                  {item.caption && (
                    <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-8 pb-3 px-3 text-xs text-white translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {item.caption}
                    </span>
                  )}
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {enableLightbox && lightboxIndex !== null && filtered[lightboxIndex] && (
          <Lightbox
            item={filtered[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </section>
  )
}