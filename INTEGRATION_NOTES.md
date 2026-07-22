# Site Search — Integration Notes

## Files created

- `apps/saidatech/src/app/api/search-index/route.ts` — cached GET route building the flat search index.
- `apps/saidatech/src/app/(frontend)/[locale]/_components/SearchBox.tsx` — client component, colocated with `HeaderClient.tsx`/`MobileMenu.tsx` (the app has no top-level `components/` folder for route-scoped UI; shared cross-app components live in `packages/cms-core/src/components/`, but this component is app-specific).

## Files edited

- `apps/saidatech/src/app/(frontend)/[locale]/_components/HeaderClient.tsx` — imports `SearchBox`, renders `<SearchBox locale={locale} variant="desktop" />` as the first child of the `hidden lg:flex items-center gap-2 xl:gap-4` actions group, before the language-flags block.
- `apps/saidatech/src/app/(frontend)/[locale]/_components/MobileMenu.tsx` — imports `SearchBox`, renders `<SearchBox locale={locale} variant="mobile" onNavigate={close} />` between the drawer's "Top Header" row and the `<nav>` (so it closes the drawer on result click).
- `apps/saidatech/package.json` — added `fuse.js@^7.1.0` (not previously a dependency anywhere in the monorepo); ran `pnpm install` to update the lockfile.
- 8 Payload collections in `packages/cms-core/src/payload/collections/` — added a second `afterChange` hook entry calling `revalidateTag('search-index')`, alongside each collection's existing tag: `pages.ts`, `services.ts`, `news.ts`, `blog.ts`, `case-studies.ts`, `seminars.ts`, `jobs.ts`, `team.ts`.

## Collection slugs and field names found

Pages are **split across many collections**, not centralized — except that "About" sub-pages (CEO message, org overview, business contents, history) and the homepage are themselves stored as ordinary documents inside the one generic `pages` collection, distinguished only by a fixed `slug` allowlist the frontend already hardcodes in `about/[slug]/page.tsx`.

| Collection slug | Title field | Slug field | Excerpt used | Publish flag | Frontend route | Feature-gated? |
|---|---|---|---|---|---|---|
| `pages` | `title` | `slug` | `meta.description` | none | `home`→`/`, About allowlist→`/about/{slug}`, else `/{slug}` | always on |
| `services` | `title` | `slug` | `excerpt` | `active` | `/services/{slug}` | always on |
| `news` | `title` | `slug` | `excerpt` | none | `/news/{slug}` | always on |
| `blog` | `title` | `slug` | `excerpt` | `active` | `/blog/{slug}` | `features.blog` |
| `case-studies` | `title` | `slug` | `tagline` (no `excerpt` field exists) | `active` | `/case-studies/{slug}` | `features.caseStudies` |
| `seminars` | `title` | `slug` | `excerpt` | `active` | `/seminars/{slug}` | `features.seminars` |
| `jobs` | `title` | `slug` | `excerpt` | `active` | **`/recruit/{slug}`** | `features.jobListings` |
| `team` | `name` (title is the person's job title) | `slug` | `title` + truncated `bio` (via `lexicalToText`) | none | `/team/{slug}` | `features.team` |

All localized fields use Payload's native `localized: true` per-field mechanism (not a separate locale field or per-locale documents), so `payload.find({ ..., locale })` already returns the resolved string for the requested locale — no extra unwrapping needed.

**`jobs` → `/recruit/{slug}` is the one non-obvious mapping**: `apps/saidatech/src/app/(frontend)/[locale]/jobs/[slug]/page.tsx` is a dead placeholder stub (`<h1>Job: {slug}</h1>`); the real, fully built detail page lives at `recruit/[slug]/page.tsx`. The `jobs` collection's own existing `afterChange` hook already calls `revalidateTag('recruit')`, confirming this — I followed that precedent for the href.

## Locale-prefixing

`apps/saidatech/src/i18n/routing.ts` uses `localePrefix: 'as-needed'` with default locale `ja`: `ja` URLs have no prefix, `en`/`bn` get `/en` or `/bn`. The route builds fully-resolved hrefs server-side (`localizedPath()` helper) so `SearchBox` just renders `entry.href` as-is with a plain `next/link` `Link` — using the `next-intl`-aware `Link` here would have double-prefixed, since our hrefs are already final.

## Caching / freshness

`GET /api/search-index` wraps the per-locale index build in `unstable_cache(..., ['search-index'], { tags: ['search-index'] })`. Every indexed collection's `afterChange` hook now also fires `revalidateTag('search-index')` (in addition to its own existing tag), so CMS edits invalidate the cache automatically — no code change needed per new page. Verified manually: hit `/api/revalidate` with `{"tag":"search-index"}` and confirmed the next request rebuilt the index.

One caveat found while testing: Next's dev-mode `unstable_cache` entries persist in `.next/cache/fetch-cache` **across dev-server restarts**, not just within a running process — a stale cached response survived a full `pkill`+relaunch until the tag was explicitly revalidated. Not a bug, just worth knowing if the index looks stale in local dev after a code change to the route itself (as opposed to a CMS content change).

## Deliberately left out / left for a later pass

- **`excludeFromSearch` is a per-collection config flag (`enabled: boolean` in `INDEXED_COLLECTIONS`), not a per-document CMS field.** Adding a real per-document checkbox (like the existing `aiVisibleField`) to 8 Payload collections would mean a schema migration across all of them; the task asked for "configurable per collection," which the config object already satisfies without that migration risk. Per-document exclusion (hide one specific news article, keep the rest) is the natural next step if it's needed later — add a shared field module analogous to `packages/cms-core/src/payload/fields/ai-visible.ts` and filter on it in `fetchCollectionEntries`.
- **`faqs`, `gallery`, `downloads` are excluded from the index.** None of them have a standalone frontend detail route — FAQs and downloads only render embedded inside page blocks (`FAQBlock`, `DownloadsGridBlock`), and `gallery`'s collection config has no `slugField` at all. There's nowhere to link a search result to, so they're left out rather than added with broken/placeholder hrefs.
- **Result ranking is title-weighted (0.7) over excerpt (0.3) with `threshold: 0.38`.** This was tuned by hand against real seeded content (confirmed "servic" surfaces "VOIP Services" and other genuinely services-related excerpts, "journe" fuzzy-matches "Our Journey"). If real usage shows it's too loose/tight, `SearchBox.tsx`'s `Fuse` options are the one place to retune.
- **No dedicated `useDebounce` hook file was added** — the 200ms debounce is inlined directly in `SearchBox.tsx` via `useEffect`/`setTimeout`, since this was the only place that needed it and the repo doesn't already have a shared debounce hook to align with.
