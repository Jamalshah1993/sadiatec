'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function FloatingCTAs() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div
      className={`fixed bottom-8 left-6 z-50 transition-all duration-300 md:hidden ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <Link 
        href="/contact" 
        className="flex items-center gap-3 bg-[#2B70A6] hover:bg-[#256394] text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl transition-all active:scale-[0.98]"
      >
        <span>contact</span>
        {/* Chat bubble icon */}
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </Link>
    </div>
  )
}