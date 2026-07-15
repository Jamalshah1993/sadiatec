import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import siteConfig from '../../../../../../site.config'
import { getCaseStudies, getCaseStudyBySlug } from '@/lib/case-studies'
import { CTABannerBlock } from '@saidatech/cms-core/blocks'
import type { CTABannerBlockProps } from '@saidatech/cms-core/blocks'
import { Container, Section } from '@saidatech/cms-core/components/ui'

export const revalidate = 3600

const LOCALES = ['en', 'ja', 'bn'] as const
type Locale = (typeof LOCALES)[number]

function isLocale(s: string): s is Locale {
  return (LOCALES as readonly string[]).includes(s)
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const studies = await getCaseStudies(siteConfig.locales.default)
  return siteConfig.locales.enabled.flatMap((locale) =>
    studies.map((study) => ({ locale, slug: study.slug })),
  )
}

const homeLabels: Record<Locale, string> = {
  en: 'Home',
  ja: 'ホーム',
  bn: 'হোম',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug: rawSlug } = await params
  if (!isLocale(locale)) return {}
  const slug = decodeURIComponent(rawSlug)

  const study = await getCaseStudyBySlug(slug, locale)
  if (!study) return {}

  const t = await getTranslations({ locale, namespace: 'caseStudies' })
  const base = `https://${siteConfig.site.domain}`
  const defaultLocale = siteConfig.locales.default
  const encodedSlug = encodeURIComponent(slug)
  const canonicalPath =
    locale === defaultLocale ? `/case-studies/${encodedSlug}` : `/${locale}/case-studies/${encodedSlug}`

  const languages: Record<string, string> = { 'x-default': `${base}/case-studies/${encodedSlug}` }
  for (const loc of siteConfig.locales.enabled) {
    languages[loc] =
      loc === defaultLocale
        ? `${base}/case-studies/${encodedSlug}`
        : `${base}/${loc}/case-studies/${encodedSlug}`
  }

  const title = study.tagline ?? study.name

  return {
    title: `${title} | ${t('title')}`,
    ...(study.tagline ? { description: study.tagline } : {}),
    openGraph: {
      title,
      ...(study.tagline ? { description: study.tagline } : {}),
      url: `${base}${canonicalPath}`,
      siteName: siteConfig.site.name,
      locale,
      type: 'article',
      ...(study.photoUrl ? { images: [{ url: study.photoUrl }] } : {}),
    },
    alternates: {
      canonical: `${base}${canonicalPath}`,
      languages,
    },
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  if (!siteConfig.features.caseStudies) notFound()

  const { locale, slug: rawSlug } = await params
  if (!isLocale(locale)) notFound()
  const slug = decodeURIComponent(rawSlug)

  const [study, t] = await Promise.all([
    getCaseStudyBySlug(slug, locale),
    getTranslations({ locale, namespace: 'caseStudies' }),
  ])
  if (!study) notFound()

  const base = `https://${siteConfig.site.domain}`
  const defaultLocale = siteConfig.locales.default
  const homeUrl = locale === defaultLocale ? base : `${base}/${locale}`
  const listUrl = locale === defaultLocale ? `${base}/case-studies` : `${base}/${locale}/case-studies`
  const encodedSlug = encodeURIComponent(slug)
  const pageUrl =
    locale === defaultLocale
      ? `${base}/case-studies/${encodedSlug}`
      : `${base}/${locale}/case-studies/${encodedSlug}`
  const backHref = locale === defaultLocale ? '/case-studies' : `/${locale}/case-studies`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabels[locale], item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t('title'), item: listUrl },
      { '@type': 'ListItem', position: 3, name: study.tagline ?? study.name, item: pageUrl },
    ],
  }

  const ctaProps: CTABannerBlockProps = {
    heading: t('ctaHeading'),
    primaryButton: { label: t('ctaButton'), href: '/contact' },
    variant: 'filled',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Section padding="lg">
        <Container>
          <Link
            href={backHref}
            className="mb-8 inline-block text-sm font-medium text-brand-primary hover:underline"
          >
            ← {t('backTo')}
          </Link>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              {study.tagline && (
                <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tight text-text-primary md:text-4xl">
                  {study.tagline}
                </h1>
              )}

              <div className="space-y-6">
                {study.challenge && (
                  <div>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-brand-primary">
                      {t('challenge')}
                    </span>
                    <p className="text-lg font-bold leading-relaxed text-text-primary">
                      {study.challenge}
                    </p>
                  </div>
                )}
                {study.solution && (
                  <div>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-brand-primary">
                      {t('solution')}
                    </span>
                    <p className="text-base font-normal leading-relaxed text-text-secondary">
                      {study.solution}
                    </p>
                  </div>
                )}
              </div>

              {study.metric && (
                <div className="mt-10 inline-flex flex-col items-start rounded-2xl bg-bg-tertiary px-6 py-5">
                  <span className="text-3xl font-extrabold text-brand-primary md:text-4xl">
                    {study.metric.value}
                  </span>
                  <span className="mt-1 text-sm text-text-secondary">{study.metric.caption}</span>
                </div>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-dark px-4 py-1.5 text-sm font-bold text-white">
                  {study.name}
                </span>
                {study.role && (
                  <span className="rounded-full border border-border-default bg-white px-4 py-1.5 text-xs font-medium text-text-primary">
                    {study.role}
                  </span>
                )}
              </div>
            </div>

            <div className="relative order-1 flex justify-center md:order-2">
              <div className="relative h-72 w-72 md:h-96 md:w-96">
                <span
                  aria-hidden="true"
                  className="absolute -left-6 -top-6 z-0 h-20 w-20 rounded-full bg-brand-accent"
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-2 left-16 z-0 h-8 w-8 rounded-full bg-brand-primary-light"
                />
                {study.photoUrl ? (
                  <div className="relative z-10 h-full w-full overflow-hidden rounded-full shadow-lg">
                    <Image
                      src={study.photoUrl}
                      alt={study.name}
                      fill
                      sizes="(max-width: 768px) 288px, 384px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative z-10 h-full w-full rounded-full bg-neutral-100" />
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <CTABannerBlock {...ctaProps} />
    </>
  )
}
