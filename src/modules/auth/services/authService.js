// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_IDENTITY_API_URL || "http://localhost:9100/api";

// const authService = {
//   // Login
//   login: async (email, password) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/user/login`, {
//         email,
//         password,
//       });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Register
//   register: async (userData) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/user/registration`,
//         userData,
//       );
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },
// };

// export default authService;

import identityClient from "../api/identityClient";

const authService = {
  // Đăng ký
  signup: async (email, password) => {
    try {
      const response = await identityClient.post("/user", {
        email,
        password,
      });
      console.log("Signup response:", response);
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đăng nhập
  login: async (email, password) => {
    try {
      const response = await identityClient.post("/user/login", {
        email,
        password,
      });
      // Lưu token
      if (response.detail?.accessToken) {
        localStorage.setItem("accessToken", response.detail.accessToken);
        localStorage.setItem("userId", response.detail.userId || "");
        localStorage.setItem("userEmail", response.detail.userEmail || "");
      }
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy thông tin user
  getUser: async (userId) => {
    try {
      return await identityClient.get(`/user/${userId}`);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy quyền của user
  getUserPermissions: async (userId) => {
    try {
      return await identityClient.get(`/user/${userId}/permission`);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đăng xuất
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  },

  // Kiểm tra token có hợp lệ
  getToken: () => localStorage.getItem("accessToken"),

  isAuthenticated: () => !!localStorage.getItem("accessToken"),
};

export default authService;
