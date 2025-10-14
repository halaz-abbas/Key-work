import HeroSectionWithSidebar from "../components/HeroSctionWithSideBar";

import BestSelling from "../components/BeastSelling";
import Categories from "../components/Categories";
import FlashSales from "../components/FlashSales";
import NewArrival from "../components/NewArrival";
import BestPhtoe from "../components/BestPhtoe";
import ExploreSection from "../components/ExploreSection";
const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-8 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSectionWithSidebar />

        <FlashSales />
        <Categories />
        <BestSelling />
        <BestPhtoe />
        <ExploreSection />
        <NewArrival />
      </div>
    </>
  );
};

export default Home;
