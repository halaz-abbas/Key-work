import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../../wishlist/store/wishlistStore";

const CartItem = ({ item }) => {
  const { updateQty, removeFromCart } = useCartStore();
  const { addToWishlist } = useWishlistStore();

  const imgSrc =
    item?.image ||
    item?.images?.[0] ||
    item?.thumbnail ||
    item?.images?.[0]?.url ||
    "https://via.placeholder.com/64x64?text=No+Image";

  return (
    <tr className="border-b">
      <td className="py-4 flex items-center gap-4">
        <img
          src={imgSrc}
          alt={item?.title || "No title"}
          className="w-16 h-16 object-cover rounded"
        />
        <span>{item?.title}</span>
      </td>

      <td className="py-4">${item?.price}</td>

      <td className="py-4">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={item?.quantity || 1}
            onChange={(e) => updateQty(item.id, parseInt(e.target.value || 1))}
            className="w-12 border rounded px-2 py-1 text-center"
            style={{
              backgroundColor: "white",
              color: "#333",
              border: "1px solid #ccc",
              fontWeight: "bold",
            }}
          />
        </div>
      </td>

      <td className="py-4">
        ${(item?.price * (item?.quantity || 1)).toFixed(2)}
      </td>

      <td className="py-4">
        <div className="flex items-center gap-2 bg-white">
          <button
            className="text-black-500 border px-2 py-1 rounded bg-white "
            onClick={() => removeFromCart(item.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
