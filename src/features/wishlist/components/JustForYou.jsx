import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const JustForYou = () => {
  const [products, setProducts] = useState([]);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/products?offset=0&limit=4")
      .then((res) => {
        const enriched = res.data.map((item) => ({
          id: item.id,
          title: item.title,
          price: Math.floor(item.price * 0.95),
          oldPrice: item.price,
          image: item.images?.[0],
          rating: 4.5,
          reviews: 45,
          tag: item.id === 3 ? "NEW" : null,
        }));
        setProducts(enriched);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold border-l-4 border-red-500 pl-2">Just For You</h2>
        <button className=" border border-black text-sm  bg-white text-black ">See All</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <div key={item.id} className="border rounded-lg p-3 relative bg-white w-full max-w-sm mx-auto">
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
              -5%
            </span>
            {item.tag === "NEW" && (
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                NEW
              </span>
            )}
            <div className="relative w-full h-32 mb-2 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-36 object-contain  w-full"
              />
           
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${item.id}`);
                }}
                className="absolute top-1 right-1 p-2 bg-white border rounded text-gray-700 hover:bg-gray-100"
                aria-label="View product"
              >
                <VisibilityOutlinedIcon fontSize="small" />
              </button>
            </div>
            <h3 className="text-sm font-semibold truncate">{item.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-red-500 font-bold text-sm">${item.price}</span>
              <span className="line-through text-gray-400 text-xs">${item.oldPrice}</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              ⭐ {item.rating} <span>({item.reviews})</span>
            </div>
        

                        <div className="mt-3">
                
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                             
                              addToCart({ ...item, quantity: 1 });
                            }}
                            className="w-full bg-black text-white py-1.5 rounded text-sm hover:bg-gray-800"
                          >
                            🛒 Add to Cart
                          </button>
                        </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JustForYou;
