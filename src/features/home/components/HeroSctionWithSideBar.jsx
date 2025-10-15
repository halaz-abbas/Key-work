
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronRight, Menu } from "lucide-react";
import heroImage from "../../../assets/hero.png";
import imgz from "../../../assets/547953_9C2ST_8746_001_082_0000_Light-Gucci-Savoy-medium-duffle-bag 1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const categories = [
  "Women's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

const SidebarCategories = ({ isOpen, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = (category) => {
    searchParams.set("category", category);
    setSearchParams(searchParams);
    if (onClose) onClose();
  };

  return (
    <>
      {/* قائمة الجانبية لسطح المكتب */}
      <aside className="hidden lg:flex flex-col justify-between h-full w-full bg-white border border-gray-100 shadow-sm p-6 xl:p-9 pt-0 xl:pt-0">
        <ul className="flex flex-col justify-between h-full font-poppins text-sm text-gray-20">
          {categories.map((cat, idx) => (
            <li
              key={idx}
              onClick={() => handleFilter(cat)}
              className="hover:text-black cursor-pointer transition flex items-center justify-between py-2"
            >
              <span className="truncate">{cat}</span>
              {idx < 2 && <ChevronRight className="w-4 h-4 text-gray-500" />}
            </li>
          ))}
        </ul>
      </aside>

      {/* قائمة الجوال */}
      <div
        onClick={onClose}
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-xl z-50 transform transition-all duration-500 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-center p-4 border-b pt-0">
          <h2 className="text-lg font-semibold font-poppins text-gray-800">
            Categories
          </h2>
        </div>

        <ul
          className="flex flex-col p-4 pt-0 gap-3 font-poppins text-sm text-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {categories.map((cat, idx) => (
            <li
              key={idx}
              onClick={() => handleFilter(cat)}
              className="py-2 border-b hover:text-black cursor-pointer transition"
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const HeroBanner = () => {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("hero-slideup-style")) return;
    const style = document.createElement("style");
    style.id = "hero-slideup-style";
    style.innerHTML = `
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slideUp {
      animation: slideUp 1s ease-out;
    }
    `;
    document.head.appendChild(style);
  }, []);

  const slides = [
    {
      img: heroImage,
      title: "Up to 10% Off Voucher",
      subtitle: "iPhone 14 Series",
      text: "Gaming & Tech Deals",
    },
    {
      img: imgz,
      title: "Beauty & new style",
      subtitle: "elegent details",
      text: "Save Big Now",
    },
  ];

  return (
    <section className="relative overflow-hidden shadow-md rounded-2xl w-full pt-0">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative bg-black flex flex-col lg:flex-row items-center justify-between gap-4 h-[360px] sm:h-[430px] md:h-[480px] lg:h-[500px] pt-0 px-2 sm:px-6 md:px-8 pb-2">
              <div className="flex-1 text-center lg:text-left space-y-3 z-10 h-full flex flex-col justify-center items-center lg:items-start">
                <div className="mb-1">
                  <span className="text-sm sm:text-base font-poppins text-gray-200">
                    {slide.subtitle}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold font-poppins text-white leading-tight px-3">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl font-poppins text-gray-300 px-3">
                  {slide.text}
                </p>

                <div className="mt-3">
                  <a
                    href="/products"
                    className="inline-block text-white text-sm sm:text-base font-semibold px-6 py-3 bg-transparent border border-white rounded-full transition-all font-poppins hover:bg-white hover:text-black"
                  >
                    Shop Now
                  </a>
                </div>
              </div>

              <div className="flex-1 flex justify-center items-center h-full relative overflow-hidden">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="object-contain w-[95%] sm:w-[85%] md:w-[75%] lg:w-[80%] h-auto max-h-[440px] transition-transform duration-1000 ease-in-out transform hover:scale-110 animate-slideUp"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const style = document.createElement("style");
style.innerHTML = `
@keyframes slideUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slideUp {
  animation: slideUp 1s ease-out;
}
`;
document.head.appendChild(style);

const HeroSectionWithSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className="bg-gray-50 px-3 sm:px-5 lg:px-9 mt-0 mb-10 w-full relative pt-0"
      style={{
        width: "100%",
        height: "auto",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-6 items-stretch pt-0">
        <SidebarCategories
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <HeroBanner />
      </div>

      <div className="lg:hidden flex justify-center mt-3 pt-0">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 px-5 py-4 bg-white shadow-sm rounded-xl border border-gray-200 hover:bg-gray-100 transition"
        >
          <Menu className="w-5 h-4 text-gray-700" />
          <span className="text-sm font-poppins">Categories</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSectionWithSidebar;
