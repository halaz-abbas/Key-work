import OurStorySection from "../components/OurStory";
import StatsSection from "../components/StatsSection";
import TeamSection from "../components/TeamSection";
import Icons from "../components/Icons";

const AboutPage = () => {
  return (
    <div className=" mx-auto  pt-8">
      <OurStorySection />
      <StatsSection />
      <TeamSection />
      <Icons />
    </div>
  );
};

export default AboutPage;
