import type { Payload } from 'payload'
import { upsertBySlug } from '@saidatech/cms-core/seed'

export async function seedNews(payload: Payload): Promise<void> {
  await upsertBySlug(payload, 'news', 'aichi-manufacturing-job-fair-2026', {
    title: {
      en: 'Exhibiting at the Aichi Manufacturing Joint Job Fair',
      ja: '愛知製造業合同企業説明会に出展',
      bn: 'আইচি ম্যানুফ্যাকচারিং জয়েন্ট জব ফেয়ারে প্রদর্শনী',
    },
    excerpt: {
      en: 'Saidatech will be exhibiting at the Aichi Manufacturing Joint Job Fair on 20 May 2026. Visit our booth to speak with our placement coordinators and learn about current openings.',
      ja: '2026年5月20日開催の愛知製造業合同企業説明会にサイダテックが出展します。弊社ブースにてコーディネーターと直接お話しいただけます。',
      bn: 'সাইদাটেক ২০ মে ২০২৬-এ আইচি ম্যানুফ্যাকচারিং জয়েন্ট জব ফেয়ারে প্রদর্শনী করবে। আমাদের বুথ পরিদর্শন করুন।',
    },
    category: { en: 'Event', ja: 'イベント', bn: 'ইভেন্ট' },
    publishedAt: '2026-05-10',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'news', 'nagoya-office-relocation-2026', {
    title: {
      en: 'Nagoya Office Relocation — New Address from May 2026',
      ja: '名古屋オフィス移転のお知らせ（2026年5月より）',
      bn: 'নাগোয়া অফিস স্থানান্তর — মে ২০২৬ থেকে নতুন ঠিকানা',
    },
    excerpt: {
      en: 'Our Nagoya head office has relocated to a new address effective 1 May 2026. All client and candidate services continue without interruption.',
      ja: '名古屋本社は2026年5月1日より新住所に移転いたしました。クライアント・求職者向けサービスは引き続き通常通りご提供いたします。',
      bn: 'আমাদের নাগোয়া প্রধান কার্যালয় ১ মে ২০২৬ থেকে নতুন ঠিকানায় স্থানান্তরিত হয়েছে। সমস্ত ক্লায়েন্ট ও প্রার্থী সেবা নিরবচ্ছিন্নভাবে অব্যাহত রয়েছে।',
    },
    category: { en: 'Announcement', ja: 'お知らせ', bn: 'ঘোষণা' },
    publishedAt: '2026-04-28',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'news', 'registered-staff-surpasses-5000', {
    title: {
      en: 'Registered Staff Count Surpasses 5,000',
      ja: '登録スタッフ数が5,000名を突破',
      bn: 'নিবন্ধিত কর্মী সংখ্যা ৫,০০০ ছাড়িয়ে গেছে',
    },
    excerpt: {
      en: 'We are proud to announce that the number of registered staff in our talent database has exceeded 5,000 — a milestone that strengthens our ability to match the right candidate quickly.',
      ja: '当社の人材データベースへの登録スタッフ数が5,000名を突破しました。迅速なマッチング力がさらに向上します。',
      bn: 'আমরা গর্বের সাথে ঘোষণা করছি যে আমাদের প্রতিভা ডেটাবেসে নিবন্ধিত কর্মীর সংখ্যা ৫,০০০ ছাড়িয়ে গেছে।',
    },
    category: { en: 'Press Release', ja: 'プレスリリース', bn: 'প্রেস রিলিজ' },
    publishedAt: '2026-04-15',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'news', 'new-toyota-area-factory-listings', {
    title: {
      en: 'New Job Listings for Toyota-Area Factories',
      ja: 'トヨタエリアの工場求人を新規公開',
      bn: 'টয়োটা-এলাকার কারখানার জন্য নতুন চাকরির তালিকা',
    },
    excerpt: {
      en: 'Twelve new positions have been posted for automotive assembly and parts manufacturing roles in the Toyota City area. Applications are now open — SSW and direct hire options available.',
      ja: 'トヨタ市周辺の自動車組立・部品製造向けに新規求人12件を公開しました。特定技能・直接雇用の両方に対応しています。',
      bn: 'টয়োটা সিটি এলাকায় অটোমোটিভ অ্যাসেম্বলি এবং পার্টস ম্যানুফ্যাকচারিং ভূমিকায় বারোটি নতুন পদ পোস্ট করা হয়েছে।',
    },
    category: { en: 'Jobs', ja: '求人', bn: 'চাকরি' },
    publishedAt: '2026-04-01',
    active: true,
    aiVisible: true,
  })

  await upsertBySlug(payload, 'news', 'golden-week-office-hours-2026', {
    title: {
      en: 'Office Hours During Golden Week 2026',
      ja: '2026年ゴールデンウィーク期間中の営業時間',
      bn: '২০২৬ সালের গোল্ডেন উইকের সময় অফিসের সময়সূচি',
    },
    excerpt: {
      en: 'Our offices will operate on reduced hours from 29 April to 5 May 2026 for the Golden Week holiday. Emergency support remains available via our 24/7 hotline.',
      ja: '2026年4月29日〜5月5日のゴールデンウィーク期間中、弊社オフィスは短縮営業となります。緊急サポートは24時間ホットラインにてご対応いたします。',
      bn: '২০২৬ সালের গোল্ডেন উইক ছুটির জন্য ২৯ এপ্রিল থেকে ৫ মে পর্যন্ত আমাদের অফিস কমানো সময়ে পরিচালিত হবে।',
    },
    category: { en: 'Announcement', ja: 'お知らせ', bn: 'ঘোষণা' },
    publishedAt: '2026-03-25',
    active: true,
    aiVisible: true,
  })
}
