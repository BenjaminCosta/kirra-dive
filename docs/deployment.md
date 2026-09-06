# Deployment

## Repo & hosting

- **GitHub:** `https://github.com/BenjaminCosta/kirra-dive.git`, branch
  `main`.
- **Hosting:** Vercel, connected to the GitHub repo — every push to `main`
  triggers a production redeploy. There is no separate staging branch/env
  configured at the time of writing.
- **Build:** standard Next.js detection on Vercel (`next build`). No
  `output: "export"` — see note below, this is intentional.

## ⚠️ Incident — 2026-09-03: Vercel was serving the default Next.js starter

**Symptom:** the live Vercel URL showed the generic "Next.js logo / To get
started, edit the page.tsx file" starter screen instead of the Kirra Dive
landing page, despite the real page existing and working locally.

**Root cause:** the initial commit (`b67f6ee "first commit"`) only ever
contained the default `create-next-app` scaffold (`src/app/page.tsx`,
`src/app/layout.tsx`, the default SVGs in `public/`). All of the actual
landing page work — the whole `app/`, `components/`, `data/`, `lib/`,
`types/` trees, plus real images — existed only in the local working
directory and had **never been committed or pushed**. Vercel builds from
`origin/main`, so it faithfully deployed the only thing that was actually in
git: the starter template.

**Fix:** committed the real tree (`2b27582 "Add Kirra dive landing page
content"`), which also deletes the leftover `src/app/*` starter files and
default SVGs, and pushed to `origin/main`. Vercel picked up the push and
redeployed automatically.

**Lesson:** `git status` before trusting "it's deployed" — a clean working
tree with the right files on disk means nothing if they were never staged
and committed. Always verify with `git log --stat` or `git ls-tree -r HEAD
--name-only` that what you expect to ship is actually in the commit that's
about to be pushed.

## Environment variables (phase two, not yet needed)

Defined in `.env.example` at the repo root, none of these exist yet because
`/api/leads` hasn't been built:

```bash
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
NEXT_PUBLIC_SITE_URL=https://kirradive.com.au
```

- The three `GOOGLE_*` values must be set as **Vercel project environment
  variables** (Project → Settings → Environment Variables), never committed.
  They're read only server-side inside the future `/api/leads` route
  handler — never expose them with a `NEXT_PUBLIC_` prefix.
- `.gitignore` already blocks `.env*` (except `.env.example`) and any
  `*service-account*.json` / `*credentials*.json` / `gcp-*.json` file, in
  anticipation of the Google service-account key phase two needs.
- `NEXT_PUBLIC_SITE_URL` is the one exception meant for the client (it's for
  metadata / Open Graph) — note the production domain in
  `data/landing-content.ts`'s `siteConfig.url` is still the placeholder
  `https://kirradive.example` and needs to be reconciled with whatever real
  domain gets configured in Vercel (see [content-guide.md](./content-guide.md)).

## Why `output: "export"` is deliberately not set

`next.config.ts` carries a comment explaining this: phase two adds
`POST /api/leads`, which needs a serverless function, so the site can't be a
fully static export. The landing page itself still prerenders as static
HTML today (nothing fetches at request time) — the config just leaves the
door open for the API route without a config change later.

## Deploy checklist for future pushes

1. `npm run build` locally first — confirms the production build compiles
   before it becomes Vercel's problem.
2. `git status` / `git add -u` + explicit paths (avoid `git add -A` blindly
   picking up local-only editor files like `.vscode/`).
3. Push to `main`; check the Vercel dashboard's Deployments tab for a green
   build rather than assuming success.
