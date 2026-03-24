import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Xử lý dữ liệu trước khi trả về cho Component
axiosClient.interceptors.response.use(
  (response) => {
    // Axios bọc dữ liệu trong field 'data', lấy ra luôn cho tiện
    return response.data;
  },
  (error) => {
    // Xử lý lỗi tập trung ở đây (VD: check 401 để logout)
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default axiosClient;
