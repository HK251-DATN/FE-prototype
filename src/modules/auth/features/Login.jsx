import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import authService from "../../../services/authService";
import { setToken, setUser } from "../../../store/slices/authSlice";
import { ENDPOINTS } from "../../../routes/endPoints";
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Vui lòng nhập email và mật khẩu");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      if (response.type === "GOOD" && response.detail?.accessToken) {
        dispatch(setToken(response.detail.accessToken));
        dispatch(
          setUser({
            userId: response.detail.userId || 2,
            email: response.detail.userEmail || email,
          }),
        );
        toast.success("Đăng nhập thành công!");
        setTimeout(() => navigate(ENDPOINTS.INDEX.HOME), 800);
      } else {
        toast.error(response.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      toast.error(error.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              disabled={isLoading}
              className="auth-input"
            />
          </div>

          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              disabled={isLoading}
              className="auth-input"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </span>
          </div>

          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" /> <span>Nhớ mật khẩu</span>
            </label>
            <a
              href="/forgot-password"
              title="Quên mật khẩu"
              className="forgot-link"
            >
              Quên mật khẩu?
            </a>
          </div>

          <button type="submit" disabled={isLoading} className="btn-submit">
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="auth-footer">
          Chưa có tài khoản?{" "}
          <a href="/signup">
            <strong>Đăng ký</strong>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
