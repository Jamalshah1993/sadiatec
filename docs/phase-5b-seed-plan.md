# Phase 5-B Seed Plan — services-inner-pages.seed.ts

This document shows the exact data shape for the seed file before any code is written.
Modelled after `apps/saidatech/src/seed/about-section.seed.ts`.

---

## File location

`apps/saidatech/src/seed/services-inner-pages.seed.ts`

## Run command (same pattern as about-section seed)

```
pnpm --filter saidatech tsx src/seed/services-inner-pages.seed.ts
```

---

## Helpers (copied verbatim from about-section.seed.ts)

```ts
function richText(text: string) { /* single paragraph */ }
function richTextMulti(...paragraphs: string[]) { /* multiple paragraphs */ }
function rt(text: string) { return richText(text) }
function rtMulti(...paragraphs: string[]) { return richTextMulti(...paragraphs) }
```

---

## Upsert pattern (DIFFERENT from about-section.seed.ts)

About-section uses delete + create on the `pages` collection.
Services already exist — use find → update (if found) / create (if not):

```ts
async function upsertServiceLayout(
  payload: any,
  slug: string,
  layout: unknown[],
): Promise<void> {
  // Find existing service
  const existing = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    const id = existing.docs[0].id
    // Update layout in default locale first
    const updated = await payload.update({
      collection: 'services',
      id,
      locale: 'ja',
      data: { layout: forLocale(layout, 'ja') },
    })
    // Then update en and bn locales
    for (const locale of ['en', 'bn'] as const) {
      await payload.update({
        collection: 'services',
        id,
        locale,
        data: { layout: withIds(forLocale(layout, locale), updated.layout) },
      })
    }
    console.log(`  ✅ Updated layout for /${slug}`)
  } else {
    // New service (only find-dream-job-japan hits this path)
    const doc = await payload.create({
      collection: 'services',
      locale: 'ja',
      data: {
        title: 'ドリームジョブ',  // placeholder — overwritten by locale updates below
        slug,
        active: true,
        sort: 99,
        layout: forLocale(layout, 'ja'),
      },
    })
    for (const locale of ['en', 'bn'] as const) {
      await payload.update({
        collection: 'services',
        id: doc.id,
        locale,
        data: { layout: withIds(forLocale(layout, locale), doc.layout) },
      })
    }
    console.log(`  ✅ Created /${slug}`)
  }
}
```

---

## Shared CTA banner (same as about-section.seed.ts)

```ts
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
```

---

## Page 1 — sadia-nihongo-training-center

```ts
const nihongoLayout = [
  // 1. Hero
  {
    blockType: 'page-hero',
    variant: 'hero',
    heading: {
      en: 'Sadia Nihongo Training Center',
      ja: 'サディア日本語トレーニングセンター',
      bn: 'সাদিয়া নিহোঙ্গো ট্রেনিং সেন্টার',
    },
    coloredSubtitle: {
      en: 'Japanese Language Training in Dhaka',
      ja: 'ダッカで日本語研修',
      bn: 'ঢাকায় জাপানি ভাষা প্রশিক্ষণ',
    },
    body: {
      en: 'Founded in 2012 and renamed in 2020, Sadia Nihongo Training Center prepares students for study and work in Japan through comprehensive Japanese language and cultural training.',
      ja: '2012年に開設され、2020年に改名されたサディア日本語トレーニングセンターは、日本語と日本文化の研修を通じて、日本での留学・就労を目指す学生をサポートしています。',
      bn: '২০১২ সালে প্রতিষ্ঠিত এবং ২০২০ সালে পুনর্নামকরণ করা সাদিয়া নিহোঙ্গো ট্রেনিং সেন্টার জাপানি ভাষা ও সংস্কৃতি প্রশিক্ষণের মাধ্যমে জাপানে পড়াশোনা ও কাজের জন্য শিক্ষার্থীদের প্রস্তুত করে।',
    },
    overlayOpacity: 55,
    overlayColor: 'black',
    primaryButton: {
      label: {
        en: 'Apply Now',
        ja: '申し込む',
        bn: 'আবেদন করুন',
      },
      href: '/contact',
    },
    textAlignment: 'left',
    minHeight: 'lg',
    showBreadcrumb: false,
  },

  // 2. Director message
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
    // richText: stored without locale wrapper (default locale 'ja')
    body: rt(
      '2018年にバングラデシュに来た時から感じているのが、この国と人々に流れるエネルギーと優しさです。この国の若い人たちが日本に行き、自立した大人として家族を経済的に支えるという目標を達成しつつ、日本の強みである計画性や効率的な仕事の仕方を学ぶなら、双方のメリットになると考えております。当トレーニングセンターでは、語学だけではなく日本の習慣、マナー、仕事や勉強に取り組む態度などを生徒たちに教える努力を払っています。',
    ),
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  // 3. About the centre
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

  // 4. Three strengths
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

  // 5. Licence info
  {
    blockType: 'rich-text',
    content: rt(
      '当センターおよびSadiatecが保有するライセンス：一般労働者派遣事業許可（sect 13-306144）、有料職業紹介事業許可（13-Yu-307401）、登録支援機関許可（20 registration 004486）、送出機関許可（1148番）。',
    ),
    maxWidth: 'prose',
  },

  ctaBanner,
]
```

---

## Page 2 — study-work-japan

```ts
const studyWorkJapanLayout = [
  // 1. Hero
  {
    blockType: 'page-hero',
    variant: 'hero',
    heading: {
      en: 'Study & Work in Japan Program',
      ja: '日本留学・就労プログラム',
      bn: 'জাপানে পড়াশোনা ও কাজের প্রোগ্রাম',
    },
    coloredSubtitle: {
      en: 'A structured path from application to arrival',
      ja: '申請から到着まで整備されたプロセス',
      bn: 'আবেদন থেকে আগমন পর্যন্ত সুশৃঙ্খল পথ',
    },
    body: {
      en: 'The Study and Work in Japan Program is a well-structured process that guides all applicants from formal application through to their first day of study and work. Currently offered to students from Bangladesh.',
      ja: '日本での学びと働きプログラムは、すべての応募者が順調に進むように設計された体系的なプロセスです。正式な申請から、日本での初日まで丁寧にサポートします。現在、バングラデシュの学生を対象としています。',
      bn: 'জাপানে অধ্যয়ন ও কাজের প্রোগ্রামটি একটি সুগঠিত প্রক্রিয়া যা সকল আবেদনকারীকে আনুষ্ঠানিক আবেদন থেকে শুরু করে পড়াশোনা ও কাজের প্রথম দিন পর্যন্ত গাইড করে।',
    },
    overlayOpacity: 55,
    overlayColor: 'black',
    primaryButton: {
      label: { en: 'Apply Now', ja: '申し込む', bn: 'আবেদন করুন' },
      href: '/contact',
    },
    textAlignment: 'left',
    minHeight: 'lg',
    showBreadcrumb: false,
  },

  // 2. Application documents
  {
    blockType: 'rich-text',
    content: rt(
      '申請書類（Application Documents）：出生証明書のコピー（正式認証）、パスポートのコピー（全ページ）、関係証明書（申請者と財政支援者の関係を示す）、日本語学習証明書、学歴証明書と成績証明書、職歴証明書（もしあれば）、財政支援者の書類（勤務証明書、収入・貯金証明書、銀行明細書）、財政支援者の保証書、学校の入学申込書および申請者の履歴書。',
    ),
    maxWidth: 'wide',
  },

  // 3. 12-step application process
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
      { number: 1, title: { en: 'Prepare Documents', ja: '書類準備', bn: 'নথি প্রস্তুত' }, description: { en: 'Prepare all required application documents and submit to Sadiatec.', ja: '必要な申請書類をすべて準備し、Sadiatecに提出します。', bn: 'সমস্ত প্রয়োজনীয় আবেদনের নথি প্রস্তুত করুন এবং সাদিয়াটেকে জমা দিন।' } },
      { number: 2, title: { en: 'Submit to School', ja: '学校へ提出', bn: 'স্কুলে জমা দিন' }, description: { en: 'Sadiatec submits your documents to the selected Japanese language school.', ja: 'Sadiatecは申請者が選択した学校に書類を提出します。', bn: 'সাদিয়াটেক নির্বাচিত জাপানি ভাষা স্কুলে আপনার নথি জমা দেয়।' } },
      { number: 3, title: { en: 'Immigration Review', ja: '入国管理局審査', bn: 'ইমিগ্রেশন পর্যালোচনা' }, description: { en: 'The school submits documents to Japan Immigration for review.', ja: '学校は書類を日本の入国管理局に提出して審査を受けます。', bn: 'স্কুলটি জাপানের ইমিগ্রেশনে নথি পর্যালোচনার জন্য জমা দেয়।' } },
      { number: 4, title: { en: 'Immigration Decision', ja: '審査結果通知', bn: 'ইমিগ্রেশন সিদ্ধান্ত' }, description: { en: 'Japan Immigration notifies the school of the application result.', ja: '日本の入国管理局は申請結果を通知します。', bn: 'জাপান ইমিগ্রেশন আবেদনের ফলাফল জানায়।' } },
      { number: 5, title: { en: 'Certificate of Eligibility', ja: '資格証明書発行', bn: 'যোগ্যতার সার্টিফিকেট' }, description: { en: 'On approval, the school receives the Certificate of Eligibility.', ja: '申請が成功した場合、学校は資格証明書を受け取ります。', bn: 'অনুমোদনের পরে, স্কুলটি যোগ্যতার সার্টিফিকেট পায়।' } },
      { number: 6, title: { en: 'Transfer Tuition Fee', ja: '授業料振込', bn: 'টিউশন ফি ট্রান্সফার' }, description: { en: 'The applicant transfers the required tuition funds to the school.', ja: '申請者は必要な資金を学校に振り込みます。', bn: 'আবেদনকারী স্কুলে প্রয়োজনীয় টিউশন ফি পাঠান।' } },
      { number: 7, title: { en: 'Receive Certificate', ja: '資格証明書受取', bn: 'সার্টিফিকেট গ্রহণ' }, description: { en: 'The school sends the Certificate of Eligibility to the applicant.', ja: '学校は資格証明書を申請者に送ります。', bn: 'স্কুলটি আবেদনকারীকে যোগ্যতার সার্টিফিকেট পাঠায়।' } },
      { number: 8, title: { en: 'Book Flight', ja: 'フライト予約', bn: 'ফ্লাইট বুক করুন' }, description: { en: 'Book a one-way ticket to Japan (booking only — pay after visa approval).', ja: '日本への片道旅行を予約します（予約のみ、ビザ承認後に支払い）。', bn: 'জাপানে একমুখী টিকিট বুক করুন (শুধুমাত্র বুকিং — ভিসা অনুমোদনের পরে পেমেন্ট)।' } },
      { number: 9, title: { en: 'Visa Interview', ja: 'ビザ面接', bn: 'ভিসা ইন্টারভিউ' }, description: { en: 'Attend visa interview at the Japanese Embassy with the certificate and flight booking.', ja: '資格証明書とフライト予約確認書を持って日本大使館でビザ面接を受けます。', bn: 'সার্টিফিকেট ও ফ্লাইট বুকিং নিয়ে জাপানি দূতাবাসে ভিসা ইন্টারভিউতে যোগ দিন।' } },
      { number: 10, title: { en: 'Visa Approval', ja: 'ビザ承認', bn: 'ভিসা অনুমোদন' }, description: { en: 'Obtain the student visa; confirm and pay for the flight ticket.', ja: '日本の学生ビザを取得し、航空券が確認され、支払われます。', bn: 'স্টুডেন্ট ভিসা পান; ফ্লাইট টিকিট নিশ্চিত করুন এবং পেমেন্ট করুন।' } },
      { number: 11, title: { en: 'Arrival in Japan', ja: '日本到着', bn: 'জাপানে আগমন' }, description: { en: 'Sadiatec staff meets you at the airport and escorts you to pre-arranged accommodation.', ja: '申請者は日本に到着し、Sadiatecのスタッフが空港で出迎え、宿泊施設に同行します。', bn: 'সাদিয়াটেকের কর্মীরা বিমানবন্দরে আপনাকে স্বাগত জানায় এবং পূর্ব-নির্ধারিত আবাসনে নিয়ে যায়।' } },
      { number: 12, title: { en: 'Begin Student Life', ja: '学生生活スタート', bn: 'ছাত্রজীবন শুরু' }, description: { en: 'You begin your new student life in Japan.', ja: '申請者は日本で新しい学生生活を始めます。', bn: 'আপনি জাপানে আপনার নতুন ছাত্রজীবন শুরু করেন।' } },
    ],
  },

  // 4. Japanese Language Course
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
```

---

## Page 3 — find-dream-job-japan (NEW)

```ts
const findDreamJobLayout = [
  {
    blockType: 'page-hero',
    variant: 'hero',
    heading: {
      en: 'Find Your Dream Job in Japan',
      ja: '日本で理想の仕事を見つけましょう',
      bn: 'জাপানে আপনার স্বপ্নের চাকরি খুঁজুন',
    },
    coloredSubtitle: {
      en: 'Connecting global talent with Japanese industry',
      ja: 'グローバル人材と日本産業を結ぶ',
      bn: 'বৈশ্বিক প্রতিভাকে জাপানি শিল্পের সাথে সংযুক্ত করা',
    },
    body: {
      en: 'Sadiatec has been connecting international professionals with leading Japanese companies for over 20 years. We handle every step from application to arrival.',
      ja: 'Sadiatecは20年以上にわたり、国際的な人材と日本の一流企業をつなげてきました。申請から就労開始まで、すべてのステップをサポートします。',
      bn: 'সাদিয়াটেক ২০ বছরেরও বেশি সময় ধরে আন্তর্জাতিক পেশাদারদের জাপানের শীর্ষস্থানীয় কোম্পানিগুলির সাথে সংযুক্ত করে আসছে।',
    },
    overlayOpacity: 55,
    overlayColor: 'black',
    primaryButton: {
      label: { en: 'Apply Now', ja: '申し込む', bn: 'আবেদন করুন' },
      href: '/contact',
    },
    secondaryButton: {
      label: { en: 'View Services', ja: 'サービス一覧', bn: 'সেবা দেখুন' },
      href: '/services',
    },
    textAlignment: 'left',
    minHeight: 'lg',
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
      { number: 1, title: { en: 'Submit Application', ja: '申請書提出', bn: 'আবেদন জমা দিন' }, description: { en: 'Submit your resume and documents to Sadiatec in Dhaka or online.', ja: 'ダッカオフィスまたはオンラインで履歴書と書類を提出します。', bn: 'ঢাকা অফিসে বা অনলাইনে আপনার জীবনবৃত্তান্ত ও নথি জমা দিন।' } },
      { number: 2, title: { en: 'Skills Assessment', ja: 'スキル評価', bn: 'দক্ষতা মূল্যায়ন' }, description: { en: 'Skills test and interview conducted at our Dhaka office.', ja: 'ダッカオフィスでスキルテストと面接を実施します。', bn: 'আমাদের ঢাকা অফিসে দক্ষতা পরীক্ষা এবং সাক্ষাৎকার পরিচালিত হয়।' } },
      { number: 3, title: { en: 'Company Matching', ja: '企業マッチング', bn: 'কোম্পানি মিলানো' }, description: { en: 'We match you with the best-fit Japanese company based on skills and preference.', ja: 'スキルと希望に基づいて最適な日本企業とマッチングします。', bn: 'দক্ষতা ও পছন্দের উপর ভিত্তি করে আমরা আপনাকে সেরা জাপানি কোম্পানির সাথে মিলিয়ে দিই।' } },
      { number: 4, title: { en: 'Visa Application', ja: 'ビザ申請', bn: 'ভিসা আবেদন' }, description: { en: 'We support the full visa application process through the Japanese Embassy.', ja: '日本大使館を通じたビザ申請プロセスを全面支援します。', bn: 'জাপানি দূতাবাসের মাধ্যমে সম্পূর্ণ ভিসা আবেদন প্রক্রিয়ায় সহায়তা করি।' } },
      { number: 5, title: { en: 'Pre-departure Training', ja: '渡航前研修', bn: 'প্রস্থান-পূর্ব প্রশিক্ষণ' }, description: { en: 'Japanese language, culture, and workplace orientation before departure.', ja: '出発前の日本語、文化、職場オリエンテーション研修。', bn: 'প্রস্থানের আগে জাপানি ভাষা, সংস্কৃতি এবং কর্মক্ষেত্র অভিমুখীকরণ।' } },
      { number: 6, title: { en: 'Arrive & Start', ja: '来日・就業開始', bn: 'আগমন ও কাজ শুরু' }, description: { en: 'Sadiatec staff meets you at the airport. You begin your new career in Japan.', ja: 'Sadiatecスタッフが空港で出迎え。日本での新しいキャリアを始めます。', bn: 'সাদিয়াটেকের কর্মীরা বিমানবন্দরে স্বাগত জানায়। জাপানে আপনার নতুন ক্যারিয়ার শুরু হয়।' } },
    ],
  },
  ctaBanner,
]
```

---

## Page 4 — technical-intern-training-program

```ts
const titpLayout = [
  {
    blockType: 'page-hero',
    variant: 'hero',
    heading: {
      en: 'Technical Intern Training Program (TITP)',
      ja: '技能実習制度（TITP）',
      bn: 'টেকনিক্যাল ইন্টার্ন ট্রেনিং প্রোগ্রাম (টিআইটিপি)',
    },
    coloredSubtitle: {
      en: 'Building careers through international skill transfer',
      ja: '国際的な技術移転によるキャリア構築',
      bn: 'আন্তর্জাতিক দক্ষতা হস্তান্তরের মাধ্যমে ক্যারিয়ার গড়ুন',
    },
    body: {
      en: 'The TITP enables foreign nationals to acquire skills, techniques, and knowledge through on-the-job training in Japan, supporting their home country\'s economic development.',
      ja: '技能実習制度（TITP）は、日本での職場訓練を通じて外国人が技能・技術・知識を習得し、帰国後に母国の経済発展に貢献できるように支援する制度です。',
      bn: 'টিআইটিপি বিদেশী নাগরিকদের জাপানে কর্মক্ষেত্র প্রশিক্ষণের মাধ্যমে দক্ষতা, কৌশল এবং জ্ঞান অর্জন করতে সক্ষম করে।',
    },
    overlayOpacity: 55,
    overlayColor: 'black',
    primaryButton: {
      label: { en: 'Apply Now', ja: '申し込む', bn: 'আবেদন করুন' },
      href: '/contact',
    },
    textAlignment: 'left',
    minHeight: 'lg',
    showBreadcrumb: false,
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
      en: 'What is the Technical Intern Training Program?',
      ja: '技能実習制度とは？',
      bn: 'টেকনিক্যাল ইন্টার্ন ট্রেনিং প্রোগ্রাম কী?',
    },
    body: rt(
      '日本の技能実習制度（TITP）は、外国人が日本の産業で技能や知識を習得するためのフレームワークです。参加者は実践的なスキルを身につけ、日本語を学び、帰国後に母国に貢献することができます。このプログラムは、日本での実践的な職場訓練（OJT）を提供することで、パートナー国の人材開発を支援するために1993年に開始されました。',
    ),
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },
  {
    blockType: 'image-text-split',
    imagePosition: 'left',
    imageAlt: {
      en: 'Bangladesh professionals — young and dynamic workforce ready for Japan',
      ja: 'バングラデシュの若くダイナミックな労働力',
      bn: 'বাংলাদেশের তরুণ ও গতিশীল কর্মশক্তি জাপানের জন্য প্রস্তুত',
    },
    heading: {
      en: 'Bangladesh's Opportunity in Global Labour Markets',
      ja: 'グローバル労働市場におけるバングラデシュの機会',
      bn: 'বৈশ্বিক শ্রমবাজারে বাংলাদেশের সুযোগ',
    },
    body: rt(
      '若くてダイナミックな労働力を持つバングラデシュは、労働力不足に直面しているグローバル経済に熟練した人材を供給するのに適した位置にあります。急速に高齢化する人口と縮小する労働力を持つ日本は、産業の重要なギャップを埋めるために積極的に熟練した外国人労働者を求めています。TITPを通じて、バングラデシュの参加者は貴重な国際経験を得るだけでなく、バングラデシュと日本の経済的絆を強化するのにも役立ちます。',
    ),
    backgroundStyle: 'light',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },
  {
    blockType: 'image-text-split',
    imagePosition: 'right',
    imageAlt: {
      en: 'How Sadiatec supports TITP candidates through the application process',
      ja: 'Sadiatecが技能実習生候補者を申請プロセスを通じてサポートする方法',
      bn: 'সাদিয়াটেক কিভাবে টিআইটিপি প্রার্থীদের আবেদন প্রক্রিয়ায় সহায়তা করে',
    },
    heading: {
      en: 'How Sadiatec Supports TITP Candidates',
      ja: 'SadiatecによるTITP候補者サポート',
      bn: 'সাদিয়াটেক কিভাবে টিআইটিপি প্রার্থীদের সহায়তা করে',
    },
    body: rt(
      'Sadiatecとして、私たちはバングラデシュの個人がTITPの下での機会にアクセスするのを支援する重要な役割を果たすことを誇りに思っています。バングラデシュの候補者を申請プロセスと訓練プロセスを通じて指導することにより、通常3年から5年間続く日本での高品質な技術インターンシップから恩恵を受けることができます。滞在中、参加者は専門的な職業スキルだけでなく、日本語、文化的オリエンテーション、ビジネスエチケットについても包括的な訓練を受けます。',
    ),
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },
  ctaBanner,
]
```

---

## Page 5 — specified-skilled-worker

```ts
const sswLayout = [
  {
    blockType: 'page-hero',
    variant: 'hero',
    heading: {
      en: 'Specified Skilled Worker (SSW)',
      ja: '特定技能（SSW）',
      bn: 'স্পেসিফাইড স্কিলড ওয়ার্কার (এসএসডব্লিউ)',
    },
    coloredSubtitle: {
      en: 'Work in Japan\'s growing industries',
      ja: '日本の成長産業で働く',
      bn: 'জাপানের ক্রমবর্ধমান শিল্পে কাজ করুন',
    },
    body: {
      en: 'Japan\'s Specified Skilled Worker (SSW) visa allows foreign nationals to work in specific industries where a certain level of knowledge and skill proficiency is required.',
      ja: '日本の特定技能（SSW）ビザは、特定の産業分野で働きたい外国人のための在留資格であり、一定レベルの知識や熟練度が必要です。',
      bn: 'জাপানের স্পেসিফাইড স্কিলড ওয়ার্কার (এসএসডব্লিউ) ভিসা বিদেশী নাগরিকদের নির্দিষ্ট শিল্পে কাজ করতে দেয়।',
    },
    overlayOpacity: 55,
    overlayColor: 'black',
    primaryButton: {
      label: { en: 'Apply Now', ja: '申し込む', bn: 'আবেদন করুন' },
      href: '/contact',
    },
    textAlignment: 'left',
    minHeight: 'lg',
    showBreadcrumb: false,
  },
  {
    blockType: 'rich-text',
    content: rt(
      '特定技能（SSW）ビザプログラムは、外国人が指定された産業分野で働くことを許可することで、日本の労働力不足に対応するために設計されています。2つのカテゴリ：特定技能1号（相当な知識や経験を必要とする仕事向け）と特定技能2号（高度な技能を必要とする仕事向け）に分けられます。',
    ),
    maxWidth: 'prose',
  },
  {
    blockType: 'business-line-list',
    displayMode: 'list',
    items: [
      {
        title: { en: 'Specified Skilled Worker Type 1 (SSW-1)', ja: '特定技能1号', bn: 'স্পেসিফাইড স্কিলড ওয়ার্কার টাইপ ১ (এসএসডব্লিউ-১)' },
        description: rt(
          '対象分野：介護、ビルクリーニング、素形材・産業機械・電気電子情報関連製造業、建設、造船・舶用工業、自動車整備、航空、宿泊、農業、漁業、飲食料品製造業、外食業。在留期間：最長5年（更新可）。家族の帯同：原則不可。',
        ),
        features: [
          { text: { en: 'Maximum stay: 5 years (renewable)', ja: '在留期間：最長5年（更新可）', bn: 'সর্বোচ্চ অবস্থান: ৫ বছর (নবায়নযোগ্য)' } },
          { text: { en: 'Family accompaniment: not permitted', ja: '家族の帯同：原則不可', bn: 'পরিবার নিয়ে আসা: অনুমতিহীন' } },
          { text: { en: 'Requires skills test and Japanese language test', ja: '技能試験と日本語試験が必要', bn: 'দক্ষতা পরীক্ষা এবং জাপানি ভাষা পরীক্ষা প্রয়োজন' } },
        ],
      },
      {
        title: { en: 'Specified Skilled Worker Type 2 (SSW-2)', ja: '特定技能2号', bn: 'স্পেসিফাইড স্কিলড ওয়ার্কার টাইপ ২ (এসএসডব্লিউ-২)' },
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
      en: 'Sadiatec team supporting SSW visa applicants',
      ja: 'SSWビザ申請者をサポートするSadiatecチーム',
      bn: 'এসএসডব্লিউ ভিসা আবেদনকারীদের সহায়তা করছে সাদিয়াটেক দল',
    },
    heading: { en: 'Why Choose Sadiatec for SSW?', ja: 'SSWにSadiatecを選ぶ理由', bn: 'কেন এসএসডব্লিউয়ের জন্য সাদিয়াটেক বেছে নেবেন?' },
    body: rt(
      'Sadiatecを選ぶことは、日本の特定技能（SSW）ビザプログラムで働くための旅を成功に導くために献身的な、信頼性の高い経験豊かな組織と提携することを意味します。必要なスキルと日本語の試験の準備から、日本の信頼できる雇用主や登録支援機関との連携まで、あらゆる段階でエキスパートなガイダンスを提供します。',
    ),
    backgroundStyle: 'light',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },
  {
    blockType: 'image-text-split',
    imagePosition: 'left',
    imageAlt: {
      en: 'SSW program eligibility criteria — open to motivated candidates aged 18+',
      ja: 'SSWプログラム資格要件 — 18歳以上のやる気のある候補者に開かれています',
      bn: 'এসএসডব্লিউ প্রোগ্রামের যোগ্যতার মানদণ্ড — ১৮+ বয়সী উৎসাহী প্রার্থীদের জন্য উন্মুক্ত',
    },
    heading: { en: 'Who Can Apply?', ja: '誰が申請できますか？', bn: 'কে আবেদন করতে পারবেন?' },
    body: rt(
      'SSWビザプログラムは、18歳以上で健康状態が良好で、日本の指定産業で働くことを熱望する外国人に開かれています。厳格な教育要件はなく、幅広い候補者がアクセスできるプログラムです。申請者は業界固有の熟練度テストに合格し、日本語要件を満たすことでスキルを証明する必要がありますが、同じ分野で技能実習プログラムを修了した人は一部の試験が免除される場合があります。',
    ),
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },
  ctaBanner,
]
```

---

## Page 6 — export-import

```ts
const exportImportLayout = [
  {
    blockType: 'page-hero',
    variant: 'hero',
    heading: {
      en: 'Export-Import Operations',
      ja: '輸出入業務',
      bn: 'আমদানি-রপ্তানি কার্যক্রম',
    },
    coloredSubtitle: {
      en: 'International Trading Solutions',
      ja: '国際取引ソリューション',
      bn: 'আন্তর্জাতিক বাণিজ্য সমাধান',
    },
    body: {
      en: 'Sadiatec leverages deep knowledge of Japan, Bangladesh, and Malaysia markets to facilitate smooth trade across borders.',
      ja: '日本、バングラデシュ、マレーシアの市場に関する深い知識を活かし、Sadiatecは国境を越えた円滑な取引を支援します。',
      bn: 'সাদিয়াটেক জাপান, বাংলাদেশ ও মালয়েশিয়ার বাজার সম্পর্কে গভীর জ্ঞান ব্যবহার করে সীমান্ত অতিক্রমী বাণিজ্য সহজ করে তোলে।',
    },
    overlayOpacity: 55,
    overlayColor: 'black',
    primaryButton: {
      label: { en: 'Contact Us', ja: 'お問い合わせ', bn: 'যোগাযোগ করুন' },
      href: '/contact',
    },
    textAlignment: 'left',
    minHeight: 'lg',
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
      en: 'Vehicle Parts and Industrial Equipment',
      ja: '車両部品と産業機器',
      bn: 'যানবাহনের যন্ত্রাংশ ও শিল্প সরঞ্জাম',
    },
    body: rt(
      '日本、バングラデシュ、マレーシアの市場に関する深い知識を活かし、Sadiatecは車両部品や産業機器などの輸出入を支援しています。信頼・品質・競争力ある価格を重視し、多言語による交渉や市場洞察を通じて、クライアントの貿易を円滑にサポートします。',
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
        body: { en: 'Vehicle parts, industrial machinery, and consumer goods between Japan and Bangladesh.', ja: '日本とバングラデシュ間の車両部品、産業機械、消費財の取引。', bn: 'জাপান ও বাংলাদেশের মধ্যে যানবাহনের যন্ত্রাংশ, শিল্প যন্ত্রপাতি এবং ভোক্তা পণ্য।' },
      },
      {
        label: { en: 'Malaysia Trade Corridor', ja: 'マレーシア貿易回廊', bn: 'মালয়েশিয়া বাণিজ্য করিডোর' },
        body: { en: 'Active trade operations connecting Malaysia with Japan and South Asia.', ja: 'マレーシアと日本・南アジアをつなぐ活発な貿易業務。', bn: 'মালয়েশিয়াকে জাপান ও দক্ষিণ এশিয়ার সাথে সংযুক্ত করা সক্রিয় বাণিজ্য কার্যক্রম।' },
      },
      {
        label: { en: 'Quality Assurance', ja: '品質保証', bn: 'মান নিশ্চিতকরণ' },
        body: { en: 'Strict quality checks and competitive pricing on all traded goods.', ja: 'すべての取引商品に対する厳格な品質チェックと競争力ある価格設定。', bn: 'সমস্ত বাণিজ্যিক পণ্যে কঠোর মান পরীক্ষা ও প্রতিযোগিতামূলক মূল্য নির্ধারণ।' },
      },
    ],
  },
  ctaBanner,
]
```

---

## Page 7 — sdc-collection

```ts
const sdcCollectionLayout = [
  {
    blockType: 'page-hero',
    variant: 'hero',
    heading: {
      en: 'SDC Collection',
      ja: 'SDCコレクション',
      bn: 'এসডিসি কালেকশন',
    },
    coloredSubtitle: {
      en: 'Fashion for the whole family',
      ja: 'ファミリー向けファッション',
      bn: 'পুরো পরিবারের জন্য ফ্যাশন',
    },
    body: {
      en: 'Established in 2014, SDC Collection is one of the most trusted shopping destinations for quality apparel for men, women, and children.',
      ja: '2014年に設立されたSDCコレクションは、男性、女性、子供向けの高品質な衣料品を提供する、最も信頼されるショッピングスポットの一つです。',
      bn: '২০১৪ সালে প্রতিষ্ঠিত এসডিসি কালেকশন পুরুষ, মহিলা এবং শিশুদের জন্য মানসম্পন্ন পোশাকের সবচেয়ে বিশ্বস্ত কেনাকাটার গন্তব্যগুলির মধ্যে একটি।',
    },
    overlayOpacity: 55,
    overlayColor: 'black',
    primaryButton: {
      label: { en: 'Shop Now', ja: '今すぐショッピング', bn: 'এখন কেনাকাটা করুন' },
      href: '/contact',
    },
    textAlignment: 'left',
    minHeight: 'lg',
    showBreadcrumb: false,
  },
  {
    blockType: 'image-text-split',
    imagePosition: 'right',
    imageAlt: {
      en: 'SDC Collection — wide selection of men\'s, women\'s, and children\'s apparel',
      ja: 'SDCコレクション — 男性、女性、子供向けの幅広い衣料品',
      bn: 'এসডিসি কালেকশন — পুরুষ, মহিলা ও শিশুদের পোশাকের বিস্তৃত নির্বাচন',
    },
    heading: {
      en: 'What We Offer',
      ja: '私たちが提供するもの',
      bn: 'আমরা কী অফার করি',
    },
    body: rt(
      'SDCコレクションは、男性、女性、子供を問わず誰でも利用できるワンストップのショッピングスポットです。トップウェア、ボトムウェア、冬の衣料品など、さまざまな商品を取り扱っています。最新のトレンドに常に注目しているため、すべての新しいリリースをいち早くお届けします。',
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
```

---

## Page 8 — international-calling-cards

```ts
const callingCardsLayout = [
  {
    blockType: 'page-hero',
    variant: 'hero',
    heading: {
      en: 'International Calling Cards',
      ja: '国際テレフォンカード',
      bn: 'আন্তর্জাতিক কলিং কার্ড',
    },
    coloredSubtitle: {
      en: 'Affordable calls to 200+ countries',
      ja: '200以上の国々への手頃な通話料金',
      bn: '২০০+ দেশে সাশ্রয়ী মূল্যে কল করুন',
    },
    body: {
      en: 'International calling cards have been a cornerstone product since 2002. Thousands of people use our cards every day to call abroad at the most affordable rates worldwide.',
      ja: '国際テレフォンカードは2002年以来の主力製品です。世界200以上の国々に対して、最も手頃な通話料金を提供しています。',
      bn: 'আন্তর্জাতিক কলিং কার্ড ২০০২ সাল থেকে আমাদের মূল পণ্য। বিশ্বের ২০০টিরও বেশি দেশে সবচেয়ে সাশ্রয়ী মূল্যে কল করার সুযোগ।',
    },
    overlayOpacity: 55,
    overlayColor: 'black',
    primaryButton: {
      label: { en: 'Order Now', ja: '今すぐ注文', bn: 'এখনই অর্ডার করুন' },
      href: '/contact',
    },
    textAlignment: 'left',
    minHeight: 'lg',
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
    heading: { en: 'Prepaid Cards', ja: 'プリペイドカード', bn: 'প্রিপেইড কার্ড' },
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
    heading: { en: 'SmartPit Rechargeable Cards', ja: 'スマートピットリチャージャブルカード', bn: 'স্মার্টপিট রিচার্জযোগ্য কার্ড' },
    body: rt(
      'スマートピットリチャージャブルカードは購入時にクレジットが含まれていません。日本のスマートピット提携コンビニエンスストアから使用前にチャージする必要があります。有効期限がなく、何度も再利用できます。サディアテックのすべてのリチャージャブルカードには、NTTコミュニケーションズ株式会社のスマートピットテクノロジーが含まれています。',
    ),
    backgroundStyle: 'light',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },
  {
    blockType: 'rich-text',
    content: rt(
      '使い方：電話から直接、またはiOS/Androidアプリを通じて電話をかけることができます。アクセス番号またはダイヤラーアプリを使用して発信します。アプリ登録時にカード番号/パスワードが必要です。スマートピット対応コンビニ：セブン-イレブン、ファミリーマート、ローソンなど。ご注意：一部のアクセス番号ではアクセスに料金が発生します。',
    ),
    maxWidth: 'prose',
  },
  ctaBanner,
]
```

---

## Main function structure

```ts
async function seedServicesInnerPages(): Promise<void> {
  const payload = await getPayload({ config })
  console.log('\n🌱 Seeding services inner pages...\n')

  await upsertServiceLayout(payload, 'sadia-nihongo-training-center', nihongoLayout)
  await upsertServiceLayout(payload, 'study-work-japan', studyWorkJapanLayout)
  await upsertServiceLayout(payload, 'find-dream-job-japan', findDreamJobLayout)   // creates new
  await upsertServiceLayout(payload, 'technical-intern-training-program', titpLayout)
  await upsertServiceLayout(payload, 'specified-skilled-worker', sswLayout)
  await upsertServiceLayout(payload, 'export-import', exportImportLayout)
  await upsertServiceLayout(payload, 'sdc-collection', sdcCollectionLayout)
  await upsertServiceLayout(payload, 'international-calling-cards', callingCardsLayout)

  console.log('\n✅ Services inner pages seed complete.\n')
  process.exit(0)
}
```

---

## Pre-seed verification query

After running, verify with:

```sql
SELECT slug, jsonb_array_length(layout) AS block_count
FROM services
WHERE slug IN (
  'sadia-nihongo-training-center',
  'study-work-japan',
  'find-dream-job-japan',
  'technical-intern-training-program',
  'specified-skilled-worker',
  'export-import',
  'sdc-collection',
  'international-calling-cards'
)
ORDER BY slug;
```

Expected: 8 rows, each with `block_count > 0`.
