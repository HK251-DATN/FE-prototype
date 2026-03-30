export const ENDPOINTS = Object.freeze({
  AUTH: {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forget-password",
    SIGNUP: "/signup",
    SIGNIN_SUCCESS: "/signin-success",
  },
  INDEX: {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    CATEGORY: "/category",
    PRODUCT_DETAIL: "/product",
    PRODUCT_DETAIL_2: "/product_2",
    PRODUCT_DETAIL_1: "/product_1",
  },
  USER: {
    DASHBOARD: "/user/dashboard",
    PROFILE: "/user/profile",
    CART: "/user/cart",
    ORDER: "/user/order",
    PAYMENT_SUCCESS: "/user/payment-success",
    WISHLIST: "/user/wishlist",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    GROUPS: "/admin/groups",
    PERMISSIONS: "/admin/permissions",
  },
});
