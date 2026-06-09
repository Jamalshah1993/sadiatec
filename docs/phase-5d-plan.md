# Phase 5d Plan — Three Main Header Menu Pages

## Playwright Findings

### /job-seekers
Live site has two primary sections:
1. **Job listings grid** — "Latest Jobs & Openings" heading, 6 cards (Senior Software Engineer, Product Manager, UX Designer, Data Scientist, Full Stack Developer, Marketing Strategist). Each card shows company, location, salary, posted date, Urgent/Standard tag, and "Apply Now" button. Load More button below.
2. **Application process** — "Simple Application Process" heading, 4 numbered steps: Create Profile, Search Jobs, Apply, Get Hired.
3. **CTA banner** — green brand banner "日本で理想の仕事を見つけましょう".

Design language: white background with green brand accents. Job cards on light/white sections. Process steps clean numbered layout.

### /employers
Live site has four sections:
1. **Services grid** — "企業向けサービス" heading, 4 icon+title+body cards: 採用ソリューション (Recruitment Solutions), タレントマネジメント (Talent Management), パフォーマンス分析 (Performance Analysis), コンプライアンスサポート (Compliance Support).
2. **Hiring process** — "採用プロセス" heading, 4 numbered steps with emoji icons: 求人のお申込み, 候補者マッチング, 面接, ご採用・オンボーディング.
3. **Partners & Certifications** — scrolling logo strip. Visible logos: KDDI, au, Marubeni, TM.
4. **Partnership CTA section** — "パートナーシップの機会", 4 feature cards (Strategic Partnership, Talent Pool Access, Growth Opportunity, Time Efficiency), green CTA banner below.

### /news-events
Live site is a placeholder — "Latest News & Updates" heading, a single "Hello world!" blog post card, Load More button, CTA. No real content structure. Must be designed from scratch using existing blocks.

---

## Block Composition — Section by Section

### Page: Job Seekers (`/job-seekers`, slug: `job-seekers`)

| # | Block | Config | Rationale |
|---|-------|--------|-----------|
| 1 | `page-hero` | variant: `hero`, minHeight: `lg` | Strong branded entry; the live site does not use a hero but the overall site style (service pages, about) all use page heroes |
| 2 | `timeline` | `openings` array (6 listings) + `processSteps` array (6 steps) | Exactly maps to the live site's two sections: job listings grid + application process. The `timeline` block was built specifically for "Latest Openings & Process". |
| 3 | `stats-bar` | layout: `grid`, backgroundStyle: `brand` | Key statistics about Sadiatec's placement record and reach; reinforces trust before the CTA. No `value` field used — purely `label` + `body` pillar-card style. |
| 4 | `cta-banner` | variant: `gradient`, backgroundStyle: `brand` | Consistent site-wide CTA footer. |

**No new blocks needed.**

---

### Page: Employers (`/employers`, slug: `employers`)

| # | Block | Config | Rationale |
|---|-------|--------|-----------|
| 1 | `page-hero` | variant: `hero`, minHeight: `lg` | Strong entry for B2B audience. |
| 2 | `stats-bar` | layout: `grid`, backgroundStyle: `brand` | Maps directly to the "企業向けサービス" 4-card section. No `value`, just `label` + `body` pillar-card style. |
| 3 | `timeline` | `openings`: [] (empty), `processSteps` array (4 steps) | Maps to the "採用プロセス" numbered steps section. Openings left empty so only the process timeline renders. |
| 4 | `affiliates` | layout: `logos`, animation: `marquee` | Maps to the "Partners & Certifications" scrolling logo strip. Logos from actual partners visible on the live site. |
| 5 | `bento-grid` | layout: `standard` (4 items) | Maps to the "パートナーシップの機会" 4-card section. Bento grid renders cleanly as a 3+1 or 2+2 layout depending on item count. |
| 6 | `cta-banner` | variant: `gradient`, backgroundStyle: `brand` | Standard site CTA footer. |

**No new blocks needed.**

---

### Page: News and Updates (`/news-events`, slug: `news-events`)

The live site has no proper content. Designed from scratch to fit the overall site design language.

| # | Block | Config | Rationale |
|---|-------|--------|-----------|
| 1 | `page-hero` | variant: `page-title` | Clean centred heading consistent with other inner pages (services pages all use page-title variant). |
| 2 | `news-list` | source: `collection`, count: 6, viewAllCta pointing to `/news-events` | Primary content: shows latest news items from the News collection. Eyebrow + heading intro sets context. |
| 3 | `blog-teaser` | postsSource: `latest`, count: 3 | Secondary content: latest blog posts. Provides visual variety (card thumbnails vs. news list rows). |
| 4 | `event-list` | limit: 3, showPastToggle: false | Events section — consistent with the site's events feature. Shows upcoming events. |
| 5 | `cta-banner` | variant: `gradient`, backgroundStyle: `brand` | Standard site CTA footer. |

**No new blocks needed.**

---

## Routing

All three pages use the **existing** `apps/saidatech/src/app/(frontend)/[locale]/[slug]/page.tsx` route handler. It queries the `pages` collection by slug and renders the layout via `blockRegistry`. No new route files needed.

Pages collection slug → URL mapping:
- `job-seekers` → `/job-seekers` (and `/{locale}/job-seekers`)
- `employers` → `/employers` (and `/{locale}/employers`)
- `news-events` → `/news-events` (and `/{locale}/news-events`)

Note: there is an existing `/news/page.tsx` (stub "Hello world" page) which is a separate route and does NOT conflict with `/news-events`.

---

## New Blocks Required

**None.** All page sections are covered by existing blocks:

| Required capability | Block used |
|---------------------|------------|
| Job listings display | `timeline` (openings array) |
| Application/hiring process steps | `timeline` (processSteps array) |
| Feature card grid (no stat values) | `stats-bar` (grid, pillar-card style) |
| Scrolling partner logos | `affiliates` (logos + marquee) |
| Opportunity/benefit cards | `bento-grid` |
| News articles list | `news-list` |
| Blog post cards | `blog-teaser` |
| Upcoming events | `event-list` |
| Page header | `page-hero` |
| CTA footer | `cta-banner` |

---

## Database Migration

No migration required. All blocks used already exist in the schema. The `pages` collection already exists. The seed creates documents in the existing `pages` collection.
