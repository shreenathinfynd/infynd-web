import AboutSlideshow from "@/components/about/AboutSlideshow";
import HeroSlide from "@/components/about/slides/HeroSlide";
import OriginStorySlide from "@/components/about/slides/OriginStorySlide";
import FoundationSlide from "@/components/about/slides/FoundationSlide";
import ScaleSlide from "@/components/about/slides/ScaleSlide";
import ProductEvolutionSlide from "@/components/about/slides/ProductEvolutionSlide";
import TrustComplianceSlide from "@/components/about/slides/TrustComplianceSlide";
import PresentDaySlide from "@/components/about/slides/PresentDaySlide";
import WhyItMattersSlide from "@/components/about/slides/WhyItMattersSlide";

const AboutPage = () => {
  return (
    <AboutSlideshow>
      <HeroSlide />
      <OriginStorySlide />
      <FoundationSlide />
      <ScaleSlide />
      <ProductEvolutionSlide />
      <TrustComplianceSlide />
      <PresentDaySlide />
      <WhyItMattersSlide />
    </AboutSlideshow>
  );
};

export default AboutPage;
