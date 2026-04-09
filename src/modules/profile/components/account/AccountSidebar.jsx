import { Link } from "react-router-dom";
import {
  User,
  Lock,
  MapPin,
  ShoppingBag,
  Ticket,
  Leaf,
  LogOut,
} from "lucide-react";
import { ENDPOINTS } from "@/routes/endPoints";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import authService from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const menuItems = [
  {
    id: "profile",
    label: "Thông tin cá nhân",
    icon: User,
    path: ENDPOINTS.USER.PROFILE,
  },
  {
    id: "password",
    label: "Đổi mật khẩu",
    icon: Lock,
    path: ENDPOINTS.USER.PASSWORD,
  },
  {
    id: "address",
    label: "Địa chỉ",
    icon: MapPin,
    path: ENDPOINTS.USER.ADDRESS,
  },
  {
    id: "order",
    label: "Đơn mua",
    icon: ShoppingBag,
    path: ENDPOINTS.USER.ORDER,
  },
  {
    id: "voucher",
    label: "Kho voucher",
    icon: Ticket,
    path: ENDPOINTS.USER.VOUCHER,
  },
  {
    id: "farm",
    label: "Theo dõi trang trại",
    icon: Leaf,
    path: ENDPOINTS.USER.FARM,
  },
];

const AccountSidebar = ({ activeTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(logout());
    authService.logout();
    toast.success("Đăng xuất thành công");
    navigate("/");
  };

  return (
    <div className="w-full lg:w-64 shrink-0">
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border bg-muted/30">
          <h2 className="font-semibold text-foreground text-lg">
            Tài khoản của tôi
          </h2>
        </div>

        <nav className="p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            // activeTab được truyền từ index.jsx (là kết quả của pop URL)
            const isActive = activeTab === item.id;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-green-600" : ""}`}
                />
                {item.label}
              </Link>
            );
          })}

          <div className="pt-2 mt-2 border-t border-border">
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AccountSidebar;
