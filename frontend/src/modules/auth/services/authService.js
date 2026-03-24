import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_IDENTITY_API_URL || "http://localhost:9100/api";

const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/registration`,
        userData,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default authService;
