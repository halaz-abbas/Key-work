import React, { useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";

const StatsSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const stats = [
    {
      icon: <HomeIcon fontSize="large" />,
      value: "10.5k",
      label: "Sallers active our site",
    },
    {
      icon: <AttachMoneyIcon fontSize="large" />,
      value: "33k",
      label: "Monthly Product Sale",
    },
    {
      icon: <PersonIcon fontSize="large" />,
      value: "45.5k",
      label: "Customer active in our site",
    },
    {
      icon: <WorkOutlineIcon fontSize="large" />,
      value: "25k",
      label: "Annual gross sale in our site",
    },
  ];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 my-12">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          onClick={() => handleClick(idx)}
          className={`cursor-pointer flex flex-col items-center p-6 border rounded-lg w-44 transition-colors duration-300 shadow-md ${
            activeIndex === idx
              ? "bg-red-500 text-white"
              : "bg-white text-black"
          }`}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#E8DCC0] mb-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white">
              {stat.icon}
            </div>
          </div>

          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-center text-sm mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
