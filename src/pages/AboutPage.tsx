import AboutSlideshow from "@/components/about/AboutSlideshow";
import HeroSlide from "@/components/about/slides/HeroSlide";
import OriginStorySlide from "@/components/about/slides/OriginStorySlide";
import DataProcessSlide1 from "@/components/about/slides/DataProcessSlide1";
import DataProcessSlide2 from "@/components/about/slides/DataProcessSlide2";
import ProductEvolutionSlide from "@/components/about/slides/ProductEvolutionSlide";
import TrustComplianceSlide from "@/components/about/slides/TrustComplianceSlide";
import PresentDaySlide from "@/components/about/slides/PresentDaySlide";
import WhyItMattersSlide from "@/components/about/slides/WhyItMattersSlide";

const AboutPage = () => {
  return (
    <AboutSlideshow>
      <HeroSlide />
      <OriginStorySlide />
      <DataProcessSlide1 />
      <DataProcessSlide2 />
      <ProductEvolutionSlide />
      <TrustComplianceSlide />
      <WhyItMattersSlide />
    </AboutSlideshow>
  );
};

export default AboutPage;
