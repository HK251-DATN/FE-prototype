import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import loadingSlice from "./slices/loadingSlice";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";

// Tạo Redux store
const store = configureStore({
  reducer: {
    auth: authSlice,
    loading: loadingSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
});

export default store;
