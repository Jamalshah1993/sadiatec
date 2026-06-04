import Image from 'next/image'
import type { CEOMessageBlockProps } from './types'

const bgMap: Record<string, string> = {
  white: 'bg-white',
  light: 'bg-[var(--color-neutral-50,#fafafa)]',
}

export function CEOMessageBlock({
  portraitUrl,
  portraitAlt,
  name,
  title,
  message,
  signatureUrl,
  portraitPosition = 'left',
  backgroundStyle = 'white',
}: CEOMessageBlockProps) {
  const bg = bgMap[backgroundStyle] ?? bgMap['white']

  const portraitEl = (
    <div className="flex-shrink-0">
      <div className="overflow-hidden rounded-2xl shadow-md w-48 md:w-64 mx-auto">
        <Image
          src={portraitUrl}
          alt={portraitAlt}
          width={256}
          height={320}
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  )

  const textEl = (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
          {title}
        </p>
        <p className="text-xl font-bold text-[var(--color-text)]">{name}</p>
      </div>

      <blockquote className="space-y-4">
        {message.split('\n').filter(Boolean).map((para, i) => (
          <p
            key={i}
            className="text-base leading-relaxed text-[var(--color-muted)]"
          >
            {para}
          </p>
        ))}
      </blockquote>

      {signatureUrl && (
        <div className="mt-2">
          <Image
            src={signatureUrl}
            alt={name}
            width={160}
            height={60}
            className="h-12 w-auto object-contain opacity-80"
          />
        </div>
      )}
    </div>
  )

  return (
    <section className={`py-16 md:py-24 ${bg}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col gap-10 md:flex-row md:items-start md:gap-14 ${portraitPosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
          {portraitEl}
          {textEl}
        </div>
      </div>
    </section>
  )
}
