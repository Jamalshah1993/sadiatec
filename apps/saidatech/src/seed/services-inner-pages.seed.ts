/**
 * Seed script for 8 services inner pages.
 *
 * COLLECTION: services (not pages)
 * UPSERT: finds by slug, updates layout only for existing docs, creates for new ones.
 * RICHTEXT NOTE: richText fields stored without locale wrapper (default locale 'ja').
 *   Plain text fields use full { en, ja, bn } locale objects.
 *
 * Run:
 *   pnpm --filter saidatech tsx src/seed/services-inner-pages.seed.ts
 */

import { getPayload } from 'payload'
import config from '../../payload.config'

// ---------------------------------------------------------------------------
// richText helpers (same pattern as about-section.seed.ts)
// ---------------------------------------------------------------------------

function richText(text: string) {
  return {
    root: {
      type: 'root' as const,
      children: [
        {
          type: 'paragraph' as const,
          children: [
            {
              type: 'text' as const,
              text,
              version: 1,
              detail: 0,
              format: 0,
              mode: 'normal' as const,
              style: '',
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

function richTextMulti(...paragraphs: string[]) {
  return {
    root: {
      type: 'root' as const,
      children: paragraphs.map((text) => ({
        type: 'paragraph' as const,
        children: [
          {
            type: 'text' as const,
            text,
            version: 1,
            detail: 0,
            format: 0,
            mode: 'normal' as const,
            style: '',
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      })),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

function rt(text: string) { return richText(text) }
function rtMulti(...paragraphs: string[]) { return richTextMulti(...paragraphs) }

// ---------------------------------------------------------------------------
// locale helpers (copied verbatim from about-section.seed.ts)
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
// Upsert helper — updates layout on existing services, creates new ones
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upsertServiceLayout(
  payload: unknown,
  slug: string,
  layout: unknown[],
  newServiceMeta?: {
    title: { en: string; ja: string; bn: string }
    excerpt: { en: string; ja: string; bn: string }
  },
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = payload as any

  const existing = await p.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    const id = existing.docs[0].id
    const updated = await p.update({
      collection: 'services',
      id,
      locale: 'ja',
      data: { layout: forLocale(layout, 'ja') },
    })
    for (const locale of ['en', 'bn'] as const) {
      await p.update({
        collection: 'services',
        id,
        locale,
        data: { layout: withIds(forLocale(layout, locale), updated.layout) },
      })
    }
    console.log(`  ✅ Updated layout for /${slug}`)
  } else {
    if (!newServiceMeta) {
      console.log(`  ⚠️  Skipped /${slug} — not found and no metadata supplied`)
      return
    }
    const doc = await p.create({
      collection: 'services',
      locale: 'ja',
      data: {
        title: newServiceMeta.title.ja,
        excerpt: newServiceMeta.excerpt.ja,
        slug,
        active: true,
        sort: 99,
        layout: forLocale(layout, 'ja'),
      },
    })
    for (const locale of ['en', 'bn'] as const) {
      await p.update({
        collection: 'services',
        id: doc.id,
        locale,
        data: {
          title: newServiceMeta.title[locale],
          excerpt: newServiceMeta.excerpt[locale],
          layout: withIds(forLocale(layout, locale), doc.layout),
        },
      })
    }
    console.log(`  ✅ Created /${slug}`)
  }
}

// ---------------------------------------------------------------------------
// Shared CTA banner
// ---------------------------------------------------------------------------

const ctaBanner = {
  blockType: 'cta-banner',
  heading: {
    en: 'Find Your Dream Job in Japan',
    ja: '日本で理想の仕事を見つけましょう',
    bn: 'জাপানে আপনার স্বপ্নের চাকরি খুঁজুন',
  },
  body: {
    en: 'Experience the power of innovation and discover how our solutions can transform your journey. Schedule an individual consultation now.',
    ja: '革新の力を体験し、私たちのソリューションがあなたの旅をどのように変えられるかを発見してください。今すぐ個別相談をスケジュールしましょう。',
    bn: 'উদ্ভাবনের শক্তি অনুভব করুন এবং আমাদের সমাধান কীভাবে আপনার যাত্রাকে পরিবর্তন করতে পারে তা আবিষ্কার করুন। এখনই একটি ব্যক্তিগত পরামর্শ নির্ধারণ করুন।',
  },
  primaryButton: {
    label: {
      en: 'Start Your Application',
      ja: '申し込みを始める',
      bn: 'আবেদন শুরু করুন',
    },
    href: '/contact',
  },
  backgroundStyle: 'brand',
  variant: 'gradient',
}

// ---------------------------------------------------------------------------
// 1. sadia-nihongo-training-center
// ---------------------------------------------------------------------------

const nihongoLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'Sadia Nihongo Training Center',
      ja: 'サディア日本語トレーニングセンター',
      bn: 'সাদিয়া নিহোঙ্গো ট্রেনিং সেন্টার',
    },
    showBreadcrumb: false,
  },

  // Director's message
  {
    blockType: 'image-text-split',
    imagePosition: 'right',
    imageAlt: {
      en: 'Kansuke Yoshida, General Manager and Lecturer at Sadia Nihongo Training Center',
      ja: '吉田勘助 — サディア日本語トレーニングセンター 総務部長・講師',
      bn: 'কানসুকে ইয়োশিদা — সাদিয়া নিহোঙ্গো ট্রেনিং সেন্টারের জেনারেল ম্যানেজার ও লেক্টারার',
    },
    heading: {
      en: 'Message from the Japanese Programme Director',
      ja: 'トレーニングセンター日本人責任者からのメッセージ',
      bn: 'জাপানি প্রোগ্রাম পরিচালকের বার্তা',
    },
    body: rt(
      '2018年にバングラデシュに来た時から感じているのが、この国と人々に流れるエネルギーと優しさです。この国の若い人たちが日本に行き、自立した大人として家族を経済的に支えるという目標を達成しつつ、日本の強みである計画性や効率的な仕事の仕方を学ぶなら、双方のメリットになると考えております。当トレーニングセンターでは、語学だけではなく日本の習慣、マナー、仕事や勉強に取り組む態度などを生徒たちに教える努力を払っています。',
    ),
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  // About the centre
  {
    blockType: 'image-text-split',
    imagePosition: 'left',
    imageAlt: {
      en: 'Students studying Japanese at Sadia Nihongo Training Center, Dhaka',
      ja: 'ダッカのサディア日本語トレーニングセンターで学ぶ学生たち',
      bn: 'ঢাকায় সাদিয়া নিহোঙ্গো ট্রেনিং সেন্টারে জাপানি ভাষা পড়ছেন শিক্ষার্থীরা',
    },
    heading: {
      en: 'About Sadia Nihongo Training Center',
      ja: 'サディア日本語トレーニングセンターについて',
      bn: 'সাদিয়া নিহোঙ্গো ট্রেনিং সেন্টার সম্পর্কে',
    },
    body: rt(
      '2012年にバングラデシュのダッカに開設された言語トレーニングセンターは、2020年にサディア日本語トレーニングセンターに改名されました。経験豊富な日本人・バングラデシュ人講師が協力し、初級から上級まで対応するコースを提供しています。最新エアコン付きの快適な教室でJFT-A2/JLPT-N4対策（模擬試験含む）も行い、修了証を発行しています。',
    ),
    backgroundStyle: 'light',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  // Three strengths
  {
    blockType: 'business-line-list',
    displayMode: 'list',
    items: [
      {
        title: {
          en: 'Japanese Language Lessons',
          ja: '日本語授業',
          bn: 'জাপানি ভাষা শিক্ষা',
        },
        description: rt(
          '初級から上級レベルまで対応。JFT-A2/JLPT-N4対策（模擬試験含む）。コース期間：初級基礎（N5）約3ヶ月、中級（N4）約4ヶ月、上級（N3・N2）約6ヶ月。修了証発行。',
        ),
        features: [
          { text: { en: 'N5 Foundation Course — approx. 3 months', ja: '初級基礎コース（N5）：約3ヶ月', bn: 'এন৫ বেসিক কোর্স — প্রায় ৩ মাস' } },
          { text: { en: 'N4 Intermediate Course — approx. 4 months', ja: '中級コース（N4）：約4ヶ月', bn: 'এন৪ মধ্যবর্তী কোর্স — প্রায় ৪ মাস' } },
          { text: { en: 'N3/N2 Advanced Course — approx. 6 months', ja: '上級コース（N3・N2）：約6ヶ月', bn: 'এন৩/এন২ উন্নত কোর্স — প্রায় ৬ মাস' } },
          { text: { en: 'JFT-A2 / JLPT-N4 exam preparation included', ja: 'JFT-A2/JLPT-N4対策（模擬試験含む）', bn: 'জেএফটি-এ২ / জেএলপিটি-এন৪ পরীক্ষার প্রস্তুতি অন্তর্ভুক্ত' } },
        ],
      },
      {
        title: {
          en: 'Japanese Culture and Workplace Etiquette',
          ja: '日本文化・ビジネスマナー研修',
          bn: 'জাপানি সংস্কৃতি ও কর্মক্ষেত্রের শিষ্টাচার',
        },
        description: rt(
          '語学力に加え、日本の文化・習慣・マナーも学び、日本での留学前に適応力を高めます。日本人スタッフとバングラデシュ人スタッフが協力して、職場での振る舞いや生活習慣を丁寧に指導します。',
        ),
      },
      {
        title: {
          en: 'Visa, Part-time Work and Career Support',
          ja: 'ビザ・アルバイト・キャリア支援',
          bn: 'ভিসা, পার্টটাইম কাজ ও ক্যারিয়ার সহায়তা',
        },
        description: rt(
          '留学前のビザ取得サポート、健康診断手続き、日本でのアルバイト紹介、キャリアプランのサポートを行います。対応ビザカテゴリー：就労ビザ（IT・土木・機械・電気電子）、学生ビザ（英語・経営・会計・経済）。',
        ),
      },
    ],
  },

  // Licence info
  {
    blockType: 'rich-text',
    content: rt(
      '当センターおよびSadiatecが保有するライセンス：一般労働者派遣事業許可（sect 13-306144）、有料職業紹介事業許可（13-Yu-307401）、登録支援機関許可（20 registration 004486）、送出機関許可（1148番）。',
    ),
    maxWidth: 'prose',
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// 2. study-work-japan
// ---------------------------------------------------------------------------

const studyWorkJapanLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'Study & Work in Japan Program',
      ja: '日本留学・就労プログラム',
      bn: 'জাপানে পড়াশোনা ও কাজের প্রোগ্রাম',
    },
    showBreadcrumb: false,
  },

  // Program overview
  {
    blockType: 'rich-text',
    content: rt(
      '日本での学びと働きプログラムは、すべての応募者が順調に進むように設計された体系的なプロセスです。正式な申請から、学び・就業の初日まで丁寧にサポートします。現在、バングラデシュの学生を対象としています。到着後の住宅・オリエンテーションも手配します。学生はパートタイムワーカーとして週最大40時間まで合法的に働くことができます。',
    ),
    maxWidth: 'prose',
  },

  // Application documents
  {
    blockType: 'rich-text',
    content: rt(
      '申請書類：出生証明書のコピー（正式認証）、パスポートのコピー（全ページ）、関係証明書（申請者と財政支援者の関係を示す）、日本語学習証明書、学歴証明書と成績証明書、職歴証明書（もしあれば）、財政支援者の書類（勤務証明書、収入・貯金証明書、銀行明細書）、財政支援者の保証書、学校の入学申込書および申請者の履歴書。',
    ),
    maxWidth: 'wide',
  },

  // 12-step application process
  {
    blockType: 'timeline',
    eyebrow: {
      en: 'Application Steps',
      ja: '申請ステップ',
      bn: 'আবেদনের ধাপসমূহ',
    },
    heading: {
      en: 'Application Process Overview',
      ja: '申請プロセス概要',
      bn: 'আবেদন প্রক্রিয়ার সারসংক্ষেপ',
    },
    openings: [],
    processEyebrow: {
      en: 'How It Works',
      ja: 'プロセスの流れ',
      bn: 'কিভাবে কাজ করে',
    },
    processSteps: [
      { number: 1,  title: { en: 'Prepare Documents',       ja: '書類準備',         bn: 'নথি প্রস্তুত'              }, description: { en: 'Prepare all required application documents and submit to Sadiatec.', ja: '必要な申請書類をすべて準備し、Sadiatecに提出します。', bn: 'সমস্ত প্রয়োজনীয় আবেদনের নথি প্রস্তুত করুন এবং সাদিয়াটেকে জমা দিন।' } },
      { number: 2,  title: { en: 'Submit to School',        ja: '学校へ提出',        bn: 'স্কুলে জমা দিন'            }, description: { en: 'Sadiatec submits your documents to the selected Japanese language school.', ja: 'Sadiatecは申請者が選択した学校に書類を提出します。', bn: 'সাদিয়াটেক নির্বাচিত জাপানি ভাষা স্কুলে আপনার নথি জমা দেয়।' } },
      { number: 3,  title: { en: 'Immigration Review',      ja: '入国管理局審査',    bn: 'ইমিগ্রেশন পর্যালোচনা'     }, description: { en: 'The school submits documents to Japan Immigration for review.', ja: '学校は書類を日本の入国管理局に提出して審査を受けます。', bn: 'স্কুলটি জাপানের ইমিগ্রেশনে নথি পর্যালোচনার জন্য জমা দেয়।' } },
      { number: 4,  title: { en: 'Immigration Decision',    ja: '審査結果通知',      bn: 'ইমিগ্রেশন সিদ্ধান্ত'      }, description: { en: 'Japan Immigration notifies the school of the application result.', ja: '日本の入国管理局は申請結果を通知します。', bn: 'জাপান ইমিগ্রেশন আবেদনের ফলাফল জানায়।' } },
      { number: 5,  title: { en: 'Certificate of Eligibility', ja: '資格証明書発行', bn: 'যোগ্যতার সার্টিফিকেট'      }, description: { en: 'On approval, the school receives the Certificate of Eligibility.', ja: '申請が成功した場合、学校は資格証明書を受け取ります。', bn: 'অনুমোদনের পরে, স্কুলটি যোগ্যতার সার্টিফিকেট পায়।' } },
      { number: 6,  title: { en: 'Transfer Tuition Fee',    ja: '授業料振込',        bn: 'টিউশন ফি ট্রান্সফার'       }, description: { en: 'The applicant transfers the required tuition funds to the school.', ja: '申請者は必要な資金を学校に振り込みます。', bn: 'আবেদনকারী স্কুলে প্রয়োজনীয় টিউশন ফি পাঠান।' } },
      { number: 7,  title: { en: 'Receive Certificate',     ja: '資格証明書受取',    bn: 'সার্টিফিকেট গ্রহণ'         }, description: { en: 'The school sends the Certificate of Eligibility to the applicant.', ja: '学校は資格証明書を申請者に送ります。', bn: 'স্কুলটি আবেদনকারীকে যোগ্যতার সার্টিফিকেট পাঠায়।' } },
      { number: 8,  title: { en: 'Book Flight',              ja: 'フライト予約',      bn: 'ফ্লাইট বুক করুন'          }, description: { en: 'Book a one-way ticket to Japan (booking only — pay after visa approval).', ja: '日本への片道旅行を予約します（予約のみ、ビザ承認後に支払い）。', bn: 'জাপানে একমুখী টিকিট বুক করুন (বুকিং মাত্র — ভিসা অনুমোদনের পরে পেমেন্ট)।' } },
      { number: 9,  title: { en: 'Visa Interview',           ja: 'ビザ面接',          bn: 'ভিসা ইন্টারভিউ'            }, description: { en: 'Attend visa interview at the Japanese Embassy with certificate and flight booking.', ja: '資格証明書とフライト予約確認書を持って日本大使館でビザ面接を受けます。', bn: 'সার্টিফিকেট ও ফ্লাইট বুকিং নিয়ে জাপানি দূতাবাসে ভিসা ইন্টারভিউতে যোগ দিন।' } },
      { number: 10, title: { en: 'Visa Approval',            ja: 'ビザ承認',           bn: 'ভিসা অনুমোদন'             }, description: { en: 'Obtain the student visa; confirm and pay for the flight ticket.', ja: '日本の学生ビザを取得し、航空券が確認され、支払われます。', bn: 'স্টুডেন্ট ভিসা পান; ফ্লাইট টিকিট নিশ্চিত করুন এবং পেমেন্ট করুন।' } },
      { number: 11, title: { en: 'Arrival in Japan',         ja: '日本到着',           bn: 'জাপানে আগমন'              }, description: { en: 'Sadiatec staff meets you at the airport and escorts you to pre-arranged accommodation.', ja: 'Sadiatecのスタッフが空港で出迎え、宿泊施設に同行します。', bn: 'সাদিয়াটেকের কর্মীরা বিমানবন্দরে স্বাগত জানায় এবং পূর্ব-নির্ধারিত আবাসনে নিয়ে যায়।' } },
      { number: 12, title: { en: 'Begin Student Life',       ja: '学生生活スタート',   bn: 'ছাত্রজীবন শুরু'           }, description: { en: 'You begin your new student life in Japan.', ja: '申請者は日本で新しい学生生活を始めます。', bn: 'আপনি জাপানে আপনার নতুন ছাত্রজীবন শুরু করেন।' } },
    ],
  },

  // Japanese language course
  {
    blockType: 'business-line-list',
    displayMode: 'cards',
    heading: {
      en: 'Japanese Language Course',
      ja: '日本語コース',
      bn: 'জাপানি ভাষা কোর্স',
    },
    intro: {
      en: 'To improve your chances of academic success and part-time work, we strongly recommend enrolling in our Japanese language course.',
      ja: '学業成功の可能性を高め、アルバイトを得るために、Sadiatecが提供する日本語コースへの登録を強くお勧めします。',
      bn: 'একাডেমিক সাফল্য এবং পার্টটাইম কাজের সুযোগ বাড়াতে আমাদের জাপানি ভাষা কোর্সে নথিভুক্ত হওয়ার জন্য দৃঢ়ভাবে সুপারিশ করা হচ্ছে।',
    },
    items: [
      {
        icon: 'BookOpen',
        title: { en: 'Curriculum', ja: 'カリキュラム', bn: 'পাঠ্যক্রম' },
        description: rt(
          'Hiragana、Katakana、漢字（300文字）の習得。基本的な日本語の挨拶と表現。指定テキストブックによる基礎日本語授業。',
        ),
      },
      {
        icon: 'BookMarked',
        title: { en: 'Learning Materials', ja: '学習教材', bn: 'শিক্ষা উপকরণ' },
        description: rt(
          'Minna No Nihongo 1（メインテキスト）。各種視聴覚CD・DVD（日本のクリップ・映画など）。',
        ),
      },
      {
        icon: 'Clock',
        title: { en: 'Course Duration', ja: 'コース期間', bn: 'কোর্সের সময়কাল' },
        description: rt(
          '350時間（週3日）。毎週金曜日と祝日はお休みです。',
        ),
      },
    ],
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// 3. find-dream-job-japan  (NEW — no live equivalent)
// ---------------------------------------------------------------------------

const findDreamJobLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'Find Your Dream Job in Japan',
      ja: '日本で理想の仕事を見つけましょう',
      bn: 'জাপানে আপনার স্বপ্নের চাকরি খুঁজুন',
    },
    showBreadcrumb: false,
  },

  {
    blockType: 'image-text-split',
    imagePosition: 'right',
    imageAlt: {
      en: 'International professionals working in Japan through Sadiatec placement',
      ja: 'Sadiatecの紹介で日本で活躍する国際人材',
      bn: 'সাদিয়াটেকের মাধ্যমে জাপানে কর্মরত আন্তর্জাতিক পেশাদাররা',
    },
    heading: {
      en: 'Your Partner for Japan Career Placement',
      ja: '日本でのキャリア実現をサポートするパートナー',
      bn: 'জাপান ক্যারিয়ার নিয়োগে আপনার অংশীদার',
    },
    body: rt(
      'Sadiatecは、バングラデシュをはじめとする多国籍の人材と、日本の建設、食品製造、製造業などの成長産業を結びつけています。専任の担当者が履歴書作成から就労ビザ取得、来日後のサポートまで一貫して支援します。',
    ),
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  {
    blockType: 'stats-bar',
    backgroundStyle: 'light',
    layout: 'grid',
    items: [
      {
        label: { en: 'HR Recruitment', ja: '人材採用', bn: 'মানব সম্পদ নিয়োগ' },
        body: { en: 'General workers, technical interns, and Specified Skilled Workers.', ja: '一般労働者、技能実習生、特定技能労働者の採用サービス。', bn: 'সাধারণ কর্মী, কারিগরি ইন্টার্ন এবং বিশেষ দক্ষ কর্মীদের নিয়োগ সেবা।' },
      },
      {
        label: { en: 'Visa Support', ja: 'ビザサポート', bn: 'ভিসা সহায়তা' },
        body: { en: 'End-to-end visa application and document support.', ja: 'ビザ申請と書類手続きの全面的な支援。', bn: 'ভিসা আবেদন ও নথি প্রক্রিয়াকরণে সম্পূর্ণ সহায়তা।' },
      },
      {
        label: { en: 'Language Training', ja: '日本語研修', bn: 'ভাষা প্রশিক্ষণ' },
        body: { en: 'Japanese language courses at Sadia Nihongo Training Center, Dhaka.', ja: 'ダッカのサディア日本語トレーニングセンターによる日本語コース。', bn: 'ঢাকার সাদিয়া নিহোঙ্গো ট্রেনিং সেন্টারে জাপানি ভাষা কোর্স।' },
      },
      {
        label: { en: 'Corporate Partnerships', ja: '企業連携', bn: 'কর্পোরেট অংশীদারিত্ব' },
        body: { en: 'Matching talent to the specific needs of Japanese companies.', ja: '日本企業のニーズに合った人材を紹介。', bn: 'জাপানি কোম্পানিগুলির নির্দিষ্ট চাহিদা অনুযায়ী প্রতিভা মেলানো।' },
      },
    ],
  },

  {
    blockType: 'timeline',
    eyebrow: { en: 'Placement Process', ja: '就職プロセス', bn: 'নিয়োগ প্রক্রিয়া' },
    heading: { en: 'How We Place You', ja: '就職支援の流れ', bn: 'আমরা কিভাবে আপনাকে নিযুক্ত করি' },
    openings: [],
    processEyebrow: { en: 'Our Process', ja: 'プロセス', bn: 'আমাদের প্রক্রিয়া' },
    processSteps: [
      { number: 1, title: { en: 'Submit Application',       ja: '申請書提出',       bn: 'আবেদন জমা দিন'            }, description: { en: 'Submit your resume and documents to Sadiatec in Dhaka or online.', ja: 'ダッカオフィスまたはオンラインで履歴書と書類を提出します。', bn: 'ঢাকা অফিসে বা অনলাইনে আপনার জীবনবৃত্তান্ত ও নথি জমা দিন।' } },
      { number: 2, title: { en: 'Skills Assessment',        ja: 'スキル評価',        bn: 'দক্ষতা মূল্যায়ন'          }, description: { en: 'Skills test and interview conducted at our Dhaka office.', ja: 'ダッカオフィスでスキルテストと面接を実施します。', bn: 'আমাদের ঢাকা অফিসে দক্ষতা পরীক্ষা এবং সাক্ষাৎকার পরিচালিত হয়।' } },
      { number: 3, title: { en: 'Company Matching',         ja: '企業マッチング',    bn: 'কোম্পানি মিলানো'          }, description: { en: 'We match you with the best-fit Japanese company based on skills and preference.', ja: 'スキルと希望に基づいて最適な日本企業とマッチングします。', bn: 'দক্ষতা ও পছন্দের উপর ভিত্তি করে সেরা জাপানি কোম্পানির সাথে মিলিয়ে দেওয়া হয়।' } },
      { number: 4, title: { en: 'Visa Application',         ja: 'ビザ申請',          bn: 'ভিসা আবেদন'               }, description: { en: 'We support the full visa application process through the Japanese Embassy.', ja: '日本大使館を通じたビザ申請プロセスを全面支援します。', bn: 'জাপানি দূতাবাসের মাধ্যমে সম্পূর্ণ ভিসা আবেদন প্রক্রিয়ায় সহায়তা করি।' } },
      { number: 5, title: { en: 'Pre-departure Training',   ja: '渡航前研修',         bn: 'প্রস্থান-পূর্ব প্রশিক্ষণ' }, description: { en: 'Japanese language, culture, and workplace orientation before departure.', ja: '出発前の日本語、文化、職場オリエンテーション研修。', bn: 'প্রস্থানের আগে জাপানি ভাষা, সংস্কৃতি এবং কর্মক্ষেত্র অভিমুখীকরণ।' } },
      { number: 6, title: { en: 'Arrive & Start',           ja: '来日・就業開始',     bn: 'আগমন ও কাজ শুরু'          }, description: { en: 'Sadiatec staff meets you at the airport. You begin your new career in Japan.', ja: 'Sadiatecスタッフが空港で出迎え。日本での新しいキャリアを始めます。', bn: 'সাদিয়াটেকের কর্মীরা বিমানবন্দরে স্বাগত জানায়। জাপানে নতুন ক্যারিয়ার শুরু হয়।' } },
    ],
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// 4. technical-intern-training-program
// ---------------------------------------------------------------------------

const titpLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'Technical Intern Training Program (TITP)',
      ja: '技能実習制度（TITP）',
      bn: 'টেকনিক্যাল ইন্টার্ন ট্রেনিং প্রোগ্রাম (টিআইটিপি)',
    },
    showBreadcrumb: false,
  },

  {
    blockType: 'rich-text',
    content: rt(
      '日本の技能実習制度（TITP）は、外国人が日本の産業で技能や知識を習得するためのフレームワークです。このプログラムは国際協力のプラットフォームとして機能し、技能実習生が習得したスキル、技術、知識を母国に移転することを促進します。1993年に開始されたこのプログラムは、日本での実践的な職場訓練（OJT）を通じてパートナー国の人材育成を支援することを目的としています。',
    ),
    maxWidth: 'prose',
  },

  {
    blockType: 'image-text-split',
    imagePosition: 'right',
    imageAlt: {
      en: 'Technical intern trainees working in a Japanese manufacturing facility',
      ja: '日本の製造施設で働く技能実習生',
      bn: 'জাপানের একটি উৎপাদন কেন্দ্রে কর্মরত কারিগরি ইন্টার্ন প্রশিক্ষণার্থী',
    },
    heading: {
      en: "Bangladesh's Opportunity in Global Labour Markets",
      ja: 'グローバル労働市場におけるバングラデシュの機会',
      bn: 'বৈশ্বিক শ্রমবাজারে বাংলাদেশের সুযোগ',
    },
    body: rt(
      '若くてダイナミックな労働力を持つバングラデシュは、労働力不足に直面しているグローバル経済に熟練した人材を供給するのに適した位置にあります。急速に高齢化する人口と縮小する労働力を持つ日本は、産業の重要なギャップを埋めるために積極的に熟練した外国人労働者を求めています。TITPを通じて、バングラデシュの参加者は貴重な国際経験を得るだけでなく、バングラデシュと日本の経済的絆を強化するのにも役立ちます。',
    ),
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  {
    blockType: 'image-text-split',
    imagePosition: 'left',
    imageAlt: {
      en: "Japan's aging population creates growing demand for skilled international workers",
      ja: '高齢化が進む日本では熟練した外国人労働者への需要が高まっています',
      bn: 'জাপানের বয়স্ক জনগোষ্ঠী দক্ষ আন্তর্জাতিক কর্মীদের ক্রমবর্ধমান চাহিদা তৈরি করছে',
    },
    heading: {
      en: "Japan's Ageing Population and Labour Demand",
      ja: '日本の高齢化と労働力需要',
      bn: 'জাপানের বার্ধক্য জনগোষ্ঠী ও শ্রম চাহিদা',
    },
    body: rt(
      '世界第3位の経済大国である日本は、急速に高齢化する人口のため大きな課題に直面しています。日本人の20％以上が現在65歳を超えており、生産年齢人口は2025年までに大幅に減少すると予測されています。この人口動態の傾向により、日本は積極的に熟練した外国人労働者を受け入れ、産業の重要なギャップを埋めようとしています。',
    ),
    backgroundStyle: 'light',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  {
    blockType: 'image-text-split',
    imagePosition: 'right',
    imageAlt: {
      en: 'Sadiatec supports TITP candidates through every step of the application process',
      ja: 'SadiatecはTITP候補者の申請プロセスを全面的にサポートします',
      bn: 'সাদিয়াটেক আবেদন প্রক্রিয়ার প্রতিটি ধাপে টিআইটিপি প্রার্থীদের সহায়তা করে',
    },
    heading: {
      en: 'How Sadiatec Supports TITP Candidates',
      ja: 'SadiatecによるTITP候補者サポート',
      bn: 'সাদিয়াটেক কিভাবে টিআইটিপি প্রার্থীদের সহায়তা করে',
    },
    body: rt(
      'Sadiatecはバングラデシュの個人がTITPの下での機会にアクセスするのを支援する重要な役割を担っています。候補者を申請・訓練プロセスを通じて指導し、通常3年から5年間続く日本での高品質な技術インターンシップを実現します。滞在中、参加者は専門的な職業スキルだけでなく、日本語、文化的オリエンテーション、ビジネスエチケットについても包括的な訓練を受けます。',
    ),
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// 5. specified-skilled-worker
// ---------------------------------------------------------------------------

const sswLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'Specified Skilled Worker (SSW)',
      ja: '特定技能（SSW）',
      bn: 'স্পেসিফাইড স্কিলড ওয়ার্কার (এসএসডব্লিউ)',
    },
    showBreadcrumb: false,
  },

  {
    blockType: 'rich-text',
    content: rtMulti(
      '日本の特定技能（SSW）ビザは、特定の産業分野で働きたい外国人のための在留資格であり、一定レベルの知識や熟練度が必要です。',
      '特定技能ビザプログラムは、2つのカテゴリに分けられます：特定技能1号（相当な知識や経験を必要とする仕事向け）と特定技能2号（高度な技能を必要とする仕事向け）。',
    ),
    maxWidth: 'prose',
  },

  {
    blockType: 'business-line-list',
    displayMode: 'list',
    items: [
      {
        title: {
          en: 'Specified Skilled Worker Type 1 (SSW-1)',
          ja: '特定技能1号',
          bn: 'স্পেসিফাইড স্কিলড ওয়ার্কার টাইপ ১ (এসএসডব্লিউ-১)',
        },
        description: rt(
          '対象分野：介護、ビルクリーニング、素形材・産業機械・電気電子情報関連製造業、建設、造船・舶用工業、自動車整備、航空、宿泊、農業、漁業、飲食料品製造業、外食業。在留期間：最長5年（更新可）。家族の帯同：原則不可。',
        ),
        features: [
          { text: { en: 'Maximum stay: 5 years (renewable)', ja: '在留期間：最長5年（更新可）', bn: 'সর্বোচ্চ অবস্থান: ৫ বছর (নবায়নযোগ্য)' } },
          { text: { en: 'Family accompaniment: not permitted in principle', ja: '家族の帯同：原則不可', bn: 'পারিবারিক অনুগমন: নীতিগতভাবে অনুমোদিত নয়' } },
          { text: { en: 'Requires industry skills test and Japanese language test', ja: '技能試験と日本語試験が必要', bn: 'শিল্প দক্ষতা পরীক্ষা এবং জাপানি ভাষা পরীক্ষা প্রয়োজন' } },
        ],
      },
      {
        title: {
          en: 'Specified Skilled Worker Type 2 (SSW-2)',
          ja: '特定技能2号',
          bn: 'স্পেসিফাইড স্কিলড ওয়ার্কার টাইপ ২ (এসএসডব্লিউ-২)',
        },
        description: rt(
          '対象分野：建設、造船・舶用工業（拡大予定）。在留期間：更新に制限なし。家族の帯同：認められる場合あり。より高度な技能と専門知識が必要です。',
        ),
        features: [
          { text: { en: 'Unlimited renewals of residence permit', ja: '在留期間の更新に制限なし', bn: 'অবস্থান পারমিটের সীমাহীন নবায়ন' } },
          { text: { en: 'Family accompaniment permitted', ja: '家族の帯同が認められる', bn: 'পরিবার নিয়ে আসার অনুমতি' } },
          { text: { en: 'Higher skill and proficiency required', ja: 'より高度な技能と専門知識が必要', bn: 'উচ্চতর দক্ষতা এবং পারদর্শিতা প্রয়োজন' } },
        ],
      },
    ],
  },

  {
    blockType: 'image-text-split',
    imagePosition: 'right',
    imageAlt: {
      en: 'Sadiatec team supporting SSW visa applicants through every step',
      ja: 'SSWビザ申請者をすべてのステップでサポートするSadiatecチーム',
      bn: 'প্রতিটি ধাপে এসএসডব্লিউ ভিসা আবেদনকারীদের সহায়তা করছে সাদিয়াটেক দল',
    },
    heading: {
      en: 'Why Choose Sadiatec for SSW?',
      ja: 'SSWにSadiatecを選ぶ理由',
      bn: 'কেন এসএসডব্লিউয়ের জন্য সাদিয়াটেক বেছে নেবেন?',
    },
    body: rt(
      'Sadiatecを選ぶことは、日本の特定技能（SSW）ビザプログラムで働くための旅を成功に導く、信頼性の高い経験豊かな組織と提携することを意味します。スキル・日本語試験の準備から、日本の信頼できる雇用主や登録支援機関との連携まで、あらゆる段階でエキスパートなガイダンスを提供します。',
    ),
    backgroundStyle: 'light',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  {
    blockType: 'image-text-split',
    imagePosition: 'left',
    imageAlt: {
      en: 'SSW program eligibility — open to motivated candidates aged 18 and above',
      ja: 'SSWプログラム資格要件 — 18歳以上のやる気のある候補者に開かれています',
      bn: 'এসএসডব্লিউ প্রোগ্রামের যোগ্যতা — ১৮ বছর বা তার বেশি বয়সী উৎসাহী প্রার্থীদের জন্য',
    },
    heading: {
      en: 'Who Can Apply?',
      ja: '誰が申請できますか？',
      bn: 'কে আবেদন করতে পারবেন?',
    },
    body: rt(
      'SSWビザプログラムは、18歳以上で健康状態が良好で、日本の指定産業で働くことを熱望する外国人に開かれています。厳格な教育要件はなく、幅広い候補者がアクセスできます。申請者は業界固有の熟練度テストに合格し、日本語要件を満たす必要がありますが、同じ分野で技能実習プログラムを修了した人は一部の試験が免除される場合があります。',
    ),
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// 6. export-import
// ---------------------------------------------------------------------------

const exportImportLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'Export-Import Operations',
      ja: '輸出入業務',
      bn: 'আমদানি-রপ্তানি কার্যক্রম',
    },
    showBreadcrumb: false,
  },

  {
    blockType: 'image-text-split',
    imagePosition: 'right',
    imageAlt: {
      en: 'Sadiatec export-import operations — vehicle parts and industrial equipment',
      ja: 'Sadiatecの輸出入業務 — 車両部品と産業機器',
      bn: 'সাদিয়াটেকের আমদানি-রপ্তানি কার্যক্রম — যানবাহনের যন্ত্রাংশ ও শিল্প সরঞ্জাম',
    },
    heading: {
      en: 'International Trading Solutions',
      ja: '国際取引ソリューション',
      bn: 'আন্তর্জাতিক বাণিজ্য সমাধান',
    },
    body: rt(
      '日本、バングラデシュ、マレーシアの市場に関する深い知識を活かし、Sadiatecは車両部品や産業機器などの輸出入を支援しています。信頼・品質・競争力ある価格を重視し、多言語による交渉や市場洞察を通じて、クライアントの貿易を円滑にサポートします。バングラデシュ政府から大型機械の輸出入ライセンスを取得しています。',
    ),
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  {
    blockType: 'stats-bar',
    backgroundStyle: 'light',
    layout: 'grid',
    items: [
      {
        label: { en: 'Japan–Bangladesh Route', ja: '日本–バングラデシュルート', bn: 'জাপান–বাংলাদেশ রুট' },
        body: { en: 'Vehicle parts, industrial machinery, and consumer goods.', ja: '車両部品、産業機械、消費財の取引。', bn: 'যানবাহনের যন্ত্রাংশ, শিল্প যন্ত্রপাতি এবং ভোক্তা পণ্য।' },
      },
      {
        label: { en: 'Malaysia Trade Corridor', ja: 'マレーシア貿易回廊', bn: 'মালয়েশিয়া বাণিজ্য করিডোর' },
        body: { en: 'Active trade operations connecting Malaysia with Japan and South Asia.', ja: 'マレーシアと日本・南アジアをつなぐ活発な貿易業務。', bn: 'মালয়েশিয়াকে জাপান ও দক্ষিণ এশিয়ার সাথে সংযুক্ত করা সক্রিয় বাণিজ্য কার্যক্রম।' },
      },
      {
        label: { en: 'Quality Assurance', ja: '品質保証', bn: 'মান নিশ্চিতকরণ' },
        body: { en: 'Strict quality checks and competitive pricing on all traded goods.', ja: 'すべての取引商品に対する厳格な品質チェックと競争力ある価格。', bn: 'সমস্ত বাণিজ্যিক পণ্যে কঠোর মান পরীক্ষা ও প্রতিযোগিতামূলক মূল্য।' },
      },
    ],
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// 7. sdc-collection
// ---------------------------------------------------------------------------

const sdcCollectionLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'SDC Collection',
      ja: 'SDCコレクション',
      bn: 'এসডিসি কালেকশন',
    },
    showBreadcrumb: false,
  },

  {
    blockType: 'image-text-split',
    imagePosition: 'right',
    imageAlt: {
      en: "SDC Collection — wide selection of men's, women's, and children's apparel",
      ja: 'SDCコレクション — 男性、女性、子供向けの幅広い衣料品',
      bn: 'এসডিসি কালেকশন — পুরুষ, মহিলা ও শিশুদের পোশাকের বিস্তৃত নির্বাচন',
    },
    heading: {
      en: 'What We Offer',
      ja: '私たちが提供するもの',
      bn: 'আমরা কী অফার করি',
    },
    body: rt(
      '2014年に設立されたSDCコレクションは、男性、女性、子供向けの高品質な衣料品を豊富に揃えたワンストップのショッピングスポットです。トップウェア、ボトムウェア、冬の衣料品など、さまざまな商品を取り扱っています。最新のトレンドに常に注目しているため、新しいリリースをいち早くお届けします。',
    ),
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  {
    blockType: 'business-line-list',
    displayMode: 'cards',
    heading: {
      en: 'Why Choose SDC Collection',
      ja: 'SDCコレクションを選ぶ理由',
      bn: 'কেন এসডিসি কালেকশন বেছে নেবেন',
    },
    items: [
      {
        icon: 'Star',
        title: { en: 'Premium Quality', ja: '高品質', bn: 'প্রিমিয়াম মান' },
        description: rt('すべての商品は高品質な素材で製造されており、耐久性とスタイルを兼ね備えています。'),
      },
      {
        icon: 'TrendingUp',
        title: { en: 'Latest Trends', ja: '最新トレンド', bn: 'সর্বশেষ ট্রেন্ড' },
        description: rt('常に最新のファッショントレンドをフォローし、新しいコレクションをタイムリーにお届けします。'),
      },
      {
        icon: 'Users',
        title: { en: 'For the Whole Family', ja: '家族全員のために', bn: 'পুরো পরিবারের জন্য' },
        description: rt('男性、女性、子供向けの幅広いラインナップを一か所でお探しいただけます。'),
      },
      {
        icon: 'Package',
        title: { en: 'Wide Variety', ja: '豊富なバリエーション', bn: 'বিস্তৃত বৈচিত্র্য' },
        description: rt('トップウェア、ボトムウェア、冬物衣料など、あらゆるカテゴリを取り揃えています。'),
      },
    ],
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// 8. international-calling-cards
// ---------------------------------------------------------------------------

const callingCardsLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'International Calling Cards',
      ja: '国際テレフォンカード',
      bn: 'আন্তর্জাতিক কলিং কার্ড',
    },
    showBreadcrumb: false,
  },

  {
    blockType: 'image-text-split',
    imagePosition: 'right',
    imageAlt: {
      en: 'Prepaid international calling card — ready to use immediately after purchase',
      ja: 'プリペイド国際テレフォンカード — 購入後すぐに使用可能',
      bn: 'প্রিপেইড আন্তর্জাতিক কলিং কার্ড — কেনার পরেই ব্যবহারের জন্য প্রস্তুত',
    },
    heading: {
      en: 'Prepaid Cards',
      ja: 'プリペイドカード',
      bn: 'প্রিপেইড কার্ড',
    },
    body: rt(
      'プリペイドカードにはあらかじめクレジットがインストールされており、購入後すぐに通話に使用できます。これらのカードのクレジットは再利用できません（使い切り型）。プリペイド国際テレフォンカードを購入するには、Sadiatecの販売店を訪問するか、メールでお問い合わせください。',
    ),
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  {
    blockType: 'image-text-split',
    imagePosition: 'left',
    imageAlt: {
      en: 'SmartPit rechargeable calling card — reload at convenience stores across Japan',
      ja: 'スマートピットリチャージャブルカード — 全国のコンビニエンスストアでチャージ可能',
      bn: 'স্মার্টপিট রিচার্জযোগ্য কলিং কার্ড — জাপানের কনভেনিয়েন্স স্টোরে রিলোড করুন',
    },
    heading: {
      en: 'SmartPit Rechargeable Cards',
      ja: 'スマートピットリチャージャブルカード',
      bn: 'স্মার্টপিট রিচার্জযোগ্য কার্ড',
    },
    body: rt(
      'スマートピットリチャージャブルカードは購入時にクレジットが含まれていません。日本のスマートピット提携コンビニエンスストアからチャージする必要があります。有効期限がなく、何度も再利用できます。サディアテックのすべてのリチャージャブルカードには、NTTコミュニケーションズ株式会社のスマートピットテクノロジーが含まれています。',
    ),
    backgroundStyle: 'light',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  {
    blockType: 'rich-text',
    content: rtMulti(
      'カードのご利用方法：電話から直接、またはiOS/Androidアプリを通じて通話できます。アクセス番号またはダイヤラーアプリを使用して発信します。アプリ登録時にカード番号/パスワードが必要です。スマートピット対応コンビニ：セブン-イレブン、ファミリーマート、ローソンなど。',
      'ご注意：一部のアクセス番号ではアクセス料金が発生します（非無料回線・KDDI-IP回線）。ダイヤラーソフトウェア/アプリの詳細についてはお問い合わせください。',
    ),
    maxWidth: 'prose',
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

async function seedServicesInnerPages(): Promise<void> {
  const payload = await getPayload({ config })
  console.log('\n🌱 Seeding services inner pages...\n')

  await upsertServiceLayout(payload, 'sadia-nihongo-training-center', nihongoLayout)
  await upsertServiceLayout(payload, 'study-work-japan', studyWorkJapanLayout)
  await upsertServiceLayout(
    payload,
    'find-dream-job-japan',
    findDreamJobLayout,
    {
      title: {
        en: 'Find Your Dream Job in Japan',
        ja: '日本で理想の仕事を見つけましょう',
        bn: 'জাপানে আপনার স্বপ্নের চাকরি খুঁজুন',
      },
      excerpt: {
        en: 'Sadiatec connects international talent with leading Japanese companies across construction, manufacturing, and service industries.',
        ja: 'Sadiatecは、建設・製造・サービス業など日本の一流企業と国際人材を結びつけます。',
        bn: 'সাদিয়াটেক নির্মাণ, উৎপাদন ও সেবা শিল্পে জাপানের শীর্ষস্থানীয় কোম্পানিগুলির সাথে আন্তর্জাতিক প্রতিভাকে সংযুক্ত করে।',
      },
    },
  )
  await upsertServiceLayout(payload, 'technical-intern-training-program', titpLayout)
  await upsertServiceLayout(payload, 'specified-skilled-worker', sswLayout)
  await upsertServiceLayout(payload, 'export-import', exportImportLayout)
  await upsertServiceLayout(payload, 'sdc-collection', sdcCollectionLayout)
  await upsertServiceLayout(payload, 'international-calling-cards', callingCardsLayout)

  console.log('\n✅ Services inner pages seed complete.\n')
  process.exit(0)
}

seedServicesInnerPages().catch((err: unknown) => {
  console.error('Services inner pages seed failed:', err)
  process.exit(1)
})
