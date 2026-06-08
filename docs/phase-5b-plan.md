# Phase 5-B Plan — Services Inner Pages

## Architecture Changes Required

### 1. ServicesCollection — add `layout` blocks field

`services.ts` currently has no `layout` field. The `pages` collection (`PagesCollection`) exposes
a `layout: { type: 'blocks', blocks: buildAvailableBlocks(siteConfig) }` field using a
`buildAvailableBlocks()` factory. The services collection needs the same field, modelled identically.

The change is additive (no existing fields touched):

```ts
// packages/cms-core/src/payload/collections/services.ts
import { buildAvailableBlocks } from './pages'   // extract shared helper
// or duplicate the import list — whatever keeps the files clean

// add to fields array:
{
  name: 'layout',
  type: 'blocks',
  blocks: buildAvailableBlocks(siteConfig),   // same block list as pages
}
```

`ServicesCollection` currently receives no `siteConfig` argument. It needs to become a factory
function `ServicesCollection(siteConfig: SiteConfig)`, the same signature as `PagesCollection`.

### 2. services/[slug]/page.tsx — switch to blockRegistry

Current route: fetches service by slug, constructs fixed `HeroBlock + RichTextBlock + StatsBlock + CTABannerBlock` from direct fields.

New route: same fetch, but renders `(service.layout ?? [])` through `blockRegistry` — exactly
as `about/[slug]/page.tsx` does for the `pages` collection. Keep the old `generateStaticParams`
logic (iterate active services × locales).

### 3. Seed file — upsert pattern

The about-section seed does DELETE + CREATE. Services documents already exist in the DB
(they render content today). The services seed must use:

```
find by slug
  → if exists: payload.update({ id, locale: 'ja', data: { layout: forLocale(layout, 'ja') } })
               then update en + bn locales the same way
  → if not found: payload.create({ locale: 'ja', data: { title, slug, status, layout } })
                  then update en + bn
```

The `forLocale` + `withIds` helpers from `about-section.seed.ts` are copied verbatim.

---

## New blocks needed: NONE

All 8 pages can be built from blocks already in the registry:

| Block slug | Usage |
|---|---|
| `page-hero` (variant: `hero`) | Top-of-page hero with heading, subtitle, CTA |
| `image-text-split` | Content sections with image left/right |
| `rich-text` | Prose paragraphs, bulleted lists |
| `business-line-list` (displayMode: `list`) | Named feature sections with richText body |
| `business-line-list` (displayMode: `alternating`) | Image+text alternating content sections |
| `stats-bar` (layout: `grid`) | 3–4-column feature/pillar cards |
| `timeline` (processSteps only) | Numbered application process steps |
| `cta-banner` | Bottom-of-page CTA |

The `timeline` block renders numbered process steps as a horizontal grid of circles with title
and description. The `openings` array can be left empty — the component only renders it when
`openings.length > 0`.

---

## Page Breakdown (source: Playwright snapshots of sadiatec.com)

### Page 1 — Sadia Nihongo Training Center (`sadia-nihongo-training-center`)

Live URL: sadiatec.com/services/sadia-nihongo-training-center  
Status: service document exists; `layout` field to be added by seed.

| # | Block | Notes |
|---|---|---|
| 1 | `page-hero` hero | Heading: "Sadia Nihongo Training Center" |
| 2 | `image-text-split` | Director's message from Kansuke Yoshida (GM & Lecturer) |
| 3 | `image-text-split` | "About Sadia Nihongo Training Center" — founded 2012, renamed 2020 |
| 4 | `business-line-list` list | 3 strengths: Japanese lessons, Cultural curriculum, Visa/career support |
| 5 | `stats-bar` grid | 3 course duration cards: N5 (3 months), N4 (4 months), N3/N2 (6 months) |
| 6 | `rich-text` | Student placement + license numbers (4 licenses) |
| 7 | `cta-banner` | Shared CTA |

---

### Page 2 — Study in Japan Program (`study-work-japan`)

Live URL: sadiatec.com/services/study-work-japan  
Status: service document exists.

| # | Block | Notes |
|---|---|---|
| 1 | `page-hero` hero | Heading: "Study & Work in Japan Program" |
| 2 | `rich-text` | Program overview paragraph |
| 3 | `rich-text` | Application documents — bulleted list of 9 items |
| 4 | `timeline` processSteps | 12-step application process (numbered circles) |
| 5 | `business-line-list` cards | Japanese Language Course: 3 cards (Curriculum, Materials, Duration) |
| 6 | `cta-banner` | Shared CTA |

---

### Page 3 — Find Your Dream Job in Japan (`find-dream-job-japan`)

Live URL: does not exist on live site — new page.  
Status: service document does NOT exist; seed creates it.

Content proposed from business context (Sadiatec's HR placement service):

| # | Block | Notes |
|---|---|---|
| 1 | `page-hero` hero | Heading: "Find Your Dream Job in Japan" |
| 2 | `image-text-split` | Overview: Sadiatec connects international talent with Japanese companies |
| 3 | `stats-bar` grid | 4 service pillars: Recruitment, Visa Support, Language Training, Corporate Partnerships |
| 4 | `timeline` processSteps | 6-step placement process: Apply → Screen → Match → Placement → Visa → Arrive |
| 5 | `cta-banner` | Shared CTA |

---

### Page 4 — Technical Intern Training Program (`technical-intern-training-program`)

Live URL: sadiatec.com/services/technical-intern-training-program  
Status: service document exists.

| # | Block | Notes |
|---|---|---|
| 1 | `page-hero` hero | Heading: "Technical Intern Training Program (TITP)" |
| 2 | `rich-text` | Program overview — TITP as international cooperation framework |
| 3 | `image-text-split` | Bangladesh opportunity context: young workforce, Japan's labour gap |
| 4 | `image-text-split` | Japan's aging population + demographic statistics |
| 5 | `image-text-split` | How Sadiatec supports TITP candidates end-to-end |
| 6 | `cta-banner` | Shared CTA |

---

### Page 5 — Specified Skilled Worker (`specified-skilled-worker`)

Live URL: sadiatec.com/services/specified-skilled-worker  
Status: service document exists.

| # | Block | Notes |
|---|---|---|
| 1 | `page-hero` hero | Heading: "Specified Skilled Worker (SSW)" |
| 2 | `rich-text` | SSW overview + two categories (Type 1 / Type 2) |
| 3 | `business-line-list` list | SSW Type 1 — 6 detail rows (industries, visa duration, etc.) |
| 4 | `business-line-list` list | SSW Type 2 — 6 detail rows |
| 5 | `image-text-split` | Why choose Sadiatec |
| 6 | `image-text-split` | Who can apply (eligibility) |
| 7 | `cta-banner` | Shared CTA |

---

### Page 6 — Export-Import Operations (`export-import`)

Live URL: sadiatec.com/services/export-import  
Status: service document exists.

| # | Block | Notes |
|---|---|---|
| 1 | `page-hero` hero | Heading: "Export-Import Operations" |
| 2 | `image-text-split` | "International Trading Solutions" — vehicle parts + industrial equipment |
| 3 | `stats-bar` grid | 3 service pillars: Japan–Bangladesh route, Malaysia trade, Quality assurance |
| 4 | `rich-text` | Licences held (Bangladesh export-import licence) |
| 5 | `cta-banner` | Shared CTA |

---

### Page 7 — SDC Collection (`sdc-collection`)

Live URL: sadiatec.com/services/sdc-collection  
Status: service document exists.

| # | Block | Notes |
|---|---|---|
| 1 | `page-hero` hero | Heading: "SDC Collection" |
| 2 | `rich-text` | "Established 2014" overview paragraph |
| 3 | `image-text-split` | "What We Offer" — men, women, children apparel |
| 4 | `business-line-list` cards | "Why Choose Us" — 3–4 reason cards (quality, trends, variety, reliability) |
| 5 | `cta-banner` | Shared CTA |

---

### Page 8 — International Calling Cards (`international-calling-cards`)

Live URL: sadiatec.com/services/international-calling-cards  
Status: service document exists.

| # | Block | Notes |
|---|---|---|
| 1 | `page-hero` hero | Heading: "International Calling Cards" |
| 2 | `image-text-split` | Prepaid Cards — pre-loaded, single-use |
| 3 | `image-text-split` | SmartPit Rechargeable Cards — reloadable via convenience stores |
| 4 | `rich-text` | SmartPit system details + convenience store list |
| 5 | `rich-text` | "How to use" — access numbers, dialler app, voice guidance |
| 6 | `cta-banner` | Shared CTA |

---

## generateStaticParams

The existing `services/[slug]/page.tsx` already has `generateStaticParams` that iterates
`payload.find({ collection: 'services', where: { active: { equals: true } } })` × all enabled
locales. After the seed adds `find-dream-job-japan` as an active service, it will be covered
automatically — no manual slug list needed.

## Acceptance checklist (pre-implementation)

- [ ] `ServicesCollection` refactored to factory function with `siteConfig` param
- [ ] `layout` blocks field added to `ServicesCollection`
- [ ] `services/[slug]/page.tsx` rewrites to use `blockRegistry`
- [ ] No existing services collection fields removed
- [ ] Seed file reviewed and approved before running
- [ ] `find-dream-job-japan` created as new service document
- [ ] Other 7 services updated (layout field populated, no other fields touched)
