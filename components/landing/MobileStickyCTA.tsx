"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MessageCircle } from "lucide-react";
import { contact, stickyCta } from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";
import { cn } from "@/lib/cn";

/**
 * Mobile-only bar. It steps out of the way once the enquiry form or the
 * footer is on screen, so it never duplicates the CTAs already there.
 */
export function MobileStickyCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = ["course-dates", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setHidden(visible.size > 0);
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const whatsappHref = contact.whatsappUrl ?? contact.fallbackAnchors.whatsapp;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 md:hidden",
        hidden ? "translate-y-full" : "translate-y-0",
      )}
      inert={hidden}
      aria-hidden={hidden || undefined}
    >
      <nav
        aria-label={stickyCta.label}
        className="flex gap-3 border-t border-white/10 bg-background/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md"
      >
        <a
          href={stickyCta.datesHref}
          className="btn btn-sm btn-primary flex-1"
          data-event={trackingEvents.stickyDatesClick}
        >
          <CalendarDays className="h-4 w-4" aria-hidden />
          {stickyCta.datesLabel}
        </a>
        <a
          href={whatsappHref}
          className="btn btn-sm btn-secondary flex-1"
          data-event={trackingEvents.whatsappClick}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          {stickyCta.whatsappLabel}
        </a>
      </nav>
    </div>
  );
}
