import type { Payload } from 'payload'
import { upsertBySlug } from '@saidatech/cms-core/seed'

export async function seedCaseStudies(payload: Payload): Promise<void> {
  await upsertBySlug(payload, 'case-studies', 'manufacturing-talent-placement', {
    title: {
      en: 'Manufacturing Talent Placement 2025',
      ja: '製造業 人材採用事例 2025',
      bn: 'উৎপাদন খাতে প্রতিভা নিয়োগ ২০২৫',
    },
    clientName: {
      en: 'Tanaka Auto Parts Co.',
      ja: '田中部品株式会社',
      bn: 'তানাকা অটো পার্টস কো.',
    },
    industry: {
      en: 'Manufacturing',
      ja: '製造業',
      bn: 'উৎপাদন শিল্প',
    },
    tagline: {
      en: 'Placing 20 skilled engineers from Vietnam in 60 days',
      ja: 'ベトナム人エンジニア20名を60日間で採用',
      bn: '৬০ দিনে ভিয়েতনাম থেকে ২০ জন দক্ষ প্রকৌশলী নিয়োগ',
    },
    results: [
      { value: 20, suffix: '', label: { en: 'Engineers Placed', ja: '採用エンジニア数', bn: 'নিয়োগকৃত প্রকৌশলী' } },
      { value: 60, suffix: '', label: { en: 'Days to Placement', ja: '採用完了日数', bn: 'নিয়োগ সম্পন্নের দিন' } },
      { value: 97, suffix: '%', label: { en: 'Retention at 12 Months', ja: '12ヶ月定着率', bn: '১২ মাসে ধরে রাখার হার' } },
    ],
    publishedAt: '2025-03-01',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'case-studies', 'caregiver-visa-program', {
    title: {
      en: 'Caregiver Visa Programme 2025',
      ja: '介護士ビザ取得プログラム 2025',
      bn: 'কেয়ারগিভার ভিসা প্রোগ্রাম ২০২৫',
    },
    clientName: {
      en: 'Setagaya General Hospital',
      ja: '世田谷総合病院',
      bn: 'সেটাগায়া জেনারেল হাসপাতাল',
    },
    industry: {
      en: 'Healthcare',
      ja: '医療・介護',
      bn: 'স্বাস্থ্যসেবা',
    },
    tagline: {
      en: '15 caregivers visa-approved and onboarded within a single programme cycle',
      ja: '1プログラムサイクルで介護士15名のビザ取得・入職を実現',
      bn: 'একটি প্রোগ্রাম চক্রে ১৫ জন কেয়ারগিভারের ভিসা অনুমোদন ও অনবোর্ডিং',
    },
    results: [
      { value: 15, suffix: '', label: { en: 'Caregivers Placed', ja: '採用介護士数', bn: 'নিয়োগকৃত কেয়ারগিভার' } },
      { value: 100, suffix: '%', label: { en: 'Visa Approval Rate', ja: 'ビザ許可取得率', bn: 'ভিসা অনুমোদনের হার' } },
      { value: 3, suffix: '', label: { en: 'Months End-to-End', ja: 'トータル所要月数', bn: 'শুরু থেকে শেষ পর্যন্ত মাস' } },
    ],
    publishedAt: '2025-01-15',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'case-studies', 'it-skills-bridge', {
    title: {
      en: 'IT Skills Bridge Programme 2024',
      ja: 'ITスキルブリッジプログラム 2024',
      bn: 'আইটি দক্ষতা সেতু কর্মসূচি ২০২৪',
    },
    clientName: {
      en: 'Finlink Technologies',
      ja: 'フィンリンク・テクノロジーズ',
      bn: 'ফিনলিংক টেকনোলজিস',
    },
    industry: {
      en: 'Financial Technology',
      ja: 'フィンテック',
      bn: 'আর্থিক প্রযুক্তি',
    },
    tagline: {
      en: '8 bilingual software engineers placed with in-programme Japanese language training',
      ja: '日本語研修込みでバイリンガルエンジニア8名を採用',
      bn: 'প্রোগ্রামে জাপানি ভাষা প্রশিক্ষণ সহ ৮ জন দ্বিভাষী সফটওয়্যার প্রকৌশলী নিয়োগ',
    },
    results: [
      { value: 8, suffix: '', label: { en: 'Engineers Placed', ja: '採用エンジニア数', bn: 'নিয়োগকৃত প্রকৌশলী' } },
      { value: 6, suffix: ' wks', label: { en: 'Language Training', ja: '日本語研修期間', bn: 'ভাষা প্রশিক্ষণের সপ্তাহ' } },
      { value: 4, suffix: 'x', label: { en: 'Interview-to-Offer Ratio', ja: '内定率', bn: 'সাক্ষাৎকার-অফার অনুপাত' } },
    ],
    publishedAt: '2024-11-10',
    active: true,
    aiVisible: true,
  })

  // ── Homepage testimonial-style entries (person-centric) ──
  await upsertBySlug(payload, 'case-studies', 'sarah-tabassum-language-fluency', {
    title: {
      en: 'Language Fluency Journey: Sarah Tabassum',
      ja: '日本語習得への道：サラ・タバッスム',
      bn: 'ভাষা দক্ষতার যাত্রা: সারাহ তাবাস্সুম',
    },
    clientName: {
      en: 'Sarah Tabassum',
      ja: 'サラ・タバッスム',
      bn: 'সারাহ তাবাস্সুম',
    },
    role: {
      en: 'Japanese Language Student',
      ja: '日本語学習生',
      bn: 'জাপানি ভাষার শিক্ষার্থী',
    },
    metricValue: { en: '100%', ja: '100%', bn: '১০০%' },
    metricCaption: {
      en: 'Fluency and confidence achieved',
      ja: '流暢さと自信を習得',
      bn: 'সাবলীলতা ও আত্মবিশ্বাস অর্জিত',
    },
    industry: { en: 'Education', ja: '教育', bn: 'শিক্ষা' },
    tagline: {
      en: 'From zero Japanese to passing JLPT N4 in eight months',
      ja: '日本語ゼロからJLPT N4合格まで8ヶ月',
      bn: 'শূন্য জাপানি থেকে আট মাসে JLPT N4 পাস',
    },
    publishedAt: '2026-01-20',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'case-studies', 'ahmed-shubo-first-placement', {
    title: {
      en: 'First Job Offer in Japan: Ahmed Shubo',
      ja: '日本初の内定：アハメド・シュボ',
      bn: 'জাপানে প্রথম চাকরির অফার: আহমেদ শুভ',
    },
    clientName: {
      en: 'Ahmed Shubo',
      ja: 'アハメド・シュボ',
      bn: 'আহমেদ শুভ',
    },
    role: {
      en: 'Manufacturing Engineer, Aichi Prefecture',
      ja: '製造エンジニア（愛知県）',
      bn: 'ম্যানুফ্যাকচারিং ইঞ্জিনিয়ার, আইচি প্রিফেকচার',
    },
    metricValue: { en: '1st', ja: '1社目', bn: '১ম' },
    metricCaption: {
      en: 'Offer received from first matched employer',
      ja: '最初にマッチした企業から内定を獲得',
      bn: 'প্রথম ম্যাচড নিয়োগকর্তার কাছ থেকে অফার',
    },
    industry: { en: 'Manufacturing', ja: '製造業', bn: 'উৎপাদন শিল্প' },
    tagline: {
      en: 'Matched and employed within 30 days of registration',
      ja: '登録から30日以内にマッチングと就職を実現',
      bn: 'নিবন্ধনের ৩০ দিনের মধ্যে ম্যাচিং ও নিয়োগ',
    },
    publishedAt: '2026-02-05',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'case-studies', 'mahmud-karim-student-visa', {
    title: {
      en: 'Smooth Study Permit Process: Mahmud Karim',
      ja: 'スムーズな就学手続き：マハムド・カリム',
      bn: 'মসৃণ স্টাডি পারমিট প্রক্রিয়া: মাহমুদ করিম',
    },
    clientName: {
      en: 'Mahmud Karim',
      ja: 'マハムド・カリム',
      bn: 'মাহমুদ করিম',
    },
    role: {
      en: 'Student, Nagoya Language Institute',
      ja: '学生（名古屋語学院）',
      bn: 'শিক্ষার্থী, নাগোয়া ল্যাঙ্গুয়েজ ইন্সটিটিউট',
    },
    metricValue: { en: '100%', ja: '100%', bn: '১০০%' },
    metricCaption: {
      en: 'Enrollment documents processed on time',
      ja: '入学書類の期限内処理率',
      bn: 'সময়মতো ভর্তির নথি প্রক্রিয়া সম্পন্ন',
    },
    industry: { en: 'Education', ja: '教育', bn: 'শিক্ষা' },
    tagline: {
      en: 'Student visa approved on first application, zero document rejections',
      ja: '初回申請でビザ取得、書類却下ゼロ',
      bn: 'প্রথম আবেদনে ছাত্র ভিসা অনুমোদন, শূন্য নথি প্রত্যাখ্যান',
    },
    publishedAt: '2026-02-18',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'case-studies', 'kenji-sato-rapid-workforce', {
    title: {
      en: 'Rapid Workforce Deployment: Kenji Sato',
      ja: '迅速な人員確保：ケンジ・サトウ',
      bn: 'দ্রুত কর্মী মোতায়েন: কেনজি সাতো',
    },
    clientName: {
      en: 'Kenji Sato',
      ja: 'ケンジ・サトウ',
      bn: 'কেনজি সাতো',
    },
    role: {
      en: 'Operations Manager, Aichi Manufacturing',
      ja: 'オペレーションマネージャー（愛知製造業）',
      bn: 'অপারেশন ম্যানেজার, আইচি ম্যানুফ্যাকচারিং',
    },
    metricValue: { en: '14 Days', ja: '14日', bn: '১৪ দিন' },
    metricCaption: {
      en: 'From workforce request to on-site deployment',
      ja: '人員要請から現場配置まで',
      bn: 'কর্মী অনুরোধ থেকে সাইটে মোতায়েন পর্যন্ত',
    },
    industry: { en: 'Manufacturing', ja: '製造業', bn: 'উৎপাদন শিল্প' },
    tagline: {
      en: '12 dispatch workers deployed in 14 days for a production surge',
      ja: '生産急増に対応し、14日間で派遣スタッフ12名を配置',
      bn: 'উৎপাদন বৃদ্ধিতে ১৪ দিনে ১২ জন ডিসপ্যাচ কর্মী মোতায়েন',
    },
    publishedAt: '2026-03-01',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'case-studies', 'yuka-tanaka-visa-compliance', {
    title: {
      en: 'Visa Compliance at Scale: Yuka Tanaka',
      ja: 'スケールでのビザ管理：ユカ・タナカ',
      bn: 'বৃহৎ পরিসরে ভিসা কমপ্লায়েন্স: ইউকা তানাকা',
    },
    clientName: {
      en: 'Yuka Tanaka',
      ja: 'ユカ・タナカ',
      bn: 'ইউকা তানাকা',
    },
    role: {
      en: 'HR Director, Technology Services Company',
      ja: 'HRディレクター（テクノロジーサービス企業）',
      bn: 'এইচআর ডিরেক্টর, টেকনোলজি সার্ভিসেস কোম্পানি',
    },
    metricValue: { en: '98%', ja: '98%', bn: '৯৮%' },
    metricCaption: {
      en: 'Visa compliance rate across all dispatched staff',
      ja: '全派遣スタッフのビザ適法率',
      bn: 'সকল ডিসপ্যাচ কর্মীর ভিসা কমপ্লায়েন্স হার',
    },
    industry: { en: 'Technology', ja: 'テクノロジー', bn: 'প্রযুক্তি' },
    tagline: {
      en: 'Managing visa renewals for 80+ foreign workers without a single lapse',
      ja: '外国人スタッフ80名以上のビザ更新を一件のミスもなく管理',
      bn: '৮০+ বিদেশী কর্মীর ভিসা নবায়ন একটিও ব্যর্থতা ছাড়াই পরিচালনা',
    },
    publishedAt: '2026-03-10',
    active: true,
    aiVisible: true,
  })
}
