import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Rating,
  Card,
  CardMedia,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import RelatedItem from "../components/RelatedItem";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#000");
  const [selectedSize, setSelectedSize] = useState("M");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        const data = await res.json();
        setProduct({
          name: data.title,

          images: data.images?.filter(
            (img) => typeof img === "string" && img.startsWith("http")
          ) || ["/placeholder.png"],

          colors: ["#000", "#fff", "#e54819"],
          sizes: ["S", "M", "L"],
          price: data.price,
          description: data.description,
          rating: 4.5,
          reviews: 65,
          stock: true,
        });
        setMainImage(data.images?.[0] || "/placeholder.png");
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography sx={{ p: 4 }}>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        gap: 3,
        paddingY: 4,
        marginX: "auto",
        maxWidth: "1200px",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 500,
          gap: 3,
        }}
      >
        {product.images.map((img, i) => (
          <Card
            key={i}
            onClick={() => setMainImage(img)}
            sx={{
              width: 90,
              height: 90,
              border:
                img === mainImage ? "2px solid #e54819" : "1px solid #ddd",
              borderRadius: 2,
              cursor: "pointer",
              overflow: "hidden",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardMedia
              component="img"
              image={img}
              alt={`thumb-${i}`}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Card>
        ))}
      </Box>

      <Card
        sx={{
          width: 420,
          height: 500,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <CardMedia
          component="img"
          image={mainImage}
          alt="Main Product"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            backgroundColor: "#fafafa",
          }}
        />
      </Card>

      <Box
        sx={{
          width: 320,
          minHeight: 500,
          height: "auto",
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: "1rem", color: "#333" }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={product.rating} readOnly size="small" />
            <Typography sx={{ color: "#444", fontSize: "0.75rem" }}>
              ({product.reviews} Reviews)
            </Typography>
            <Typography sx={{ color: "green", fontSize: "0.75rem" }}>
              {product.stock ? "In Stock" : "Out of Stock"}
            </Typography>
          </Box>

          <Typography
            variant="subtitle1"
            sx={{ textAlign: "left", color: "#333", fontSize: "0.95rem" }}
          >
            ${product.price}.00
          </Typography>

          <Box sx={{ borderBottom: "1px solid #000", my: 1 }} />

          <Typography sx={{ color: "#444", fontSize: "0.8rem", mb: 1 }}>
            {product.description}
          </Typography>

          {/* الألوان */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "0.8rem", color: "#333" }}
            >
              Colours:
            </Typography>
            <Box sx={{ display: "flex", gap: 0.6 }}>
              {product.colors.map((color) => (
                <Box
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    bgcolor: color,
                    border:
                      selectedColor === color
                        ? "2px solid #cf3535"
                        : "1px solid #ccc",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "0.75rem", color: "#333" }}
            >
              Size:
            </Typography>
            <Box sx={{ display: "flex", gap: 0.2, flex: 1 }}>
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "contained" : "outlined"}
                  onClick={() => setSelectedSize(size)}
                  sx={{
                    flex: 1,
                    borderRadius: "4px",
                    textTransform: "none",
                    fontSize: "0.65rem",
                    padding: "2px 4px",
                    backgroundColor:
                      selectedSize === size ? "#e54819" : "transparent",
                    color: selectedSize === size ? "white" : "inherit",
                  }}
                >
                  {size}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              px: 1,
              gap: 1,
              flex: 1,
            }}
          >
            <IconButton
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity <= 1}
              sx={{
                color: quantity <= 1 ? "inherit" : "#e54819",
                padding: "4px",
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ fontSize: "0.8rem" }}>{quantity}</Typography>
            <IconButton
              onClick={() => setQuantity(quantity + 1)}
              sx={{ color: "#e54819", padding: "4px" }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            color="error"
            onClick={() => console.log("Add to cart:", product.name, quantity)}
            sx={{
              borderRadius: "6px",
              textTransform: "none",
              flex: 1,
              fontSize: "0.85rem",
              padding: "6px 0",
            }}
          >
            Buy Now
          </Button>
          <IconButton
            onClick={() => console.log("Add to wishlist:", product.name)}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "4px",
            }}
          >
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              p: 1.5,
            }}
          >
            <LocalShippingIcon sx={{ fontSize: 20, mr: 1 }} />
            <Box>
              <Typography
                fontWeight="bold"
                sx={{ fontSize: "0.8rem", color: "#333" }}
              >
                Free Delivery
              </Typography>
              <Typography
                variant="body2"
                color="gray"
                sx={{ fontSize: "0.7rem" }}
              >
                Enter your postal code for Delivery Availability
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              p: 1.5,
            }}
          >
            <SyncAltIcon sx={{ fontSize: 20, mr: 1 }} />
            <Box>
              <Typography
                fontWeight="bold"
                sx={{ fontSize: "0.8rem", color: "#333" }}
              >
                Return Delivery
              </Typography>
              <Typography
                variant="body2"
                color="gray"
                sx={{ fontSize: "0.7rem" }}
              >
                Free 30 Days Delivery Returns.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <RelatedItem />
    </Box>
  );
}
