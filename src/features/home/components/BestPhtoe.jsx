import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

export default function BestPhtoe({
  imageSrc,
  title,
  circles = [
    { number: "1", label: "واحد" },
    { number: "2", label: "اثنان" },
    { number: "3", label: "ثلاثة" },
    { number: "4", label: "أربعة" },
  ],
  buttonText = "buy now",
  onButtonClick = () => {},
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="bg-black text-white shadow-2xl p-4 sm:p-8 md:p-12 flex flex-col md:flex-row-reverse items-center gap-4 sm:gap-6 md:gap-12"
        dir="ltr"
      >
        <motion.div
          className="w-full md:w-1/2 flex-shrink-0 overflow-hidden flex items-center justify-center relative"
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.05,
            rotate: 1,
            transition: { duration: 0.3 },
          }}
        >
          <motion.img
            src={
              imageSrc ||
              "../../../assets/imges/JBL_BOOMBOX_2_HERO_020_x1 (1) 1 (3).png"
            }
            alt="card"
            className="w-full h-auto md:h-70 lg:h-92 object-cover rounded-lg shadow-lg"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>

        <div className="flex-1 w-full flex flex-col justify-between mt-4 md:mt-0">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-left mb-3 sm:mb-5 md:mb-7"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {title}
          </motion.h2>

          <div className="flex flex-col items-start gap-2 sm:gap-3 md:gap-4">
            <span className="text-green-400 text-base sm:text-lg block text-left">
              catagories
            </span>

            <div className="mb-3 sm:mb-4 md:mb-5 text-left">
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
                Enhance your
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
                Music Experience
              </span>
            </div>

            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mb-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.3,
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {[
                { num: 21, label: "Second" },
                { num: 22, label: "Day" },
                { num: 60, label: "Moment" },
                { num: 24, label: "Hour" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex flex-col items-center justify-center shadow-lg border-2 border-green-600"
                  variants={{
                    hidden: { opacity: 0, scale: 0.5, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-black font-extrabold text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] leading-none text-center truncate w-full">
                    {item.num}
                  </span>
                  <span className="text-black font-semibold text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] leading-none text-center truncate w-full mt-1">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <Button
              variant="contained"
              onClick={onButtonClick}
              sx={{
                backgroundColor: "#16a34a",
                "&:hover": { backgroundColor: "#15803d" },
                px: 4,
                py: 2,
                textTransform: "none",
                boxShadow: "0 4px 24px 0 rgba(22,163,74,0.18)",
                width: "100%",
                maxWidth: 200,
                fontWeight: "bold",
                fontSize: 17,
                letterSpacing: 1,
              }}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

BestPhtoe.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string,
  circles: PropTypes.arrayOf(
    PropTypes.shape({ number: PropTypes.string, label: PropTypes.string })
  ),
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};
