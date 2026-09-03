import { CookIslandFeature } from "@/components/landing/CookIslandFeature";
import { CourseDatesForm } from "@/components/landing/CourseDatesForm";
import { CourseJourney } from "@/components/landing/CourseJourney";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { IncludedSection } from "@/components/landing/IncludedSection";
import { MobileStickyCTA } from "@/components/landing/MobileStickyCTA";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { TrustBar } from "@/components/landing/TrustBar";

export default function HomePage() {
  return (
    <>
      <Header />
      {/* Bottom padding clears the mobile sticky bar. */}
      <main id="main" className="flex-1 pb-24 md:pb-0">
        <Hero />
        <TrustBar />
        <CourseJourney />
        <CookIslandFeature />
        <IncludedSection />
        <ReviewsSection />
        <CourseDatesForm />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
