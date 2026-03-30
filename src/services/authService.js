import identityClient from "../api/identityClient";

const authService = {
  // Đăng ký
  signup: async (email, password) => {
    try {
      const response = await identityClient.post("/user", {
        email,
        password,
      });
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
      if (response.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
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
    window.location.href = "/login";
  },

  // Kiểm tra token có hợp lệ
  getToken: () => localStorage.getItem("accessToken"),

  isAuthenticated: () => !!localStorage.getItem("accessToken"),
};

export default authService;
