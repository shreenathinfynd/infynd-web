import AboutSlideshow from "@/components/about/AboutSlideshow";
import HeroSlide from "@/components/about/slides/HeroSlide";
import OurUSPSlide from "@/components/about/slides/OurUSPSlide";
import CompanyOverviewSlide from "@/components/about/slides/CompanyOverviewSlide";
import OriginStorySlide from "@/components/about/slides/OriginStorySlide";
import DataProcessSlide1 from "@/components/about/slides/DataProcessSlide1";
import DataProcessSlide2 from "@/components/about/slides/DataProcessSlide2";
import ProductEvolutionSlide from "@/components/about/slides/ProductEvolutionSlide";
import TrustComplianceSlide from "@/components/about/slides/TrustComplianceSlide";
import WhyItMattersSlide from "@/components/about/slides/WhyItMattersSlide";

const AboutPage = () => {
  return (
    <AboutSlideshow>
      <HeroSlide />
      <OurUSPSlide />
      <CompanyOverviewSlide />
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
