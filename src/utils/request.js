import axios from "axios";
import store from "../store/index";
import { logout } from "../store/slices/authSlice";

// Tạo axios instance
const request = axios.create({
  // baseURL: import.meta.env.VITE_API_ECOMMERCE_URL || "http://localhost:8080",   sửa lại khi sửa cors
  baseURL: "http://localhost:9300",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== REQUEST INTERCEPTOR =====
// Tự động thêm token vào header
request.interceptors.request.use(
  (config) => {
    const token = store.getState().auth?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ===== RESPONSE INTERCEPTOR =====
request.interceptors.response.use(
  (response) => {
    // TRẢ VỀ TRỰC TIẾP DATA ĐỂ HOOK DỄ DÙNG
    // Nếu API của bạn luôn bọc trong object, hãy trả về response.data
    return response.data;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Chỉ logout khi không phải trang login để tránh loop vô tận
      if (!window.location.pathname.includes("/auth/login")) {
        store.dispatch(logout());
        window.location.href = "/auth/login";
      }
    }

    // Ghi log lỗi ra console để bạn dễ debug khi phát triển
    console.error("API Error:", error.response?.data || error.message);

    return Promise.reject(error);
  },
);

export default request;
