/**
 * Shape of a course enquiry.
 *
 * Phase two: the form POSTs this to /api/leads, the route handler validates it
 * on the server and appends a row to Google Sheets. Nothing here is sent from
 * the browser to Google directly, and no credentials ever reach the client.
 */
export type LeadPayload = {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  experience: "none" | "tried-before";
  consent: boolean;
  source?: string;
  createdAt?: string;
};

/** The two experience options offered in the form. */
export type LeadExperience = LeadPayload["experience"];

/** Per-field validation messages, keyed by the field they belong to. */
export type LeadFormErrors = Partial<
  Record<keyof Omit<LeadPayload, "source" | "createdAt">, string>
>;
