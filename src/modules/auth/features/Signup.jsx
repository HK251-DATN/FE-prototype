import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux"; // Tắt nếu không dùng Redux ở đây
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // Thêm icon
import authService from "../../../services/authService";
import { ENDPOINTS } from "../../../routes/endPoints";
import "./auth.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Thêm trạng thái ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Thêm trạng thái đồng ý điều khoản
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }

    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (!agreeTerms) {
      toast.error("Vui lòng đồng ý với điều khoản dịch vụ");
      return;
    }

    setIsLoading(true);
    try {
      // Giả sử service của bạn trả về dữ liệu đúng chuẩn
      const response = await authService.signup(email, password);
      // console.log("Signup response:", response);

      if (response.type === "GOOD" || response.status === 200) {
        toast.success("Đăng ký thành công! Đang chuyển đến trang đăng nhập...");

        // Redirect đến login page
        setTimeout(() => {
          navigate(ENDPOINTS.AUTH.LOGIN);
        }, 1500);
      } else {
        toast.error(response.message || "Đăng ký thất bại");
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response?.data?.message?.includes("unique")) {
        toast.error("Email đã được sử dụng. Vui lòng sử dụng email khác.");
      } else {
        toast.error(error.message || "Đăng ký thất bại");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Đăng ký</h2>

        <form onSubmit={handleSignup}>
          {/* Ô nhập Email */}
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              disabled={isLoading}
              className="auth-input"
              required
            />
          </div>

          {/* Ô nhập Mật khẩu với icon mắt */}
          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              disabled={isLoading}
              className="auth-input"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </span>
          </div>

          {/* Ô nhập lại Mật khẩu với icon mắt */}
          <div className="form-group password-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              disabled={isLoading}
              className="auth-input"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              title={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showConfirmPassword ? <Eye /> : <EyeOff />}
            </span>
          </div>

          {/* Checkbox Điều khoản & Điều kiện */}
          <div className="auth-options">
            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span>
                Đồng ý với tất cả{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terms-link"
                >
                  điều khoản và điều kiện
                </a>
              </span>
            </label>
          </div>

          {/* Nút Đăng ký */}
          <button type="submit" disabled={isLoading} className="btn-submit">
            {isLoading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        {/* Footer chuyển sang đăng nhập */}
        <p className="auth-footer">
          Đã có tài khoản?{" "}
          <a href="/login" className="login-link">
            <strong>Đăng nhập</strong>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
