import React from "react";
import { useWishlistStore } from "../store/wishlistStore";
import { useCartStore } from "../../cart/store/cartStore";
import toast from "react-hot-toast";

function WishListSection() {
  const items = useWishlistStore((s) => s.wishlist || []);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);
  const addToCart = useCartStore((s) => s.addToCart);

  const handleRemove = (id) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      title: item.title || item.name,
      image: item.image || item.images?.[0] || "/placeholder.png",
      price: item.price || 0,
    });

    removeFromWishlist(item.id);
    toast.success("Added to cart");
  };

  const handleMoveAll = () => {
    if (!items.length) {
      toast("Wishlist is empty");
      return;
    }
    items.forEach((item) => {
      addToCart({
        id: item.id,
        title: item.title || item.name,
        image: item.image || item.images?.[0] || "/placeholder.png",
        price: item.price || 0,
      });
    });

    clearWishlist();
    toast.success("Moved all items to cart");
  };

  return (
    <section className="flex flex-col gap-6 max-w-[1440px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Wishlist ({items.length})</h2>
        <button
          className="border border-black px-4 py-2 text-black bg-white text-sm hover:border-red-500 hover:text-red-500 rounded"
          onClick={handleMoveAll}
        >
          Move All To Bag
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-3 relative bg-white shadow-sm"
          >
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
              -5%
            </span>

            <button
              className="absolute top-2 right-2 bg-white text-gray-500 hover:text-red-500 rounded-full p-2 shadow"
              onClick={() => handleRemove(item.id)}
            >
              🗑️
            </button>

            <img
              src={item.image || item.images?.[0] || "/placeholder.png"}
              alt={item.title}
              className="w-full h-32 object-contain mb-2"
              onError={(e) => (e.target.src = "/placeholder.png")}
            />
            <h3 className="text-sm font-semibold truncate">{item.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-red-500 font-bold text-sm">
                ${item.price}
              </span>
              {item.oldPrice && (
                <span className="line-through text-gray-400 text-xs">
                  ${item.oldPrice}
                </span>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleAddToCart(item)}
                className="flex-1 bg-black text-white py-2 rounded text-sm hover:bg-gray-800"
              >
                🛒Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WishListSection;
