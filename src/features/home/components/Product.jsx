import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StarIcon from "@mui/icons-material/Star";

import { useCartStore } from "../../cart/store/cartStore";
import { useWishlistStore } from "../../wishlist/store/wishlistStore";
import toast from "react-hot-toast";

function Product({
  id,
  title = "اسم المنتج",
  image = "/gamepad.png",
  price = 0,
  oldPrice = null,
  rating = 0,
  ratingCount = 0,
  discount = null,
}) {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  const addToCart = useCartStore((s) => s.addToCart);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const inWishlist = useWishlistStore((s) =>
    (s.wishlist || []).some((p) => String(p.id) === String(id))
  );
  const addToWishlist = useWishlistStore((s) => s.addToWishlist);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);

  const payload = {
    id: id ?? null,
    title: title ?? "",

    image:
      typeof image === "string" && image
        ? image
        : Array.isArray(image) && image.length
        ? image[0]
        : "/placeholder.png",
    price: price ?? 0,
  };

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();
    addToCart(payload);
    toast.success("Added to cart");
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(payload);
      toast.success("Added to wishlist");
    }
  };

  const handleView = (e) => {
    if (e) e.stopPropagation();
    navigate(`/product/${id}`);
  };

  return (
    <>
      <Card
        onClick={() => navigate(`/product/${id}`)}
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        sx={{
          width: 220,
          borderRadius: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          position: "relative",
          overflow: "visible",
          cursor: "pointer",
          transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        {discount && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              backgroundColor: "error.main",
              color: "#fff",
              fontSize: 12,
              fontWeight: "bold",
              px: 1,
              py: 0.3,
              borderRadius: 1,
            }}
          >
            -{discount}%
          </Box>
        )}

        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            zIndex: 2,
          }}
        >
          <IconButton
            size="small"
            onClick={handleLike}
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
              color: inWishlist ? "error.main" : "inherit",
            }}
          >
            {inWishlist ? (
              <FavoriteIcon fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>

          <IconButton
            size="small"
            onClick={handleView}
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>

        <CardMedia
          component="img"
          image={
            typeof payload.image === "string" &&
            payload.image.startsWith("http")
              ? payload.image
              : payload.image || "/placeholder.png"
          }
          alt={title}
          onError={(e) => (e.target.src = "/placeholder.png")}
          sx={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />

        <CardContent sx={{ pt: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography color="error" sx={{ fontWeight: 600 }}>
              ${price}
            </Typography>
            {oldPrice && (
              <Typography
                sx={{
                  color: "text.secondary",
                  textDecoration: "line-through",
                  fontSize: 14,
                }}
              >
                ${oldPrice}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                fontSize="small"
                sx={{ color: i < Math.round(rating) ? "gold" : "lightgray" }}
              />
            ))}
            <Typography
              variant="body2"
              sx={{ ml: 0.5, color: "text.secondary" }}
            >
              ({ratingCount})
            </Typography>
          </Box>
        </CardContent>

        {showButton && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
              zIndex: 1,
            }}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "5px 10px",
                fontSize: "12px",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              Add to Cart
            </IconButton>
          </Box>
        )}
      </Card>
    </>
  );
}

export default Product;
