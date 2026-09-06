# Content guide

## Single source of truth

`data/landing-content.ts` holds every word, link, and image path on the page.
Components import from it and render — they never contain copy. If a task is
"change what the page says," the edit happens there, not in `components/`.

The file documents its own convention at the top:

> Anything Kirra Dive still has to confirm is either `null` (the UI then
> renders a neutral "to be confirmed" state instead of a link) or contains
> the literal text "to be confirmed". Nothing on this page invents a price,
> a phone number, a review or a policy.

That's a deliberate product decision, not an oversight — preserve it when
adding new fields. If a value isn't confirmed, it should render an honest
placeholder state, never a plausible-looking fake.

## Launch checklist — everything still marked TO CONFIRM

Pulled from `data/landing-content.ts`. Nothing below is wired to real data
yet; the page will happily ship in this state (it degrades gracefully), but
none of it should go live to real customers without these filled in.

### Business details
- [ ] **Production domain** — `siteConfig.url` is `https://kirradive.example`
      (used for `metadataBase` and Open Graph URLs)
- [ ] **Phone number** — `contact.phone` (`null`)
- [ ] **Email address** — `contact.email` (`null`)
- [ ] **Full street address** — `contact.addressLines` only has "Tweed
      Heads, NSW" so far
- [ ] **WhatsApp link** — `contact.whatsappUrl` (`null`, phase two:
      `https://wa.me/<number>?text=...`)
- [ ] **Online booking URL** — `contact.bookingUrl` (`null`, phase two:
      DiveShop360)

### Commercial
- [ ] **Course price** — `pricing.from` currently literally reads
      `"From A$XXX"`
- [ ] **Seasonal badge** — `seasonalBadge.enabled` is `false`; needs a real
      season/month and explicit sign-off before switching on
- [ ] **Upcoming course dates** — `courseDates.upcoming` is an empty array,
      so the page shows the fallback "dates to be confirmed" copy

### Social proof
- [ ] **Reviews** — `reviews.featured` and both `reviews.secondary` entries
      are 100% placeholder (`"Review to be confirmed"`, `null` rating,
      `null` url). Need real, attributed reviews before launch, and the
      `reviews.placeholderNote` banner should be deleted with them.

### Legal
- [ ] **Privacy policy page** — `footer.legalLinks[0].href` is `null`
- [ ] **Terms and conditions page** — `footer.legalLinks[1].href` is `null`
- [ ] **Diving medical information page** — `footer.legalLinks[2].href` is
      `null`
- [ ] **Form privacy notice text** — `courseDates.form.privacyNote` reads
      "Privacy notice to be added before launch."
- [ ] **PADI dive centre accreditation number** — `footer.padi.note`

### Photography
- [ ] `public/images/hero-underwater.jpg` — hero background, ~16:10
- [ ] `public/images/journey-pool-skills.jpg` — confined water training, 4:3
- [ ] `public/images/journey-ocean-dives.jpg` — open water dive, 4:3
- [ ] `public/images/journey-certification.jpg` — post-certification, 4:3
- [ ] `public/images/cook-island-reserve.jpg` — the reserve itself
- [ ] `public/images/og-cover.jpg` — 1200×630 social share image
- [ ] **Logo** — `components/landing/KirraLogo.tsx` is an inline placeholder
      SVG mark (a stylised circle + wave), explicitly commented as
      swap-out-before-launch. Either replace the SVG contents or swap the
      component for `<Image src="/images/kirra-dive-logo.svg" .../>`.

## How to update content safely

- Edit values in `data/landing-content.ts`; TypeScript's `as const` +
  `satisfies` on that file will catch shape mistakes (e.g. a review missing
  a field) at compile time.
- Flip a `null` to a real value and the corresponding component
  automatically switches from placeholder state to real content — no
  component code changes needed for any item in the checklist above.
- When a real review is added, also delete `reviews.placeholderNote` and the
  paragraph in `ReviewsSection` that renders it.
- When `seasonalBadge.enabled` flips to `true`, double-check
  `seasonalBadge.label` reflects the actual current season/activity — it's
  off by default specifically because it goes stale.
