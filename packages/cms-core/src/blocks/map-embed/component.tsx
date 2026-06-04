import type { MapEmbedBlockProps } from './types'

const heightMap: Record<string, string> = {
  sm: '300px',
  md: '450px',
  lg: '600px',
}

export function MapEmbedBlock({
  heading,
  embedUrl,
  address,
  phone,
  email,
  hours,
  mapHeight = 'md',
  layout = 'map-left',
  labelAddress = 'Address',
  labelPhone = 'Phone',
  labelEmail = 'Email',
  labelHours = 'Hours',
}: MapEmbedBlockProps) {
  const mapHeightPx = heightMap[mapHeight] ?? heightMap['md']
  const isTop = layout === 'map-top'
  const isMapRight = layout === 'map-right'

  const mapEl = (
    <div
      className={isTop ? 'w-full' : 'lg:flex-1 lg:min-w-0'}
      style={{ minHeight: mapHeightPx }}
    >
      {embedUrl ? (
        <iframe
          src={embedUrl}
          width="100%"
          height={mapHeightPx}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin"
          title="Location map"
          className="rounded-2xl"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center rounded-2xl bg-[var(--color-neutral-100,#f5f5f5)] text-sm text-[var(--color-muted)]"
          style={{ height: mapHeightPx }}
        >
          Map unavailable
        </div>
      )}
    </div>
  )

  const infoEl = (
    <div className={`flex flex-col gap-6 ${isTop ? '' : 'lg:w-80 lg:shrink-0'}`}>
      {heading && (
        <h2 className="text-xl font-bold text-[var(--color-text)] sm:text-2xl">{heading}</h2>
      )}

      <address className="not-italic">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-2">
          {labelAddress}
        </p>
        <p className="text-sm leading-relaxed text-[var(--color-muted)] whitespace-pre-line">
          {address}
        </p>
      </address>

      {(phone || email) && (
        <dl className="flex flex-col gap-2">
          {phone && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">{labelPhone}</dt>
              <dd>
                <a href={`tel:${phone}`} className="text-sm text-[var(--color-text)] hover:text-[var(--color-primary)]">
                  {phone}
                </a>
              </dd>
            </div>
          )}
          {email && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">{labelEmail}</dt>
              <dd>
                <a href={`mailto:${email}`} className="text-sm text-[var(--color-text)] hover:text-[var(--color-primary)]">
                  {email}
                </a>
              </dd>
            </div>
          )}
        </dl>
      )}

      {hours && hours.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-2">{labelHours}</p>
          <dl className="space-y-1">
            {hours.map((row, i) => (
              <div key={i} className="flex justify-between text-sm">
                <dt className="text-[var(--color-muted)]">{row.days}</dt>
                <dd className="font-medium text-[var(--color-text)]">{row.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  )

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isTop ? (
          <div className="flex flex-col gap-8">
            {mapEl}
            {infoEl}
          </div>
        ) : (
          <div className={`flex flex-col gap-8 lg:flex-row lg:items-start ${isMapRight ? 'lg:flex-row-reverse' : ''}`}>
            {mapEl}
            {infoEl}
          </div>
        )}
      </div>
    </section>
  )
}
