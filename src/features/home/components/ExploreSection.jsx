import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import Product from "../components/Product";

function ExploreSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const isSmall = useMediaQuery("(max-width:600px)");

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

  const productsPerPage = isSmall ? 4 : 8;
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
    <Box my={6} sx={{ background: "#fff", borderRadius: 2, p: 4, boxShadow: 2 }}>
      
      <Box display="flex" alignItems="center" mb={2} gap={1}>
        <Box sx={{ width: 13, height: 20, bgcolor: "error.main",  }} />
        <Typography variant="caption" color="error" fontWeight="bold">
          Today's
        </Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap={isSmall ? "wrap" : "nowrap"}
        gap={2}
        mb={3}
      >
        <Box display="flex" alignItems="center" gap={isSmall ? 1 : 0}>
          <Typography variant="h5" fontWeight="bold">
            Explore Our Products
          </Typography>
          {isSmall && (
            <Box display="flex" alignItems="center" gap={1}>
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
          )}
        </Box>

        {!isSmall && (
          <Box display="flex" alignItems="center" gap={1}>
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
        )}
      </Box>

      {loading ? (
        <Box
          display="grid"
          gridTemplateColumns={isSmall ? "repeat(2, 1fr)" : "repeat(4, 1fr)"}
          gap={3}
        >
          {[...Array(productsPerPage)].map((_, i) => (
            <Box key={i} sx={{ width: "100%", height: 250, bgcolor: "#eee", borderRadius: 2 }} />
          ))}
        </Box>
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
                ? "repeat(auto-fit, minmax(140px, 1fr))"
                : "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
            }}
          >
            {visibleProducts.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.images?.[0] || "/placeholder.png"}
                price={item.price}
                rating={4.5}
                ratingCount={65}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <Box textAlign="center" mt={5}>
        <Button
          variant="contained"
          color="error"
          sx={{ px: 5, py: 1.5, fontSize: "1rem", borderRadius: 2 }}
          onClick={() => (window.location.href = "/products")}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
}

export default ExploreSection;
