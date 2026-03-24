import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedCoupon: null,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: (state, action) => {
      const {
        id,
        name,
        currentPrice,
        salePrice,
        image,
        quantity = 1,
      } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          name,
          price: salePrice || currentPrice,
          image,
          quantity,
        });
      }
    },

    // Cập nhật số lượng sản phẩm
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (quantity < 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    // Áp dụng mã giảm giá
    applyCoupon: (state, action) => {
      state.selectedCoupon = action.payload;
    },

    // Xóa mã giảm giá
    removeCoupon: (state) => {
      state.selectedCoupon = null;
    },

    // Xóa toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = [];
      state.selectedCoupon = null;
    },

    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  applyCoupon,
  removeCoupon,
  clearCart,
  setLoading,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.length;
export const selectCartTotal = (state) => {
  const subtotal = state.cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = state.cart.selectedCoupon?.discount || 0;
  return {
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount),
  };
};
export const selectSelectedCoupon = (state) => state.cart.selectedCoupon;

export default cartSlice.reducer;
