import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import siteConfig from '../../../../../site.config'
import { getCaseStudies } from '@/lib/case-studies'
import { HeroBlock, CTABannerBlock } from '@saidatech/cms-core/blocks'
import type { HeroBlockProps, CTABannerBlockProps } from '@saidatech/cms-core/blocks'
import { CaseStudiesListGrid } from './CaseStudiesListGrid'
import { CaseStudiesHeroBackground } from './CaseStudiesHeroBackground'
import { Container } from '@saidatech/cms-core/components/ui'


export const revalidate = 3600

const LOCALES = ['en', 'ja', 'bn'] as const
type Locale = (typeof LOCALES)[number]

function isLocale(s: string): s is Locale {
  return (LOCALES as readonly string[]).includes(s)
}

type Props = { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return siteConfig.locales.enabled.map((locale) => ({ locale }))
}

const homeLabels: Record<Locale, string> = {
  en: 'Home',
  ja: 'ホーム',
  bn: 'হোম',
}

// Add near the top of page.tsx, alongside homeLabels
const heroContent: Record<Locale, { eyebrow: string; subheading: string }> = {
  en: {
    eyebrow: 'Stories...',
    subheading:
      'Meet our successful clients and learn about their work and daily life in Japan. Discover why they chose sadiatec and how we helped them achieve their goals.',
  },
  ja: {
    eyebrow: '日本語: ストーリー...',
    subheading:
      '日本で活躍するお客様の仕事や日常生活をご紹介します。なぜSadiatecを選び、私たちがどのように目標達成をサポートしたのかをご覧ください。',
  },
  bn: {
    eyebrow: 'গল্পসমূহ...',
    subheading:
      'জাপানে আমাদের সফল ক্লায়েন্টদের কাজ ও দৈনন্দিন জীবনের গল্প জানুন। দেখুন কেন তারা সাদিয়াটেককে বেছে নিয়েছেন এবং কীভাবে আমরা তাদের লক্ষ্য পূরণে সহায়তা করেছি।',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const t = await getTranslations({ locale, namespace: 'caseStudies' })
  const base = `https://${siteConfig.site.domain}`
  const defaultLocale = siteConfig.locales.default
  const canonicalPath = locale === defaultLocale ? '/case-studies' : `/${locale}/case-studies`

  const languages: Record<string, string> = { 'x-default': `${base}/case-studies` }
  for (const loc of siteConfig.locales.enabled) {
    languages[loc] = loc === defaultLocale ? `${base}/case-studies` : `${base}/${loc}/case-studies`
  }

  const title = t('title')

  return {
    title,
    
    openGraph: {
      title,
      url: `${base}${canonicalPath}`,
      siteName: siteConfig.site.name,
      locale,
      type: 'website',
    },
    alternates: {
      canonical: `${base}${canonicalPath}`,
      languages,
    },
  }
}

export default async function CaseStudiesIndexPage({ params }: Props) {
  if (!siteConfig.features.caseStudies) notFound()

   const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [studies, t] = await Promise.all([
    getCaseStudies(locale),
    getTranslations({ locale, namespace: 'caseStudies' }),
  ])

  const hero = heroContent[locale]

  const base = `https://${siteConfig.site.domain}`
  const defaultLocale = siteConfig.locales.default
  const homeUrl = locale === defaultLocale ? base : `${base}/${locale}`
  const pageUrl = locale === defaultLocale ? `${base}/case-studies` : `${base}/${locale}/case-studies`

  const title = t('title')

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabels[locale], item: homeUrl },
      { '@type': 'ListItem', position: 2, name: title, item: pageUrl },
    ],
  }

  const heroProps: HeroBlockProps = {
    heading: title,
    overlayOpacity: 40,
    variant: 'center',
    minHeight: 'medium',
    transparentHeader: false,
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
     <div className="relative isolate overflow-hidden">
        <CaseStudiesHeroBackground />
        <div className="relative z-10">
           <Container>
      <div className="max-w-2xl pt-20 md:pt-22 text-left">
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-brand-accent md:text-gray-900">
          {hero.eyebrow}
        </h2>
        <p className="mt-4 text-lg text-black md:text-gray-600">
          {hero.subheading}
        </p>
      </div>
    </Container>
          <CaseStudiesListGrid
            studies={studies}
            locale={locale}
            defaultLocale={defaultLocale}
            viewLabel={t('viewStudy')}
          />
        </div>
      </div>
      <CTABannerBlock {...ctaProps} />
    </>
  )
}
