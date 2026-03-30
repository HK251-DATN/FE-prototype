import axios from "axios";

const identityClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Lưu token vào localStorage khi login
identityClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor: Xử lý response
identityClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Nếu 401 Unauthorized -> logout
    if (error.response?.status === 401) {
      console.warn("Token expired or invalid");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default identityClient;
