# Architecture

## Stack

- **Next.js 16.3.4** — App Router, Turbopack build, React 19.2.8.
- **TypeScript 5**, strict mode.
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` + `@theme
  inline` in `app/globals.css`, not a `tailwind.config.ts` file. There is no
  Tailwind config file in this project; all customization lives in CSS.
- **lucide-react** for icons.
- No test runner, no state library, no CMS, no analytics library installed.

## ⚠️ This is not the Next.js you remember

Root `AGENTS.md` flags this explicitly: Next.js 16 has breaking changes vs.
older training data, and `node_modules/next/dist/docs/` is the source of
truth. One concrete example already in this codebase:

`app/layout.tsx` types its props as `LayoutProps<"/">` instead of the
classic `{ children: React.ReactNode }`. `PageProps<Route>` and
`LayoutProps<Route>` are **global, auto-generated helpers** (no import
needed) produced by `next dev` / `next build` / `next typegen`, typed per
route. Before assuming any App Router API works the way it used to, check
`node_modules/next/dist/docs/01-app/`.

## Folder structure

```
app/
  layout.tsx      Root layout — fonts, metadata/OG tags, skip link, wraps children
  page.tsx        Composes the landing page from components/landing/, in section order
  globals.css     Design tokens (colors, spacing helpers) + Tailwind v4 theme wiring
components/
  landing/        One component per page section (see below), all Server Components
                   except Header, CourseDatesForm, MobileStickyCTA (interactive → "use client")
data/
  landing-content.ts   Every string, link, image path and TO CONFIRM marker on the page
  tracking.ts          Analytics event-name constants (see roadmap.md)
lib/
  cn.ts           Tiny classnames-join helper (filters falsy values)
types/
  lead.ts         LeadPayload / LeadExperience / LeadFormErrors — shared shape for
                   the enquiry form now, and the future POST /api/leads route
public/images/    Placeholder photography (see content-guide.md)
```

### Section components, in render order (`app/page.tsx`)

| Component | Purpose | Client component? |
|---|---|---|
| `Header` | Fixed nav, scroll-aware background, mobile menu | Yes (scroll + menu state) |
| `Hero` | Above-the-fold pitch, price line, primary/secondary CTA | No |
| `TrustBar` | Three trust signals, overlaps hero bottom edge | No |
| `CourseJourney` | Pool skills → ocean dives → certification, 3-step | No |
| `CookIslandFeature` | Full-bleed photo section for the dive site | No |
| `IncludedSection` | What's included list + sticky price/CTA panel | No |
| `ReviewsSection` | Featured + 2 secondary reviews, handles null rating gracefully | No |
| `CourseDatesForm` | Enquiry form with client-side validation | Yes (form state) |
| `Footer` | Contact, nav, legal links, copyright | No |
| `MobileStickyCTA` | Mobile-only bottom bar, hides once the form scrolls into view | Yes (IntersectionObserver) |

## Styling system

All design tokens are CSS custom properties in `app/globals.css`, mapped into
Tailwind's `@theme inline` block so they're usable as utilities
(`bg-surface`, `text-primary`, `border-white/10`, etc.):

- `--background` #060606, `--surface` #0b1821, `--ocean` #0e406e,
  `--primary` #54a0c9, `--aqua` #16b6c8, `--text` #ffffff, `--muted` #cccccc.
- Dark theme only — `viewport.colorScheme` is hard-set to `"dark"` in
  `app/layout.tsx`; there's no light mode.
- Reusable class recipes under `@layer components`: `.container-page`,
  `.section-y`, `.heading-xl/lg/sm`, `.eyebrow`, `.btn` + `.btn-primary` /
  `.btn-secondary` / `.btn-sm`, `.surface-panel`, `.field-label` /
  `.field-input`, `.skip-link`.
- `prefers-reduced-motion: reduce` is respected globally (kills animations,
  transitions, and smooth scroll).
- Font: Open Sans, self-hosted via `next/font/google` as a variable font
  (one file covers 400/600/700 — no extra requests, no layout shift).

## Conventions worth keeping

- **No hard-coded copy in components.** Every string comes from
  `data/landing-content.ts`. If you're editing what a visitor reads, that's
  where you edit — not the component.
- **CTAs carry `data-event="..."`** from `data/tracking.ts`, even though no
  analytics library is wired up yet. Keep this pattern for any new CTA so
  phase two's analytics wiring doesn't need markup changes.
- **Placeholders are typed, not faked.** Unconfirmed values are `null`
  (phone, email, WhatsApp/booking URLs, review ratings) and components
  branch on that to render an honest "to be confirmed" state instead of
  inventing a number, price or review. Follow this pattern for any new
  unconfirmed field.
- **Images** use `next/image` with explicit `sizes`, `fill`, and either
  `priority` (hero only) or lazy default — keep that when swapping in real
  photography.

## Commands

```bash
npm run dev     # http://localhost:3000, Turbopack
npm run lint    # eslint (flat config: eslint-config-next core-web-vitals + typescript)
npm run build   # next build — page currently prerenders fully static
npm run start   # serve the production build
```
