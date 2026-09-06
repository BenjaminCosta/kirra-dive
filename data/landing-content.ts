/**
 * Every word, link and image path on the landing page lives here.
 *
 * PLACEHOLDER CONVENTION
 * ----------------------
 * Anything Kirra Dive still has to confirm is either `null` (the UI then
 * renders a neutral "to be confirmed" state instead of a link) or contains the
 * literal text "to be confirmed". Search this file for "TO CONFIRM" before
 * launch.
 */

import type { LeadExperience } from "@/types/lead";

/** Icon keys are mapped to Lucide components inside each section. */
export type IconName =
  | "waves"
  | "life-buoy"
  | "graduation-cap"
  | "shell"
  | "fish"
  | "sun"
  | "users"
  | "droplets"
  | "glasses"
  | "award"
  | "shield-check"
  | "heart";

export const siteConfig = {
  name: "Kirra Dive",
  established: "1988",
  suburb: "Tweed Heads, NSW",
  courseName: "PADI Open Water Diver Course",
  // TO CONFIRM: production domain, used for metadataBase and Open Graph URLs.
  url: "https://kirradive.example",
  metaTitle: "PADI Open Water Diver Course | Kirra Dive, Tweed Heads",
  metaDescription:
    "Learn to dive with Kirra Dive in Tweed Heads. The PADI Open Water Diver course takes you from your first breath underwater to internationally recognised certification. Diving since 1988.",
} as const;

/**
 * Contact details and outbound links verified against Kirra Dive's public site.
 * WhatsApp remains unset until Kirra Dive confirms its WhatsApp Business number.
 */
export const contact = {
  phone: "+61 7 5536 6622",
  email: "dive@kirradive.com",
  addressLines: [
    "U1/133 Wharf St",
    "Tweed Heads NSW 2485",
  ],
  /** Add the verified https://wa.me/<number> Business URL before launch. */
  whatsappUrl: null as string | null, // TO CONFIRM
  bookingUrl: "https://kirradive.com/courses/open-water-scuba-course-3days-",
  fallbackAnchors: {
    whatsapp: "#contact",
    booking: "#course-dates",
  },
} as const;

/** Shown next to the price everywhere it appears. */
export const pricing = {
  from: "From A$XXX", // TO CONFIRM
  /** Just the figure, for layouts that show "From" and the amount separately. */
  amount: "A$XXX", // TO CONFIRM
  note: "Course fee to be confirmed.",
} as const;

/**
 * Seasonal badge. Left disabled on purpose: months, dates and the activity
 * itself have to be confirmed with Kirra Dive before this goes live.
 */
export const seasonalBadge = {
  enabled: false,
  label: "Whale season is on",
} as const;

export const navLinks = [
  { label: "The Course", href: "#the-course" },
  { label: "The Experience", href: "#the-experience" },
  { label: "Reviews", href: "#reviews" },
  { label: "Dates", href: "#course-dates" },
] as const;

export const header = {
  ctaLabel: "Book now",
  ctaHref: contact.bookingUrl ?? contact.fallbackAnchors.booking,
  whatsappLabel: "Ask on WhatsApp",
  homeLabel: "Kirra Dive — back to top",
  menuOpenLabel: "Open menu",
  menuCloseLabel: "Close menu",
} as const;

export const hero = {
  eyebrow: "PADI Open Water Diver Course",
  headingLines: ["Learn to dive.", "Discover another world."],
  subheading:
    "From your first breath underwater to internationally recognised certification.",
  primaryCta: { label: "Check course dates", href: "#course-dates" },
  /**
   * Shown in the hero regardless of whether the real WhatsApp number is
   * confirmed yet, unlike the sticky bar / enquiry form CTAs — falls back to
   * the #contact anchor until `contact.whatsappUrl` is set.
   */
  secondaryCta: {
    label: "Ask on WhatsApp",
    href: contact.whatsappUrl ?? contact.fallbackAnchors.whatsapp,
  },
  /** Risk-reduction line. Not a guarantee or a commercial policy. */
  reassurance:
    "Beginner-friendly training with patient, experienced instructors.",
  image: {
    // STOCK IMAGE: AI-generated placeholder, replace with real Kirra Dive photography.
    src: "/images/hero-diver-sunbeams.jpg",
    alt: "Diver descending through sunbeams above a coral reef.",
  },
} as const;

/** Compact trust row shown inside the hero itself. */
export type HeroSignalIcon = "since" | "globe" | "users" | "user";

export const heroTrustSignals: ReadonlyArray<{
  icon: HeroSignalIcon;
  label: string;
  detail: string;
}> = [
  {
    icon: "since",
    label: "Since 1988",
    detail: "Diving education you can trust",
  },
  {
    icon: "globe",
    label: "PADI Dive Centre",
    detail: "PADI certified dive centre",
  },
  {
    icon: "users",
    label: "Beginners Welcome",
    detail: "Perfect for first time divers",
  },
  {
    icon: "user",
    label: "Local Instructors",
    detail: "Experienced, passionate team",
  },
];

export const courseJourney = {
  eyebrow: "The course",
  headingLines: ["From first breath", "to certified diver"],
  intro:
    "Every course follows the same path. You cover the theory in your own time, practise each skill in confined water until it feels ordinary, then put it all together on your open-water dives.",
  cta: { label: "View upcoming dates", href: "#course-dates" },
  stages: [
    {
      id: "pool-skills",
      step: "01",
      icon: "life-buoy",
      title: "Pool Skills",
      description:
        "Confined water is where it clicks. Mask, regulator, buoyancy — one skill at a time, in shallow water, with an instructor beside you.",
      image: {
        // STOCK IMAGE: AI-generated placeholder, replace with a real training photo.
        src: "/images/pool-training-skills.jpg",
        alt: "Student diver practising skills in calm, shallow training water.",
      },
    },
    {
      id: "ocean-dives",
      step: "02",
      icon: "waves",
      title: "Ocean Dives",
      description:
        "Your open-water dives take place in a living marine environment, in a small group, at the pace of the divers in it.",
      image: {
        // STOCK IMAGE: AI-generated placeholder, replace with a real open-water dive photo.
        src: "/images/divers-pair-descending.jpg",
        alt: "Two divers descending together along a reef wall on an open-water dive.",
      },
    },
    {
      id: "certification",
      step: "03",
      icon: "graduation-cap",
      title: "PADI Certification",
      description:
        "Once your skills and dives are signed off, you are a certified PADI Open Water Diver — free to dive with a buddy anywhere in the world.",
      image: {
        // STOCK IMAGE: AI-generated placeholder, replace with a real certification / post-dive shot.
        src: "/images/reef-canyon-turtle-beams.jpg",
        alt: "Sunlit reef canyon opening onto open water, a turtle crossing it.",
      },
    },
  ],
} as const;

export const cookIsland = {
  eyebrow: "The experience",
  kicker: "Cook Island Aquatic Reserve",
  headingLines: ["Your underwater", "classroom"],
  body: "Your open-water dives happen in a protected marine reserve off the Tweed coast — shallow, sheltered and full of life.",
  wildlife: {
    lead: "Divers here regularly see:",
    items: ["Sea turtles", "Rays", "Tropical fish", "Reef life"],
  },
  /** Required honesty line. Do not soften or remove. */
  disclaimer: "Wildlife encounters are possible, never guaranteed.",
  image: {
    // STOCK IMAGE: AI-generated placeholder, replace with real Cook Island Aquatic Reserve photography.
    src: "/images/cook-island-turtle.jpg",
    alt: "Sea turtle swimming past a sunlit reef, fish trailing behind it.",
  },
} as const;

/** Compact attribute row shown under the immersive Cook Island break. */
export const cookIslandAttributes: ReadonlyArray<{
  icon: IconName;
  label: string;
}> = [
  { icon: "waves", label: "Open water training" },
  { icon: "shell", label: "Local marine reserve" },
  { icon: "sun", label: "Conditions dependent" },
];

export const included = {
  eyebrow: "What you get",
  heading: "What's included",
  intro:
    "The course covers the learning, the water time and the certification itself.",
  items: [
    { icon: "graduation-cap", label: "PADI eLearning and study materials" },
    { icon: "waves", label: "Confined water training" },
    { icon: "droplets", label: "Four open-water dives" },
    { icon: "glasses", label: "Scuba equipment" },
    { icon: "award", label: "PADI certification" },
    { icon: "users", label: "Small-group instruction" },
    { icon: "life-buoy", label: "Ongoing support" },
  ] as ReadonlyArray<{ icon: IconName; label: string }>,
  /**
   * Deliberately not "everything included" or "no hidden extras" — that claim
   * can only be made once every cost is confirmed.
   */
  itemsNote:
    "Inclusions and any additional costs to be confirmed before booking.",
  valuePanel: {
    ctaLabel: "Check course dates",
    ctaHref: "#course-dates",
    /** Shown alongside the primary CTA, same fallback as the hero. */
    secondaryCta: {
      label: "Ask on WhatsApp",
      href: contact.whatsappUrl ?? contact.fallbackAnchors.whatsapp,
    },
    image: {
      // STOCK IMAGE: AI-generated placeholder, replace with real photography.
      // Chosen for its large, near-black area: it reads as texture behind the
      // price, not as a scene of its own.
      src: "/images/reef-wall-deep-dark.jpg",
      alt: "Deep reef wall dropping away into dark blue water.",
    },
  },
} as const;

/**
 * The page's softer, fourth visual moment: a half-width photograph beside the
 * reassurance copy, rather than another full-bleed background.
 */
export const goodHands = {
  eyebrow: "New to diving?",
  headingLines: ["That's exactly", "who this is for."],
  body: "Most people who start this course have never breathed underwater. Instructors teach at the pace of the group, and nobody is pushed past what they are comfortable with.",
  /** Restatements of copy already on this page — no new claims. */
  points: [
    { icon: "shield-check", label: "No previous experience needed" },
    { icon: "users", label: "Small-group instruction" },
    { icon: "heart", label: "Taught at the pace of the group" },
  ] as ReadonlyArray<{ icon: IconName; label: string }>,
  image: {
    // STOCK IMAGE: AI-generated placeholder, replace with a real instructor photo.
    src: "/images/divers-pair-reef-drift.jpg",
    alt: "Two divers swimming side by side over a shallow, sunlit reef.",
  },
} as const;

export type Review = {
  id: string;
  quote: string;
  name: string;
  /** Where the review was published, e.g. "Google". */
  source: string;
  /** Link to the original review. Null until a real review is added. */
  url: string | null;
  /** 1–5. Null renders an empty, clearly unrated state. */
  rating: number | null;
};

export const reviews = {
  eyebrow: "Social proof",
  headingLines: ["Real students.", "Real first dives."],
  /** Visible while the reviews below are placeholders. Remove with them. */
  placeholderNote:
    "Placeholder reviews. Real, attributed reviews to be added before launch.",
  /** Overall Google Reviews trust badge. Score is a template placeholder, not a real figure. */
  googleBadge: {
    label: "Google Reviews",
    note: "Reviews from real divers",
    score: "X.X", // TO CONFIRM
    scoreNote: "Rating to be confirmed",
  },
  featured: {
    id: "featured",
    quote: "Review to be confirmed",
    name: "Name to be confirmed",
    source: "Source to be confirmed",
    url: null,
    rating: null,
  } satisfies Review,
  secondary: [
    {
      id: "secondary-1",
      quote: "Review to be confirmed",
      name: "Name to be confirmed",
      source: "Source to be confirmed",
      url: null,
      rating: null,
    },
    {
      id: "secondary-2",
      quote: "Review to be confirmed",
      name: "Name to be confirmed",
      source: "Source to be confirmed",
      url: null,
      rating: null,
    },
  ] satisfies Review[],
} as const;

export const courseDates = {
  eyebrow: "Check dates & enquire",
  headingLines: ["Start your", "diving journey"],
  body: "Send an enquiry and the team will come back with the next available dates.",
  upcomingLabel: "Upcoming courses",
  /** Real course dates go here. Empty renders the fallback line below. */
  upcoming: [] as ReadonlyArray<{ id: string; label: string; note: string }>,
  upcomingFallback:
    "Upcoming course dates to be confirmed. Send an enquiry and the team will come back with the next available course.",
  form: {
    legend: "Course enquiry",
    introNote: "Fill in your details and we'll be in touch soon.",
    fields: {
      fullName: { label: "Full name", placeholder: "Jane Smith" },
      phone: {
        label: "Phone or WhatsApp number",
        placeholder: "04XX XXX XXX",
      },
      email: { label: "Email", placeholder: "you@example.com" },
      preferredDate: {
        label: "Preferred course date",
        hint: "Not locked in — the team will confirm what is available.",
      },
      experience: {
        legend: "Diving experience",
        options: [
          { value: "none", label: "No experience" },
          { value: "tried-before", label: "Tried diving before" },
        ] as ReadonlyArray<{ value: LeadExperience; label: string }>,
      },
      consent: {
        label:
          "I'd like Kirra Dive to contact me about this course by phone, email or WhatsApp.",
      },
    },
    errors: {
      fullName: "Please enter your name.",
      phone: "Please enter a phone or WhatsApp number.",
      email: "Please enter a valid email address.",
      preferredDate: "Please choose a preferred date.",
      experience: "Please choose one option.",
      consent: "Please tick the box so the team can reply to you.",
    },
    submitLabel: "Send enquiry",
    submittingLabel: "Saving your enquiry…",
    bookingLabel: "Book online",
    whatsappLabel: "Ask on WhatsApp",
    successTitle: "Thanks, we’ve received your enquiry.",
    successNotice: "The Kirra Dive team will contact you shortly.",
    whatsappContinueLabel: "Want a faster response? Continue on WhatsApp",
    submitError:
      "We couldn't save your enquiry. Please try again or contact the team directly.",
    whatsappPrefill: {
      greeting: "Hi Kirra Dive,",
      introduction: "I'm interested in the PADI Open Water Diver course. My name is",
      preferredDate: "My preferred course date is",
      experience: "My diving experience is",
    },
    privacyNote: "Privacy notice to be added before launch.",
  },
} as const;

/**
 * The last of the three full-bleed scenes. Closes the page by going back to
 * the water it opened on.
 */
export const finalCta = {
  eyebrow: "Same ocean. A brighter you.",
  headingLines: ["Ready to take", "your first breath?"],
  body: "Choose a date, book online, or talk to the Kirra Dive team.",
  primaryCta: { label: "Check course dates", href: "#course-dates" },
  secondaryCta: {
    label: "Ask on WhatsApp",
    href: contact.whatsappUrl ?? contact.fallbackAnchors.whatsapp,
  },
  image: {
    // STOCK IMAGE: AI-generated placeholder, replace with real photography.
    src: "/images/manta-deep-wall-dark.jpg",
    alt: "Manta ray gliding along a deep reef wall in dark blue water.",
  },
} as const;

export const footer = {
  tagline:
    "A Tweed Heads dive centre teaching people to dive since 1988.",
  contactHeading: "Contact",
  exploreHeading: "Explore",
  /** Mirrors the header nav, plus a FAQ entry that has no page yet. */
  exploreLinks: [
    { label: "The Course", href: "#the-course" },
    { label: "The Experience", href: "#the-experience" },
    { label: "Reviews", href: "#reviews" },
    { label: "Dates", href: "#course-dates" },
    { label: "FAQ", href: null },
  ] as ReadonlyArray<{ label: string; href: string | null }>,
  whatsappLabel: "WhatsApp number to be confirmed",
  phoneLabel: "Phone to be confirmed",
  emailLabel: "Email to be confirmed",
  addressHeading: "Where to find us",
  /** Shown only once a real PADI dive centre number is confirmed. */
  padi: {
    confirmed: false,
    label: "PADI Dive Centre",
    note: "Dive centre number and accreditation details to be confirmed.",
  },
  /** Shown only once a real profile URL exists for that platform. */
  socialLinks: [
    { label: "Instagram", href: null },
    { label: "Facebook", href: null },
  ] as ReadonlyArray<{ label: string; href: string | null }>,
  legalLinks: [
    { label: "Privacy policy", href: null },
    { label: "Terms and conditions", href: null },
    { label: "Diving medical information", href: null },
  ] as ReadonlyArray<{ label: string; href: string | null }>,
  linkPlaceholderNote: "Page to be added",
  copyright: (year: number) =>
    `© ${year} Kirra Dive. ${siteConfig.suburb}. All rights reserved.`,
} as const;
