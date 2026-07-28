# Saidatech App

## Seeding

This app ships two independent seed scripts. They never run automatically —
each is a standalone script you invoke explicitly.

| Script | Command | Content |
|---|---|---|
| Real content | `pnpm seed` | Sadiatec's actual production content (`src/seed/*.ts`). Guarded by `RUN_SEED=true`. Do not modify for demo/template purposes. |
| Demo / placeholder | `pnpm seed:demo` | Generic, obviously-fake placeholder content for a fresh clone of this template (`src/seed/demo/`). |

### Demo Seed

**What it's for.** `src/seed/demo/` populates every base ("ENGINE-layer")
collection — pages, media, services, faqs, news, blog, testimonials,
downloads, team, and (when enabled) events/gallery — with generic,
clearly-fake placeholder content: "Demo Company Ltd", "This is a sample
services page — replace with real content", programmatically-generated
solid-color placeholder images/PDFs (no real Sadiatec photography, no
external network calls). It exists so a fresh clone of this template renders
every block variant with realistic density (6-8 FAQs, 6 team members, 5 news
posts, etc.) without needing real client content or manual data entry first.

It deliberately does **not** seed the recruitment vertical (jobs, seminars,
case-studies) — that's vertical-specific, not part of the base template.

**How to run it.**

```bash
pnpm --filter saidatech seed:demo
```

The script refuses to run unless `DATABASE_URI` in `.env.local` is a local
SQLite file (`file:./local.db` or any path ending in `.db`) — it will never
touch a Postgres connection string, even if one is present but commented out
in `.env.local`.

**Which database it expects.** Always `file:./local.db` (SQLite), set via
`apps/saidatech/.env.local`. Never point this at the Neon/Railway Postgres
URLs also present (commented out) in that file.

**Idempotency.** Safe to re-run. Every run first clears out anything the
demo seed previously created — pages at `/demo-home`, `/demo-about`,
`/demo-services`; collection docs whose `slug` starts with `demo-`;
testimonials tagged with `company: "Demo Company Ltd"`; media files whose
filename starts with `demo-` — then recreates it fresh. It never touches
real content (different slugs/markers entirely), so it's safe to run
alongside `pnpm seed` in the same database.

**Preview URLs** (after running): `/demo-home`, `/demo-about`,
`/demo-services` (also under `/en/...` and `/bn/...`, though locale text is
intentionally identical across en/ja/bn since it's placeholder-only content —
Payload's locale fallback, enabled in `site.config.ts`, fills in en/bn from
the ja values written by the seed).

**Feature-gated collections.** `events` and `gallery` only exist as Payload
collections when `siteConfig.features.events` / `.gallery` are `true`. The
demo seed checks these flags at runtime and skips those collections (with a
log message) if disabled for this app instance — it will pick them up
automatically once you flip the flag on in `site.config.ts`.

**Adapting for a new vertical.** When cloning this template for a new
client/vertical:

1. Update `site.config.ts` (brand, locales, `features`, `verticals`) for the
   new site first.
2. Run `pnpm seed:demo` to get a fully-populated preview of the base template
   against the new config.
3. Replace placeholder content collection-by-collection through the Payload
   admin UI, or fork `src/seed/demo/*.ts` into your own real-content seed
   (following the pattern in `src/seed/*.ts`) once real content is ready.
4. If the new vertical needs its own collections/blocks (like this repo's
   recruitment vertical under `packages/cms-core/src/verticals/recruitment/`),
   add a sibling `src/seed/demo/<vertical>.ts` module and wire it into
   `src/seed/demo/index.ts` behind its own feature flag, mirroring how
   `events`/`gallery` are gated here.
