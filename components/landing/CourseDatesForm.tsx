"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Info,
  Mail,
  MessageCircle,
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

/** Icon box + divider + label, used for the two intro strips in this section. */
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
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 text-primary">
        {icon}
      </span>
      <span className="h-11 w-px shrink-0 bg-white/10" aria-hidden />
      <div>
        <p className="text-sm font-bold tracking-[0.14em] text-text uppercase">
          {label}
        </p>
        {description ? (
          <p className="mt-1.5 text-sm text-muted">{description}</p>
        ) : null}
      </div>
    </div>
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
      className="section-y"
      data-event={trackingEvents.courseDatesView}
    >
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">{courseDates.eyebrow}</p>
          <h2 className="heading-lg mt-4">
            {courseDates.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-lg text-muted sm:text-lg">{courseDates.body}</p>

          <div className="surface-panel mt-9 p-6">
            <SectionIntro
              icon={<CalendarDays className="h-5 w-5" aria-hidden />}
              label={courseDates.upcomingLabel}
              description={
                courseDates.upcoming.length > 0
                  ? undefined
                  : courseDates.upcomingFallback
              }
            />
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
          className="surface-panel p-6 sm:p-8"
        >
          <SectionIntro
            icon={<Mail className="h-5 w-5" aria-hidden />}
            label={form.legend}
            description={form.introNote}
          />

          <fieldset className="mt-7 border-0 p-0">
            <legend className="sr-only">{form.legend}</legend>

            <div className="grid gap-4">
              <div>
                <label className="sr-only" htmlFor={fieldId("fullName")}>
                  {form.fields.fullName.label}
                </label>
                <div className="relative">
                  <User
                    className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted"
                    aria-hidden
                  />
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
                    aria-describedby={errors.fullName ? errorId("fullName") : undefined}
                    className={cn(
                      "field-input py-4 pl-12",
                      errors.fullName && "border-aqua",
                    )}
                  />
                </div>
                <FieldError id={errorId("fullName")} message={errors.fullName} />
              </div>

              <div>
                <label className="sr-only" htmlFor={fieldId("phone")}>
                  {form.fields.phone.label}
                </label>
                <div className="relative">
                  <MessageCircle
                    className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted"
                    aria-hidden
                  />
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
                    className={cn(
                      "field-input py-4 pl-12",
                      errors.phone && "border-aqua",
                    )}
                  />
                </div>
                <FieldError id={errorId("phone")} message={errors.phone} />
              </div>

              <div>
                <label className="sr-only" htmlFor={fieldId("email")}>
                  {form.fields.email.label}
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted"
                    aria-hidden
                  />
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
                    className={cn(
                      "field-input py-4 pl-12",
                      errors.email && "border-aqua",
                    )}
                  />
                </div>
                <FieldError id={errorId("email")} message={errors.email} />
              </div>

              <div>
                <label className="sr-only" htmlFor={fieldId("preferredDate")}>
                  {form.fields.preferredDate.label}
                </label>
                <div className="relative">
                  <CalendarDays
                    className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted"
                    aria-hidden
                  />
                  <input
                    id={fieldId("preferredDate")}
                    name="preferredDate"
                    type="date"
                    required
                    value={values.preferredDate}
                    onChange={(event) => update("preferredDate", event.target.value)}
                    aria-invalid={Boolean(errors.preferredDate)}
                    aria-describedby={cn(
                      `${baseId}-date-hint`,
                      errors.preferredDate ? errorId("preferredDate") : "",
                    ).trim()}
                    className={cn(
                      "field-input py-4 pl-12 [color-scheme:dark]",
                      errors.preferredDate && "border-aqua",
                    )}
                  />
                </div>
                <p id={`${baseId}-date-hint`} className="mt-2 text-sm text-muted">
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
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {form.fields.experience.options.map((option, index) => (
                    <label
                      key={option.value}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-full border px-4 py-3.5 text-sm transition-colors",
                        values.experience === option.value
                          ? "border-primary bg-primary/10 text-text"
                          : "border-white/15 text-muted hover:border-white/30",
                      )}
                    >
                      <input
                        // The first radio carries the group id so validation can focus it.
                        id={index === 0 ? fieldId("experience") : undefined}
                        type="radio"
                        name="experience"
                        value={option.value}
                        checked={values.experience === option.value}
                        onChange={() => update("experience", option.value)}
                        className="h-5 w-5 accent-[var(--primary)]"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                <FieldError id={errorId("experience")} message={errors.experience} />
              </fieldset>

              <div>
                <label
                  className="flex cursor-pointer items-start gap-3 text-sm text-muted"
                  htmlFor={fieldId("consent")}
                >
                  <input
                    id={fieldId("consent")}
                    name="consent"
                    type="checkbox"
                    checked={values.consent}
                    onChange={(event) => update("consent", event.target.checked)}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? errorId("consent") : undefined}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
                  />
                  {form.fields.consent.label}
                </label>
                <FieldError id={errorId("consent")} message={errors.consent} />
                <p className="mt-2 pl-7 text-xs text-muted">{form.privacyNote}</p>
              </div>
            </div>
          </fieldset>

          <div className="mt-7 flex flex-col gap-3">
            <button
              type="submit"
              className="btn btn-primary w-full"
              data-event={trackingEvents.leadSubmit}
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4" aria-hidden />
              {isSubmitting ? form.submittingLabel : form.submitLabel}
            </button>
            <a
              href={whatsappHref}
              className="btn btn-secondary w-full"
              data-event={trackingEvents.whatsappClick}
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              {form.whatsappLabel}
            </a>
          </div>

          <div className="mt-6 flex items-center gap-3" aria-hidden>
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
              Or
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <a
            href={bookingHref}
            className="mt-6 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-bright"
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
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    {form.whatsappContinueLabel}
                  </a>
                ) : null}
              </div>
            ) : null}
            {submitError ? (
              <p role="alert" className="mt-6 flex items-start gap-3 rounded-2xl border border-aqua/30 bg-aqua/5 p-4 text-sm text-text">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden />
                {submitError}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
