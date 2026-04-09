import { ecommerceClient } from "./axiosClient";

const addressApi = {
  getAddress: () => ecommerceClient.get("/api/address"),
  addAddress: (data) => ecommerceClient.post("/api/address", data),
  updateAddress: (id, data) => ecommerceClient.put(`/api/address/${id}`, data),
  deleteAddress: (id) => ecommerceClient.delete(`/api/address/${id}`),
};

const cartApi = {
  getCart: () => ecommerceClient.get("/api/cart-items"),
  getSelectedItems: () => ecommerceClient.get("/api/cart-items/selected"),
  addToCart: (batchDetailId, quantity = 1, isSelected = true) =>
    ecommerceClient.post("/api/cart-items", {
      batchDetailId,
      quantity,
      isSelected,
    }),
  updateCartItem: (itemId, { quantity, isSelected }) =>
    ecommerceClient.put(`/api/cart-items/${itemId}`, {
      quantity,
      isSelected,
    }),
  removeCartItem: (itemId) =>
    ecommerceClient.delete(`/api/cart-items/${itemId}`),
  clearCart: () => ecommerceClient.delete("/api/cart-items"),
  updateQuantity: (itemId, quantity) =>
    ecommerceClient.patch(`/api/cart-items/${itemId}/quantity`, null, { params: { quantity } }),
  toggleSelection: (itemId) =>
    ecommerceClient.patch(`/api/cart-items/${itemId}/toggle`),
};

const orderApi = {
  createOrder: (addressId) =>
    ecommerceClient.post("/api/orders", { addressId }),
  getOrders: (page = 1, size = 20, params = {}) =>
    ecommerceClient.get("/api/orders", {
      params: { page, size, ...params },
    }),
  getOrderDetail: (orderId) => ecommerceClient.get(`/api/orders/${orderId}`),
};

export { addressApi, orderApi, cartApi };
