# Kirra Dive — project docs

Centralized context for this repo. Start here, then jump into whichever file
covers what you need.

| File | Covers |
|---|---|
| [architecture.md](./architecture.md) | Tech stack, folder structure, styling system, Next.js 16 gotchas |
| [content-guide.md](./content-guide.md) | How content is managed, and the full "TO CONFIRM" launch checklist |
| [deployment.md](./deployment.md) | Vercel setup, git remote, env vars, and the deploy incident on 2026-09-03 |
| [roadmap.md](./roadmap.md) | Phase two: `/api/leads`, WhatsApp handoff, analytics |

## What this project is

A single-page marketing/lead-gen site for **Kirra Dive**, a PADI dive centre
in Tweed Heads, NSW, teaching the **PADI Open Water Diver course** since 1988.
The page walks a visitor from hero → trust signals → course journey (pool →
ocean dives → certification) → the Cook Island Aquatic Reserve dive site →
what's included → reviews → a course-enquiry form, with a mobile sticky CTA
bar throughout.

There is no CMS and no backend yet. Every word, link and image path lives in
one file, [`data/landing-content.ts`](../data/landing-content.ts).

## Current phase

**Phase one — structure, design system and visual form only.** Confirmed in
[README.md](../README.md) and restated all over `data/landing-content.ts`:
nothing is wired to Google Sheets, WhatsApp, checkout or analytics yet. The
enquiry form validates client-side and shows a "not connected yet" notice on
submit instead of sending anything. See [roadmap.md](./roadmap.md) for what
phase two adds.

## Fastest way to get oriented

1. Read `data/landing-content.ts` top to bottom — it *is* the content model
   and doubles as a content brief (every section's copy, CTAs, and inline
   `TO CONFIRM` markers).
2. Skim `app/page.tsx` to see section order, then open one component in
   `components/landing/` to see the pattern (import content from `data/`,
   render it, tag CTAs with `data-event`).
3. Read [content-guide.md](./content-guide.md) for what's still a placeholder
   before this can go live.
