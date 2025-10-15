
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import Product from "../components/Product";

function FlashSales() {
  const endTimeRef = useRef(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState(endTimeRef.current - Date.now());
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isSmall = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(endTimeRef.current - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productsPerPage = isSmall ? 1 : 5;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIdx = page * productsPerPage;
  const visibleProducts = products.slice(startIdx, startIdx + productsPerPage);

  const nextPage = () => {
    setDirection(1);
    setPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setDirection(-1);
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const days = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
  const hours = Math.max(
    0,
    Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const minutes = Math.max(
    0,
    Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  );
  const seconds = Math.max(0, Math.floor((timeLeft % (1000 * 60)) / 1000));

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
    <Box
      my={6}
      sx={{ background: "#fff", borderRadius: 2, p: 4, boxShadow: 2 }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" mb={1}>
        <Box
          sx={{
            width: 10,
            height: 10,
            bgcolor: "error.main",
            borderRadius: 1,
            mr: 1,
          }}
        />
        <Typography variant="caption" color="error" fontWeight="bold">
          Today's
        </Typography>
      </Box>

      {/* Title + Countdown + Arrows */}
      <Box
        display="flex"
        flexDirection={isSmall ? "column" : "row"}
        alignItems={isSmall ? "flex-start" : "center"}
        justifyContent="space-between"
        gap={2}
        mb={4}
      >
        <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
          <Typography variant="h5" fontWeight="bold" color="black">
            Flash Sales
          </Typography>

          <Box display="flex" alignItems="center" gap={2}>
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: minutes },
              { label: "Seconds", value: seconds },
            ].map((item, index, arr) => (
              <React.Fragment key={item.label}>
                <Box textAlign="center">
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight="medium"
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="black">
                    {item.value.toString().padStart(2, "0")}
                  </Typography>
                </Box>
                {index < arr.length - 1 && (
                  <Typography variant="h4" fontWeight="bold" color="black">
                    :
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>

        {/* Arrows */}
        <Box display="flex" alignItems="center" gap={1} mt={isSmall ? 2 : 0}>
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
        </Box>
      </Box>

      {/* Products Section */}
      <Box position="relative" minHeight={250} mb={6}>
        {loading ? (
          <Typography>Loading products...</Typography>
        ) : (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                display: "grid",
                gridTemplateColumns: isSmall
                  ? "repeat(1, 1fr)"
                  : "repeat(5, 1fr)",
                padding: "0 16px",
                gap: "40px",
                position: "relative",
                width: "100%",
              }}
            >
              {visibleProducts.map((item) => (
                <Product
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.images?.[0] || "/placeholder.png"}
                  price={item.price}
                  oldPrice={item.price + 40}
                  rating={5}
                  ratingCount={65}
                  discount={Math.floor(Math.random() * 30) + 10}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </Box>

      {/* View All Button */}
      <Box textAlign="center" mt={10}>
        <Button
          variant="contained"
          color="error"
          href="/products"
          sx={{
            px: 5,
            py: 1.5,
            fontSize: "1rem",
            boxShadow: 3,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
}

export default FlashSales;
