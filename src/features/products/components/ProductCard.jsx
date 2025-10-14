import { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.some((item) => item.id === product.id);
  });

  const handleWishlist = (e) => {
    e.preventDefault();
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!isWishlisted) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsWishlisted(true);
    } else {
      const updated = wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setIsWishlisted(false);
    }
  };

  return (
    <Link to={`/products/${product.id}`}>
      <div className="border p-3 rounded-xl shadow hover:shadow-lg transition bg-white  relative">
       
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-40 w-full object-cover rounded mb-2"
          />

        
          <button
            onClick={handleWishlist}
            className="absolute top-1 right-2 p-0 rounded-full bg-white/80 hover:bg-white text-red-500"
          >
            {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </button>

         
          <button className="absolute top-10 right-2 p-0 rounded-full bg-white/80 hover:bg-white text-gray-600">
            <VisibilityIcon />
          </button>
        </div>

      
        <h3 className="text-sm font-semibold line-clamp-2 mb-1 text-gray-800 dark:text-white">
          {product.title}
        </h3>

      
        <div className="flex items-center gap-2 mb-1">
          <span className="text-red-500 font-bold">${product.price}</span>
          <span className="line-through text-gray-400 text-sm">
            ${product.price + 60}
          </span>
        </div>

       
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          {[...Array(5)].map((_, i) =>(
            <StarIcon key={i}  fontSize="small" />
          ))}
          
       
          <span className="text-gray-500">(65)</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
