import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  LogOut,
  User,
  Settings,
  Package,
} from "lucide-react";
import { ENDPOINTS } from "@/routes/endPoints";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);
  const profile = useSelector((state) => state.auth?.profile);

  const [searchValue, setSearchValue] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    authService.logout();
    toast.success("Đăng xuất thành công");
    navigate("/");
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchValue.trim()) {
      navigate(
        `${ENDPOINTS.INDEX.CATEGORY}?searchString=${encodeURIComponent(searchValue.trim())}`,
      );
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-2xl font-bold text-green-600">
            FreshHarvest
          </span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2.5 border border-gray-200 w-full max-w-[320px] focus-within:ring-1 focus-within:ring-green-500 transition-all"
        >
          <svg
            /* icon search */ className="text-green-600"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Nhập tên sản phẩm cần tìm"
            className="flex-1 bg-transparent border-none outline-none px-3 text-sm text-green-700 placeholder-green-600 w-full"
          />

          <button
            type="submit"
            className="text-green-600 hover:text-green-700 transition-colors"
          >
            {/* Icon Microphone hoặc Search */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </form>

        <div className="flex items-center gap-4">
          {/* <button className="text-gray-700 hover:text-green-600 transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button> */}
          <Link to={ENDPOINTS.USER.WISHLIST}>
            <button className="bg-green-600 text-white px-2 py-2 rounded-full hover:bg-green-700 transition-colors font-medium">
              <Heart className="w-6 h-5 inline-block" />
            </button>
          </Link>
          <Link to={ENDPOINTS.USER.CART}>
            <button className="bg-green-600 text-white px-2 py-2 rounded-full hover:bg-green-700 transition-colors font-medium">
              <ShoppingCart className="w-6 h-5  inline-block" />
            </button>
          </Link>
          {token ? (
            /* Avatar Dropdown Menu */
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition-all border border-transparent hover:border-gray-200">
                <div className="w-9 h-9 rounded-full bg-green-100 border-2 border-green-500 overflow-hidden flex items-center justify-center">
                  {profile?.avtUrl ? (
                    <img
                      src={profile.avtUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700">
                  {profile?.fName} {profile?.lName || "Tài khoản"}
                </span>
              </button>

              {/* Dropdown Content - Hiện khi hover vào 'group' */}
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">
                    {profile?.fName} {profile?.lName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {profile?.email}
                  </p>
                </div>

                <div className="p-2">
                  <Link
                    to={ENDPOINTS.USER.PROFILE}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Quản lý tài khoản
                  </Link>
                  <Link
                    to={ENDPOINTS.USER.ORDER}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    Đơn mua của tôi
                  </Link>
                  {/* <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    Cài đặt
                  </Link> */}
                </div>

                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to={ENDPOINTS.AUTH.LOGIN}>
              <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-medium">
                Đăng Nhập
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
