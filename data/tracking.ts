/**
 * Analytics event names.
 *
 * Phase one only stamps these onto the DOM as `data-event` attributes so the
 * markup is ready. No analytics library is installed and nothing is sent yet.
 * Phase two can wire GA4 / Meta / Google Ads to these same names.
 */
export const trackingEvents = {
  heroPrimaryCta: "hero_primary_cta",
  heroSecondaryCta: "hero_secondary_cta",
  headerCta: "header_cta_click",
  courseJourneyCta: "course_journey_view_dates",
  courseDatesView: "course_dates_view",
  includedCta: "included_cta_click",
  bookOnlineClick: "book_online_click",
  whatsappClick: "whatsapp_click",
  whatsappContinue: "whatsapp_continue",
  leadSubmit: "lead_submit",
  stickyDatesClick: "sticky_dates_click",
} as const;

export type TrackingEvent = (typeof trackingEvents)[keyof typeof trackingEvents];
