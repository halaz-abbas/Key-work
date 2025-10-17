import React, { useEffect, useState } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import Product from "../components/Product";

const BestSelling = () => {
  const isSmall = useMediaQuery("(max-width:600px)");
  const [showAll, setShowAll] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.escuelajs.co/api/v1/products?offset=0&limit=8"
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching best selling products:", err);
      }
    };

    fetchProducts();
  }, []);

  const productsToShow = showAll ? products : products.slice(0, 4);

  return (
    <section
      className="my-10"
      style={{
        paddingLeft: isSmall ? "0px" : "32px",
        paddingRight: isSmall ? "0px" : "32px",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
        gap={2}
        px={isSmall ? 2 : 0}
      >
        <Box>
          <Box display="flex" alignItems="center" mb={0.5} gap={1}>
            <Box
              sx={{
                width: 13,
                height: 20,
                bgcolor: "error.main",
                borderRadius: 0.5,
              }}
            />
            <Typography variant="caption" fontSize={12} color="textSecondary">
              This Month
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight="bold">
            Best Selling Products
          </Typography>
        </Box>

        <Button
          onClick={() => setShowAll((prev) => !prev)}
          sx={{
            backgroundColor: "error.main",
            color: "#fff",
            padding: "8px 20px",
            fontSize: "14px",
            borderRadius: 1,
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          {showAll ? "Show Less" : "View All"}
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
          justifyItems: isSmall ? "center" : "stretch",
        }}
      >
        {productsToShow.map((p) => (
          <Box
            key={p.id}
            sx={{
              width: isSmall ? "auto" : "100%",
              maxWidth: isSmall ? "90%" : "none",
              margin: isSmall ? "0 auto" : "0",
            }}
          >
            <Product
              id={p.id}
              title={p.title}
              image={p.images?.[0] || "/placeholder.png"}
              price={p.price}
              oldPrice={p.price + 40}
              rating={5}
              ratingCount={65}
              discount={Math.floor(Math.random() * 30) + 10}
            />
          </Box>
        ))}
      </Box>
    </section>
  );
};

export default BestSelling;
