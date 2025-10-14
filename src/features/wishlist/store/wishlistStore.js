import { create } from "zustand";

const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");

export const useWishlistStore = create((set, get) => ({
  wishlist: stored,

  addToWishlist: (item) =>
    set((state) => {
   
      const exists = (state.wishlist || []).some((p) => String(p.id) === String(item.id));
      if (exists) {
        return state; 
      }
      const updated = [...(state.wishlist || []), item];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return { wishlist: updated };
    }),

  removeFromWishlist: (id) =>
    set((state) => {
      const updated = (state.wishlist || []).filter((i) => String(i.id) !== String(id));
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return { wishlist: updated };
    }),

  clearWishlist: () => {
    localStorage.removeItem("wishlist");
    set({ wishlist: [] });
  },
}));

export default useWishlistStore;