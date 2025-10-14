import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  LaptopMac,
  Watch,
  PhotoCamera,
  Headphones,
  SportsEsports,
  Tv,
  TabletMac,
  Print,
  Keyboard,
} from "@mui/icons-material";

const Categories = () => {
  const allCategories = [
    [
      { name: "Phones", icon: <Smartphone fontSize="inherit" /> },
      { name: "Computers", icon: <LaptopMac fontSize="inherit" /> },
      { name: "Smartwatch", icon: <Watch fontSize="inherit" /> },
      { name: "Camera", icon: <PhotoCamera fontSize="inherit" /> },
      { name: "Headphones", icon: <Headphones fontSize="inherit" /> },
      { name: "Gaming", icon: <SportsEsports fontSize="inherit" /> },
    ],
    [
      { name: "TVs", icon: <Tv fontSize="inherit" /> },
      { name: "Tablets", icon: <TabletMac fontSize="inherit" /> },
      { name: "Printers", icon: <Print fontSize="inherit" /> },
      { name: "Keyboards", icon: <Keyboard fontSize="inherit" /> },
      { name: "Cameras", icon: <PhotoCamera fontSize="inherit" /> },
      { name: "Smartwatch", icon: <Watch fontSize="inherit" /> },
    ],
  ];

  const [page, setPage] = useState(0);
  const [active, setActive] = useState(null);
  const [direction, setDirection] = useState(1);

  const nextPage = () => {
    setDirection(1);
    setPage((prev) => (prev + 1) % allCategories.length);
  };

  const prevPage = () => {
    setDirection(-1);
    setPage((prev) => (prev - 1 + allCategories.length) % allCategories.length);
  };

  const cats = allCategories[page];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    }),
  };

  return (
    <section className="relative z-10 my-10 bg-white p-4 rounded-xl shadow-sm">
    
      <div className="relative mb-6">
        <div className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
            <span className="text-[12px] text-red-600 font-medium uppercase tracking-wide">
              Categories
            </span>
          </div>
          <h3 className="text-xl font-bold">Browse by Category</h3>
        </div>

       
        <div className="absolute top-0 right-0 flex items-center gap-2">
          <button
            onClick={prevPage}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white rounded-lg text-gray-700 text-sm transition-all duration-300
              hover:border-red-400 hover:text-red-500 hover:scale-105"
          >
            ◀
          </button>
          <button
            onClick={nextPage}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white rounded-lg text-gray-700 text-sm transition-all duration-300
              hover:border-red-400 hover:text-red-500 hover:scale-105"
          >
            ▶
          </button>
        </div>
      </div>

    
      <div className="w-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 w-full"
          >
            {cats.map((c, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`border-2 rounded-2xl p-6 text-center transition-all duration-300 transform
                  ${
                    active === i
                      ? "bg-red-600 border-red-600 text-white scale-105"
                      : "bg-white border-gray-300 text-gray-700 hover:border-red-400 hover:text-red-500 hover:scale-105"
                  }`}
              >
                <div className="flex items-center justify-center text-5xl sm:text-6xl mb-3">
                  {c.icon}
                </div>
                <p
                  className={`font-medium text-[10px] ${
                    active === i ? "text-white" : "text-gray-700"
                  }`}
                >
                  {c.name}
                </p>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Categories;







