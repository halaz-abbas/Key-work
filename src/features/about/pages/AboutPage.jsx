import OurStorySection from "../components/OurStory";
import StatsSection from "../components/StatsSection";
import TeamSection from "../components/TeamSection";
import Icons from "../components/Icons";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 pt-10">
      <OurStorySection />
      <StatsSection />
      <TeamSection />
      <Icons />
    </div>
  );
};

export default AboutPage;
