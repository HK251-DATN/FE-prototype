import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Thêm sản phẩm vào yêu thích
    addToWishlist: (state, action) => {
      const { id, name, currentPrice, salePrice, image, rating, discount } =
        action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (!existingItem) {
        state.items.push({
          id,
          name,
          price: salePrice || currentPrice,
          image,
          rating,
          discount,
          addedAt: new Date().toISOString(),
        });
      }
    },

    // Xóa sản phẩm khỏi yêu thích
    removeFromWishlist: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    // Kiểm tra sản phẩm có trong wishlist không
    toggleWishlist: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        state.items.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.salePrice || action.payload.currentPrice,
          image: action.payload.image,
          rating: action.payload.rating,
          discount: action.payload.discount,
          addedAt: new Date().toISOString(),
        });
      }
    },

    // Xóa toàn bộ wishlist
    clearWishlist: (state) => {
      state.items = [];
    },

    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  setLoading,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsInWishlist = (state, productId) =>
  state.wishlist.items.some((item) => item.id === productId);

export default wishlistSlice.reducer;
