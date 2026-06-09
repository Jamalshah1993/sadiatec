/**
 * Seed script for 5 "more services" inner pages:
 *   pocket-wifi-data-sim, mobile-sim, voip-services, npo-doshdik, doshdik-tv
 *
 * COLLECTION: services (not pages)
 * UPSERT: finds by slug, updates layout only for existing docs, creates for new ones.
 * RICHTEXT NOTE: richText fields stored without locale wrapper (default locale 'ja').
 *   Plain text fields use full { en, ja, bn } locale objects.
 *
 * Run:
 *   pnpm --filter saidatech tsx src/seed/services-more-pages.seed.ts
 */

import { getPayload } from 'payload'
import config from '../../payload.config'

// ---------------------------------------------------------------------------
// richText helpers (verbatim from services-inner-pages.seed.ts)
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
// locale helpers (verbatim from services-inner-pages.seed.ts)
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
// Upsert helper (verbatim from services-inner-pages.seed.ts)
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
// 1. pocket-wifi-data-sim
// ---------------------------------------------------------------------------

const pocketWifiLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'Pocket WiFi / Data SIM',
      ja: 'ポケットWiFi・データSIM',
      bn: 'পকেট ওয়াইফাই / ডেটা সিম',
    },
    showBreadcrumb: false,
  },

  {
    blockType: 'image-text-split',
    imagePosition: 'right',
    imageAlt: {
      en: 'Pocket WiFi router — stay connected anywhere in Japan',
      ja: 'ポケットWiFiルーター — 日本全国どこでも接続',
      bn: 'পকেট ওয়াইফাই রাউটার — জাপানের যেকোনো জায়গায় সংযুক্ত থাকুন',
    },
    heading: {
      en: 'Always-On Internet in Japan',
      ja: '日本での常時接続インターネット',
      bn: 'জাপানে সার্বক্ষণিক ইন্টারনেট',
    },
    body: {
      en: rt('The Pocket WiFi router is a convenient portable device that keeps you connected to the internet anytime, anywhere. Powered by Softbank\'s AXGP, LTE, and CDMA networks, it delivers wide coverage and reliable high-speed connectivity across all of Japan. Connect up to 10 devices simultaneously — smartphones, laptops, gaming consoles, and more. Ideal for tourists, students, professionals, and business travellers.'),
      ja: rt('ポケットWiFiルーターは、ユーザーがいつでもどこでもインターネットにアクセスできる便利なポータブルデバイスです。ソフトバンクのAXGP・LTE・CDMAネットワークを通じてデータサービスを提供し、日本全国で広いネットワークカバレッジと信頼性の高い高速通信を実現します。最大10台のデバイス（スマートフォン、ノートパソコン、ゲーム機器など）に同時接続でき、観光客、学生、専門家、ビジネスパーソンに最適です。'),
      bn: rt('পকেট ওয়াইফাই রাউটার একটি সুবিধাজনক পোর্টেবল ডিভাইস যা যেকোনো সময়, যেকোনো জায়গায় ইন্টারনেটের সাথে সংযুক্ত রাখে। সফটব্যাংকের AXGP, LTE এবং CDMA নেটওয়ার্কের মাধ্যমে জাপান জুড়ে বিস্তৃত কভারেজ ও নির্ভরযোগ্য হাই-স্পিড সংযোগ নিশ্চিত করে। স্মার্টফোন, ল্যাপটপ, গেমিং কনসোলসহ একসাথে ১০টি পর্যন্ত ডিভাইস সংযুক্ত করা যায়। পর্যটক, শিক্ষার্থী, পেশাদার ও ব্যবসায়ীদের জন্য আদর্শ।'),
    },
    backgroundStyle: 'white',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  {
    blockType: 'business-line-list',
    displayMode: 'list',
    items: [
      {
        title: {
          en: 'Daily Rental Plan',
          ja: '日額レンタルプラン',
          bn: 'দৈনিক ভাড়া পরিকল্পনা',
        },
        description: {
          en: rt('For tourists and short-term visitors looking for 24-hour portable internet access. Stay connected with unlimited data covering all of Japan. No complicated contracts, no data limits, no early cancellation penalties. Fill out our rental application form and pay ¥18,000 upfront as a refundable deposit. To cancel, call us and return the device by mail or in person. Refund: ¥18,000 minus ¥500 × actual days used, minus ¥5,000 service fee.'),
          ja: rt('24時間ポータブルなインターネットアクセスをお探しの観光客や短期滞在者に最適です。日本全国をカバーする無制限データプランで常に接続を維持できます。面倒な契約、データ制限、早期解約ペナルティは一切不要。当社のレンタル申込書に記入し、前払いで￥18,000（デポジット）をお支払いください。ご利用後はお電話でキャンセルし、デバイスを郵送または手渡しで返却してください。返金額：￥18,000 マイナス ￥500×実際の使用日数 マイナス ￥5,000サービス料。'),
          bn: rt('২৪ ঘন্টা পোর্টেবল ইন্টারনেট অ্যাক্সেসের জন্য পর্যটক ও স্বল্পমেয়াদী ভিজিটরদের জন্য আদর্শ। সারা জাপান কভার করা আনলিমিটেড ডেটা প্ল্যানে সংযুক্ত থাকুন। কোনো জটিল চুক্তি, ডেটা সীমা বা আর্লি ক্যান্সেলেশন পেনাল্টি নেই। রেন্টাল আবেদন ফর্ম পূরণ করুন এবং আগাম ¥১৮,০০০ ফেরতযোগ্য আমানত দিন। বাতিলের সময় ফোনে জানান এবং ডিভাইস ফেরত দিন। ফেরত: ¥১৮,০০০ মাইনাস ¥৫০০ × প্রকৃত ব্যবহারের দিন, মাইনাস ¥৫,০০০ সার্ভিস ফি।'),
        },
        features: [
          { text: { en: '¥500 per day (minimum 7 days)', ja: '￥500/日（最低7日間）', bn: '¥৫০০ প্রতিদিন (ন্যূনতম ৭ দিন)' } },
          { text: { en: '¥18,000 refundable deposit', ja: '￥18,000 返金可能なデポジット', bn: '¥১৮,০০০ ফেরতযোগ্য আমানত' } },
          { text: { en: 'No long-term contract required', ja: '長期契約不要', bn: 'দীর্ঘমেয়াদী চুক্তির প্রয়োজন নেই' } },
          { text: { en: 'Unlimited data, up to 10 simultaneous devices', ja: '無制限データ・最大10台同時接続', bn: 'আনলিমিটেড ডেটা, একসাথে ১০টি ডিভাইস' } },
        ],
      },
      {
        title: {
          en: 'Monthly Rental Plan',
          ja: '月額レンタルプラン',
          bn: 'মাসিক ভাড়া পরিকল্পনা',
        },
        description: {
          en: rt('Recommended for those staying in Japan for at least two years. Unlimited data at only ¥4,000/month. A 2-year contract is required with one month\'s advance notice for early cancellation. Pay ¥18,000 upfront; ¥5,000 is refunded when you complete the contract and return the device. Monthly payments are made by recharging your SmartPit card (included) at partner convenience stores by the 20th of each month. If not recharged by the 20th, the service pauses automatically.'),
          ja: rt('少なくとも2年間日本に滞在する方におすすめです。月額わずか￥4,000〜で無制限データプランをご利用いただけます。2年契約が必要で、早期解約の場合は1ヶ月前の通知が必要です。前払い￥18,000をお支払いいただき、契約完了・機器返却後に￥5,000を返金します。毎月の料金はパッケージに含まれるスマートピットカードを、毎月20日までにコンビニでチャージしてお支払いいただきます。20日までにチャージされない場合、サービスは自動的に停止します。'),
          bn: rt('কমপক্ষে দুই বছর জাপানে থাকার পরিকল্পনাকারীদের জন্য প্রস্তাবিত। মাত্র ¥৪,০০০/মাসে আনলিমিটেড ডেটা উপভোগ করুন। ২ বছরের চুক্তি প্রয়োজন; আর্লি ক্যান্সেলেশনের জন্য ১ মাস আগে নোটিশ দিতে হবে। আগাম ¥১৮,০০০ পরিশোধ করুন; চুক্তি সম্পন্ন ও ডিভাইস ফেরতের পর ¥৫,০০০ ফেরত পাবেন। মাসিক পেমেন্ট প্যাকেজে অন্তর্ভুক্ত স্মার্টপিট কার্ড প্রতি মাসের ২০ তারিখের মধ্যে কনভেনিয়েন্স স্টোরে রিচার্জ করে করা হয়। ২০ তারিখের মধ্যে রিচার্জ না হলে সার্ভিস স্বয়ংক্রিয়ভাবে বন্ধ হয়।'),
        },
        features: [
          { text: { en: '¥4,000/month (unlimited data)', ja: '￥4,000/月（無制限データ）', bn: '¥৪,০০০/মাস (আনলিমিটেড ডেটা)' } },
          { text: { en: '2-year contract, ¥18,000 upfront deposit', ja: '2年契約・￥18,000デポジット前払い', bn: '২ বছরের চুক্তি, আগাম ¥১৮,০০০ আমানত' } },
          { text: { en: '¥5,000 refund on contract completion and device return', ja: '契約完了・機器返却後に￥5,000返金', bn: 'চুক্তি সম্পন্ন ও ডিভাইস ফেরতে ¥৫,০০০ ফেরত' } },
          { text: { en: 'Recharge SmartPit card at convenience stores by the 20th monthly', ja: 'スマートピットカードをコンビニで毎月20日までにチャージ', bn: 'প্রতি মাসের ২০ তারিখের মধ্যে কনভেনিয়েন্স স্টোরে স্মার্টপিট রিচার্জ' } },
        ],
      },
    ],
  },

  {
    blockType: 'stats-bar',
    backgroundStyle: 'light',
    layout: 'grid',
    items: [
      {
        label: { en: 'High-speed Connection', ja: '高速接続', bn: 'উচ্চ-গতির সংযোগ' },
        body: { en: 'Softbank AXGP/LTE/CDMA network for fast browsing, streaming, and gaming anywhere in Japan.', ja: 'ソフトバンクAXGP・LTE・CDMAネットワークで、日本全国どこでも高速ブラウジング・ストリーミング・ゲームを実現。', bn: 'সফটব্যাংক নেটওয়ার্কে জাপানের যেকোনো জায়গায় দ্রুত ব্রাউজিং, স্ট্রিমিং ও গেমিং।' },
      },
      {
        label: { en: 'Up to 10 Devices', ja: '最大10台同時接続', bn: '১০টি পর্যন্ত ডিভাইস' },
        body: { en: 'Connect smartphones, laptops, game consoles, tablets, and more all at once.', ja: 'スマートフォン、ノートパソコン、ゲーム機、タブレットなど同時に接続可能。', bn: 'স্মার্টফোন, ল্যাপটপ, গেম কনসোল, ট্যাবলেট সবকিছু একসাথে সংযুক্ত করুন।' },
      },
      {
        label: { en: 'Nationwide Coverage', ja: '全国ネットワーク', bn: 'সারা জাপান কভারেজ' },
        body: { en: 'Broad network coverage across all regions of Japan — from major cities to rural areas.', ja: '都市部から地方まで、日本全国すべての地域でネットワークカバレッジを提供。', bn: 'প্রধান শহর থেকে গ্রামীণ এলাকা পর্যন্ত জাপানের সমস্ত অঞ্চলে বিস্তৃত কভারেজ।' },
      },
      {
        label: { en: 'No Long-term Contract', ja: '長期契約不要', bn: 'দীর্ঘমেয়াদী চুক্তি নেই' },
        body: { en: 'Daily plan has no binding contract — use it as you need, cancel anytime.', ja: '日額プランは長期契約なし。必要な分だけご利用いただき、いつでもキャンセル可能。', bn: 'দৈনিক পরিকল্পনায় কোনো বাধ্যতামূলক চুক্তি নেই — প্রয়োজন মতো ব্যবহার করুন।' },
      },
      {
        label: { en: 'SmartPit Recharge', ja: 'スマートピット決済', bn: 'স্মার্টপিট রিচার্জ' },
        body: { en: '24-hour recharge at Lawson, FamilyMart, and other partner convenience stores nationwide.', ja: 'ローソン・ファミリーマートなど全国の提携コンビニで24時間チャージ可能。', bn: 'সারা দেশে লাওসন, ফ্যামিলিমার্টসহ পার্টনার কনভেনিয়েন্স স্টোরে ২৪ ঘণ্টা রিচার্জ।' },
      },
      {
        label: { en: 'Multilingual Support', ja: '多言語サポート', bn: 'বহুভাষিক সহায়তা' },
        body: { en: 'Customer service available in Japanese, English, and Bengali to assist you at every step.', ja: '日本語・英語・ベンガル語で、すべての段階でサポート対応いたします。', bn: 'প্রতিটি ধাপে জাপানি, ইংরেজি ও বাংলায় কাস্টমার সার্ভিস।' },
      },
    ],
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// 2. mobile-sim
// ---------------------------------------------------------------------------

const mobileSimLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'Mobile SIM',
      ja: 'モバイルSIM',
      bn: 'মোবাইল সিম',
    },
    showBreadcrumb: false,
  },

  {
    blockType: 'rich-text',
    content: {
      en: rtMulti(
        'The data SIM is a standalone SIM card that can be used in any unlocked, SIM-free device running on a mobile phone network. It lets you enjoy internet services wherever coverage is available. Network speed and signal availability depend on your current location.',
        'In areas with a strong signal, the network switches to LTE mode for maximum speed. In areas with a weaker signal, it operates on 3G or 2G networks. Coverage currently extends across all of Japan. In addition to mobile phones, this SIM card can also be used in tablet PCs and certain portable gaming devices.',
      ),
      ja: rtMulti(
        'データSIMは、携帯電話ネットワークを利用する任意のロック解除済み・SIMフリーデバイスで使用できるスタンドアロンのSIMカードで、カバレッジエリア内でインターネットサービスをお楽しみいただけます。ネットワーク速度と信号の利用可能性は、現在地によって異なります。',
        '信号強度が強いエリアではLTEモードに切り替わり、弱いエリアでは3Gまたは2Gネットワークで動作します。現在、カバレッジエリアは日本全国に及んでいます。携帯電話以外にも、タブレットPCや特定のポータブルゲーム機器でもご使用いただけます。',
      ),
      bn: rtMulti(
        'ডেটা সিম একটি স্বতন্ত্র সিম কার্ড যা যেকোনো আনলক করা সিম-ফ্রি ডিভাইসে ব্যবহার করা যায়, কভারেজ এলাকায় ইন্টারনেট সেবা উপভোগ করতে দেয়। নেটওয়ার্ক গতি ও সিগন্যালের প্রাপ্যতা আপনার বর্তমান অবস্থানের উপর নির্ভর করে।',
        'শক্তিশালী সিগন্যাল এলাকায় LTE মোডে সর্বোচ্চ গতিতে কাজ করে; দুর্বল সিগন্যাল এলাকায় 3G বা 2G নেটওয়ার্কে। কভারেজ বর্তমানে সমগ্র জাপান জুড়ে। মোবাইল ফোনের পাশাপাশি ট্যাবলেট পিসি এবং কিছু পোর্টেবল গেমিং ডিভাইসেও ব্যবহার করা যায়।',
      ),
    },
    maxWidth: 'prose',
  },

  {
    blockType: 'business-line-list',
    displayMode: 'cards',
    items: [
      {
        icon: 'CreditCard',
        title: {
          en: 'SmartPit Card System',
          ja: 'スマートピットカードシステム',
          bn: 'স্মার্টপিট কার্ড সিস্টেম',
        },
        description: {
          en: rt('Your data SIM comes paired with a free Sadiatec SmartPit card. The SmartPit payment system (NTT Ltd) allows you to recharge your card balance 24 hours a day at partner service providers. To keep your service active, recharge the card by the 20th of each month.'),
          ja: rt('データSIMはSadiatecのスマートピットカード（無料提供）とペアになっています。スマートピット決済システム（NTT株式会社）により、提携サービスプロバイダーから24時間いつでもカード残高をチャージできます。サービスをアクティブに保つには、毎月20日までにカードをチャージしてください。'),
          bn: rt('আপনার ডেটা সিম বিনামূল্যে প্রদত্ত সাদিয়াটেক স্মার্টপিট কার্ডের সাথে আসে। এনটিটি লিমিটেডের স্মার্টপিট পেমেন্ট সিস্টেমের মাধ্যমে পার্টনার প্রদানকারীদের কাছে ২৪ ঘন্টা কার্ড ব্যালেন্স রিচার্জ করুন। সার্ভিস সক্রিয় রাখতে প্রতি মাসের ২০ তারিখের মধ্যে রিচার্জ করুন।'),
        },
      },
      {
        icon: 'Store',
        title: {
          en: 'Partner Convenience Stores',
          ja: '提携コンビニエンスストア',
          bn: 'পার্টনার কনভেনিয়েন্স স্টোর',
        },
        description: {
          en: rt('Recharge your SmartPit card at major convenience stores nationwide: Lawson, FamilyMart, and Ministop. All partner stores operate 24 hours a day, giving you complete flexibility to top up whenever you need it.'),
          ja: rt('主要なコンビニエンスストアでスマートピットカードをチャージできます：ローソン、ファミリーマート、ミニストップ。すべての提携店舗は24時間営業で、いつでも好きな時間にチャージできます。'),
          bn: rt('সারা দেশের প্রধান কনভেনিয়েন্স স্টোরে স্মার্টপিট কার্ড রিচার্জ করুন: লাওসন, ফ্যামিলিমার্ট এবং মিনিস্টপ। সমস্ত পার্টনার স্টোর ২৪ ঘন্টা চালু থাকে, যেকোনো সময় টপ আপ করার সুবিধা দেয়।'),
        },
      },
      {
        icon: 'Building',
        title: {
          en: 'Payment & Activation',
          ja: '支払いと手続き',
          bn: 'পেমেন্ট ও অ্যাক্টিভেশন',
        },
        description: {
          en: rtMulti(
            'All payments by bank transfer to: Japan Post Bank (Yucho Ginko), Account Number: 10030-43209071, Recipient: Sadiatec Co., Ltd.',
            'After receiving all required documents and payment, we proceed with all necessary steps and notify you by email (or phone if required) at every stage of the process.',
          ),
          ja: rtMulti(
            'すべての支払いは以下の銀行口座へお振込みください：ゆうちょ銀行、口座番号：10030-43209071、受取人：サディアテック株式会社。',
            '必要な書類と入金を確認後、すべての手続きを進め、各段階でメール（または必要に応じて電話）でご連絡いたします。',
          ),
          bn: rtMulti(
            'সমস্ত পেমেন্ট ব্যাংক ট্রান্সফারের মাধ্যমে করুন: জাপান পোস্ট ব্যাংক (ইউচো গিনকো), অ্যাকাউন্ট নম্বর: ১০০৩০-৪৩২০৯০৭১, প্রাপক: সাদিয়াটেক কো., লিমিটেড।',
            'সমস্ত প্রয়োজনীয় নথি ও পেমেন্ট পাওয়ার পর সমস্ত প্রয়োজনীয় পদক্ষেপ নেওয়া হয় এবং প্রতিটি ধাপে ইমেইল বা ফোনে জানানো হয়।',
          ),
        },
      },
    ],
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// 3. voip-services
// ---------------------------------------------------------------------------

const voipLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'VOIP Services',
      ja: 'VOIPサービス',
      bn: 'ভিওআইপি সেবা',
    },
    showBreadcrumb: false,
  },

  {
    blockType: 'rich-text',
    content: {
      en: rt('Sadiatec is one of Japan\'s largest voice traffic providers. We route all calls exclusively through premium Tier 1 carriers, guaranteeing the highest possible call quality and connection rates. A high ASR (Answer Seizure Ratio) is a defining standard of our network. The large volume of wholesale minutes we handle enables us to offer some of the most competitive international rates in the industry — savings we pass directly to our clients.'),
      ja: rt('サディアテックは日本最大級の音声トラフィックプロバイダーです。すべての通話をプレミアム品質のTier 1プロバイダーのみを通じてルーティングし、最高水準の通話品質と接続率を保証します。高いASR（応答率）は当社ネットワークの特徴的な標準です。大規模な卸売通話量により、業界最高水準の国際通話料金を提供でき、その節約をクライアントに直接還元しています。'),
      bn: rt('সাদিয়াটেক জাপানের বৃহত্তম ভয়েস ট্র্যাফিক প্রদানকারীদের মধ্যে একটি। আমরা শুধুমাত্র প্রিমিয়াম টায়ার ১ ক্যারিয়ারের মাধ্যমে সমস্ত কল রাউট করি, সর্বোচ্চ কল মান ও সংযোগ হার নিশ্চিত করি। উচ্চ ASR (আনসার সিজার রেশিও) আমাদের নেটওয়ার্কের বিশেষ মান। পাইকারি মিনিটের বিশাল ভলিউমের ফলে শিল্পের সবচেয়ে প্রতিযোগিতামূলক আন্তর্জাতিক রেট অফার করা সম্ভব — এই সাশ্রয় সরাসরি ক্লায়েন্টদের কাছে পৌঁছে দেই।'),
    },
    maxWidth: 'prose',
  },

  {
    blockType: 'business-line-list',
    displayMode: 'cards',
    items: [
      {
        icon: 'PhoneCall',
        title: {
          en: 'Prepaid International Calling Card Supply',
          ja: 'プリペイド国際電話カードの供給',
          bn: 'প্রিপেইড আন্তর্জাতিক কলিং কার্ড সরবরাহ',
        },
        description: {
          en: rt('All Sadiatec calling cards are highly regarded for quality and value. We are always seeking qualified resellers. Sadiatec prepaid international calling cards can be used from any computer, making them available to sell worldwide.'),
          ja: rt('サディアテックのすべての通話カードは、品質と価格の面で高い評価を受けています。当社は資格のある再販業者を常に募集しています。サディアテックのプリペイド国際電話カードはどのコンピュータからでも使用できるため、世界中で販売できます。'),
          bn: rt('সাদিয়াটেকের সমস্ত কলিং কার্ড মান ও মূল্যের দিক থেকে অত্যন্ত জনপ্রিয়। আমরা সর্বদা যোগ্য রিসেলার খুঁজছি। সাদিয়াটেকের প্রিপেইড আন্তর্জাতিক কলিং কার্ড যেকোনো কম্পিউটার থেকে ব্যবহার করা যায়, তাই বিশ্বজুড়ে বিক্রি করা সম্ভব।'),
        },
      },
      {
        icon: 'Server',
        title: {
          en: 'Hosted Switch & Billing Solution',
          ja: 'ホステッドスイッチおよび課金ソリューション',
          bn: 'হোস্টেড সুইচ ও বিলিং সমাধান',
        },
        description: {
          en: rt('We offer clients complete enterprise-grade softswitch and billing solutions on a rental basis. No need to purchase expensive hardware, servers, software licences, or support contracts. New systems go online within 72 hours of ordering.'),
          ja: rt('レンタルベースで完全なエンタープライズグレードのソフトスイッチと課金ソリューションをクライアントに提供します。高価なハードウェア、サーバー、ソフトウェアライセンス、サポートの購入が不要です。新しいシステムは注文から72時間以内にオンラインになります。'),
          bn: rt('রেন্টাল ভিত্তিতে ক্লায়েন্টদের সম্পূর্ণ এন্টারপ্রাইজ-গ্রেড সফটসুইচ ও বিলিং সমাধান প্রদান করি। ব্যয়বহুল হার্ডওয়্যার, সার্ভার, সফটওয়্যার লাইসেন্স বা সাপোর্ট চুক্তি কেনার প্রয়োজন নেই। নতুন সিস্টেম অর্ডারের ৭২ ঘন্টার মধ্যে অনলাইন হয়।'),
        },
      },
      {
        icon: 'Settings',
        title: {
          en: 'Softswitch Customization',
          ja: 'ソフトスイッチのカスタマイズ',
          bn: 'সফটসুইচ কাস্টমাইজেশন',
        },
        description: {
          en: rt('We provide configuration of major commercial and open-source VoIP services, custom control panel development, and on-site and online training to ensure your team can manage the system effectively.'),
          ja: rt('主要な商用およびオープンソースのVoIPサービスの構成、カスタムコントロールパネルの開発、オンサイトおよびオンライントレーニングを提供し、チームがシステムを効果的に管理できるようサポートします。'),
          bn: rt('প্রধান বাণিজ্যিক ও ওপেন-সোর্স ভিওআইপি সেবার কনফিগারেশন, কাস্টম কন্ট্রোল প্যানেল ডেভেলপমেন্ট এবং অন-সাইট ও অনলাইন প্রশিক্ষণ প্রদান করি যাতে আপনার দল সিস্টেম কার্যকরভাবে পরিচালনা করতে পারে।'),
        },
      },
      {
        icon: 'Building2',
        title: {
          en: 'Enterprise IP PBX Setup',
          ja: '企業向けIP PBXセットアップ',
          bn: 'এন্টারপ্রাইজ আইপি পিবিএক্স সেটআপ',
        },
        description: {
          en: rt('We provide hardware, installation, and support for IP PBX systems at a fraction of the cost of traditional PBX. Clients also receive professional features including a fully functional IVR, voicemail system, and CallerID identification. Save at least 80% on PBX and international call costs.'),
          ja: rt('従来のPBXシステムと比較して非常に低コストで、IP PBXシステム用のハードウェア、インストール、サポートを提供します。完全に機能するIVR、ボイスメールシステム、発信者ID識別などのプロフェッショナル機能も提供されます。PBXと国際通話コストを少なくとも80％削減できます。'),
          bn: rt('ঐতিহ্যগত পিবিএক্সের তুলনায় খুব কম খরচে আইপি পিবিএক্স সিস্টেমের জন্য হার্ডওয়্যার, ইনস্টলেশন ও সাপোর্ট প্রদান করি। ক্লায়েন্টরা সম্পূর্ণ কার্যকরী IVR, ভয়েসমেইল সিস্টেম ও কলার আইডি সহ পেশাদার সুবিধা পান। পিবিএক্স ও আন্তর্জাতিক কল খরচে কমপক্ষে ৮০% সাশ্রয় করুন।'),
        },
      },
      {
        icon: 'Smartphone',
        title: {
          en: 'Mobile VOIP',
          ja: 'モバイルVOIP',
          bn: 'মোবাইল ভিওআইপি',
        },
        description: {
          en: rt('Our iOS and Android dialer app lets you make the cheapest international calls over WiFi or a standard mobile network. Make calls directly from your smartphone without expensive roaming charges.'),
          ja: rt('iOS・Android向けのモバイルダイヤラーアプリにより、WiFiや携帯電話ネットワークを通じて最も安価な国際通話を実現します。高額なローミング料金なしに、スマートフォンから直接通話できます。'),
          bn: rt('আমাদের iOS ও Android ডায়ালার অ্যাপ দিয়ে ওয়াইফাই বা স্ট্যান্ডার্ড মোবাইল নেটওয়ার্কে সবচেয়ে সস্তায় আন্তর্জাতিক কল করুন। ব্যয়বহুল রোমিং চার্জ ছাড়াই স্মার্টফোন থেকে সরাসরি কল করুন।'),
        },
      },
    ],
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// 4. npo-doshdik
// ---------------------------------------------------------------------------

const npoDoshdikLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'NPO Doshdik Japan',
      ja: 'NPOドシュディク',
      bn: 'এনপিও দশদিক জাপান',
    },
    showBreadcrumb: false,
  },

  {
    blockType: 'rich-text',
    content: {
      en: rtMulti(
        'Bangladesh is one of the world\'s most densely populated countries, with approximately 160 million people living in an area roughly 40% the size of Japan. Despite government efforts to promote IT, education, and foreign investment, significant challenges persist: deep-rooted poverty, gaps in access to education, limited women\'s rights, barriers for people with disabilities, and natural disasters that continue to hinder economic development.',
        'DOSHDIK JAPAN was established as a certified non-profit organisation (NPO) to address these challenges through Japan–Bangladesh collaboration, building trust and recognition by working alongside Japanese citizens, Bangladesh residents in Japan, and civic organisations.',
      ),
      ja: rtMulti(
        'バングラデシュは世界で最も人口密度の高い国の一つで、日本の約40%の面積に約1億6000万人が暮らしています。政府がITや教育の推進、外国投資の誘致に努めていますが、根深い貧困、教育格差、女性の権利制限、障がい者への壁、そして自然災害による経済発展の阻害など、多くの課題が残っています。',
        'ドシュディクJAPANは、日本人、日本在住のバングラデシュ人、市民団体と連携してこれらの課題に取り組むため、特定非営利活動法人として設立され、信頼と認知度を高めながら活動しています。',
      ),
      bn: rtMulti(
        'বাংলাদেশ বিশ্বের সবচেয়ে ঘনবসতিপূর্ণ দেশগুলির মধ্যে একটি, জাপানের প্রায় ৪০% আয়তনে প্রায় ১৬ কোটি মানুষের বাস। সরকার আইটি, শিক্ষা ও বিদেশি বিনিয়োগ প্রচারে সচেষ্ট থাকলেও গভীরমূল দারিদ্র্য, শিক্ষার সুযোগের ব্যবধান, নারীর অধিকারের সীমাবদ্ধতা, প্রতিবন্ধীদের বাধা এবং প্রাকৃতিক দুর্যোগের মতো চ্যালেঞ্জ অব্যাহত রয়েছে।',
        'এনপিও দশদিক জাপান এই চ্যালেঞ্জগুলো মোকাবেলায় জাপান-বাংলাদেশ সহযোগিতার মাধ্যমে কাজ করার জন্য একটি স্বীকৃত অলাভজনক সংগঠন হিসেবে প্রতিষ্ঠিত হয়েছে, জাপানি নাগরিক, জাপানে বসবাসরত বাংলাদেশি ও নাগরিক সংগঠনের সাথে মিলে বিশ্বাস ও স্বীকৃতি গড়ে তুলছে।',
      ),
    },
    maxWidth: 'prose',
  },

  {
    blockType: 'image-text-split',
    imagePosition: 'right',
    imageAlt: {
      en: 'Children in Bangladesh with books — Doshdik Japan supports education for every child',
      ja: '本を持つバングラデシュの子どもたち — ドシュディクJAPANはすべての子どもの教育を支援します',
      bn: 'বই হাতে বাংলাদেশের শিশুরা — দশদিক জাপান প্রতিটি শিশুর শিক্ষা সমর্থন করে',
    },
    heading: {
      en: 'Our Mission',
      ja: '私たちの使命',
      bn: 'আমাদের লক্ষ্য',
    },
    body: {
      en: rt('We work in collaboration with Japanese citizens, Bangladesh residents living in Japan, and civic organisations to ensure that every child has access to education and to build a society where women and people with disabilities can fully contribute their abilities. Through educational support, women\'s empowerment programmes, and disability inclusion initiatives, Doshdik Japan strives to create lasting positive change.'),
      ja: rt('私たちは、日本人、日本在住のバングラデシュ人、市民団体と連携し、すべての子どもが教育を受けられるよう、また女性や障がい者が能力を発揮できる社会を実現するために活動しています。教育支援、女性の自立支援、障がい者のための施設運営などの活動を通じて、ドシュディクJAPANは持続的なポジティブな変化を目指しています。'),
      bn: rt('আমরা জাপানি নাগরিক, জাপানে বসবাসরত বাংলাদেশি এবং নাগরিক সংগঠনের সাথে সহযোগিতায় কাজ করি যাতে প্রতিটি শিশু শিক্ষার সুযোগ পায় এবং নারী ও প্রতিবন্ধী মানুষ তাদের সামর্থ্য পুরোপুরি কাজে লাগাতে পারে। শিক্ষা সহায়তা, নারী ক্ষমতায়ন কর্মসূচি এবং প্রতিবন্ধী অন্তর্ভুক্তি উদ্যোগের মাধ্যমে দশদিক জাপান স্থায়ী ইতিবাচক পরিবর্তনের লক্ষ্যে কাজ করে।'),
    },
    backgroundStyle: 'light',
    imageSplit: '50/50',
    verticalAlign: 'center',
  },

  {
    blockType: 'business-line-list',
    displayMode: 'cards',
    items: [
      {
        icon: 'BookOpen',
        title: {
          en: 'Children\'s Education Support',
          ja: '子どもの教育支援',
          bn: 'শিশু শিক্ষা সহায়তা',
        },
        description: {
          en: rt('Supporting access to quality education for children in Bangladesh, regardless of economic circumstances. We work to ensure no child is left behind, providing educational resources and support to underserved communities.'),
          ja: rt('経済的な状況に関わらず、バングラデシュの子どもたちが質の高い教育を受けられるよう支援します。どの子どもも取り残されないよう努め、支援が不十分なコミュニティに教育リソースとサポートを提供します。'),
          bn: rt('অর্থনৈতিক পরিস্থিতি নির্বিশেষে বাংলাদেশের শিশুদের মানসম্পন্ন শিক্ষায় প্রবেশাধিকার সহায়তা করা হয়। কোনো শিশু যাতে পিছিয়ে না পড়ে তা নিশ্চিত করতে সুবিধাবঞ্চিত সম্প্রদায়গুলোতে শিক্ষামূলক সম্পদ ও সহায়তা প্রদান করা হয়।'),
        },
      },
      {
        icon: 'Heart',
        title: {
          en: 'Women\'s Empowerment',
          ja: '女性の自立支援',
          bn: 'নারীর ক্ষমতায়ন',
        },
        description: {
          en: rt('Supporting women\'s independence, economic participation, and rights in Bangladesh. Through skills training, awareness programmes, and advocacy, we work to create equal opportunities and a society where women can reach their full potential.'),
          ja: rt('バングラデシュにおける女性の自立、経済的参加、権利を支援します。スキルトレーニング、啓発プログラム、権利擁護活動を通じて、女性が可能性を最大限に発揮できる平等な機会と社会の実現を目指します。'),
          bn: rt('বাংলাদেশে নারীর স্বাধীনতা, অর্থনৈতিক অংশগ্রহণ ও অধিকার সমর্থন করা হয়। দক্ষতা প্রশিক্ষণ, সচেতনতা কর্মসূচি ও অ্যাডভোকেসির মাধ্যমে নারীদের পূর্ণ সম্ভাবনা বিকাশের সমান সুযোগ ও সমাজ গড়ার কাজ করা হয়।'),
        },
      },
      {
        icon: 'Users',
        title: {
          en: 'Disability Support',
          ja: '障がい者支援',
          bn: 'প্রতিবন্ধী সহায়তা',
        },
        description: {
          en: rt('Operating facilities and programmes for people with disabilities in Bangladesh, helping them contribute their abilities to society. We advocate for an inclusive society where every person has dignity and the opportunity to participate fully in community life.'),
          ja: rt('バングラデシュの障がい者のための施設運営やプログラムを実施し、社会への貢献を支援します。すべての人が尊厳を持ち、社会生活に完全に参加できる包括的な社会の実現を目指します。'),
          bn: rt('বাংলাদেশে প্রতিবন্ধী মানুষদের জন্য সুবিধা ও কর্মসূচি পরিচালনা করা হয়, তাদের সমাজে অবদান রাখতে সহায়তা করা হয়। প্রতিটি মানুষ যাতে মর্যাদার সাথে সম্প্রদায় জীবনে পুরোপুরি অংশগ্রহণ করতে পারে সেই অন্তর্ভুক্তিমূলক সমাজের পক্ষে কাজ করা হয়।'),
        },
      },
    ],
  },

  {
    blockType: 'rich-text',
    content: {
      en: rtMulti(
        'Address: 〒101-0021, Tokyo, Chiyoda-ku, Sotokanda 4-5-5, Akiba-Mitakikan 5F',
        'Representative: Haq Mod Sanaul　／　Founded: 19 January 2021',
        'Tel: 03-3255-5861　／　FAX: 03-3255-5862　／　Email: sanaul@sadiatec.com',
      ),
      ja: rtMulti(
        '所在地：〒101-0021 東京都千代田区外神田4-5-5 アキバ三滝館5F',
        '代表者：ハク・モド・サナウル　／　設立日：2021年1月19日',
        '電話：03-3255-5861　／　FAX：03-3255-5862　／　メール：sanaul@sadiatec.com',
      ),
      bn: rtMulti(
        'ঠিকানা: 〒101-0021, টোকিও, চিয়োদা-কু, সোটোকান্দা ৪-৫-৫, আকিবা-মিতাকিকান ৫এফ',
        'প্রতিনিধি: হক মো. সানাউল　／　প্রতিষ্ঠিত: ১৯ জানুয়ারি ২০২১',
        'টেলিফোন: 03-3255-5861　／　ফ্যাক্স: 03-3255-5862　／　ইমেইল: sanaul@sadiatec.com',
      ),
    },
    maxWidth: 'prose',
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// 5. doshdik-tv
// ---------------------------------------------------------------------------

const doshdikTvLayout = [
  {
    blockType: 'page-hero',
    variant: 'page-title',
    pageTitle: {
      en: 'Doshdik TV',
      ja: 'ドシュディクTV',
      bn: 'দশদিক টিভি',
    },
    showBreadcrumb: false,
  },

  {
    blockType: 'rich-text',
    content: {
      en: rtMulti(
        'Doshdik TV is Bangladesh\'s premier online television network, delivering a rich variety of programming including news, movies, dramas, and talk shows. Our channel\'s sole purpose is to entertain viewers and provide the right kind of content for every mood and every occasion.',
        'We are committed to programming for all age groups — children are never left out. Dedicated children\'s content is carefully designed to engage young minds and support their intellectual and character development. Follow Doshdik TV on Facebook, YouTube, and social media to stay connected.',
      ),
      ja: rtMulti(
        'ドシュディクTVはバングラデシュの一流オンラインテレビネットワークです。ニュース、映画、ドラマ、トークショーなど豊富な番組を提供しています。視聴者を楽しませ、あらゆる気分とシーンに合った適切なコンテンツを届けることが私たちの目的です。',
        'あらゆる年齢層向けの番組作りを目指しており、子どもたちも差別されません。子どもたちの知的・人格的成長を支援するために丁寧に設計された専用コンテンツを提供しています。フェイスブック、ユーチューブ、SNSでドシュディクTVをフォローしてください。',
      ),
      bn: rtMulti(
        'দশদিক টিভি বাংলাদেশের শীর্ষস্থানীয় অনলাইন টেলিভিশন নেটওয়ার্ক, সংবাদ, চলচ্চিত্র, নাটক ও টক শো সহ বৈচিত্র্যময় প্রোগ্রামিং প্রদান করে। দর্শকদের বিনোদন দেওয়া এবং প্রতিটি মুহূর্ত ও উপলক্ষের জন্য সঠিক ধরনের কন্টেন্ট সরবরাহ করাই আমাদের একমাত্র লক্ষ্য।',
        'সব বয়সের জন্য অনুষ্ঠান তৈরিতে আমরা প্রতিশ্রুতিবদ্ধ — শিশুরাও বাদ যায় না। শিশুদের বৌদ্ধিক ও চারিত্রিক বিকাশে সহায়ক বিশেষ কন্টেন্ট সযত্নে তৈরি করা হয়। ফেসবুক, ইউটিউব ও সোশ্যাল মিডিয়ায় দশদিক টিভি ফলো করুন।',
      ),
    },
    maxWidth: 'prose',
  },

  {
    blockType: 'business-line-list',
    displayMode: 'cards',
    items: [
      {
        icon: 'Newspaper',
        title: {
          en: 'News Coverage',
          ja: 'ニュース報道',
          bn: 'সংবাদ প্রতিবেদন',
        },
        description: {
          en: rt('Comprehensive reporting on local and global events to keep viewers informed about what matters. Our news team covers the stories that shape Bangladesh and the world.'),
          ja: rt('地域および世界のイベントについて視聴者に情報を提供する包括的なニュース報道。バングラデシュと世界を形づくるニュースをお届けします。'),
          bn: rt('দর্শকদের গুরুত্বপূর্ণ বিষয়ে সচেতন রাখতে স্থানীয় ও বৈশ্বিক ঘটনাবলির ব্যাপক প্রতিবেদন। আমাদের সংবাদ দল বাংলাদেশ ও বিশ্বকে আকৃতি দেওয়া ঘটনাগুলো কভার করে।'),
        },
      },
      {
        icon: 'Film',
        title: {
          en: 'Movies & Drama',
          ja: '映画とドラマ',
          bn: 'চলচ্চিত্র ও নাটক',
        },
        description: {
          en: rt('Carefully selected films and engaging drama series that entertain the whole family. From heartfelt stories to compelling thrillers, our curated content brings quality entertainment to every screen.'),
          ja: rt('家族全員が楽しめるよう精選された映画と魅力的なドラマシリーズ。心温まるストーリーから引き込まれるスリラーまで、厳選されたコンテンツが質の高いエンターテイメントをお届けします。'),
          bn: rt('সমগ্র পরিবারকে বিনোদন দিতে সযত্নে নির্বাচিত চলচ্চিত্র ও আকর্ষণীয় নাটক সিরিজ। আবেগময় গল্প থেকে রোমাঞ্চকর থ্রিলার পর্যন্ত, কিউরেটেড কন্টেন্ট প্রতিটি স্ক্রিনে মানসম্পন্ন বিনোদন নিয়ে আসে।'),
        },
      },
      {
        icon: 'Mic2',
        title: {
          en: 'Talk Shows',
          ja: 'トークショー',
          bn: 'টক শো',
        },
        description: {
          en: rt('Engaging discussions and interviews on topics that impact society and everyday life. Our talk shows bring diverse voices together to explore ideas, debate issues, and spark meaningful conversations.'),
          ja: rt('社会と日常生活に影響を与えるトピックについての魅力的な議論とインタビュー。多様な視点を集め、アイデアを探求し、問題を議論し、意義ある対話を生み出すトークショーをお届けします。'),
          bn: rt('সমাজ ও দৈনন্দিন জীবনে প্রভাব ফেলা বিষয়গুলো নিয়ে আকর্ষণীয় আলোচনা ও সাক্ষাৎকার। আমাদের টক শো বৈচিত্র্যময় কণ্ঠস্বর একত্রিত করে ধারণা অন্বেষণ, বিষয় নিয়ে বিতর্ক এবং অর্থবহ কথোপকথন শুরু করে।'),
        },
      },
      {
        icon: 'Star',
        title: {
          en: "Children's Programs",
          ja: '子供向け番組',
          bn: 'শিশু অনুষ্ঠান',
        },
        description: {
          en: rt('Educational and entertaining content specifically designed for children\'s intellectual and character development. Our children\'s programming engages young minds with stories, learning, and creativity that help them grow.'),
          ja: rt('子どもたちの知的・人格的成長のために特別に設計された教育的で楽しいコンテンツ。ストーリー、学び、創造性を通じて子どもたちの成長を支援するコンテンツで若い心に働きかけます。'),
          bn: rt('শিশুদের বৌদ্ধিক ও চারিত্রিক বিকাশের জন্য বিশেষভাবে ডিজাইন করা শিক্ষামূলক ও বিনোদনমূলক কন্টেন্ট। আমাদের শিশু অনুষ্ঠান গল্প, শিক্ষা ও সৃজনশীলতার মাধ্যমে তরুণ মনকে বিকাশে সহায়তা করে।'),
        },
      },
    ],
  },

  ctaBanner,
]

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

async function seedServicesMorePages(): Promise<void> {
  const payload = await getPayload({ config })
  console.log('\n🌱 Seeding services more pages...\n')

  await upsertServiceLayout(
    payload,
    'pocket-wifi-data-sim',
    pocketWifiLayout,
    {
      title: {
        en: 'Pocket WiFi / Data SIM',
        ja: 'ポケットWiFi・データSIM',
        bn: 'পকেট ওয়াইফাই / ডেটা সিম',
      },
      excerpt: {
        en: 'Unlimited data plans for tourists, students, and professionals in Japan. Daily rental from ¥500/day, monthly from ¥4,000/month. Powered by Softbank\'s nationwide network.',
        ja: '観光客、学生、専門家向けの無制限データプラン。日額￥500〜、月額￥4,000〜。ソフトバンクの全国ネットワーク対応。',
        bn: 'জাপানে পর্যটক, শিক্ষার্থী ও পেশাদারদের জন্য আনলিমিটেড ডেটা প্ল্যান। দৈনিক ¥৫০০ থেকে, মাসিক ¥৪,০০০ থেকে। সফটব্যাংকের জাতীয় নেটওয়ার্ক।',
      },
    },
  )

  await upsertServiceLayout(
    payload,
    'mobile-sim',
    mobileSimLayout,
    {
      title: {
        en: 'Mobile SIM',
        ja: 'モバイルSIM',
        bn: 'মোবাইল সিম',
      },
      excerpt: {
        en: 'Standalone data SIM card for any SIM-free device. Nationwide LTE/3G coverage, SmartPit recharge system, and easy application process.',
        ja: 'SIMフリーデバイス向けのデータSIMカード。全国LTE・3Gカバレッジ、スマートピットチャージシステム、簡単な申込プロセス。',
        bn: 'যেকোনো সিম-ফ্রি ডিভাইসের জন্য স্বতন্ত্র ডেটা সিম কার্ড। সারা জাপান LTE/3G কভারেজ, স্মার্টপিট রিচার্জ সিস্টেম এবং সহজ আবেদন প্রক্রিয়া।',
      },
    },
  )

  await upsertServiceLayout(
    payload,
    'voip-services',
    voipLayout,
    {
      title: {
        en: 'VOIP Services',
        ja: 'VOIPサービス',
        bn: 'ভিওআইপি সেবা',
      },
      excerpt: {
        en: 'Premium-quality voice traffic via Tier 1 carriers. Prepaid calling cards, hosted softswitch, enterprise IP PBX setup, and mobile VOIP for businesses and resellers.',
        ja: 'Tier 1プロバイダー経由のプレミアム品質音声トラフィック。プリペイド通話カード、ホスト型ソフトスイッチ、企業向けIP PBXセットアップ、モバイルVOIP。',
        bn: 'টায়ার ১ ক্যারিয়ারের মাধ্যমে প্রিমিয়াম মানের ভয়েস ট্র্যাফিক। প্রিপেইড কলিং কার্ড, হোস্টেড সফটসুইচ, এন্টারপ্রাইজ আইপি পিবিএক্স সেটআপ এবং মোবাইল ভিওআইপি।',
      },
    },
  )

  await upsertServiceLayout(
    payload,
    'npo-doshdik',
    npoDoshdikLayout,
    {
      title: {
        en: 'NPO Doshdik Japan',
        ja: 'NPOドシュディク',
        bn: 'এনপিও দশদিক জাপান',
      },
      excerpt: {
        en: 'Non-profit organisation supporting children\'s education, women\'s empowerment, and disability inclusion in Bangladesh through Japan–Bangladesh collaboration.',
        ja: 'バングラデシュの子どもの教育支援、女性の自立、障がい者包摂を目的とした日本・バングラデシュ連携NPO。',
        bn: 'জাপান-বাংলাদেশ সহযোগিতার মাধ্যমে বাংলাদেশে শিশু শিক্ষা, নারী ক্ষমতায়ন ও প্রতিবন্ধী অন্তর্ভুক্তিকে সহায়তাকারী অলাভজনক সংগঠন।',
      },
    },
  )

  await upsertServiceLayout(
    payload,
    'doshdik-tv',
    doshdikTvLayout,
    {
      title: {
        en: 'Doshdik TV',
        ja: 'ドシュディクTV',
        bn: 'দশদিক টিভি',
      },
      excerpt: {
        en: 'Bangladesh\'s premier online television network. News, movies, dramas, talk shows, and children\'s programmes for all age groups.',
        ja: 'バングラデシュの一流オンラインテレビネットワーク。ニュース、映画、ドラマ、トークショー、全年齢層向け子供番組。',
        bn: 'বাংলাদেশের শীর্ষস্থানীয় অনলাইন টেলিভিশন নেটওয়ার্ক। সকল বয়সের জন্য সংবাদ, চলচ্চিত্র, নাটক, টক শো ও শিশু অনুষ্ঠান।',
      },
    },
  )

  console.log('\n✅ Services more pages seed complete.\n')
  process.exit(0)
}

seedServicesMorePages().catch((err: unknown) => {
  console.error('Services more pages seed failed:', err)
  process.exit(1)
})
