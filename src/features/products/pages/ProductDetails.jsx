 import { useEffect, useState } from "react";
 import { useParams } from "react-router-dom";
 import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
 import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
 import { useWishlistStore } from "../../wishlist/store/wishlistStore";

 const ProductDetails = () => {
 const { id } = useParams();
 const [product, setProduct] = useState(null);

  useEffect(() => {
        const fetchProduct = async () => {
       try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
         const data = await res.json();
         setProduct(data);
         console.log("Product data:", data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
     };

     fetchProduct();
   }, [id]);
   
   const handleAddToCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("تمت إضافة المنتج إلى السلة!");
};


   if (!product) return <div>Loading...</div>;

   
  return (
     <div className="p-4 max-w-3xl mx-auto">
     {product.images?.length > 0 ? (
       <img
        src={product.images[0]}
         alt={product.title}
         onError={(e) => {
    e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
  }}
         className="w-full h-80 object-cover rounded mb-4"
      />
       ) : (
        <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded mb-4">
    <span className="text-gray-500">لا توجد صورة</span>
  </div>
)}

      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
       <p className="text-red-500 font-bold text-xl mb-2">${product.price}</p>
      <p className="text-gray-700 mb-4">{product.description}</p>
     
      <div className="flex items-center gap-2">
        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2"
        >
          <ShoppingCartIcon />
        </button>

        <button
          onClick={() => {
            const add = useWishlistStore.getState().addToWishlist;
            add({ id: product.id, title: product.title, image: product.images?.[0], price: product.price });
            alert('تمت الإضافة إلى قائمة الرغبات');
          }}
          className="border px-3 py-2 rounded hover:bg-gray-100"
        >
          <FavoriteBorderIcon />
        </button>
      </div>
    </div>
  );
};

 export default ProductDetails;








