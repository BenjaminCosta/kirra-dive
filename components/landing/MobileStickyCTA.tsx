"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MessageCircle } from "lucide-react";
import { contact, stickyCta } from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";
import { cn } from "@/lib/cn";

/**
 * Mobile-only bar. It steps out of the way once the enquiry form is on screen,
 * so it never sits on top of the thing it is pointing at.
 */
export function MobileStickyCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("course-dates");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -25% 0px" },
    );
    observer.observe(target);
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
        {contact.whatsappUrl ? (
          <a
            href={whatsappHref}
            className="btn btn-sm btn-secondary flex-1"
            data-event={trackingEvents.whatsappClick}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {stickyCta.whatsappLabel}
          </a>
        ) : null}
      </nav>
    </div>
  );
}
