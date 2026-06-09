# Phase 5c — Seed Data Plan: 5 More Services Pages

**Pattern:** Follows `apps/saidatech/src/seed/services-inner-pages.seed.ts` exactly.
**File to create:** `apps/saidatech/src/seed/services-more-pages.seed.ts`

All 5 services are NEW (not yet in the database), so `upsertServiceLayout` must be called with a `newServiceMeta` argument for each.

---

## Shared CTA banner (reused across all 5 pages)

```typescript
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
    label: { en: 'Start Your Application', ja: '申し込みを始める', bn: 'আবেদন শুরু করুন' },
    href: '/contact',
  },
  backgroundStyle: 'brand',
  variant: 'gradient',
}
```

---

## 1. pocket-wifi-data-sim

### newServiceMeta
```typescript
{
  title: { en: 'Pocket WiFi / Data SIM', ja: 'ポケットWiFi・データSIM', bn: 'পকেট ওয়াইফাই / ডেটা সিম' },
  excerpt: {
    en: 'Unlimited data plans for tourists, students, and professionals in Japan. Daily rental from ¥500/day, monthly from ¥4,000/month.',
    ja: '観光客、学生、専門家向けの無制限データプラン。日額￥500〜、月額￥4,000〜。',
    bn: 'জাপানে পর্যটক, শিক্ষার্থী ও পেশাদারদের জন্য আনলিমিটেড ডেটা প্ল্যান। প্রতিদিন ¥৫০০ থেকে, মাসিক ¥৪,০০০ থেকে।',
  },
}
```

### Layout blocks

**Block 1 — page-hero**
```typescript
{
  blockType: 'page-hero',
  variant: 'page-title',
  pageTitle: { en: 'Pocket WiFi / Data SIM', ja: 'ポケットWiFi・データSIM', bn: 'পকেট ওয়াইফাই / ডেটা সিম' },
  showBreadcrumb: false,
}
```

**Block 2 — image-text-split**
```typescript
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
  body: rt('ポケットWiFiルーターは、ユーザーがいつでもどこでもインターネットにアクセスできる便利なポータブルデバイスです。ソフトバンクのAXGP・LTE・CDMAネットワークを通じてデータサービスを提供し、日本全国で広いネットワークカバレッジと信頼性の高い高速通信を実現します。最大10台のデバイス（スマートフォン、ノートパソコン、ゲーム機器など）に同時接続でき、観光客、学生、ビジネスパーソンに最適です。'),
  backgroundStyle: 'white',
  imageSplit: '50/50',
  verticalAlign: 'center',
}
```
*(note: body localized for en/bn in seed)*

**Block 3 — business-line-list (list mode, 2 plan items)**
```typescript
{
  blockType: 'business-line-list',
  displayMode: 'list',
  items: [
    {
      title: { en: 'Daily Rental Plan', ja: '日額レンタルプラン', bn: 'দৈনিক ভাড়া পরিকল্পনা' },
      description: rt('...¥500/day, minimum 7 days. ¥18,000 refundable deposit. No long-term contract. Cancel by phone, return device by mail or in person. Refund = deposit minus ¥500/day × actual days + ¥5,000 service fee. ...'),
      features: [
        { text: { en: '¥500 per day (minimum 7 days)', ja: '￥500/日（最低7日間）', bn: '¥৫০০ প্রতিদিন (ন্যূনতম ৭ দিন)' } },
        { text: { en: '¥18,000 refundable deposit', ja: '￥18,000 返金可能なデポジット', bn: '¥১৮,০০০ ফেরতযোগ্য আমানত' } },
        { text: { en: 'No long-term contract required', ja: '長期契約不要', bn: 'দীর্ঘমেয়াদী চুক্তির প্রয়োজন নেই' } },
        { text: { en: 'Unlimited data, up to 10 devices', ja: '無制限データ・最大10台同時接続', bn: 'আনলিমিটেড ডেটা, ১০টি পর্যন্ত ডিভাইস' } },
      ],
    },
    {
      title: { en: 'Monthly Rental Plan', ja: '月額レンタルプラン', bn: 'মাসিক ভাড়া পরিকল্পনা' },
      description: rt('...¥4,000/month or more. 2-year contract, 1 month advance notice for early cancellation. ¥18,000 upfront. ¥5,000 refund on completion and device return. Recharge SmartPit card by 20th each month at partner convenience stores.'),
      features: [
        { text: { en: '¥4,000/month (unlimited data)', ja: '￥4,000/月（無制限データ）', bn: '¥৪,০০০/মাস (আনলিমিটেড ডেটা)' } },
        { text: { en: '2-year contract, ¥18,000 deposit', ja: '2年契約・￥18,000デポジット', bn: '২ বছরের চুক্তি, ¥১৮,০০০ আমানত' } },
        { text: { en: '¥5,000 refund on contract completion', ja: '契約完了時￥5,000返金', bn: 'চুক্তি সম্পন্নে ¥৫,০০০ ফেরত' } },
        { text: { en: 'Recharge via SmartPit at convenience stores by 20th monthly', ja: 'スマートピットでコンビニから毎月20日までにチャージ', bn: 'প্রতি মাসের ২০ তারিখের মধ্যে কনভেনিয়েন্স স্টোরে স্মার্টপিট রিচার্জ' } },
      ],
    },
  ],
}
```

**Block 4 — stats-bar (grid, light, 6 benefit items)**
```typescript
{
  blockType: 'stats-bar',
  backgroundStyle: 'light',
  layout: 'grid',
  items: [
    { label: { en: 'High-speed Connection', ja: '高速接続', bn: 'উচ্চ-গতির সংযোগ' }, body: { en: 'Softbank AXGP/LTE/CDMA network for reliable fast browsing, streaming, and gaming.', ja: 'ソフトバンクAXGP・LTE・CDMAネットワークで高速ブラウジング・ストリーミング・ゲームを実現。', bn: 'সফটব্যাংক নেটওয়ার্কে দ্রুত ব্রাউজিং, স্ট্রিমিং ও গেমিং।' } },
    { label: { en: 'Up to 10 Devices', ja: '最大10台同時接続', bn: '১০টি পর্যন্ত ডিভাইস' }, body: { en: 'Connect smartphones, laptops, game consoles, and more simultaneously.', ja: 'スマートフォン、ノートパソコン、ゲーム機など同時接続可能。', bn: 'স্মার্টফোন, ল্যাপটপ, গেম কনসোল একসাথে সংযুক্ত করুন।' } },
    { label: { en: 'Nationwide Coverage', ja: '全国ネットワーク', bn: 'সারা জাপান কভারেজ' }, body: { en: 'Broad network coverage across all regions of Japan.', ja: '日本全国すべての地域でネットワークカバレッジを提供。', bn: 'জাপানের সমস্ত অঞ্চলে বিস্তৃত নেটওয়ার্ক কভারেজ।' } },
    { label: { en: 'No Long-term Contract', ja: '長期契約不要', bn: 'দীর্ঘমেয়াদী চুক্তি নেই' }, body: { en: 'Daily plan with no binding contract — just use as you need.', ja: '日額プランは長期契約なし。必要な分だけご利用いただけます。', bn: 'দৈনিক পরিকল্পনায় কোনো বাধ্যতামূলক চুক্তি নেই।' } },
    { label: { en: 'SmartPit Recharge', ja: 'スマートピット決済', bn: 'স্মার্টপিট রিচার্জ' }, body: { en: '24-hour recharge at Lawson, FamilyMart, and other convenience stores.', ja: 'ローソン・ファミリーマートなどのコンビニで24時間チャージ可能。', bn: 'লাওসন, ফ্যামিলিমার্টসহ কনভেনিয়েন্স স্টোরে ২৪ ঘণ্টা রিচার্জ।' } },
    { label: { en: 'Multilingual Support', ja: '多言語サポート', bn: 'বহুভাষিক সহায়তা' }, body: { en: 'Customer service available in Japanese, English, and Bengali.', ja: '日本語・英語・ベンガル語でカスタマーサービスを提供。', bn: 'জাপানি, ইংরেজি ও বাংলায় কাস্টমার সার্ভিস।' } },
  ],
}
```

**Block 5 — cta-banner** (shared ctaBanner constant)

---

## 2. mobile-sim

### newServiceMeta
```typescript
{
  title: { en: 'Mobile SIM', ja: 'モバイルSIM', bn: 'মোবাইল সিম' },
  excerpt: {
    en: 'Standalone data SIM card for SIM-free devices. Nationwide LTE coverage, SmartPit recharge at convenience stores across Japan.',
    ja: 'SIMフリーデバイス向けのデータSIMカード。全国LTEカバレッジ、スマートピットでコンビニからチャージ可能。',
    bn: 'সিম-ফ্রি ডিভাইসের জন্য স্বতন্ত্র ডেটা সিম কার্ড। সারা জাপান এলটিই কভারেজ, কনভেনিয়েন্স স্টোরে স্মার্টপিট রিচার্জ।',
  },
}
```

### Layout blocks

**Block 1 — page-hero**
```typescript
{ blockType: 'page-hero', variant: 'page-title', pageTitle: { en: 'Mobile SIM', ja: 'モバイルSIM', bn: 'মোবাইল সিম' }, showBreadcrumb: false }
```

**Block 2 — rich-text (prose)**
Body: Explains the data SIM card (standalone SIM for any SIM-free device, LTE in strong-signal areas, 3G/2G fallback in weaker areas, nationwide coverage, also works in tablets and certain portable gaming devices).

**Block 3 — business-line-list (cards, 3 items)**
Items:
- **SmartPit Card System** — data SIM paired with free SmartPit card; recharge 24h at partner providers using NTT's SmartPit payment system; service stays active if recharged by 20th of each month
- **Partner Convenience Stores** — Lawson, FamilyMart, Ministop; nationwide, 24h; easy monthly top-up
- **Payment & Activation** — bank transfer to Japan Post Bank (Yucho), all confirmation by email, process steps communicated at every stage

**Block 4 — cta-banner** (shared ctaBanner)

---

## 3. voip-services

### newServiceMeta
```typescript
{
  title: { en: 'VOIP Services', ja: 'VOIPサービス', bn: 'ভিওআইপি সেবা' },
  excerpt: {
    en: 'Premium-quality voice traffic solutions. Prepaid calling cards, hosted softswitch, IP PBX setup, and mobile VOIP for businesses and resellers.',
    ja: 'プレミアム品質の音声トラフィックソリューション。プリペイド通話カード、ホスト型ソフトスイッチ、IP PBXセットアップ、モバイルVOIP。',
    bn: 'প্রিমিয়াম মানের ভয়েস ট্র্যাফিক সমাধান। প্রিপেইড কলিং কার্ড, হোস্টেড সফটসুইচ, আইপি পিবিএক্স সেটআপ এবং মোবাইল ভিওআইপি।',
  },
}
```

### Layout blocks

**Block 1 — page-hero**
```typescript
{ blockType: 'page-hero', variant: 'page-title', pageTitle: { en: 'VOIP Services', ja: 'VOIPサービス', bn: 'ভিওআইপি সেবা' }, showBreadcrumb: false }
```

**Block 2 — rich-text (prose)**
Body: Sadiatec as one of Japan's largest voice traffic providers. Calls sent only via premium Tier 1 providers. High ASR standard. Competitive international rates from wholesale volume — savings passed to clients.

**Block 3 — business-line-list (cards, 5 items)**
Items:
- **Prepaid International Calling Card Supply** — Cards usable from any computer worldwide; selling to qualified resellers; cards from Sadiatec work globally
- **Hosted Switch & Billing Solution** — Full enterprise-grade softswitch and billing on rental basis; no hardware/server/license cost; new systems go online within 72 hours of order
- **Softswitch Customization** — Configuration of major commercial and open-source VoIP services; custom control panel development; on-site and online training
- **Enterprise IP PBX Setup** — Hardware, installation, support at very low cost vs traditional PBX; IVR, voicemail, CallerID included; 80%+ savings on PBX and international calls
- **Mobile VOIP** — iOS & Android dialer app; cheapest international calls over WiFi or mobile network

**Block 4 — cta-banner** (shared ctaBanner)

---

## 4. npo-doshdik

### newServiceMeta
```typescript
{
  title: { en: 'NPO Doshdik Japan', ja: 'NPOドシュディク', bn: 'এনপিও দশদিক জাপান' },
  excerpt: {
    en: 'Non-profit organization supporting education for children, women\'s empowerment, and disability inclusion in Bangladesh through Japan–Bangladesh collaboration.',
    ja: 'バングラデシュの子どもの教育支援、女性の自立、障がい者包摂を目的とした日本・バングラデシュ連携NPO。',
    bn: 'জাপান-বাংলাদেশ সহযোগিতার মাধ্যমে বাংলাদেশে শিশু শিক্ষা, নারী ক্ষমতায়ন ও প্রতিবন্ধী অন্তর্ভুক্তিকে সহায়তাকারী অলাভজনক সংগঠন।',
  },
}
```

### Layout blocks

**Block 1 — page-hero**
```typescript
{ blockType: 'page-hero', variant: 'page-title', pageTitle: { en: 'NPO Doshdik Japan', ja: 'NPOドシュディク', bn: 'এনপিও দশদিক জাপান' }, showBreadcrumb: false }
```

**Block 2 — rich-text (prose)**
Body: Bangladesh context — population 160M, area ~40% of Japan, high density, underdeveloped infrastructure, natural disasters hinder development. Government is promoting IT and education and welcoming foreign investment, but challenges remain: poverty, education gaps, women's rights, disability inclusion.

**Block 3 — image-text-split**
imagePosition: right, backgroundStyle: light
Heading: "Our Mission" / heading localized
Body: Collaborating with Japanese people, Bangladesh residents in Japan, and civic groups to ensure education for all children and create a society where women and people with disabilities can use their abilities.

**Block 4 — business-line-list (cards, 3 items)**
Items:
- **Children's Education Support** — Supporting access to education for all children in Bangladesh regardless of economic circumstances
- **Women's Empowerment** — Supporting women's independence, economic participation, and rights in Bangladesh
- **Disability Support** — Operating facilities and programs for people with disabilities, enabling them to contribute their abilities to society

**Block 5 — rich-text (prose)**
Body: Organization details — address, representative name, founding date, phone, fax, email.

**Block 6 — cta-banner** (shared ctaBanner)

---

## 5. doshdik-tv

### newServiceMeta
```typescript
{
  title: { en: 'Doshdik TV', ja: 'ドシュディクTV', bn: 'দশদিক টিভি' },
  excerpt: {
    en: 'Bangladesh\'s leading online television network. News, movies, dramas, talk shows, and educational children\'s programming for all age groups.',
    ja: 'バングラデシュの一流オンラインテレビネットワーク。ニュース、映画、ドラマ、トークショー、子供向け教育番組など、全年齢層向けコンテンツ。',
    bn: 'বাংলাদেশের শীর্ষস্থানীয় অনলাইন টেলিভিশন নেটওয়ার্ক। সকল বয়সের জন্য সংবাদ, চলচ্চিত্র, নাটক, টক শো ও শিশু শিক্ষামূলক অনুষ্ঠান।',
  },
}
```

### Layout blocks

**Block 1 — page-hero**
```typescript
{ blockType: 'page-hero', variant: 'page-title', pageTitle: { en: 'Doshdik TV', ja: 'ドシュディクTV', bn: 'দশদিক টিভি' }, showBreadcrumb: false }
```

**Block 2 — rich-text (prose)**
Body: Doshdik TV is Bangladesh's online TV network providing news, movies, dramas, and talk shows. Aims to entertain viewers across all age groups with appropriate, quality programming. Dedicated children's content designed for intellectual growth. Follow Doshdik TV on Facebook, YouTube, and other social platforms.

**Block 3 — business-line-list (cards, 4 items)**
Items:
- **News Coverage** — Comprehensive reporting on local and global events to keep viewers informed
- **Movies & Drama** — Carefully selected films and engaging drama series for entertainment for the whole family
- **Talk Shows** — Engaging discussions and interviews on topics that impact society and everyday life
- **Children's Programs** — Educational and entertaining content specifically designed for children's intellectual and character development

**Block 4 — cta-banner** (shared ctaBanner)

---

## Upsert call order in `seedServicesMorePages()`

```typescript
await upsertServiceLayout(payload, 'pocket-wifi-data-sim', pocketWifiLayout, pocketWifiMeta)
await upsertServiceLayout(payload, 'mobile-sim', mobileSimLayout, mobileSimMeta)
await upsertServiceLayout(payload, 'voip-services', voipLayout, voipMeta)
await upsertServiceLayout(payload, 'npo-doshdik', npoDoshdikLayout, npoDoshdikMeta)
await upsertServiceLayout(payload, 'doshdik-tv', doshdikTvLayout, doshdikTvMeta)
```

---

## Seed file structure

The file copies the following from `services-inner-pages.seed.ts` verbatim:
- `richText()` helper
- `richTextMulti()` helper  
- `rt()` and `rtMulti()` aliases
- `isLocaleMap()` helper
- `forLocale()` helper
- `withIds()` helper
- `upsertServiceLayout()` function

Then defines constants for each page layout, and calls them all in the main `seedServicesMorePages()` async function.

Run command:
```bash
pnpm --filter saidatech tsx src/seed/services-more-pages.seed.ts
```
