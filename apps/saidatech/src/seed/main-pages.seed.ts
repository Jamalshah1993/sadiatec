/**
 * Seed script for 3 main header menu pages:
 *   job-seekers, employers, news-events
 *
 * COLLECTION: pages (not services)
 * UPSERT: finds by slug, updates layout only for existing docs, creates for new ones.
 *
 * Run (with explicit DATABASE_URI):
 *   NODE_OPTIONS='--require /tmp/patch-next-env.cjs' \
 *   DATABASE_URI="..." \
 *   pnpm --filter saidatech exec tsx --env-file=.env.local src/seed/main-pages.seed.ts 2>&1
 */

import { getPayload } from 'payload'
import config from '../../payload.config'

// ---------------------------------------------------------------------------
// locale helpers (verbatim from services-more-pages.seed.ts)
// ---------------------------------------------------------------------------

function isLocaleMap(val: unknown): val is { en: unknown; ja: unknown; bn: unknown } {
  if (typeof val !== 'object' || val === null || Array.isArray(val)) return false
  const keys = Object.keys(val as object)
  return keys.length === 3 && 'en' in val && 'ja' in val && 'bn' in val
}

function forLocale(data: unknown, locale: 'en' | 'ja' | 'bn'): unknown {
  if (data === null || data === undefined) return data
  if (typeof data !== 'object') return data
  if (Array.isArray(data)) return data.map((item) => forLocale(item, locale))
  if (isLocaleMap(data)) return forLocale((data as Record<string, unknown>)[locale], locale)
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data as object)) {
    result[key] = forLocale(value, locale)
  }
  return result
}

function withIds(seed: unknown, created: unknown): unknown {
  if (!created || typeof created !== 'object') return seed
  if (Array.isArray(seed) && Array.isArray(created)) {
    return (seed as unknown[]).map((item, i) => withIds(item, (created as unknown[])[i]))
  }
  if (typeof seed === 'object' && seed !== null) {
    const c = created as Record<string, unknown>
    const result: Record<string, unknown> = {}
    if (c['id']) result['id'] = c['id']
    for (const [key, value] of Object.entries(seed as object)) {
      const cv = c[key]
      if (typeof value === 'object' && value !== null && typeof cv === 'object' && cv !== null) {
        result[key] = withIds(value, cv)
      } else {
        result[key] = value
      }
    }
    return result
  }
  return seed
}

// ---------------------------------------------------------------------------
// Upsert helper for 'pages' collection
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upsertPage(
  payload: unknown,
  slug: string,
  title: { en: string; ja: string; bn: string },
  layout: unknown[],
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = payload as any

  const existing = await p.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    const id = existing.docs[0].id
    const updated = await p.update({
      collection: 'pages',
      id,
      locale: 'ja',
      data: {
        title: title.ja,
        layout: forLocale(layout, 'ja'),
      },
    })
    for (const locale of ['en', 'bn'] as const) {
      await p.update({
        collection: 'pages',
        id,
        locale,
        data: {
          title: title[locale],
          layout: withIds(forLocale(layout, locale), updated.layout),
        },
      })
    }
    console.log(`  ✅ Updated /${slug}`)
  } else {
    const doc = await p.create({
      collection: 'pages',
      locale: 'ja',
      data: {
        title: title.ja,
        slug,
        layout: forLocale(layout, 'ja'),
      },
    })
    for (const locale of ['en', 'bn'] as const) {
      await p.update({
        collection: 'pages',
        id: doc.id,
        locale,
        data: {
          title: title[locale],
          layout: withIds(forLocale(layout, locale), doc.layout),
        },
      })
    }
    console.log(`  ✅ Created /${slug}`)
  }
}

// ---------------------------------------------------------------------------
// Page 1 — job-seekers
// ---------------------------------------------------------------------------

const jobSeekersLayout = [
  {
    blockType: 'page-hero',
    variant: 'hero',
    heading: {
      en: 'Find Your Dream Job in Japan',
      ja: '日本で理想の仕事を見つけましょう',
      bn: 'জাপানে আপনার স্বপ্নের চাকরি খুঁজুন',
    },
    coloredSubtitle: {
      en: 'Global Opportunities. Local Support.',
      ja: 'グローバルな機会。地域に密着したサポート。',
      bn: 'বৈশ্বিক সুযোগ। স্থানীয় সহায়তা।',
    },
    body: {
      en: 'Sadiatec connects skilled workers from Bangladesh and beyond with leading employers across Japan. From visa support to language training, we guide you every step of the way.',
      ja: 'Sadiatecはバングラデシュをはじめとする優秀な人材と、日本全国の一流企業を結びます。ビザ申請から語学研修まで、すべてのステップでサポートします。',
      bn: 'সাদিয়াটেক বাংলাদেশসহ অন্যান্য দেশের দক্ষ কর্মীদের জাপানের শীর্ষস্থানীয় নিয়োগকর্তাদের সাথে সংযুক্ত করে। ভিসা সহায়তা থেকে ভাষা প্রশিক্ষণ পর্যন্ত প্রতিটি ধাপে আমরা আপনার পাশে আছি।',
    },
    primaryButton: {
      label: {
        en: 'Browse Current Openings',
        ja: '求人情報を見る',
        bn: 'চাকরির তালিকা দেখুন',
      },
      href: '#openings',
    },
    secondaryButton: {
      label: {
        en: 'Contact Us',
        ja: 'お問い合わせ',
        bn: 'যোগাযোগ করুন',
      },
      href: '/contact',
    },
    overlayOpacity: 55,
    overlayColor: 'black',
    showBreadcrumb: false,
    minHeight: 'lg',
  },

  {
    blockType: 'timeline',
    eyebrow: {
      en: 'Current Opportunities',
      ja: '現在の求人',
      bn: 'বর্তমান সুযোগ',
    },
    heading: {
      en: 'Latest Job Openings',
      ja: '最新求人情報',
      bn: 'সর্বশেষ চাকরির বিজ্ঞাপন',
    },
    openings: [
      {
        title: {
          en: 'Construction Site Supervisor',
          ja: '建設現場監督',
          bn: 'নির্মাণ সাইট সুপারভাইজার',
        },
        company: 'Maruwa Construction Co., Ltd.',
        location: { en: 'Aichi, Japan', ja: '愛知県', bn: 'আইচি, জাপান' },
        salary: '¥250,000–¥300,000/month',
        postedDate: '2026-06-01',
        tag: 'standard',
        applyHref: '/contact',
      },
      {
        title: {
          en: 'Food Processing Worker',
          ja: '食品製造スタッフ',
          bn: 'খাদ্য প্রক্রিয়াকরণ কর্মী',
        },
        company: 'Nippon Foods Industry',
        location: { en: 'Saitama, Japan', ja: '埼玉県', bn: 'সাইতামা, জাপান' },
        salary: '¥200,000–¥240,000/month',
        postedDate: '2026-06-03',
        tag: 'urgent',
        applyHref: '/contact',
      },
      {
        title: {
          en: 'Manufacturing Line Operator',
          ja: '製造ラインオペレーター',
          bn: 'ম্যানুফ্যাকচারিং লাইন অপারেটর',
        },
        company: 'Yokohama Parts Manufacturing',
        location: { en: 'Kanagawa, Japan', ja: '神奈川県', bn: 'কানাগাওয়া, জাপান' },
        salary: '¥220,000–¥260,000/month',
        postedDate: '2026-05-28',
        tag: 'standard',
        applyHref: '/contact',
      },
      {
        title: {
          en: 'Care Worker (Nursing Support)',
          ja: '介護スタッフ（看護補助）',
          bn: 'কেয়ার ওয়ার্কার (নার্সিং সাপোর্ট)',
        },
        company: 'Sakura Care Center',
        location: { en: 'Osaka, Japan', ja: '大阪府', bn: 'ওসাকা, জাপান' },
        salary: '¥210,000–¥250,000/month',
        postedDate: '2026-06-05',
        tag: 'urgent',
        applyHref: '/contact',
      },
      {
        title: {
          en: 'IT Support Technician',
          ja: 'ITサポート技術者',
          bn: 'আইটি সাপোর্ট টেকনিশিয়ান',
        },
        company: 'Tokyo Systems Solutions',
        location: { en: 'Tokyo, Japan', ja: '東京都', bn: 'টোকিও, জাপান' },
        salary: '¥280,000–¥340,000/month',
        postedDate: '2026-06-02',
        tag: 'standard',
        applyHref: '/contact',
      },
      {
        title: {
          en: 'Agricultural Technical Intern',
          ja: '農業技能実習生',
          bn: 'কৃষি কারিগরি ইন্টার্ন',
        },
        company: 'Hokkaido Agri Partners',
        location: { en: 'Hokkaido, Japan', ja: '北海道', bn: 'হোক্কাইদো, জাপান' },
        salary: '¥190,000–¥220,000/month',
        postedDate: '2026-05-30',
        tag: 'standard',
        applyHref: '/contact',
      },
    ],
    processEyebrow: {
      en: 'How to Apply',
      ja: '応募の流れ',
      bn: 'আবেদনের প্রক্রিয়া',
    },
    processSteps: [
      {
        number: 1,
        title: {
          en: 'Register with Sadiatec',
          ja: 'Sadiatecに登録',
          bn: 'সাদিয়াটেকে নিবন্ধন করুন',
        },
        description: {
          en: 'Submit your documents and profile to our Dhaka office or online.',
          ja: 'ダッカオフィスまたはオンラインで書類とプロフィールを提出します。',
          bn: 'আমাদের ঢাকা অফিসে বা অনলাইনে আপনার নথি ও প্রোফাইল জমা দিন।',
        },
      },
      {
        number: 2,
        title: {
          en: 'Skills & Language Assessment',
          ja: 'スキル・語学評価',
          bn: 'দক্ষতা ও ভাষা মূল্যায়ন',
        },
        description: {
          en: 'Attend an in-person or online assessment to evaluate your skills and Japanese language level.',
          ja: '対面またはオンラインで、スキルと日本語レベルの評価を受けます。',
          bn: 'আপনার দক্ষতা ও জাপানি ভাষার স্তর মূল্যায়নের জন্য ব্যক্তিগত বা অনলাইন মূল্যায়নে অংশ নিন।',
        },
      },
      {
        number: 3,
        title: {
          en: 'Job Matching',
          ja: '求人マッチング',
          bn: 'চাকরি মিলানো',
        },
        description: {
          en: 'We match you with the most suitable employer based on your skills, experience, and preferences.',
          ja: 'スキル・経験・希望に基づいて最適な雇用主とマッチングします。',
          bn: 'আপনার দক্ষতা, অভিজ্ঞতা ও পছন্দ অনুযায়ী সবচেয়ে উপযুক্ত নিয়োগকর্তার সাথে মিলিয়ে দেওয়া হয়।',
        },
      },
      {
        number: 4,
        title: {
          en: 'Visa & Document Support',
          ja: 'ビザ・書類サポート',
          bn: 'ভিসা ও নথি সহায়তা',
        },
        description: {
          en: 'Our team supports the full visa application process through the Japanese Embassy.',
          ja: '日本大使館を通じたビザ申請プロセスを全面的にサポートします。',
          bn: 'আমাদের দল জাপানি দূতাবাসের মাধ্যমে সম্পূর্ণ ভিসা আবেদন প্রক্রিয়ায় সহায়তা করে।',
        },
      },
      {
        number: 5,
        title: {
          en: 'Pre-departure Training',
          ja: '渡航前研修',
          bn: 'প্রস্থান-পূর্ব প্রশিক্ষণ',
        },
        description: {
          en: 'Complete a Japanese language, culture, and workplace orientation programme before you depart.',
          ja: '出発前に日本語・文化・職場オリエンテーションプログラムを修了します。',
          bn: 'প্রস্থানের আগে জাপানি ভাষা, সংস্কৃতি ও কর্মক্ষেত্র অভিমুখীকরণ কার্যক্রম সম্পন্ন করুন।',
        },
      },
      {
        number: 6,
        title: {
          en: 'Arrive & Begin Your Career',
          ja: '来日・キャリアスタート',
          bn: 'আগমন ও ক্যারিয়ার শুরু',
        },
        description: {
          en: 'Sadiatec staff meets you at the airport and supports your first days in Japan.',
          ja: 'Sadiatecスタッフが空港でお迎えし、来日後の生活もサポートします。',
          bn: 'সাদিয়াটেকের কর্মীরা বিমানবন্দরে স্বাগত জানায় এবং জাপানে আপনার প্রথম দিনগুলোতে সহায়তা করে।',
        },
      },
    ],
  },

  {
    blockType: 'stats-bar',
    backgroundStyle: 'brand',
    layout: 'grid',
    items: [
      {
        label: {
          en: 'Registered Workers',
          ja: '登録スタッフ数',
          bn: 'নিবন্ধিত কর্মী',
        },
        body: {
          en: 'Over 5,000 registered workers and candidates across Bangladesh and Japan.',
          ja: 'バングラデシュと日本で5,000名以上が登録しています。',
          bn: 'বাংলাদেশ ও জাপানে ৫,০০০-এরও বেশি নিবন্ধিত কর্মী ও প্রার্থী।',
        },
      },
      {
        label: {
          en: 'Years of Experience',
          ja: '実績年数',
          bn: 'অভিজ্ঞতার বছর',
        },
        body: {
          en: '17+ years placing international talent in Japan across construction, manufacturing, and services.',
          ja: '建設・製造・サービス業で17年以上の国際人材紹介実績。',
          bn: 'নির্মাণ, উৎপাদন ও সেবা খাতে ১৭+ বছর ধরে আন্তর্জাতিক প্রতিভা নিয়োগের অভিজ্ঞতা।',
        },
      },
      {
        label: {
          en: 'Industries Served',
          ja: '対応業種数',
          bn: 'সেবাপ্রাপ্ত শিল্প',
        },
        body: {
          en: 'Active placements across 10+ industries including construction, food production, care work, and IT.',
          ja: '建設・食品製造・介護・ITなど10以上の業種での就職支援実績。',
          bn: 'নির্মাণ, খাদ্য উৎপাদন, যত্ন সেবা ও আইটিসহ ১০+ শিল্পে সক্রিয় নিয়োগ।',
        },
      },
      {
        label: {
          en: 'Multilingual Support',
          ja: '多言語サポート',
          bn: 'বহুভাষিক সহায়তা',
        },
        body: {
          en: 'Full support in Japanese, English, and Bengali — from application to arrival and beyond.',
          ja: '申請から来日後まで、日本語・英語・ベンガル語でフルサポート。',
          bn: 'আবেদন থেকে আগমন পর্যন্ত জাপানি, ইংরেজি ও বাংলায় সম্পূর্ণ সহায়তা।',
        },
      },
    ],
  },

  {
    blockType: 'cta-banner',
    heading: {
      en: 'Ready to Start Your Journey to Japan?',
      ja: '日本への旅を始める準備はできていますか？',
      bn: 'জাপানে যাত্রা শুরু করতে প্রস্তুত?',
    },
    body: {
      en: 'Contact our team today and take the first step towards your new career in Japan.',
      ja: '今すぐSadiatecチームに連絡し、日本での新しいキャリアへの第一歩を踏み出しましょう。',
      bn: 'আজই আমাদের দলের সাথে যোগাযোগ করুন এবং জাপানে আপনার নতুন ক্যারিয়ারের প্রথম পদক্ষেপ নিন।',
    },
    primaryButton: {
      label: { en: 'Apply Now', ja: '今すぐ応募', bn: 'এখনই আবেদন করুন' },
      href: '/contact',
    },
    backgroundStyle: 'brand',
    variant: 'gradient',
  },
]

// ---------------------------------------------------------------------------
// Page 2 — employers
// ---------------------------------------------------------------------------

const employersLayout = [
  {
    blockType: 'page-hero',
    variant: 'hero',
    heading: {
      en: 'Partner with Sadiatec to Build Your Team',
      ja: 'Sadiatecと組んでチームを作りましょう',
      bn: 'সাদিয়াটেকের সাথে আপনার দল গড়ুন',
    },
    coloredSubtitle: {
      en: 'Trusted Staffing Solutions for Japanese Businesses',
      ja: '日本企業向け信頼の採用ソリューション',
      bn: 'জাপানি ব্যবসার জন্য বিশ্বস্ত স্টাফিং সমাধান',
    },
    body: {
      en: 'Sadiatec provides Japanese businesses with access to a pre-screened, multilingual pool of international talent. We handle the full hiring cycle — from candidate sourcing and skills testing to visa support and on-arrival orientation.',
      ja: 'Sadiatecは日本企業に、事前審査済みの多言語国際人材プールへのアクセスを提供します。候補者の選定・スキルテストからビザ支援・来日後オリエンテーションまで採用サイクル全体をサポートします。',
      bn: 'সাদিয়াটেক জাপানি ব্যবসায়িক প্রতিষ্ঠানগুলোকে পূর্ব-স্ক্রীন করা বহুভাষিক আন্তর্জাতিক প্রতিভার অ্যাক্সেস দেয়। প্রার্থী অনুসন্ধান থেকে দক্ষতা পরীক্ষা, ভিসা সহায়তা এবং আগমনের পর অভিমুখীকরণ পর্যন্ত সম্পূর্ণ নিয়োগ চক্র আমরা পরিচালনা করি।',
    },
    primaryButton: {
      label: {
        en: 'Request Staffing',
        ja: '採用のご依頼',
        bn: 'স্টাফিং অনুরোধ করুন',
      },
      href: '/contact',
    },
    overlayOpacity: 60,
    overlayColor: 'black',
    showBreadcrumb: false,
    minHeight: 'lg',
  },

  {
    blockType: 'stats-bar',
    backgroundStyle: 'brand',
    layout: 'grid',
    items: [
      {
        label: {
          en: 'Recruitment Solutions',
          ja: '採用ソリューション',
          bn: 'নিয়োগ সমাধান',
        },
        body: {
          en: "Comprehensive hiring services tailored to your company's specific workforce needs, from TITP to Specified Skilled Workers.",
          ja: 'TITPから特定技能まで、貴社の具体的なニーズに合わせた包括的な採用サービス。',
          bn: 'টিআইটিপি থেকে স্পেসিফাইড স্কিলড ওয়ার্কার পর্যন্ত আপনার কোম্পানির নির্দিষ্ট কর্মশক্তির চাহিদা অনুযায়ী ব্যাপক নিয়োগ সেবা।',
        },
      },
      {
        label: {
          en: 'Talent Management',
          ja: 'タレントマネジメント',
          bn: 'প্রতিভা ব্যবস্থাপনা',
        },
        body: {
          en: 'Expert guidance on onboarding, workplace integration, and retaining international staff for the long term.',
          ja: '外国人スタッフの受入れ、職場への適応、長期雇用維持に関する専門的な支援。',
          bn: 'আন্তর্জাতিক কর্মীদের অনবোর্ডিং, কর্মক্ষেত্রে একীভূত করা এবং দীর্ঘমেয়াদে ধরে রাখার বিষয়ে বিশেষজ্ঞ নির্দেশনা।',
        },
      },
      {
        label: {
          en: 'Performance & Compliance',
          ja: 'パフォーマンス・コンプライアンス',
          bn: 'পারফরম্যান্স ও সম্মতি',
        },
        body: {
          en: 'Data-driven insights to optimise workforce performance, plus full support for Japanese labour law compliance.',
          ja: '従業員パフォーマンス最適化のためのデータ分析と、日本の労働法令への完全準拠サポート。',
          bn: 'কর্মশক্তির পারফরম্যান্স অপ্টিমাইজ করতে ডেটা-চালিত অন্তর্দৃষ্টি, এবং জাপানের শ্রম আইন মেনে চলার সম্পূর্ণ সহায়তা।',
        },
      },
      {
        label: {
          en: 'Visa & Documentation',
          ja: 'ビザ・書類手続き',
          bn: 'ভিসা ও ডকুমেন্টেশন',
        },
        body: {
          en: 'End-to-end visa application management and official documentation support for every worker placed.',
          ja: '配置したすべての労働者へのビザ申請管理と公式書類手続きの全面サポート。',
          bn: 'নিয়োগ করা প্রতিটি কর্মীর জন্য সম্পূর্ণ ভিসা আবেদন ব্যবস্থাপনা এবং সরকারি নথি সহায়তা।',
        },
      },
    ],
  },

  {
    blockType: 'timeline',
    eyebrow: {
      en: 'Our Hiring Process',
      ja: '採用プロセス',
      bn: 'আমাদের নিয়োগ প্রক্রিয়া',
    },
    heading: {
      en: 'Four Steps to Building Your Team',
      ja: 'チームを作る4つのステップ',
      bn: 'আপনার দল গড়ার চারটি ধাপ',
    },
    openings: [],
    processEyebrow: {
      en: 'How It Works',
      ja: 'プロセスの流れ',
      bn: 'কীভাবে কাজ করে',
    },
    processSteps: [
      {
        number: 1,
        title: {
          en: 'Submit Your Requirements',
          ja: '採用要件のご提出',
          bn: 'আপনার চাহিদা জমা দিন',
        },
        description: {
          en: 'Tell us about the roles you need, required skills, preferred industries, and hiring timeline. We handle the rest.',
          ja: '必要な職種・スキル・希望業種・採用スケジュールをお知らせください。あとはSadiatecがお任せします。',
          bn: 'আপনার প্রয়োজনীয় পদ, দরকারি দক্ষতা, পছন্দের শিল্প এবং নিয়োগের সময়সীমা সম্পর্কে আমাদের জানান। বাকিটা আমরা সামলে নেব।',
        },
      },
      {
        number: 2,
        title: {
          en: 'Candidate Matching',
          ja: '候補者マッチング',
          bn: 'প্রার্থী মিলানো',
        },
        description: {
          en: 'We screen our registered pool and match the most suitable candidates to your requirements using skills tests and interviews.',
          ja: '登録候補者の中からスキルテストと面接を通じて最適な人材をマッチングします。',
          bn: 'আমরা নিবন্ধিত পুল স্ক্রীন করি এবং দক্ষতা পরীক্ষা ও সাক্ষাৎকারের মাধ্যমে আপনার চাহিদায় সবচেয়ে উপযুক্ত প্রার্থীদের মিলিয়ে দিই।',
        },
      },
      {
        number: 3,
        title: {
          en: 'Interview & Selection',
          ja: '面接・選考',
          bn: 'সাক্ষাৎকার ও বাছাই',
        },
        description: {
          en: 'Arrange interviews with shortlisted candidates. We provide interpretation support and assessment coordination throughout.',
          ja: '選考候補者との面接を手配します。通訳サポートと選考調整も全面的にサポートします。',
          bn: 'শর্টলিস্ট করা প্রার্থীদের সাথে সাক্ষাৎকারের ব্যবস্থা করুন। আমরা সারাজুড়ে ব্যাখ্যা সহায়তা ও মূল্যায়ন সমন্বয় প্রদান করি।',
        },
      },
      {
        number: 4,
        title: {
          en: 'Onboarding & Ongoing Support',
          ja: '採用・オンボーディング・継続サポート',
          bn: 'অনবোর্ডিং ও চলমান সহায়তা',
        },
        description: {
          en: 'After placement, Sadiatec continues to support both employer and worker — from arrival logistics and cultural orientation to workplace issue resolution.',
          ja: '配置後もSadiatecは雇用主・労働者双方をサポート。来日手続き・文化適応から職場の問題解決まで継続的にサポートします。',
          bn: 'নিয়োগের পরেও সাদিয়াটেক নিয়োগকর্তা ও কর্মী উভয়কে সহায়তা করে — আগমনের লজিস্টিক্স ও সাংস্কৃতিক অভিমুখীকরণ থেকে কর্মক্ষেত্রের সমস্যা সমাধান পর্যন্ত।',
        },
      },
    ],
  },

  {
    blockType: 'affiliates',
    heading: {
      en: 'Partners & Certifications',
      ja: 'パートナー・認定機関',
      bn: 'অংশীদার ও সার্টিফিকেশন',
    },
    body: {
      en: 'Sadiatec is a registered sending organisation and works with licensed supervising organisations, immigration authorities, and industry partners across Japan.',
      ja: 'Sadiatecは登録送出機関として、日本全国の認定監理団体・入国管理機関・業界パートナーと連携しています。',
      bn: 'সাদিয়াটেক একটি নিবন্ধিত প্রেরণ সংস্থা এবং জাপান জুড়ে লাইসেন্সপ্রাপ্ত তত্ত্বাবধায়ক সংস্থা, ইমিগ্রেশন কর্তৃপক্ষ ও শিল্প অংশীদারদের সাথে কাজ করে।',
    },
    layout: 'logos',
    animation: 'marquee',
    items: [
      {
        name: {
          en: 'KDDI Corporation',
          ja: 'KDDI株式会社',
          bn: 'কেডিডিআই কর্পোরেশন',
        },
      },
      {
        name: {
          en: 'au (KDDI Mobile)',
          ja: 'au（KDDI）',
          bn: 'এউ (কেডিডিআই মোবাইল)',
        },
      },
      {
        name: {
          en: 'Marubeni Corporation',
          ja: '丸紅株式会社',
          bn: 'মারুবেনি কর্পোরেশন',
        },
      },
      {
        name: {
          en: 'TM (Registered Supervising Organisation)',
          ja: 'TM（認定監理団体）',
          bn: 'টিএম (নিবন্ধিত তত্ত্বাবধায়ক সংস্থা)',
        },
      },
    ],
  },

  {
    blockType: 'bento-grid',
    eyebrow: {
      en: 'Why Partner with Us',
      ja: 'Sadiatecを選ぶ理由',
      bn: 'কেন আমাদের সাথে অংশীদারিত্ব করবেন',
    },
    heading: {
      en: 'The Sadiatec Advantage',
      ja: 'Sadiatecのアドバンテージ',
      bn: 'সাদিয়াটেকের সুবিধা',
    },
    layout: 'standard',
    items: [
      {
        number: '01',
        title: {
          en: 'Pre-screened Talent Pool',
          ja: '事前審査済み人材プール',
          bn: 'পূর্ব-স্ক্রীন করা প্রতিভার পুল',
        },
        description: {
          en: 'Access thousands of pre-assessed candidates ready for placement in Japanese industries — reducing your time-to-hire significantly.',
          ja: '日本の産業に対応した事前審査済みの候補者が多数登録。採用までの時間を大幅に短縮できます。',
          bn: 'জাপানি শিল্পে নিয়োগের জন্য প্রস্তুত হাজার হাজার পূর্ব-মূল্যায়িত প্রার্থীতে প্রবেশ করুন — নিয়োগে সময় উল্লেখযোগ্যভাবে কমিয়ে দিন।',
        },
      },
      {
        number: '02',
        title: {
          en: 'Full Compliance Assurance',
          ja: '完全なコンプライアンス保証',
          bn: 'সম্পূর্ণ সম্মতি নিশ্চয়তা',
        },
        description: {
          en: 'We are a licensed sending organisation and registered support agency. Every placement meets Japanese immigration and labour law requirements.',
          ja: '当社は認定送出機関かつ登録支援機関です。すべての配置が日本の入管・労働法令の要件を満たしています。',
          bn: 'আমরা একটি লাইসেন্সপ্রাপ্ত প্রেরণ সংস্থা এবং নিবন্ধিত সহায়তা সংস্থা। প্রতিটি নিয়োগ জাপানের ইমিগ্রেশন ও শ্রম আইনের প্রয়োজনীয়তা পূরণ করে।',
        },
      },
      {
        number: '03',
        title: {
          en: 'Multilingual Communication',
          ja: '多言語コミュニケーション',
          bn: 'বহুভাষিক যোগাযোগ',
        },
        description: {
          en: 'Our team bridges Japanese, English, and Bengali — eliminating communication barriers between your management and international staff.',
          ja: '日本語・英語・ベンガル語に対応したチームが、管理職と外国人スタッフの間のコミュニケーション障壁を解消します。',
          bn: 'আমাদের দল জাপানি, ইংরেজি ও বাংলার মধ্যে সেতুবন্ধন করে — আপনার ম্যানেজমেন্ট ও আন্তর্জাতিক কর্মীদের মধ্যে যোগাযোগের বাধা দূর করে।',
        },
      },
      {
        number: '04',
        title: {
          en: 'Post-placement Support',
          ja: '配置後サポート',
          bn: 'নিয়োগ-পরবর্তী সহায়তা',
        },
        description: {
          en: 'Sadiatec does not disappear after placement. We provide ongoing support for both employer and worker throughout the contract period.',
          ja: '配置後もSadiatecは継続的にサポートします。契約期間中、雇用主・労働者双方に継続的なサポートを提供します。',
          bn: 'নিয়োগের পরে সাদিয়াটেক অদৃশ্য হয়ে যায় না। আমরা চুক্তির মেয়াদ জুড়ে নিয়োগকর্তা ও কর্মী উভয়কে চলমান সহায়তা প্রদান করি।',
        },
      },
    ],
  },

  {
    blockType: 'cta-banner',
    heading: {
      en: 'Ready to Hire International Talent?',
      ja: '外国人材の採用をご検討ですか？',
      bn: 'আন্তর্জাতিক প্রতিভা নিয়োগে প্রস্তুত?',
    },
    body: {
      en: 'Schedule a consultation with our staffing team. We will assess your needs and recommend the most suitable programme for your company.',
      ja: '採用担当者との相談をご予約ください。貴社のニーズを把握し、最適なプログラムをご提案します。',
      bn: 'আমাদের স্টাফিং দলের সাথে পরামর্শ নির্ধারণ করুন। আমরা আপনার প্রয়োজনীয়তা মূল্যায়ন করব এবং আপনার কোম্পানির জন্য সবচেয়ে উপযুক্ত প্রোগ্রামের সুপারিশ করব।',
    },
    primaryButton: {
      label: {
        en: 'Request a Consultation',
        ja: 'ご相談のご依頼',
        bn: 'পরামর্শ অনুরোধ করুন',
      },
      href: '/contact',
    },
    backgroundStyle: 'brand',
    variant: 'gradient',
  },
]

// ---------------------------------------------------------------------------
// Page 3 — news-events
// Note: event-list block excluded — features.events is false in site.config.ts
// ---------------------------------------------------------------------------

const newsEventsLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'News & Updates',
      ja: 'ニュース・更新情報',
      bn: 'সংবাদ ও আপডেট',
    },
    showBreadcrumb: false,
  },

  {
    blockType: 'news-list',
    eyebrow: {
      en: 'Latest News',
      ja: '最新ニュース',
      bn: 'সর্বশেষ সংবাদ',
    },
    heading: {
      en: 'Company News & Announcements',
      ja: '会社ニュース・お知らせ',
      bn: 'কোম্পানির সংবাদ ও ঘোষণা',
    },
    intro: {
      en: "Stay informed about Sadiatec's latest initiatives, partnerships, and announcements.",
      ja: 'Sadiatecの最新情報、パートナーシップ、お知らせをご確認ください。',
      bn: 'সাদিয়াটেকের সর্বশেষ উদ্যোগ, অংশীদারিত্ব ও ঘোষণা সম্পর্কে অবহিত থাকুন।',
    },
    source: 'collection',
    count: 6,
    viewAllCta: {
      label: {
        en: 'All News',
        ja: 'すべてのニュース',
        bn: 'সব সংবাদ',
      },
      href: '/news-events',
    },
  },

  {
    blockType: 'blog-teaser',
    eyebrow: {
      en: 'From Our Blog',
      ja: 'ブログより',
      bn: 'আমাদের ব্লগ থেকে',
    },
    heading: {
      en: 'Insights & Guides',
      ja: 'インサイトとガイド',
      bn: 'অন্তর্দৃষ্টি ও গাইড',
    },
    intro: {
      en: 'Practical guides on working in Japan, visa processes, language tips, and career development.',
      ja: '日本での仕事、ビザ手続き、語学のヒント、キャリア開発に関する実践的なガイド。',
      bn: 'জাপানে কাজ করা, ভিসা প্রক্রিয়া, ভাষার টিপস ও ক্যারিয়ার উন্নয়নের ব্যবহারিক গাইড।',
    },
    postsSource: 'latest',
    count: 3,
    readMoreLabel: {
      en: 'Read more',
      ja: '続きを読む',
      bn: 'আরও পড়ুন',
    },
    minReadSuffix: {
      en: 'min read',
      ja: '分で読める',
      bn: 'মিনিট পড়া',
    },
    viewAllCta: {
      label: {
        en: 'All Articles',
        ja: 'すべての記事',
        bn: 'সব নিবন্ধ',
      },
      href: '/blog',
    },
  },

  {
    blockType: 'cta-banner',
    heading: {
      en: 'Stay Connected with Sadiatec',
      ja: 'Sadiatecとつながりましょう',
      bn: 'সাদিয়াটেকের সাথে সংযুক্ত থাকুন',
    },
    body: {
      en: 'Subscribe to our newsletter for the latest job openings, visa news, and Japan career tips.',
      ja: '求人情報、ビザ情報、日本でのキャリアヒントをお届けするニュースレターを購読してください。',
      bn: 'সর্বশেষ চাকরির বিজ্ঞাপন, ভিসা সংবাদ ও জাপান ক্যারিয়ার টিপসের জন্য আমাদের নিউজলেটার সাবস্ক্রাইব করুন।',
    },
    primaryButton: {
      label: {
        en: 'Contact Us',
        ja: 'お問い合わせ',
        bn: 'যোগাযোগ করুন',
      },
      href: '/contact',
    },
    backgroundStyle: 'brand',
    variant: 'gradient',
  },
]

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

async function seedMainPages(): Promise<void> {
  const payload = await getPayload({ config })
  console.log('\n🌱 Seeding main header menu pages...\n')

  await upsertPage(
    payload,
    'job-seekers',
    {
      en: 'Job Seekers',
      ja: '求職者の方へ',
      bn: 'চাকরিপ্রার্থীদের জন্য',
    },
    jobSeekersLayout,
  )

  await upsertPage(
    payload,
    'employers',
    {
      en: 'Employers',
      ja: '採用企業の方へ',
      bn: 'নিয়োগকর্তাদের জন্য',
    },
    employersLayout,
  )

  await upsertPage(
    payload,
    'news-events',
    {
      en: 'News & Updates',
      ja: 'ニュース・更新情報',
      bn: 'সংবাদ ও আপডেট',
    },
    newsEventsLayout,
  )

  console.log('\n✅ Main pages seed complete.\n')
  process.exit(0)
}

seedMainPages().catch((err: unknown) => {
  console.error('Main pages seed failed:', err)
  process.exit(1)
})
