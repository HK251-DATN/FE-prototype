// import { createSlice } from "@reduxjs/toolkit";

// // Helper: Decode JWT payload
// const decodeToken = (token) => {
//   try {
//     const base64Url = token.split(".")[1];
//     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split("")
//         .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//         .join(""),
//     );
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return null;
//   }
// };

// const initialState = {
//   // Token từ backend
//   accessToken: localStorage.getItem("accessToken") || null,

//   // Thông tin user decode từ JWT
//   user: (() => {
//     const token = localStorage.getItem("accessToken");
//     return token ? decodeToken(token) : null;
//   })(),

//   // Trạng thái xác thực
//   isAuthenticated: !!localStorage.getItem("accessToken"),

//   // Loading khi đang gọi API login
//   isLoading: false,

//   // Error message
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // Lưu token khi login thành công
//     setToken: (state, action) => {
//       const token = action.payload;
//       state.accessToken = token;
//       state.isAuthenticated = true;
//       state.user = decodeToken(token);
//       localStorage.setItem("accessToken", token);
//       state.error = null;
//     },

//     // Đặt error
//     setError: (state, action) => {
//       state.error = action.payload;
//       state.isLoading = false;
//     },

//     // Bắt đầu loading
//     setLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },

//     // Logout
//     logout: (state) => {
//       state.accessToken = null;
//       state.user = null;
//       state.isAuthenticated = false;
//       state.error = null;
//       localStorage.removeItem("accessToken");
//     },
//   },
// });

// export const { setToken, setError, setLoading, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const decodeToken = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    console.log("Token decoded:", decoded);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

// ✅ Helper để initialize state từ localStorage
const initializeAuthState = () => {
  const savedToken = localStorage.getItem("accessToken");
  console.log("authSlice initializing...");
  console.log("Saved token in LS:", savedToken ? "YES" : "NO");
  const savedProfile = localStorage.getItem("userProfile");

  let initialUser = null;
  let initialPermissions = [];

  if (savedToken) {
    const decoded = decodeToken(savedToken);
    if (decoded) {
      initialUser = {
        id: decoded.userId || decoded.sub,
        email: decoded.userEmail || decoded.sub,
        permissions: decoded.permissions || [],
      };
      initialPermissions = decoded.permissions || [];
      console.log("User initialized from token:", initialUser);
    }
  }

  return {
    token: savedToken || null,
    user: initialUser,
    profile: savedProfile ? JSON.parse(savedProfile) : null,
    permissions: initialPermissions,
    isLoading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: initializeAuthState(),
  reducers: {
    setToken: (state, action) => {
      console.log(
        "setToken called with:",
        action.payload ? "Token" : "No token",
      );
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("accessToken", action.payload);
        const decoded = decodeToken(action.payload);
        if (decoded) {
          state.user = {
            id: decoded.userId || decoded.sub,
            email: decoded.userEmail || decoded.sub,
            permissions: decoded.permissions || [],
          };
          state.permissions = decoded.permissions || [];
          console.log("State updated:", {
            user: state.user,
            permissions: state.permissions,
          });
        }
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      localStorage.setItem("userProfile", JSON.stringify(action.payload));
    },
    logout: (state) => {
      console.log("Logging out...");
      state.token = null;
      state.user = null;
      state.permissions = [];
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      console.log("Logout completed");
    },
  },
});

export const {
  setToken,
  setUser,
  setPermissions,
  setProfile,
  setLoading,
  setError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
