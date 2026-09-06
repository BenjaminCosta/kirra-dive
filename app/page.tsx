import { CookIslandFeature } from "@/components/landing/CookIslandFeature";
import { CourseDatesForm } from "@/components/landing/CourseDatesForm";
import { CourseJourney } from "@/components/landing/CourseJourney";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { GoodHands } from "@/components/landing/GoodHands";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { IncludedSection } from "@/components/landing/IncludedSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <CourseJourney />
        <CookIslandFeature />
        <IncludedSection />
        <GoodHands />
        <ReviewsSection />
        <CourseDatesForm />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
