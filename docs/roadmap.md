# Roadmap

## Phase one — done

Structure, design system and visual form. Static landing page, no backend,
no third-party wiring. This is the state of the repo today (see
[deployment.md](./deployment.md) for the deploy fix that shipped it).

## Phase two — lead capture

Referenced throughout the codebase (`README.md`, `types/lead.ts`,
`next.config.ts`, `CourseDatesForm.tsx`) but not yet built:

1. **`POST /api/leads` route handler.**
   - Receives a `LeadPayload` (`types/lead.ts`: fullName, phone, email,
     preferredDate, experience, consent, + server-stamped `source` /
     `createdAt`).
   - Validates server-side (client-side validation in `CourseDatesForm`
     already exists but isn't sufficient on its own).
   - Appends a row to Google Sheets using the service-account credentials
     from Vercel env vars (see [deployment.md](./deployment.md)). The
     browser never talks to Google directly.
   - This is *why* `output: "export"` is not set on the Next config — a
     static export can't host a serverless route.

2. **Wire `CourseDatesForm.tsx`'s `handleSubmit`.** The replacement code is
   already sketched as a comment in the component
   (`components/landing/CourseDatesForm.tsx:76-80`):
   ```ts
   const payload: LeadPayload = { ...values, experience: values.experience as LeadExperience,
     source: "landing", createdAt: new Date().toISOString() };
   await fetch("/api/leads", { method: "POST", body: JSON.stringify(payload) });
   ```
   After a successful save, open WhatsApp with a prefilled message. Per the
   existing comment: **the lead must already be saved before WhatsApp
   opens**, so a WhatsApp-open failure never loses a lead.

3. **Replace the "not connected" notice.** `courseDates.form.notConnectedNotice`
   in `data/landing-content.ts` explicitly says phase one only — remove/replace
   once the POST actually sends.

## Phase two — WhatsApp & booking links

- `contact.whatsappUrl` and `contact.bookingUrl` (DiveShop360) are `null`
  placeholders today, falling back to on-page anchors
  (`contact.fallbackAnchors`). Once real, every component already reading
  `contact.whatsappUrl ?? contact.fallbackAnchors.whatsapp` (CourseDatesForm,
  MobileStickyCTA) picks it up automatically — no component changes needed,
  just fill in `data/landing-content.ts`.

## Phase two — analytics

- `data/tracking.ts` defines named events
  (`hero_primary_cta`, `header_cta_click`, `course_dates_view`,
  `included_cta_click`, `book_online_click`, `whatsapp_click`,
  `lead_submit`, `sticky_dates_click`) and every relevant CTA/section already
  carries the matching `data-event="..."` attribute in the markup.
- No analytics library is installed yet. Wiring GA4 / Meta Pixel / Google
  Ads later should mean listening for these `data-event` attributes (or
  firing on the same interactions) — not re-touching every component to add
  instrumentation from scratch.

## Not yet scoped

- Legal pages (privacy policy, terms, diving medical information) —
  currently `href: null` placeholders in the footer, tracked in
  [content-guide.md](./content-guide.md).
- CMS or any non-code way to edit `data/landing-content.ts` — today, content
  changes are a code change.
