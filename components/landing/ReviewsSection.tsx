import { reviews } from "@/data/landing-content";
import { ReviewsFeed } from "./ReviewsFeed";

export function ReviewsSection() {
  return (
    <section id="reviews" className="relative section-y">
      <div className="container-page">
        <header className="max-w-2xl">
          <p className="eyebrow">{reviews.eyebrow}</p>
          <h2 className="heading-xl mt-4">
            {reviews.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 text-sm text-muted">{reviews.sourceNote}</p>
        </header>

        <ReviewsFeed />
      </div>
    </section>
  );
}
