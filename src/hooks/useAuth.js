import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react-toastify";
import { toast } from "react-toastify";

export const useAuth = () => {
  const token = useSelector((state) => state.auth?.token);
  const navigate = useNavigate();

  // Redirect to login nếu chưa authenticate
  useEffect(() => {
    if (!token && window.location.pathname.startsWith("/user")) {
      toast.warning("Vui lòng đăng nhập để tiếp tục");
      navigate("/login");
    }
  }, [token, navigate]);

  return !!token;
};