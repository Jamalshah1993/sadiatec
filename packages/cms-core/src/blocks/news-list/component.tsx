'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '../../lib/motion'
import type { NewsListBlockProps, NewsItem } from './types'

function NewsRowItem({ item }: { item: NewsItem }) {
  return (
    <motion.li 
      variants={fadeInUp}
      className="list-none border-t border-slate-200/80 pt-6 pb-8 first:border-t-0 first:pt-0 group text-left"
    >
      <Link href={item.href} className="block space-y-3.5 focus-visible:outline-none">
        {/* Meta Row: Date & Pill Badge */}
        <div className="flex flex-wrap items-center gap-4">
          {item.date && (
            <span className="text-[15px] font-semibold text-gray-700 tracking-tight">
              {new Date(item.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          )}
          {item.category && (
            <span className="inline-flex items-center bg-black px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase rounded-none">
              {item.category}
            </span>
          )}
        </div>

        {/* Content Segment: Bold Headline merging with Excerpt seamlessly */}
        <div className="space-y-2">
          <h3 className="text-[14px] md:text-[15px] font-bold leading-relaxed text-gray-900 group-hover:text-blue-600 transition-colors duration-150">
            {item.headline}
          </h3>
          {item.excerpt && (
            <p className="text-[13.5px] md:text-[14px] leading-relaxed text-gray-600 font-normal line-clamp-3">
              {item.excerpt}
            </p>
          )}
        </div>
      </Link>
    </motion.li>
  )
}

export function NewsListBlock({
  heading = 'news',
  items,
  viewAllCta,
}: NewsListBlockProps) {
  if (!items || items.length === 0) return null

  return (
    <section aria-labelledby="news-split-heading" className="bg-[#F6F6F6] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        
        {/* ── Asymmetrical Split Grid Frame ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* Left Anchor Column: Title & Outlined Pill Button */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-8 lg:sticky lg:top-12">
            <h2 
              id="news-split-heading" 
              className="text-3xl font-extrabold tracking-tight text-black lowercase md:text-4xl"
            >
              {heading}
            </h2>
            
            {viewAllCta && (
              <Link
                href={viewAllCta.href}
                className="inline-flex h-11 items-center justify-center rounded-full border border-gray-400 bg-transparent px-8 text-xs font-bold text-gray-900 tracking-wide transition-all duration-200 hover:bg-black hover:text-white hover:border-black active:scale-[0.98]"
              >
                {viewAllCta.label || 'View news list'}
              </Link>
            )}
          </div>

          {/* Right Layout Column: Minimalist Content Stack */}
          <div className="lg:col-span-7">
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              role="list"
              className="flex flex-col space-y-2 border-b border-slate-200/80 pb-2"
            >
              {items.slice(0, 3).map((item, i) => (
                <NewsRowItem key={item.headline || i} item={item} />
              ))}
            </motion.ul>
          </div>

        </div>

      </div>
    </section>
  )
}