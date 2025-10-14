import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import heroImage from "../../../assets/hero.png";
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

const SidebarCategories = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = (category) => {
    searchParams.set("category", category);
    setSearchParams(searchParams);
  };

  return (
    <aside className="hidden lg:flex flex-col justify-between h-full w-full bg-white border border-gray-100 shadow-sm p-9">
      <ul className="flex flex-col justify-between h-full font-poppins text-sm text-gray-20">
        {categories.map((cat, idx) => (
          <li
            key={idx}
            onClick={() => handleFilter(cat)}
            className="hover:text-black cursor-pointer transition flex items-center justify-between py-1"
          >
            <span>{cat}</span>
            {idx < 2 && <ChevronRight className="w-5 h-5 text-gray-500" />}
          </li>
        ))}
      </ul>
    </aside>
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
    return () => {
      // keep style for performance; optionally remove on unmount
    };
  }, []);
  const slides = [
    {
      img: heroImage,
      title: "Up to 10% Off Voucher",
      subtitle: "iPhone 14 Series",
      text: "Gaming & Tech Deals",
    },
    {
      img: "src/assets/547953_9C2ST_8746_001_082_0000_Light-Gucci-Savoy-medium-duffle-bag 1.png",
      title: "Beauty & new style",
      subtitle: "elegent details",
      text: "Save Big Now",
    },
  ];

  return (
    <section className="relative overflow-hidden shadow-md">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative bg-black flex flex-col lg:flex-row items-center justify-between gap-2 h-64 md:h-80 lg:h-[500px] p-0">
              {/* النصوص */}
              <div className="flex-1 text-center lg:text-left space-y-3 z-10 pl-6 lg:pl-12 h-full">
                <div className="flex items-center justify-center lg:justify-start mb-2 m-4 p-4 lg:p-10">
                  <span className="text-sm font-poppins text-gray-200">
                    {slide.subtitle}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-white leading-tight">
                  {slide.title}
                </h1>

                <p className="text-md sm:text-lg font-poppins text-gray-300">
                  {slide.text}
                </p>

                <div className="flex flex-col items-center lg:items-start space-y-3">
                  <a
                    href="/products"
                    className="inline-block text-white font-semibold px-6 py-3 bg-transparent transition-all font-poppins hover:opacity-90"
                  >
                    Shop Now
                  </a>
                </div>
              </div>

              {/* الصورة */}
              <div className="flex-1 flex justify-center items-end h-full relative overflow-hidden">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="object-contain w-full h-full max-h-[500px] transition-transform duration-1000 ease-in-out transform hover:scale-105 animate-slideUp"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

// أنميشن الصورة
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
  return (
    <div
      className="bg-gray-50 px-3 sm:px-5 lg:px-9 mt-0 mb-10 ml-20 maxWidth-100%"
      style={{
        width: "calc(100% - 110px)",
        height: "calc(100% - 50px)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[220px,1fr] gap-6 items-stretch">
        <SidebarCategories />
        <HeroBanner />
      </div>

      <div className="lg:hidden mt-6">
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm font-poppins text-gray-800">
          {categories.map((cat, idx) => (
            <li
              key={idx}
              className="bg-white shadow-sm py-3 text-center cursor-pointer hover:bg-gray-100 transition"
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeroSectionWithSidebar;
