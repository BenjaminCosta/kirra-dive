/**
 * Shape of a course enquiry.
 *
 * The form POSTs this to /api/leads. The route handler validates it, then sends
 * it server-to-server to the Apps Script Web App. Nothing here is sent from the
 * browser to Google directly, and no credentials ever reach the client.
 */
export type LeadPayload = {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  experience: "none" | "tried-before";
  consent: boolean;
  source?: string;
  campaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  createdAt?: string;
};

/** The two experience options offered in the form. */
export type LeadExperience = LeadPayload["experience"];

/** Per-field validation messages, keyed by the field they belong to. */
export type LeadFormErrors = Partial<
  Record<
    keyof Omit<
      LeadPayload,
      | "source"
      | "campaign"
      | "utmSource"
      | "utmMedium"
      | "utmCampaign"
      | "utmContent"
      | "utmTerm"
      | "createdAt"
    >,
    string
  >
>;
