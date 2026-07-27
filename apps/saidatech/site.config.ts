import type { SiteConfig } from '@saidatech/cms-core/schema'

// Single source of truth for the recruitment vertical (jobs, seminars, case-studies
// collections + their blocks). features.jobListings/seminars mirror it below rather
// than being toggled independently, so the vertical can't be half-enabled.
const recruitmentVertical = true

const siteConfig: SiteConfig = {
  site: {
    name: 'Sadiatec',
    tagline: {
      en: 'Your Career, Our Mission',
      ja: 'あなたのキャリア、私たちの使命',
      bn: 'আপনার ক্যারিয়ার, আমাদের মিশন',
    },
    domain: 'sadiatec.com',
  },

  brand: {
    logoFile: 'Sadiatec_Logo-1-BG3rMlc7.png',
    faviconFile: 'favicon.ico',
    ogImageFile: 'og-image.jpg',
    colors: {
      primary: '#5FA9E6',
      secondary: '#4C87B8',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#F6F6F6',
      text: '#333333',
      muted: '#666666',
      error: '#dc2626',
      success: '#16a34a',
      warning: '#d97706',
      surfaceAlt: '#EBF5FF',
      surfaceSubtle: '#F8FAFC',
      surfaceFaint: '#FBFBFC',
      textSecondary: '#555555',
      headingDark: '#223344',
      deepAccent: '#2b7bb9',
      iconAccent: '#2B70A6',
      buttonAccent: '#5EA6E6',
      buttonAccentHover: '#4B93D3',
      priceHighlight: '#ffd23f',
    },
    typography: {
      fontSans: 'Lato',
      fontSizeBase: '16px',
      fontWeightHeading: '700',
      fontWeightBody: '400',
      perLocale: {
        bn: { fontSans: 'Noto Sans Bengali' },
      },
    },
  },

  locales: {
    enabled: ['en', 'ja', 'bn'],
    default: 'ja',
    direction: { en: 'ltr', ja: 'ltr', bn: 'ltr' },
  },

  verticals: {
    recruitment: recruitmentVertical,
  },

  features: {
    aiAgent: true,
    bookingWidget: false,
    jobListings: recruitmentVertical,
    events: false,
    seminars: recruitmentVertical,
    gallery: false,
    testimonials: true,
    downloads: true,
    news: true,
    team: true,
    locations: false,
    services: true,
    caseStudies: true,
    blog: true,
    company: true,
    recruit: true,
    faq: true,
    contact: true,
    about: false,
  },

  nav: {
    legalLinks: [
      { slug: '/privacy', labelKey: 'nav.privacy' },
      { slug: '/terms', labelKey: 'nav.terms' },
    ],
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/company/saidatec' },
      { platform: 'facebook', url: 'https://www.facebook.com/Sanaul.Haque786/?_rdr' },
      { platform: 'instagram', url: 'https://instagram.com/company/saidatec' },
      { platform: 'youtube', url: 'https://www.youtube.com/@theSADIATEC/featured' },
      
    ],
  },

  contact: {
    email: 'info@sadiatec.com',
  },

  forms: {
    contactRecipient: 'info@sadiatec.com',
    jobApplicationRecipient: 'info@sadiatec.com',
  },
  

  legal: {
    privacyPolicySlug: '/privacy',
    termsSlug: '/terms',
  },

  seo: {
    titleTemplate: '%s | Saidatech',
    defaultDescription: {
      en: 'Saidatech supports foreign workers with career placement and visa services in Japan.',
      ja: 'サイダテックは外国人労働者のキャリア・ビザ支援を提供します。',
      bn: 'সাইদাটেক জাপানে বিদেশী কর্মীদের ক্যারিয়ার ও ভিসা সেবা প্রদান করে।',
    },
    sitemapIncludeCollections: ['pages', 'news', 'blog', 'services', 'case-studies', 'team', 'seminars', 'company', 'recruit', 'faq', 'contact'],
  },

  integrations: {
    resendFromEmail: 'notifications@sadiatec.com',
    chatWidget: {
      url: 'https://sadiatec-assistant.vercel.app/widget-dist/widget.js',
      whatsappNumber: '819099546176',
      avatarUrl: 'https://sadiatec-assistant.vercel.app/sadiatec-assistant2.png',
      color: '#4f46e5',
    },
  },
}

export default siteConfig
