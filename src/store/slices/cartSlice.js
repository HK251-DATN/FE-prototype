import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartApi } from "@/api/ecommerceApi";

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
    // Reducer mới để xử lý việc tích chọn UI cục bộ
    toggleItemSelection: (state, action) => {
      const { cartItemId, isSelected } = action.payload;
      const item = state.items.find((item) => item.cartItemId === cartItemId);
      if (item) {
        item.isSelected = isSelected;
      }
    },
    // Chọn hoặc bỏ chọn tất cả
    toggleAllSelection: (state, action) => {
      const isSelected = action.payload;
      state.items.forEach((item) => {
        item.isSelected = isSelected;
      });
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  toggleItemSelection,
  toggleAllSelection,
  applyCoupon,
  removeCoupon,
  clearCart,
  setLoading,
} = cartSlice.actions;

// Thêm vào async thunk
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.getCart();
      // Map backend response sang Redux format
      const items = response.detail.map((item) => ({
        cartItemId: item.cartItemId, // ← Lưu để call API update/delete
        id: item.batchDetailId,
        name: item.productName,
        price: item.unitPrice,
        quantity: item.quantity,
        isSelected: item.isSelected,
        image:
          item.imgUrl ||
          "https://placehold.co/150x150/f0fdf4/22c55e?text=Image",
        unit: item.unit || "trái",
        unitQuantity: item.unitQuantity || 1,
      }));
      return { items };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ batchDetailId, quantity }, { rejectWithValue }) => {
    try {
      await cartApi.addToCart(batchDetailId, quantity, true);
      return { batchDetailId, quantity };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const toggleSelectionAsync = createAsyncThunk(
  "cart/toggleSelection",
  async (
    { cartItemId, isSelected },
    { dispatch, rejectWithValue },
  ) => {
    // 1. Cập nhật UI ngay lập tức cho người dùng thấy mượt (Optimistic Update)
    dispatch(toggleItemSelection({ cartItemId, isSelected }));

    try {
      // 2. Gọi API để lưu vào Database
      await cartApi.toggleSelection(cartItemId);
      return { cartItemId, isSelected };
    } catch (error) {
      // 3. Nếu API lỗi, hoàn tác (rollback) lại UI và báo lỗi
      dispatch(toggleItemSelection({ cartItemId, isSelected: !isSelected }));
      return rejectWithValue(error.message);
    }
  },
);

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.length;
export const selectCartTotal = (state) => {
  const subtotal = state.cart.items
    .filter((item) => item.isSelected) // Chỉ tính tổng của những item được tích chọn
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = state.cart.selectedCoupon?.discount || 0;
  return {
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount),
  };
};
export const selectSelectedCoupon = (state) => state.cart.selectedCoupon;

export default cartSlice.reducer;
