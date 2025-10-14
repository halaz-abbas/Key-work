import { create } from "zustand";

const useStore = create((set) => ({
  cart: [],
  wishlist: [],
  quantity: 1,
  product: {
    id: 1,
    name: "Havic HV G-92 Gamepad",
    price: 192,
    oldPrice: 250,
    stock: true,
    rating: 4,
    reviews: 150,
    description:
      "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive so you can bubble-free install & mess free removal.",
    colors: ["white", "black", "red"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://i.ibb.co/3CSKqMP/ps5.png",
      "https://i.ibb.co/L6rX9wH/woman.png",
      "https://i.ibb.co/2jM1W7w/speakers.png",
      "https://i.ibb.co/1QF1c3F/perfume.png",
    ],
  },

  setQuantity: (value) =>
    set((state) => ({ quantity: Math.max(1, state.quantity + value) })),

  resetQuantity: () => set({ quantity: 1 }),

  addToCart: () =>
    set((state) => ({
      cart: [
        ...state.cart,
        { product: state.product, quantity: state.quantity },
      ],
    })),

  addToWishlist: () =>
    set((state) => ({
      wishlist: [...state.wishlist, state.product],
    })),
}));

export default useStore;
