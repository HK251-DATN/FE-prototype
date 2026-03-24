export const ENDPOINTS = Object.freeze({
  AUTH: {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forget-password",
    SIGNIN: "/signin",
    SIGNIN_SUCCESS: "/signin-success",
  },
  INDEX: {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    CATEGORY: "/category",
    PRODUCT_DETAIL: "/product",
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
