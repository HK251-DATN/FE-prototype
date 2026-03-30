import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AppRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setToken } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const reduxToken = useSelector((state) => state.auth?.token);

  // Restore token từ localStorage vào Redux khi app mount
  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");

    console.log("App mounted - Checking for saved token...");
    console.log("LocalStorage token:", savedToken ? "EXISTS" : "NOT FOUND");
    console.log("Redux token:", reduxToken ? "EXISTS" : "NOT FOUND");

    // Nếu localStorage có token nhưng Redux không có → restore
    if (savedToken && !reduxToken) {
      console.log("Restoring token from localStorage to Redux...");
      dispatch(setToken(savedToken));
      console.log("Token restored successfully!");
    }
  }, [dispatch, reduxToken]);

  return (
    <div className="app">
      <AppRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
