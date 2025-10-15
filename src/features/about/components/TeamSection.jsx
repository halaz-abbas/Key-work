import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const team = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    img: "/src/assets/image 46.png",
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    img: "/src/assets/image 51.png",
  },
  { name: "Will Smith", role: "Product Designer", img: "/src/assets/image 47.png" },
];

const TeamSection = () => {
  return (
    <section className="my-12 px-4 sm:px-6 lg:px-10 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-8xl w-full justify-items-center">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="rounded-2xl shadow-md bg-white hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col w-full sm:w-80"
          >
            <div className="w-full aspect-square flex items-center justify-center bg-gray-100 flex-none">
              <img
                src={member.img}
                alt={member.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="p-5 flex flex-col">
              <h3 className="font-semibold text-lg md:text-xl text-left">
                {member.name}
              </h3>
              <p className="text-gray-500 mb-4 text-left text-sm md:text-base">
                {member.role}
              </p>

              <div className="flex gap-4 text-gray-700 text-lg md:text-xl">
                <FaTwitter className="cursor-pointer hover:text-blue-400 transition-colors" />
                <FaInstagram className="cursor-pointer hover:text-pink-500 transition-colors" />
                <FaLinkedin className="cursor-pointer hover:text-blue-600 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
