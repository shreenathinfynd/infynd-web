import AboutSlideshow from "@/components/about/AboutSlideshow";
import HeroSlide from "@/components/about/slides/HeroSlide";
import OurUSPSlide from "@/components/about/slides/OurUSPSlide";
import DataProcessSlide from "@/components/about/slides/DataProcessSlide";
import ProductEvolutionSlide from "@/components/about/slides/ProductEvolutionSlide";
import TrustComplianceSlide from "@/components/about/slides/TrustComplianceSlide";
import WhyItMattersSlide from "@/components/about/slides/WhyItMattersSlide";

const AboutPage = () => {
  return (
    <AboutSlideshow>
      <HeroSlide />
      <OurUSPSlide />
      <DataProcessSlide />
      <ProductEvolutionSlide />
      <TrustComplianceSlide />
      <WhyItMattersSlide />
    </AboutSlideshow>
  );
};

export default AboutPage;
