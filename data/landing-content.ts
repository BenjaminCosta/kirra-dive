/** Every word, link and image path on the landing page lives here. */

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
  url: "https://kirradive.com",
  metaTitle: "Scuba Diving, Snorkelling & PADI Courses | Kirra Dive",
  metaDescription:
    "Kirra Dive in Tweed Heads offers PADI courses, Cook Island dives and snorkelling tours. Established in 1988.",
} as const;

/** Contact details and links published by Kirra Dive. */
export const contact = {
  phone: "+61 7 5536 6622",
  email: "dive@kirradive.com",
  addressLines: [
    "U1/133 Wharf St",
    "Tweed Heads NSW 2485",
  ],
  hours: "Wed–Fri: 9:00 am–4:00 pm · Sat–Sun: 8:00 am–3:00 pm",
  timeZoneNote: "Kirra Dive operates on Queensland time.",
  locationNote: "Opposite the boat ramp, near Tweed Marina.",
  mapUrl:
    "https://maps.google.com/?cid=2530544569852056384&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=US&source=embed",
  whatsappUrl: null as string | null,
  bookingUrl: "https://kirradive.com/courses/open-water-scuba-course-3days-",
  courseCalendarUrl: "https://kirradive.com/calendar",
  fallbackAnchors: {
    whatsapp: "#contact",
    booking: "#course-dates",
  },
} as const;

/** Shown next to the price everywhere it appears. */
export const pricing = {
  from: "A$595",
  amount: "A$595",
  note: "PADI Open Water course (3 days).",
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
  { label: "Cook Island", href: "#the-experience" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export const header = {
  ctaLabel: "Book course",
  ctaHref: contact.bookingUrl ?? contact.fallbackAnchors.booking,
  whatsappLabel: "Contact Kirra Dive",
  homeLabel: "Kirra Dive — back to top",
  menuOpenLabel: "Open menu",
  menuCloseLabel: "Close menu",
} as const;

export const hero = {
  eyebrow: "PADI Open Water (3 days)",
  headingLines: ["Learn to dive.", "Start local."],
  subheading:
    "Online theory, indoor-pool training and shore dives at Tweed Heads — leading to an internationally recognised PADI certification.",
  primaryCta: { label: "Book PADI Open Water", href: contact.bookingUrl },
  secondaryCta: {
    label: "Contact Kirra Dive",
    href: "#contact",
  },
  reassurance:
    "Runs over 3–4 days, with flexible scheduling available.",
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
    detail: "On the Tweed",
  },
  {
    icon: "globe",
    label: "PADI training",
    detail: "Beginner to professional",
  },
  {
    icon: "users",
    label: "Beginners Welcome",
    detail: "No experience needed",
  },
  {
    icon: "user",
    label: "Train locally",
    detail: "Pool and shore dives",
  },
];

export const courseJourney = {
  eyebrow: "The course",
  headingLines: ["From online theory", "to open water"],
  intro:
    "Kirra Dive's PADI Open Water course combines self-paced online theory, indoor-pool training and shore-based ocean dives. The course runs over three to four days.",
  cta: { label: "View live course dates", href: contact.courseCalendarUrl },
  stages: [
    {
      id: "pool-skills",
      step: "01",
      icon: "life-buoy",
      title: "Online theory & pool skills",
      description:
        "Complete the theory online at your own pace, then build core scuba skills with a certified instructor at the Tweed Regional Aquatic Centre indoor pool.",
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
      title: "Ocean dives",
      description:
        "Take those skills into the calm, shallow waters of Jack Evans Boat Harbour for your open-water training dives.",
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
      title: "Certified to dive",
      description:
        "On completion, qualify as a PADI Open Water Diver — certified to dive independently to 18 metres around the world.",
      image: {
        // STOCK IMAGE: AI-generated placeholder, replace with a real certification / post-dive shot.
        src: "/images/reef-canyon-turtle-beams.jpg",
        alt: "Sunlit reef canyon opening onto open water, a turtle crossing it.",
      },
    },
  ],
} as const;

export const cookIsland = {
  eyebrow: "Cook Island",
  kicker: "Optional course upgrade",
  headingLines: ["Make Cook Island", "your final dive"],
  body: "For an additional A$100, eligible Open Water students can upgrade their final dive to a boat dive at Cook Island, weather and confidence permitting.",
  wildlife: {
    lead: "Divers here regularly see:",
    items: ["Sea turtles", "Rays", "Tropical fish", "Reef life"],
  },
  disclaimer:
    "Conditions and wildlife sightings vary. The Cook Island upgrade is subject to weather and diver confidence.",
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
  { icon: "waves", label: "Optional boat dive" },
  { icon: "shell", label: "800m off the coast" },
  { icon: "sun", label: "Weather dependent" },
];

export const included = {
  eyebrow: "What you get",
  heading: "What is included",
  intro:
    "The official course includes the essentials needed to learn, train and qualify.",
  items: [
    { icon: "graduation-cap", label: "Online theory and training materials" },
    { icon: "glasses", label: "Use of scuba equipment" },
    { icon: "waves", label: "Indoor-pool training" },
    { icon: "droplets", label: "Shore-based open-water training dives" },
    { icon: "life-buoy", label: "Flexible dates where available" },
    { icon: "award", label: "PADI certification on completion" },
  ] as ReadonlyArray<{ icon: IconName; label: string }>,
  itemsNote:
    "Review the PADI medical questionnaire before booking. A “Yes” response may require medical clearance.",
  valuePanel: {
    ctaLabel: "Book PADI Open Water",
    ctaHref: contact.bookingUrl,
    secondaryCta: {
      label: "Contact Kirra Dive",
      href: "#contact",
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
  body: "Kirra Dive also runs a beginner Discover Scuba Diving experience at the Tweed Regional Aquatic Centre indoor pool. No prior experience is needed.",
  points: [
    { icon: "shield-check", label: "No previous experience needed" },
    { icon: "users", label: "For ages 10 and over" },
    { icon: "heart", label: "Learn basic skills in the pool" },
  ] as ReadonlyArray<{ icon: IconName; label: string }>,
  image: {
    // STOCK IMAGE: AI-generated placeholder, replace with a real instructor photo.
    src: "/images/divers-pair-reef-drift.jpg",
    alt: "Two divers swimming side by side over a shallow, sunlit reef.",
  },
} as const;

export const reviews = {
  eyebrow: "Social proof",
  headingLines: ["Real students.", "Real first dives."],
  sourceNote: "Feedback from Kirra Dive guests, supplied by Google Maps.",
  badgeLabel: "Google Maps reviews",
  badgeNote: "Feedback from real divers",
  fallbackLabel: "Read reviews on Google Maps",
} as const;

export const courseDates = {
  eyebrow: "Book your course",
  headingLines: ["Ready to take", "your first breath?"],
  body:
    "Check live availability on Kirra Dive's official booking calendar, or send the team an enquiry.",
  upcomingLabel: "Live course dates",
  upcoming: [] as ReadonlyArray<{ id: string; label: string; note: string }>,
  upcomingFallback:
    "Live course dates and availability are shown on Kirra Dive's official booking calendar. All times are Queensland time.",
  calendarCta: {
    label: "Open the live course calendar",
    href: contact.courseCalendarUrl,
  },
  quickActions: {
    dates: {
      label: "View dates",
      detail: "See upcoming courses",
      href: contact.courseCalendarUrl,
    },
    contact: {
      label: "Contact team",
      detail: "Talk with Kirra Dive",
      href: contact.fallbackAnchors.whatsapp,
    },
    booking: {
      label: "Book online",
      detail: "Secure your spot",
      href: contact.bookingUrl,
    },
  },
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
    privacyNote:
      "For live availability and immediate booking, use the official Kirra Dive booking link.",
  },
} as const;

/**
 * The last of the three full-bleed scenes. Closes the page by going back to
 * the water it opened on.
 */
export const finalCta = {
  eyebrow: "Same ocean. A brighter you.",
  headingLines: ["Ready to take", "your first breath?"],
  body: "Check live availability, book online, or contact the Kirra Dive team.",
  primaryCta: { label: "Book PADI Open Water", href: contact.bookingUrl },
  secondaryCta: {
    label: "Contact Kirra Dive",
    href: "#contact",
  },
  image: {
    // STOCK IMAGE: AI-generated placeholder, replace with real photography.
    src: "/images/manta-deep-wall-dark.jpg",
    alt: "Manta ray gliding along a deep reef wall in dark blue water.",
  },
} as const;

export const footer = {
  tagline:
    "PADI courses, Cook Island dives and snorkelling from Tweed Heads since 1988.",
  contactHeading: "Official contact",
  exploreHeading: "Explore Kirra Dive",
  exploreLinks: [
    { label: "The Course", href: "#the-course" },
    { label: "Cook Island", href: "#the-experience" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ],
  whatsappLabel: "Call or email the team",
  phoneLabel: "Phone",
  emailLabel: "Email",
  mapLabel: "Open in Google Maps",
  padi: {
    confirmed: true,
    label: "PADI courses and dive experiences",
    note: "Discover Scuba, Open Water, Advanced, Rescue and professional training are listed on the official site.",
  },
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/kirradiveonthetweed/" },
    { label: "Facebook", href: "https://www.facebook.com/KirraDive/" },
  ],
  legalLinks: [
    { label: "Official website", href: siteConfig.url },
    { label: "Live course calendar", href: contact.courseCalendarUrl },
    {
      label: "PADI medical questionnaire",
      href:
        "https://www.padi.com/sites/default/files/documents/2020-08/10346E_Diver_Medical_Form.pdf",
    },
  ],
  copyright: (year: number) =>
    `© ${year} Kirra Dive. ${siteConfig.suburb}. All rights reserved.`,
} as const;
