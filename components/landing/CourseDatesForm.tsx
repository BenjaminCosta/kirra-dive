"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  Info,
  Mail,
  Send,
  User,
} from "lucide-react";
import { contact, courseDates } from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";
import { cn } from "@/lib/cn";
import type { LeadExperience, LeadFormErrors, LeadPayload } from "@/types/lead";

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  experience: LeadExperience | "";
  consent: boolean;
};

const initialValues: FormValues = {
  fullName: "",
  phone: "",
  email: "",
  preferredDate: "",
  experience: "",
  consent: false,
};

const { form } = courseDates;

/** WhatsApp's own glyph. Lucide has no brand mark, and the chat bubble reads
 *  as a generic "message" next to a phone number field. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06s.89 2.39 1.01 2.55c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

function validate(values: FormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};
  if (!values.fullName.trim()) errors.fullName = form.errors.fullName;
  if (values.phone.replace(/\D/g, "").length < 6) errors.phone = form.errors.phone;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = form.errors.email;
  }
  if (!values.preferredDate) errors.preferredDate = form.errors.preferredDate;
  if (!values.experience) errors.experience = form.errors.experience;
  if (!values.consent) errors.consent = form.errors.consent;
  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-2 text-sm text-text">
      <AlertCircle className="h-4 w-4 shrink-0 text-aqua" aria-hidden />
      {message}
    </p>
  );
}

/** Icon box + divider + label, used for the upcoming-dates strip. */
function SectionIntro({
  icon,
  label,
  description,
}: {
  icon: ReactNode;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/40 text-primary">
        {icon}
      </span>
      <span className="h-11 w-px shrink-0 bg-white/12" aria-hidden />
      <div className="min-w-0">
        <p className="text-[0.72rem] font-bold tracking-[0.18em] text-text uppercase sm:text-sm">
          {label}
        </p>
        {description ? (
          <p className="mt-1.5 text-sm leading-relaxed text-white/72">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

/**
 * The three shortcuts above the form. All three keep the same shape — icon,
 * label, detail, chevron — and differ only in weight: outline for the calendar,
 * WhatsApp's green for the chat, and a solid brand fill for booking, which is
 * the one action that completes without the team.
 */
type QuickActionTone = "outline" | "whatsapp" | "solid";

const quickActionTone: Record<
  QuickActionTone,
  { card: string; iconBox: string; label: string; detail: string; chevron: string }
> = {
  outline: {
    card: "border-primary/55 bg-background/55 hover:border-primary hover:bg-background/70",
    iconBox: "border-primary/35 text-primary",
    label: "text-text",
    detail: "text-white/60",
    chevron: "text-primary",
  },
  whatsapp: {
    card: "border-emerald-400/40 bg-emerald-950/55 hover:border-emerald-400/70 hover:bg-emerald-950/70",
    iconBox: "border-emerald-400/35 text-emerald-300",
    label: "text-text",
    detail: "text-white/60",
    chevron: "text-emerald-300",
  },
  solid: {
    card: "border-primary-bright/60 [background-image:var(--primary-fill)] hover:border-white/60",
    iconBox: "border-white/40 text-white",
    label: "text-white",
    detail: "text-white/75",
    chevron: "text-white",
  },
};

function QuickAction({
  href,
  icon,
  label,
  detail,
  tone,
  external = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  detail: string;
  tone: QuickActionTone;
  external?: boolean;
}) {
  const styles = quickActionTone[tone];

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative flex min-w-0 items-center gap-1 rounded-2xl border p-2 pr-3.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[2px] transition-[border-color,background-color,transform] duration-200 active:translate-y-px sm:gap-2.5 sm:p-3.5 sm:pr-7",
        styles.card,
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border sm:h-9 sm:w-9",
          styles.iconBox,
        )}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block text-[0.63rem] leading-[1.15] font-bold sm:text-[0.82rem]",
            styles.label,
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[0.56rem] leading-[1.25] sm:mt-1 sm:text-xs sm:leading-snug",
            styles.detail,
          )}
        >
          {detail}
        </span>
      </span>
      <ChevronRight
        className={cn(
          "absolute top-1/2 right-1 h-3 w-3 -translate-y-1/2 transition-transform duration-200 group-hover:translate-x-0.5 sm:right-3 sm:h-4 sm:w-4",
          styles.chevron,
        )}
        aria-hidden
      />
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

type SavedLead = {
  payload: LeadPayload;
  leadId: string;
  leadRow: number | null;
};

function buildWhatsAppHref(payload: LeadPayload) {
  if (!contact.whatsappUrl) return null;

  try {
    const selectedExperience = form.fields.experience.options.find(
      (option) => option.value === payload.experience,
    );
    const message = [
      form.whatsappPrefill.greeting,
      `${form.whatsappPrefill.introduction} ${payload.fullName}.`,
      `${form.whatsappPrefill.preferredDate} ${payload.preferredDate}.`,
      `${form.whatsappPrefill.experience} ${selectedExperience?.label ?? payload.experience}.`,
    ].join("\n");
    const url = new URL(contact.whatsappUrl);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    return null;
  }
}

function trackWhatsAppContinuation(lead: SavedLead) {
  if (!lead.leadRow) return;

  const body = JSON.stringify({ leadId: lead.leadId, leadRow: lead.leadRow });
  const blob = new Blob([body], { type: "application/json" });

  if (navigator.sendBeacon("/api/leads/whatsapp", blob)) return;

  void fetch("/api/leads/whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

function getAttribution() {
  const search = new URLSearchParams(window.location.search);
  const utmSource = search.get("utm_source") ?? "";

  return {
    // A simple `source` parameter supports QR codes, hostels, and partner links.
    source: search.get("source") || utmSource || "landing",
    campaign: search.get("campaign") ?? search.get("utm_campaign") ?? "",
    utmSource,
    utmMedium: search.get("utm_medium") ?? "",
    utmCampaign: search.get("utm_campaign") ?? "",
    utmContent: search.get("utm_content") ?? "",
    utmTerm: search.get("utm_term") ?? "",
  };
}

const fieldClass =
  "field-input rounded-[1.1rem] border-white/20 bg-background/55 py-3.5 pl-12 placeholder:text-white/45";
const fieldIconClass =
  "pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-white/55";

export function CourseDatesForm() {
  const baseId = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [showNotice, setShowNotice] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedLead, setSavedLead] = useState<SavedLead | null>(null);

  const fieldId = (name: string) => `${baseId}-${name}`;
  const errorId = (name: string) => `${baseId}-${name}-error`;

  const whatsappHref = contact.whatsappUrl ?? contact.fallbackAnchors.whatsapp;
  const bookingHref = contact.bookingUrl ?? contact.fallbackAnchors.booking;
  const whatsappContinueHref = savedLead
    ? buildWhatsAppHref(savedLead.payload)
    : null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      setShowNotice(false);
      document.getElementById(fieldId(firstError))?.focus();
      return;
    }

    const payload: LeadPayload = {
      ...values,
      experience: values.experience as LeadExperience,
      ...getAttribution(),
      createdAt: new Date().toISOString(),
    };

    setShowNotice(false);
    setSubmitError(null);
    setSavedLead(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: unknown = await response.json();

      if (
        !response.ok ||
        typeof result !== "object" ||
        result === null ||
        !(
          "leadId" in result &&
          typeof result.leadId === "string" &&
          "leadRow" in result &&
          (typeof result.leadRow === "number" || result.leadRow === null)
        )
      ) {
        throw new Error("Lead capture failed.");
      }

      setValues(initialValues);
      setSavedLead({
        payload,
        leadId: result.leadId,
        leadRow: result.leadRow,
      });
      setShowNotice(true);
    } catch {
      setSubmitError(form.submitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  return (
    <section
      id="course-dates"
      className="relative isolate overflow-hidden"
      data-event={trackingEvents.courseDatesView}
    >
      {/*
       * The water runs behind the whole section, edge to edge, and dissolves
       * back into the ground at both ends — the same recipe as the three photo
       * scenes, sized for a section that is several viewports tall.
       */}
      {/* AI-generated stock photo — replace with real Kirra Dive photography. */}
      <img
        src="/images/form.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-[55%_50%]"
      />
      <div aria-hidden className="scene-shade" />
      <div aria-hidden className="scene-dissolve" />

      <div className="container-page py-16 sm:py-20 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          <div>
            <p className="eyebrow">{courseDates.eyebrow}</p>
            <h2 className="mt-3 text-[clamp(1.5rem,7.9vw,3.25rem)] leading-[0.96] font-bold tracking-[-0.02em] text-text uppercase">
              {courseDates.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
              {courseDates.body}
            </p>

            <div className="mt-7 grid grid-cols-3 gap-1.5 sm:gap-3">
              <QuickAction
                href={courseDates.quickActions.dates.href}
                icon={<CalendarDays className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" aria-hidden />}
                label={courseDates.quickActions.dates.label}
                detail={courseDates.quickActions.dates.detail}
                tone="outline"
                external
              />
              <QuickAction
                href={courseDates.quickActions.contact.href}
                icon={<WhatsAppIcon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />}
                label={courseDates.quickActions.contact.label}
                detail={courseDates.quickActions.contact.detail}
                tone="whatsapp"
              />
              <QuickAction
                href={courseDates.quickActions.booking.href}
                icon={<CreditCard className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" aria-hidden />}
                label={courseDates.quickActions.booking.label}
                detail={courseDates.quickActions.booking.detail}
                tone="solid"
                external
              />
            </div>

            <div className="mt-4 rounded-[1.4rem] border border-primary/45 bg-background/45 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[2px] sm:mt-5 sm:p-5">
              <SectionIntro
                icon={<CalendarDays className="h-5 w-5" aria-hidden />}
                label={courseDates.upcomingLabel}
                description={
                  courseDates.upcoming.length > 0
                    ? undefined
                    : courseDates.upcomingFallback
                }
              />
              {/* No second link to the calendar here: the "View dates" shortcut
                  above already points at the same URL. */}
              {courseDates.upcoming.length > 0 ? (
                <ul className="mt-4 divide-y divide-white/10">
                  {courseDates.upcoming.map((date) => (
                    <li
                      key={date.id}
                      className="flex flex-wrap items-baseline justify-between gap-2 py-3"
                    >
                      <span className="font-semibold text-text">{date.label}</span>
                      <span className="text-sm text-muted">{date.note}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            data-event={trackingEvents.leadSubmit}
            className="rounded-[1.65rem] border border-primary/45 bg-background/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[3px] sm:p-7"
          >
            <div>
              <p className="text-lg font-bold tracking-[0.12em] text-text uppercase sm:text-xl">
                {form.legend}
              </p>
              <p className="mt-1.5 text-sm text-white/70 sm:text-base">
                {form.introNote}
              </p>
            </div>

            <fieldset className="mt-6 border-0 p-0">
              <legend className="sr-only">{form.legend}</legend>

              <div className="grid gap-3">
                <div>
                  <label className="sr-only" htmlFor={fieldId("fullName")}>
                    {form.fields.fullName.label}
                  </label>
                  <div className="relative">
                    <User className={fieldIconClass} aria-hidden />
                    <input
                      id={fieldId("fullName")}
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder={form.fields.fullName.label}
                      value={values.fullName}
                      onChange={(event) => update("fullName", event.target.value)}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={
                        errors.fullName ? errorId("fullName") : undefined
                      }
                      className={cn(fieldClass, errors.fullName && "border-aqua")}
                    />
                  </div>
                  <FieldError id={errorId("fullName")} message={errors.fullName} />
                </div>

                <div>
                  <label className="sr-only" htmlFor={fieldId("phone")}>
                    {form.fields.phone.label}
                  </label>
                  <div className="relative">
                    <WhatsAppIcon className={fieldIconClass} />
                    <input
                      id={fieldId("phone")}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder={form.fields.phone.label}
                      value={values.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? errorId("phone") : undefined}
                      className={cn(fieldClass, errors.phone && "border-aqua")}
                    />
                  </div>
                  <FieldError id={errorId("phone")} message={errors.phone} />
                </div>

                <div>
                  <label className="sr-only" htmlFor={fieldId("email")}>
                    {form.fields.email.label}
                  </label>
                  <div className="relative">
                    <Mail className={fieldIconClass} aria-hidden />
                    <input
                      id={fieldId("email")}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder={form.fields.email.label}
                      value={values.email}
                      onChange={(event) => update("email", event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? errorId("email") : undefined}
                      className={cn(fieldClass, errors.email && "border-aqua")}
                    />
                  </div>
                  <FieldError id={errorId("email")} message={errors.email} />
                </div>

                <div>
                  <label className="sr-only" htmlFor={fieldId("preferredDate")}>
                    {form.fields.preferredDate.label}
                  </label>
                  <div className="relative">
                    <CalendarDays className={fieldIconClass} aria-hidden />
                    <input
                      id={fieldId("preferredDate")}
                      name="preferredDate"
                      type="date"
                      required
                      // Drives the CSS that blanks the native "dd/mm/yyyy".
                      data-empty={values.preferredDate ? "false" : "true"}
                      value={values.preferredDate}
                      onChange={(event) =>
                        update("preferredDate", event.target.value)
                      }
                      aria-invalid={Boolean(errors.preferredDate)}
                      aria-describedby={cn(
                        `${baseId}-date-hint`,
                        errors.preferredDate ? errorId("preferredDate") : "",
                      ).trim()}
                      className={cn(
                        fieldClass,
                        "date-input pr-12 [color-scheme:dark]",
                        errors.preferredDate && "border-aqua",
                      )}
                    />
                    {values.preferredDate ? null : (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute top-1/2 left-12 -translate-y-1/2 text-base text-white/45"
                      >
                        {form.fields.preferredDate.label}
                      </span>
                    )}
                    <CalendarDays
                      className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-white/55"
                      aria-hidden
                    />
                  </div>
                  <p
                    id={`${baseId}-date-hint`}
                    className="mt-2 text-[0.75rem] text-white/55"
                  >
                    {form.fields.preferredDate.hint}
                  </p>
                  <FieldError
                    id={errorId("preferredDate")}
                    message={errors.preferredDate}
                  />
                </div>

                <fieldset
                  className="border-0 p-0"
                  aria-invalid={Boolean(errors.experience)}
                  aria-describedby={
                    errors.experience ? errorId("experience") : undefined
                  }
                >
                  <legend className="eyebrow">{form.fields.experience.legend}</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3">
                    {form.fields.experience.options.map((option, index) => (
                      <label
                        key={option.value}
                        className={cn(
                          "flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-3 text-[0.7rem] transition-colors sm:gap-3 sm:px-4 sm:text-sm",
                          values.experience === option.value
                            ? "border-primary bg-primary/12 font-semibold text-text"
                            : "border-white/18 bg-background/35 text-white/70 hover:border-white/35",
                        )}
                      >
                        <input
                          // The first radio carries the group id so validation
                          // can focus it.
                          id={index === 0 ? fieldId("experience") : undefined}
                          type="radio"
                          name="experience"
                          value={option.value}
                          checked={values.experience === option.value}
                          onChange={() => update("experience", option.value)}
                          className="control-radio"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                  <FieldError id={errorId("experience")} message={errors.experience} />
                </fieldset>

                <div className="mt-1">
                  <label
                    className="flex cursor-pointer items-start gap-3 text-[0.85rem] leading-snug text-white/80 sm:text-sm"
                    htmlFor={fieldId("consent")}
                  >
                    <span className="relative mt-0.5 flex shrink-0 items-center justify-center">
                      <input
                        id={fieldId("consent")}
                        name="consent"
                        type="checkbox"
                        checked={values.consent}
                        onChange={(event) => update("consent", event.target.checked)}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={
                          errors.consent ? errorId("consent") : undefined
                        }
                        className="control-checkbox"
                      />
                      {values.consent ? (
                        <Check
                          className="pointer-events-none absolute h-3.5 w-3.5 text-background"
                          strokeWidth={3}
                          aria-hidden
                        />
                      ) : null}
                    </span>
                    {form.fields.consent.label}
                  </label>
                  <FieldError id={errorId("consent")} message={errors.consent} />
                  <p className="mt-2 pl-[2.1rem] text-xs text-white/45">
                    {form.privacyNote}
                  </p>
                </div>
              </div>
            </fieldset>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="submit"
                className="btn btn-primary w-full rounded-[1.1rem] py-4"
                data-event={trackingEvents.leadSubmit}
                disabled={isSubmitting}
              >
                <Send className="h-4 w-4" aria-hidden />
                {isSubmitting ? form.submittingLabel : form.submitLabel}
              </button>
              <a
                href={whatsappHref}
                className="btn btn-secondary w-full rounded-[1.1rem] py-4"
                data-event={trackingEvents.whatsappClick}
              >
                <WhatsAppIcon className="h-4 w-4" />
                {form.whatsappLabel}
              </a>
            </div>

            <div className="mt-5 flex items-center gap-3" aria-hidden>
              <span className="h-px flex-1 bg-white/12" />
              <span className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">
                Or
              </span>
              <span className="h-px flex-1 bg-white/12" />
            </div>

            <a
              href={bookingHref}
              className="mt-5 flex items-center justify-center gap-1.5 text-base font-semibold text-primary transition-colors hover:text-primary-bright"
              data-event={trackingEvents.bookOnlineClick}
            >
              {form.bookingLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>

            <div role="status" aria-live="polite">
              {showNotice && savedLead ? (
                <div className="mt-6 rounded-2xl border border-aqua/30 bg-aqua/5 p-4 text-sm text-text">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden />
                    <div>
                      <p className="font-semibold">{form.successTitle}</p>
                      <p className="mt-1 text-muted">{form.successNotice}</p>
                    </div>
                  </div>
                  {whatsappContinueHref ? (
                    <a
                      href={whatsappContinueHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary mt-4 w-full sm:w-auto"
                      data-event={trackingEvents.whatsappContinue}
                      onClick={() => trackWhatsAppContinuation(savedLead)}
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      {form.whatsappContinueLabel}
                    </a>
                  ) : null}
                </div>
              ) : null}
              {submitError ? (
                <p
                  role="alert"
                  className="mt-6 flex items-start gap-3 rounded-2xl border border-aqua/30 bg-aqua/5 p-4 text-sm text-text"
                >
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-aqua"
                    aria-hidden
                  />
                  {submitError}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
