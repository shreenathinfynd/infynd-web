import AboutSlideshow from "@/components/about/AboutSlideshow";
import OurUSPSlide from "@/components/about/slides/OurUSPSlide";
import DataProcessSlide from "@/components/about/slides/DataProcessSlide";
import ProductEvolutionSlide from "@/components/about/slides/ProductEvolutionSlide";
import TrustComplianceSlide from "@/components/about/slides/TrustComplianceSlide";
import WhyItMattersSlide from "@/components/about/slides/WhyItMattersSlide";

const AboutPage = () => {
  return (
    <AboutSlideshow>
      <OurUSPSlide />
      <DataProcessSlide />
      <ProductEvolutionSlide />
      <TrustComplianceSlide />
      <WhyItMattersSlide />
    </AboutSlideshow>
  );
};

export default AboutPage;
