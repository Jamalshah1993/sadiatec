# Phase 5c — Block Composition Plan: 5 More Services Pages

**Source of truth:** Live site visited via Playwright 2026-06-09.
**Approach:** All content from the live pages is faithfully captured; layouts are translated to our block system. The live site uses an old template with a sidebar Contact Us panel that is not part of our design — we capture the page content only, not the sidebar.

---

## Reuse Analysis

All 5 pages can be covered entirely by **existing blocks**. No new blocks are required.

| Block | Pages that use it |
|-------|-------------------|
| `page-hero` (page-title) | all 5 |
| `rich-text` | pocket-wifi, mobile-sim, voip-services, npo-doshdik, doshdik-tv |
| `image-text-split` | pocket-wifi |
| `business-line-list` | all 5 |
| `stats-bar` | pocket-wifi |
| `cta-banner` | all 5 |

---

## 1. pocket-wifi-data-sim

**Live page summary:** Highly content-rich product page. Covers what Pocket WiFi is, how Softbank's network works, daily rental plan (¥500/day, min 7 days, ¥18,000 deposit), monthly rental plan (¥4,000/month, 2-year contract, ¥5,000 refund on return), 9 service benefits, 4 feature cards, and 2 pricing cards.

### Block composition

| # | Block | Config | Content |
|---|-------|--------|---------|
| 1 | `page-hero` | variant: `page-title` | "Pocket WiFi / Data SIM" |
| 2 | `image-text-split` | imagePosition: right, backgroundStyle: white, imageSplit: 50/50 | Heading: "Always-On Internet in Japan", body: device overview — Softbank AXGP/LTE/CDMA network, up to 10 simultaneous devices, unlimited data |
| 3 | `business-line-list` | displayMode: list | 2 items: **Daily Rental Plan** (¥500/day, min 7 days, ¥18,000 refundable deposit, features: unlimited data, no long-term contract, return by mail or in person) and **Monthly Rental Plan** (¥4,000/month, 2-year contract, ¥5,000 refund on completion, SmartPit recharge by 20th of each month) |
| 4 | `stats-bar` | layout: grid, backgroundStyle: light | 6 items (no numeric value, label + body): High-speed connection, Up to 10 devices, Nationwide coverage, No long-term contract, SmartPit recharge at convenience stores, Multilingual support |
| 5 | `cta-banner` | variant: gradient, backgroundStyle: brand | "Get Connected in Japan" / contact CTA |

---

## 2. mobile-sim

**Live page summary:** Shorter product page. Explains what a data SIM card is, how LTE/3G/2G works by signal area, nationwide coverage, also works in tablets and some gaming devices (PlayStation Vita). Then SmartPit card system for recharging (Lawson, FamilyMart, Ministop) with payment-by-20th rule. Payment information for ゆうちょ銀行 (Japan Post Bank).

### Block composition

| # | Block | Config | Content |
|---|-------|--------|---------|
| 1 | `page-hero` | variant: `page-title` | "Mobile SIM" |
| 2 | `rich-text` | maxWidth: prose | How the data SIM works: SIM-free device, LTE in strong signal zones, 3G/2G fallback, nationwide coverage, works in tablets and some portable gaming devices |
| 3 | `business-line-list` | displayMode: cards | 3 items: **SmartPit Card System** (free SmartPit card included, recharge 24h at partner convenience stores, recharge by 20th each month to keep service active), **Partner Convenience Stores** (Lawson, FamilyMart, Ministop — nationwide, 24h), **Payment Information** (Japan Post Bank account transfer, all steps confirmed by email) |
| 4 | `cta-banner` | variant: gradient, backgroundStyle: brand | "Get Your Data SIM" / contact CTA |

---

## 3. voip-services

**Live page summary:** Sadiatec as Japan's largest voice traffic provider, sending calls only via premium Tier 1 providers, competitive international rates due to wholesale volume. Five service areas: (1) prepaid international calling card supply for resellers, (2) hosted softswitch & billing solution (rental basis, online in 72h), (3) softswitch customization and training, (4) enterprise IP PBX setup (80% savings vs traditional PBX, full IVR/voicemail/CallerID), (5) mobile VOIP dialer for iOS & Android.

### Block composition

| # | Block | Config | Content |
|---|-------|--------|---------|
| 1 | `page-hero` | variant: `page-title` | "VOIP Services" |
| 2 | `rich-text` | maxWidth: prose | Sadiatec as Japan's largest voice traffic provider; Tier 1 providers only; competitive international rates from wholesale volume; high ASR standard |
| 3 | `business-line-list` | displayMode: cards | 5 items: **Prepaid International Calling Card Supply** (cards usable from any computer worldwide, seeking qualified resellers), **Hosted Switch & Billing Solution** (rental basis, enterprise-grade softswitch, online within 72h, no hardware/server/license cost), **Softswitch Customization** (custom control panel development, on-site and online training), **Enterprise IP PBX Setup** (80%+ savings vs traditional PBX, IVR/voicemail/CallerID included), **Mobile VOIP** (iOS & Android dialer, cheapest international calls over WiFi or mobile data) |
| 4 | `cta-banner` | variant: gradient, backgroundStyle: brand | "Transform Your Communication" / contact CTA |

---

## 4. npo-doshdik

**Live page summary:** About the NPO Doshdik Japan. Bangladesh context: 160M population, 40% of Japan's area, high density, underdeveloped infrastructure, natural disasters. Doshdik Japan's mission: collaborate with Japanese people, Bangladesh residents in Japan, and civic groups to ensure education for all children and support for women and people with disabilities. Activities: children's education in Bangladesh, women's empowerment, disability facility operation. Organization info: Tokyo address, representative Haq Mod Sanaul, founded 2021-01-19, phone 03-3255-5861.

### Block composition

| # | Block | Config | Content |
|---|-------|--------|---------|
| 1 | `page-hero` | variant: `page-title` | "NPO Doshdik Japan" |
| 2 | `rich-text` | maxWidth: prose | Bangladesh context (population 160M, challenges around poverty, education gaps, women's rights, disability) and Doshdik Japan's formation as an NPO to build trust and recognition |
| 3 | `image-text-split` | imagePosition: right, backgroundStyle: light, imageSplit: 50/50 | Heading: "Our Mission", body: collaborating with Japanese people, Bangladesh residents in Japan, and civic groups to ensure education for all children and create a society where women and people with disabilities can contribute their abilities |
| 4 | `business-line-list` | displayMode: cards | 3 items: **Education Support** (supporting children's education in Bangladesh, ensuring no child is left behind), **Women's Empowerment** (supporting women's independence and economic participation), **Disability Support** (operating facilities for people with disabilities, helping them contribute their abilities to society) |
| 5 | `rich-text` | maxWidth: prose | Organization details: 〒101-0021 Tokyo Chiyoda-ku Sotokanda 4-5-5 Akiba-Mitakikan 5F / Representative: Haq Mod Sanaul / Founded: 2021-01-19 / Tel: 03-3255-5861 / FAX: 03-3255-5862 / Email: sanaul@sadiatec.com |
| 6 | `cta-banner` | variant: gradient, backgroundStyle: brand | "Support Our Mission" / contact CTA |

---

## 5. doshdik-tv

**Live page summary:** Doshdik TV is Bangladesh's online TV network. Provides news, movies, dramas, talk shows. Purpose is to entertain viewers and provide appropriate programming. Also aims to provide for all age groups. Children's programming specifically designed for intellectual growth. Social presence on Facebook, YouTube, Twitter.

### Block composition

| # | Block | Config | Content |
|---|-------|--------|---------|
| 1 | `page-hero` | variant: `page-title` | "Doshdik TV" |
| 2 | `rich-text` | maxWidth: prose | About Doshdik TV: Bangladesh's online TV network, diverse programming including news, movies, dramas, talk shows. Purpose: entertain viewers and provide appropriate programming for all age groups. Children's programming designed for intellectual growth. Available on Facebook, YouTube, and social platforms. |
| 3 | `business-line-list` | displayMode: cards | 4 items: **News Coverage** (comprehensive reporting on local and global events), **Movies & Drama** (carefully selected films and engaging drama series for everyone), **Talk Show** (engaging discussions and interviews on topics that impact society), **Children's Programs** (educational and entertaining content specifically designed for children's intellectual growth) |
| 4 | `cta-banner` | variant: gradient, backgroundStyle: brand | "Watch Doshdik TV" / contact CTA |

---

## Summary

- **5 pages** require seeds
- **0 new blocks** — all content maps to existing blocks
- **No SQL migration needed**
- All pages use the `services` collection with the same routing and rendering as the existing 8 pages
