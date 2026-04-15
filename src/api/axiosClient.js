// src/api/axiosClient.js
import axios from "axios";

// Hàm tạo cấu hình chung để tái sử dụng
const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  // Interceptor chung cho tất cả (Ví dụ: đính kèm Token)
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  instance.interceptors.response.use(
    (response) => response.data, // Trả về data trực tiếp để bỏ qua lớp bọc của axios
    (error) => Promise.reject(error),
  );

  return instance;
};

// Khởi tạo các instance cho từng dịch vụ
export const identityClient = createInstance("http://localhost:9000");
export const backofficeClient = createInstance("http://localhost:9100");
export const ecommerceClient = createInstance("http://localhost:9300");
