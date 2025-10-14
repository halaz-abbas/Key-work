import React from "react";
import WishlistSection from "../components/WishListSection";
import JustForYou from "../components/JustForYou";

const WishList = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8 flex flex-col gap-12">
      <WishlistSection />
      <JustForYou />
    </div>
  );
};

export default WishList;
