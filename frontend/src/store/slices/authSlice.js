import { createSlice } from "@reduxjs/toolkit";

// Helper: Decode JWT payload
const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const initialState = {
  // Token từ backend
  accessToken: localStorage.getItem("accessToken") || null,

  // Thông tin user decode từ JWT
  user: (() => {
    const token = localStorage.getItem("accessToken");
    return token ? decodeToken(token) : null;
  })(),

  // Trạng thái xác thực
  isAuthenticated: !!localStorage.getItem("accessToken"),

  // Loading khi đang gọi API login
  isLoading: false,

  // Error message
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Lưu token khi login thành công
    setToken: (state, action) => {
      const token = action.payload;
      state.accessToken = token;
      state.isAuthenticated = true;
      state.user = decodeToken(token);
      localStorage.setItem("accessToken", token);
      state.error = null;
    },

    // Đặt error
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Bắt đầu loading
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Logout
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setToken, setError, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
