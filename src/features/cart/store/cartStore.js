import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  addToCart: (product) =>
    set((state) => {
      const normalized = {
        id: product.id ?? product._id,
        title: product.title ?? product.name,
        price: product.price ?? product.amount ?? 0,
        quantity: product.quantity ?? 1,
        image:
          product.image ||
          (product.images && product.images[0]) ||
          product.thumbnail ||
          "/placeholder.png",
      };

      const updated = [...state.cart, normalized];
      localStorage.setItem("cart", JSON.stringify(updated));
      return { cart: updated };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updated = state.cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return { cart: updated };
    }),

  updateQty: (id, qty) =>
    set((state) => {
      const updated = state.cart.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return { cart: updated };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },
}));
