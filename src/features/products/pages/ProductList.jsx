import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "../../home/components/Product"
import { useCartStore } from "../../cart/store/cartStore";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
  const productWithQty = { ...product, quantity: 1 };
  addToCart(productWithQty);
};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();
        const filtered = category
          ? data.filter((item) =>
              item.category.name.toLowerCase().includes(category.toLowerCase())
            )
          : data;

        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="p-4  max-w-[1440px] mx-auto bg-[#F5F5F5] dark:bg-gray-95">
     
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       
        {products.slice(0, visibleCount).map((product) => (
   <Product
     key={product.id}
     id={product.id}
     title={product.title}
     image={product.images?.[0] || "/placeholder.png"}
     price={product.price}
     oldPrice={product.price + 60}        
    rating={4}                           
     ratingCount={65}                   
   />
 ))}
      </div>
      {visibleCount < products.length && (
  <div className="text-center mt-6">
    <button
      onClick={() => setVisibleCount((prev) => prev + 10)}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      show more
    </button>
  </div>
)}
    </div>
  );
};

export default ProductList;
