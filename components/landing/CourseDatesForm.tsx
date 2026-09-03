"use client";

import { useId, useState, type FormEvent } from "react";
import { AlertCircle, CalendarDays, Info, MessageCircle } from "lucide-react";
import { contact, courseDates } from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";
import { cn } from "@/lib/cn";
import type { LeadExperience, LeadFormErrors } from "@/types/lead";

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

export function CourseDatesForm() {
  const baseId = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [showNotice, setShowNotice] = useState(false);

  const fieldId = (name: string) => `${baseId}-${name}`;
  const errorId = (name: string) => `${baseId}-${name}-error`;

  const whatsappHref = contact.whatsappUrl ?? contact.fallbackAnchors.whatsapp;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      setShowNotice(false);
      document.getElementById(fieldId(firstError))?.focus();
      return;
    }

    // Phase two replaces this with:
    //   const payload: LeadPayload = { ...values, experience: values.experience as LeadExperience,
    //     source: "landing", createdAt: new Date().toISOString() };
    //   await fetch("/api/leads", { method: "POST", body: JSON.stringify(payload) });
    // then opens WhatsApp with a prefilled message. The lead is stored either way.
    setShowNotice(true);
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
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">{courseDates.eyebrow}</p>
          <h2 className="heading-lg mt-4">{courseDates.heading}</h2>
          <p className="mt-6 max-w-lg text-lg text-muted">{courseDates.body}</p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-surface/50 p-6">
            <p className="flex items-center gap-2.5 text-sm font-bold tracking-[0.14em] text-text uppercase">
              <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
              Upcoming courses
            </p>
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
            ) : (
              <p className="mt-3 text-sm text-muted">
                {courseDates.upcomingFallback}
              </p>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          data-event={trackingEvents.leadSubmit}
          className="surface-panel p-6 sm:p-8"
        >
          <fieldset className="border-0 p-0">
            <legend className="sr-only">{form.legend}</legend>

            <div className="grid gap-5">
              <div>
                <label className="field-label" htmlFor={fieldId("fullName")}>
                  {form.fields.fullName.label}
                </label>
                <input
                  id={fieldId("fullName")}
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={form.fields.fullName.placeholder}
                  value={values.fullName}
                  onChange={(event) => update("fullName", event.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? errorId("fullName") : undefined}
                  className={cn("field-input mt-2", errors.fullName && "border-aqua")}
                />
                <FieldError id={errorId("fullName")} message={errors.fullName} />
              </div>

              <div>
                <label className="field-label" htmlFor={fieldId("phone")}>
                  {form.fields.phone.label}
                </label>
                <input
                  id={fieldId("phone")}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder={form.fields.phone.placeholder}
                  value={values.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? errorId("phone") : undefined}
                  className={cn("field-input mt-2", errors.phone && "border-aqua")}
                />
                <FieldError id={errorId("phone")} message={errors.phone} />
              </div>

              <div>
                <label className="field-label" htmlFor={fieldId("email")}>
                  {form.fields.email.label}
                </label>
                <input
                  id={fieldId("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={form.fields.email.placeholder}
                  value={values.email}
                  onChange={(event) => update("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? errorId("email") : undefined}
                  className={cn("field-input mt-2", errors.email && "border-aqua")}
                />
                <FieldError id={errorId("email")} message={errors.email} />
              </div>

              <div>
                <label className="field-label" htmlFor={fieldId("preferredDate")}>
                  {form.fields.preferredDate.label}
                </label>
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
                    "field-input mt-2 [color-scheme:dark]",
                    errors.preferredDate && "border-aqua",
                  )}
                />
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
                <legend className="field-label">
                  {form.fields.experience.legend}
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {form.fields.experience.options.map((option, index) => (
                    <label
                      key={option.value}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors",
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
                        className="h-4 w-4 accent-[var(--primary)]"
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
              </div>
            </div>
          </fieldset>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <button
              type="submit"
              className="btn btn-primary w-full"
              data-event={trackingEvents.bookOnlineClick}
            >
              {form.submitLabel}
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

          <p className="mt-4 text-xs text-muted">{form.privacyNote}</p>

          {/* Development notice. Not a confirmation: nothing has been sent. */}
          <div role="status" aria-live="polite">
            {showNotice ? (
              <p className="mt-5 flex items-start gap-3 rounded-2xl border border-aqua/30 bg-aqua/5 p-4 text-sm text-text">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden />
                {form.notConnectedNotice}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
