import type { Payload } from 'payload'
import { upsertBySlug } from '@saidatech/cms-core/seed'

function richTextStub(text: string) {
  return {
    root: {
      type: 'root' as const,
      children: [
        {
          type: 'paragraph' as const,
          children: [{ type: 'text' as const, text, version: 1, detail: 0, format: 0, mode: 'normal' as const, style: '' }],
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

export async function seedBlog(payload: Payload): Promise<void> {
  await upsertBySlug(payload, 'blog', 'japan-work-visa-guide-2025', {
    title: {
      en: 'Complete Guide to Japan Work Visa Categories in 2025',
      ja: '2025年版・日本の就労ビザ種別完全ガイド',
      bn: '২০২৫ সালে জাপানের কর্মসংস্থান ভিসার সম্পূর্ণ গাইড',
    },
    subtitle: {
      en: 'Everything foreign workers and their employers need to know before applying',
      ja: '申請前に外国人労働者と雇用主が知っておくべきすべて',
      bn: 'আবেদনের আগে বিদেশী কর্মী ও তাদের নিয়োগকর্তাদের জন্য প্রয়োজনীয় সব তথ্য',
    },
    excerpt: {
      en: "Japan's work visa system can be complex. This guide breaks down the most common categories — Specified Skilled Worker (SSW), Technical Intern, Engineer/Specialist, and more — so you can choose the right path.",
      ja: '日本の就労ビザは複雑に見えますが、特定技能・技能実習・技術・人文知識・国際業務など主要カテゴリーをわかりやすく解説します。',
      bn: 'জাপানের কর্মসংস্থান ভিসার ব্যবস্থা জটিল মনে হতে পারে। এই গাইডে প্রধান বিভাগগুলি — বিশেষায়িত দক্ষ কর্মী, প্রযুক্তিগত ইন্টার্ন, প্রকৌশলী/বিশেষজ্ঞ — সহজভাবে ব্যাখ্যা করা হয়েছে।',
    },
    category: {
      en: 'Visa',
      ja: 'ビザ',
      bn: 'ভিসা',
    },
    author: {
      name: 'Saidatech Editorial Team',
      jobTitle: {
        en: 'Visa & Compliance',
        ja: 'ビザ・コンプライアンス',
        bn: 'ভিসা ও সম্মতি',
      },
    },
    content: { en: richTextStub('Full article coming soon.'), ja: richTextStub('全文は近日公開予定です。'), bn: richTextStub('সম্পূর্ণ নিবন্ধ শীঘ্রই আসছে।') },
    publishedAt: '2025-04-10',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'blog', 'engineering-talent-shortage-japan', {
    title: {
      en: "Japan's Engineering Talent Shortage: What Hiring Managers Can Do Now",
      ja: '日本のエンジニア人材不足：採用担当者が今すぐできる対策',
      bn: 'জাপানের প্রকৌশল প্রতিভা ঘাটতি: নিয়োগ ব্যবস্থাপকরা এখনই কী করতে পারেন',
    },
    subtitle: {
      en: 'Structural forces driving the shortage — and proven hiring strategies from companies that have already solved it',
      ja: '人材不足を引き起こす構造的要因と、すでに解決した企業の採用戦略',
      bn: 'ঘাটতির পেছনের কাঠামোগত কারণ এবং যে কোম্পানিগুলি ইতিমধ্যে এটি সমাধান করেছে তাদের নিয়োগ কৌশল',
    },
    excerpt: {
      en: 'Japan faces a structural deficit of over 790,000 IT engineers by 2030. Companies waiting for the domestic market to recover are already losing ground. Here is what forward-thinking hiring managers are doing differently.',
      ja: '2030年までに79万人以上のITエンジニアが不足すると言われる日本。国内市場の回復を待つ企業はすでに遅れをとっています。先進的な採用担当者が実践していることをご紹介します。',
      bn: '২০৩০ সালের মধ্যে জাপানে ৭৯০,০০০ এরও বেশি আইটি প্রকৌশলীর কাঠামোগত ঘাটতি দেখা দেবে। যে কোম্পানিগুলি অভ্যন্তরীণ বাজার পুনরুদ্ধারের অপেক্ষায় আছে তারা ইতিমধ্যে পিছিয়ে পড়ছে।',
    },
    category: {
      en: 'Industry Insights',
      ja: '業界インサイト',
      bn: 'শিল্প অন্তর্দৃষ্টি',
    },
    author: {
      name: 'Saidatech Editorial Team',
      jobTitle: {
        en: 'Talent Strategy',
        ja: 'タレント戦略',
        bn: 'প্রতিভা কৌশল',
      },
    },
    content: { en: richTextStub('Full article coming soon.'), ja: richTextStub('全文は近日公開予定です。'), bn: richTextStub('সম্পূর্ণ নিবন্ধ শীঘ্রই আসছে।') },
    publishedAt: '2025-02-20',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'blog', 'jlpt-n4-workplace-japanese', {
    title: {
      en: 'Why JLPT N4 Is the Real Workplace Minimum — Not N3',
      ja: '職場での日本語最低限はN3ではなくN4である理由',
      bn: 'কেন JLPT N4 আসল কর্মক্ষেত্রের ন্যূনতম — N3 নয়',
    },
    subtitle: {
      en: 'A practical look at what foreign workers actually need on the factory floor, in the clinic, and at the desk',
      ja: '工場・クリニック・オフィスで外国人材が実際に必要とする日本語力を現場目線で解説',
      bn: 'কারখানায়, ক্লিনিকে এবং ডেস্কে বিদেশী কর্মীদের আসলে কী প্রয়োজন তার একটি ব্যবহারিক পর্যালোচনা',
    },
    excerpt: {
      en: 'The JLPT N3 benchmark is popular in job postings — but field data consistently shows that N4 holders perform well in structured workplace environments. Requiring N3 may be narrowing your candidate pool unnecessarily.',
      ja: '求人ではN3が多く求められますが、現場データでは構造的な職場環境ではN4保有者も十分に活躍できることが示されています。N3要件が候補者を不必要に絞っている可能性があります。',
      bn: 'চাকরির বিজ্ঞাপনে JLPT N3 বেঞ্চমার্ক জনপ্রিয় — কিন্তু মাঠের তথ্য ধারাবাহিকভাবে দেখায় যে N4 ধারকরা কাঠামোগত কর্মক্ষেত্রে ভালো পারফর্ম করেন।',
    },
    category: {
      en: 'Language & Culture',
      ja: '語学・文化',
      bn: 'ভাষা ও সংস্কৃতি',
    },
    author: {
      name: 'Saidatech Editorial Team',
      jobTitle: {
        en: 'Language Training',
        ja: '語学研修',
        bn: 'ভাষা প্রশিক্ষণ',
      },
    },
    content: { en: richTextStub('Full article coming soon.'), ja: richTextStub('全文は近日公開予定です。'), bn: richTextStub('সম্পূর্ণ নিবন্ধ শীঘ্রই আসছে।') },
    publishedAt: '2024-12-05',
    active: true,
    aiVisible: true,
  })

  // ── Homepage teaser posts ──
  await upsertBySlug(payload, 'blog', 'dispatch-vs-outsourcing-manufacturing-hr', {
    title: {
      en: 'Dispatch vs. Outsourcing for Manufacturing HR',
      ja: '製造業HR：派遣と業務委託の違いを徹底解説',
      bn: 'ম্যানুফ্যাকচারিং এইচআর: ডিসপ্যাচ বনাম আউটসোর্সিং',
    },
    subtitle: {
      en: 'Know which model fits your production line before you sign a contract',
      ja: '契約前に自社の生産ラインに合ったモデルを選ぶ',
      bn: 'চুক্তি সই করার আগে আপনার প্রোডাকশন লাইনে কোন মডেল উপযুক্ত তা জানুন',
    },
    excerpt: {
      en: 'Japanese manufacturers face a recurring dilemma: dispatch for flexibility or outsource for cost control? This article maps the legal, operational, and cost differences so HR teams can make the right call.',
      ja: '日本の製造業は「柔軟性のための派遣か、コスト管理のための業務委託か」という課題に直面しています。法的・運用・コストの違いを整理し、HR担当者が正しい判断を下せるよう解説します。',
      bn: 'জাপানি উৎপাদনকারীরা বারবার একটি দ্বিধায় পড়েন: নমনীয়তার জন্য ডিসপ্যাচ নাকি খরচ নিয়ন্ত্রণের জন্য আউটসোর্স? এই নিবন্ধে আইনি, পরিচালনাগত এবং ব্যয়ের পার্থক্য ম্যাপ করা হয়েছে।',
    },
    category: {
      en: 'Staffing Basics',
      ja: '人材活用基礎',
      bn: 'স্টাফিং বেসিক্স',
    },
    readTime: 8,
    author: {
      name: 'Saidatech Editorial Team',
      jobTitle: { en: 'HR Strategy', ja: 'HR戦略', bn: 'এইচআর কৌশল' },
    },
    content: { en: richTextStub('Full article coming soon.'), ja: richTextStub('全文は近日公開予定です。'), bn: richTextStub('সম্পূর্ণ নিবন্ধ শীঘ্রই আসছে।') },
    publishedAt: '2026-05-01',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'blog', 'specified-skills-type-2-2026', {
    title: {
      en: 'Specified Skills Type 2: 2026 Update',
      ja: '特定技能2号：2026年最新アップデート',
      bn: 'বিশেষায়িত দক্ষতা টাইপ ২: ২০২৬ আপডেট',
    },
    subtitle: {
      en: 'What the expanded SSW-2 pathway means for employers and candidates',
      ja: '拡大された特定技能2号が雇用主と求職者に与える意味',
      bn: 'বিস্তৃত এসএসডাব্লিউ-২ পথ নিয়োগকর্তা এবং প্রার্থীদের জন্য কী অর্থ রাখে',
    },
    excerpt: {
      en: 'The 2026 expansion of Specified Skilled Worker Type 2 status opens permanent residency pathways across 11 industrial sectors. Here is what HR teams need to prepare for before the new rules take effect.',
      ja: '2026年の特定技能2号拡大により、11産業分野で永住への道が開かれます。新制度施行前にHR担当者が準備すべきことを解説します。',
      bn: '২০২৬ সালের বিশেষায়িত দক্ষ কর্মী টাইপ ২ স্ট্যাটাসের সম্প্রসারণ ১১টি শিল্প খাতে স্থায়ী বাসিন্দার পথ খুলে দেয়। নতুন নিয়ম কার্যকর হওয়ার আগে এইচআর দলের কী প্রস্তুতি নেওয়া দরকার তা এখানে।',
    },
    category: {
      en: 'Foreign Workers',
      ja: '外国人材',
      bn: 'বিদেশী কর্মী',
    },
    readTime: 10,
    author: {
      name: 'Saidatech Editorial Team',
      jobTitle: { en: 'Visa & Compliance', ja: 'ビザ・コンプライアンス', bn: 'ভিসা ও সম্মতি' },
    },
    content: { en: richTextStub('Full article coming soon.'), ja: richTextStub('全文は近日公開予定です。'), bn: richTextStub('সম্পূর্ণ নিবন্ধ শীঘ্রই আসছে।') },
    publishedAt: '2026-04-18',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'blog', 'workplace-improvements-boost-retention', {
    title: {
      en: '5 Workplace Improvements That Boost Retention',
      ja: '定着率を高める5つの職場改善策',
      bn: '৫টি কর্মক্ষেত্র উন্নতি যা ধরে রাখার হার বাড়ায়',
    },
    subtitle: {
      en: 'Small, low-cost changes that make foreign workers want to stay for year two and beyond',
      ja: '外国人材が2年目以降も働き続けたいと思う低コストの小さな改善策',
      bn: 'ছোট, কম খরচের পরিবর্তন যা বিদেশী কর্মীদের দ্বিতীয় বছর এবং তার পরেও থাকতে চাওয়ায়',
    },
    excerpt: {
      en: 'Turnover among foreign workers spikes at the 12-month mark. But companies that implement five specific workplace practices see retention rates jump by up to 40%. The changes are simpler than most HR teams expect.',
      ja: '外国人労働者の離職率は12ヶ月目に急増します。しかし、5つの職場改善策を実施した企業は定着率が最大40%向上。その変化はほとんどのHR担当者が想像するよりシンプルです。',
      bn: 'বিদেশী কর্মীদের টার্নওভার ১২ মাসের সময়সীমায় বৃদ্ধি পায়। কিন্তু যে কোম্পানিগুলি পাঁচটি নির্দিষ্ট কর্মক্ষেত্র অনুশীলন বাস্তবায়ন করে তারা ধরে রাখার হার ৪০% পর্যন্ত বাড়তে দেখে।',
    },
    category: {
      en: 'Retention',
      ja: '定着・採用',
      bn: 'ধরে রাখা',
    },
    readTime: 6,
    author: {
      name: 'Saidatech Editorial Team',
      jobTitle: { en: 'Workplace Culture', ja: '職場文化', bn: 'কর্মক্ষেত্র সংস্কৃতি' },
    },
    content: { en: richTextStub('Full article coming soon.'), ja: richTextStub('全文は近日公開予定です。'), bn: richTextStub('সম্পূর্ণ নিবন্ধ শীঘ্রই আসছে।') },
    publishedAt: '2026-04-05',
    active: true,
    aiVisible: true,
  })
}
