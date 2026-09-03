import Image from "next/image";
import { Info } from "lucide-react";
import { cookIsland } from "@/data/landing-content";

export function CookIslandFeature() {
  return (
    <section id="the-experience" className="relative isolate overflow-hidden">
      <Image
        src={cookIsland.image.src}
        alt={cookIsland.image.alt}
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Photo stays readable on the right, type stays readable on the left. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/70 to-background/15"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-background/90 via-transparent to-background"
      />

      <div className="container-page relative py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl rounded-3xl border border-white/10 bg-surface/85 p-7 backdrop-blur-md sm:p-10">
          <p className="eyebrow">{cookIsland.eyebrow}</p>
          <p className="mt-4 text-sm font-bold tracking-[0.2em] text-text uppercase">
            {cookIsland.kicker}
          </p>
          <h2 className="heading-lg mt-2">{cookIsland.heading}</h2>

          {cookIsland.body.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-muted">
              {paragraph}
            </p>
          ))}

          <p className="mt-8 text-sm font-semibold text-text">
            {cookIsland.wildlife.lead}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {cookIsland.wildlife.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-7 flex items-start gap-3 rounded-2xl border border-aqua/30 bg-aqua/5 p-4 text-sm text-text">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden />
            {cookIsland.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
