/** Every word, link and image path on the landing page lives here. */

import type { LeadExperience } from "@/types/lead";

/** Icon keys are mapped to Lucide components inside each section. */
export type IconName =
  | "anchor"
  | "badge-check"
  | "heart-handshake"
  | "waves"
  | "life-buoy"
  | "graduation-cap"
  | "shell"
  | "fish"
  | "sun";

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
  hours: "9:00 am–4:00 pm",
  timeZoneNote: "Kirra Dive operates on Queensland time.",
  locationNote: "Opposite the boat ramp, near Tweed Marina.",
  mapUrl:
    "https://maps.google.com/?cid=2530544569852056384&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=US&source=embed",
  whatsappUrl: null as string | null,
  bookingUrl: "https://kirradive.com/courses/open-water-scuba-course-3days-",
  courseCalendarUrl: "https://kirradive.com/calendar/courses",
  socialLinks: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/kirradiveonthetweed/",
    },
    { label: "Facebook", href: "https://www.facebook.com/KirraDive/" },
  ],
  fallbackAnchors: {
    whatsapp: "#contact",
    booking: "#course-dates",
  },
} as const;

export const pricing = {
  from: "A$595",
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
  { label: "Dive & Snorkel", href: "#official-experiences" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export const header = {
  ctaLabel: "Book course",
  ctaHref: contact.bookingUrl ?? contact.fallbackAnchors.booking,
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
  secondaryCta: { label: "Explore all courses", href: "https://kirradive.com/courses" },
  reassurance:
    "Runs over 3–4 days, with flexible scheduling available.",
  image: {
    // PLACEHOLDER IMAGE: replace with real Kirra Dive photography, ~16:10.
    src: "/images/hero-underwater.jpg",
    alt: "Sunlight filtering down through deep blue ocean water above a dark reef.",
  },
} as const;

export const trustSignals: ReadonlyArray<{
  icon: IconName;
  label: string;
  detail: string;
}> = [
  {
    icon: "anchor",
    label: "Since 1988",
    detail: "Teaching divers on the Tweed for over three decades.",
  },
  {
    icon: "badge-check",
    label: "PADI training",
    detail: "Courses from beginner experiences to professional training.",
  },
  {
    icon: "heart-handshake",
    label: "Train locally",
    detail: "Pool sessions and shore-based ocean dives in Tweed Heads.",
  },
];

export const courseJourney = {
  eyebrow: "The course",
  heading: "From online theory to open water",
  intro:
    "Kirra Dive's PADI Open Water course combines self-paced online theory, indoor-pool training and shore-based ocean dives. The course runs over three to four days.",
  cta: { label: "View live course dates", href: contact.courseCalendarUrl },
  stages: [
    {
      id: "pool-skills",
      step: "01",
      title: "Online theory & pool skills",
      description:
        "Complete the theory online at your own pace, then build core scuba skills with a certified instructor at the Tweed Regional Aquatic Centre indoor pool.",
      image: {
        // PLACEHOLDER IMAGE: 4:3 confined water training shot.
        src: "/images/journey-pool-skills.jpg",
        alt: "Student diver practising skills in calm, shallow training water.",
      },
    },
    {
      id: "ocean-dives",
      step: "02",
      title: "Ocean dives",
      description:
        "Take those skills into the calm, shallow waters of Jack Evans Boat Harbour for your open-water training dives.",
      image: {
        // PLACEHOLDER IMAGE: 4:3 open water dive shot.
        src: "/images/journey-ocean-dives.jpg",
        alt: "Divers descending through blue water on an open-water training dive.",
      },
    },
    {
      id: "certification",
      step: "03",
      title: "Certified to dive",
      description:
        "On completion, qualify as a PADI Open Water Diver — certified to dive independently to 18 metres around the world.",
      image: {
        // PLACEHOLDER IMAGE: 4:3 certification / post-dive shot.
        src: "/images/journey-certification.jpg",
        alt: "Diver looking up towards the surface at the end of a dive.",
      },
    },
  ],
} as const;

export const cookIsland = {
  eyebrow: "Cook Island",
  kicker: "Optional course upgrade",
  heading: "Make Cook Island your final dive",
  body: [
    "For an additional A$100, eligible Open Water students can upgrade their final dive to a boat dive at Cook Island, weather and confidence permitting.",
    "Just 800 metres off the coast, Cook Island offers rocky reefs and marine life for divers at a range of experience levels.",
  ],
  wildlife: {
    lead: "Cook Island is known for:",
    items: ["Green turtles", "Rays", "Reef fish", "Rocky reefs"],
  },
  disclaimer:
    "Conditions and wildlife sightings vary. The Cook Island upgrade is subject to weather and diver confidence.",
  image: {
    // PLACEHOLDER IMAGE: replace with Cook Island Aquatic Reserve photography.
    src: "/images/cook-island-reserve.jpg",
    alt: "Underwater view of a shallow reef in dappled sunlight.",
  },
} as const;

export const included = {
  eyebrow: "What you get",
  heading: "What is included",
  intro:
    "The official course includes the essentials needed to learn, train and qualify.",
  items: [
    "Online theory and training materials",
    "Use of scuba equipment",
    "Indoor-pool training",
    "Shore-based open-water training dives",
    "Flexible dates where available",
    "PADI Open Water Diver certification on completion",
  ],
  itemsNote:
    "Review the PADI medical questionnaire before booking. A “Yes” response may require medical clearance.",
  valuePanel: {
    priceLabel: pricing.from,
    priceNote: pricing.note,
    ctaLabel: "Book online",
    ctaHref: contact.bookingUrl ?? contact.fallbackAnchors.booking,
    beginnerHeadingLines: ["New to diving?", "Start with PADI Discover Scuba."],
    beginnerBody:
      "Kirra Dive also runs a beginner Discover Scuba Diving experience at the Tweed Regional Aquatic Centre indoor pool. No prior experience is needed.",
  },
} as const;

export type Review = {
  id: string;
  quote: string;
  name: string;
  /** Where the review was published. */
  source: string;
  date: string;
  url: string;
};

export const reviews = {
  eyebrow: "From the official site",
  heading: "Recent guest reviews",
  sourceNote: "Published on Kirra Dive's official activity and course pages.",
  featured: {
    id: "featured",
    quote: "“Thanks for the great experience! I’m stoked I am now a scuba diver.”",
    name: "Louise",
    source: "PADI Open Water (3 days)",
    date: "30 Apr 2025",
    url: contact.bookingUrl,
  } satisfies Review,
  secondary: [
    {
      id: "secondary-1",
      quote:
        "“Great dive shop and really helpful staff. I felt really comfortable in the water by the end.”",
      name: "Jake Browie",
      source: "PADI Open Water (3 days)",
      date: "30 Apr 2025",
      url: contact.bookingUrl,
    },
    {
      id: "secondary-2",
      quote:
        "“I had Ella as my instructor and felt comfortable and excited.”",
      name: "Ethan B",
      source: "PADI Discover Scuba Diving",
      date: "5 Sep 2025",
      url: "https://kirradive.com/courses/try-dive-river",
    },
  ] satisfies Review[],
} as const;

export const courseDates = {
  eyebrow: "Book your course",
  heading: "Ready to take your first breath?",
  body:
    "Check live availability on Kirra Dive's official booking calendar, or send the team an enquiry.",
  upcoming: [] as ReadonlyArray<{ id: string; label: string; note: string }>,
  upcomingFallback:
    "Live course dates and availability are shown on Kirra Dive's official booking calendar. All times are Queensland time.",
  calendarCta: {
    label: "Open the live course calendar",
    href: contact.courseCalendarUrl,
  },
  form: {
    legend: "Course enquiry",
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

export const stickyCta = {
  datesLabel: "View dates",
  datesHref: "#course-dates",
  whatsappLabel: "Ask on WhatsApp",
  label: "Quick actions",
} as const;

export const footer = {
  tagline:
    "PADI courses, Cook Island dives and snorkelling from Tweed Heads since 1988.",
  contactHeading: "Official contact",
  exploreHeading: "Explore Kirra Dive",
  usefulHeading: "Useful links",
  socialHeading: "Follow Kirra Dive",
  mapLabel: "Open in Google Maps",
  padi: {
    label: "PADI courses and dive experiences",
    note: "Discover Scuba, Open Water, Advanced, Rescue and professional training are listed on the official site.",
  },
  usefulLinks: [
    { label: "Official website", href: siteConfig.url },
    { label: "Live course calendar", href: contact.courseCalendarUrl },
    {
      label: "PADI diver medical questionnaire",
      href:
        "https://www.padi.com/sites/default/files/documents/2020-08/10346E_Diver_Medical_Form.pdf",
    },
  ],
  copyright: (year: number) =>
    `© ${year} Kirra Dive. ${siteConfig.suburb}. All rights reserved.`,
} as const;

export const officialOfferings = {
  eyebrow: "Official Kirra Dive experiences",
  heading: "More ways to get in the water",
  intro:
    "Explore the current activities published by Kirra Dive — all with live availability and booking on the official site.",
  items: [
    {
      title: "Snorkel with the Turtles",
      description:
        "Guided snorkelling tours to Cook Island for swimmers aged 10 and over. Boat trip, snorkel guide, safety briefing and flotation equipment are included.",
      href: "https://kirradive.com/charters/snorkel-with-the-turtles-cook-island-",
      label: "Explore snorkelling",
    },
    {
      title: "Cook Island certified dives",
      description:
        "Single and double scuba dives for certified divers, with sites ranging from entry-level reefs to advanced locations around the island.",
      href: "https://kirradive.com/charters/cook-single-scuba-dive-certified-m-99-",
      label: "Explore certified dives",
    },
    {
      title: "PADI courses",
      description:
        "From Discover Scuba and Open Water through Advanced, Rescue and professional-level training.",
      href: "https://kirradive.com/courses",
      label: "Explore all courses",
    },
  ],
} as const;
