import { Home, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const routeDictionary = {
  user: "Tài khoản",
  category: "Danh mục sản phẩm",
  cart: "Giỏ hàng",
  checkout: "Thanh toán",
  profile: "Hồ sơ của tôi",
  orders: "Đơn hàng",
  contact: "Liên hệ",
  wishlist: "Danh sách yêu thích",
};
export default function Breadcrumbs({ customItems = [] }) {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);
  const autoItems = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    return {
      label: routeDictionary[value] || value, // Lấy tên trong từ điển, nếu không có thì lấy chính chữ đó
      href: to,
    };
  });

  const itemsToShow = customItems.length > 0 ? customItems : autoItems;

  return (
    <div
      className="relative h-[64px] md:h-[80px] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://agriculture-ecommerce.s3.ap-southeast-2.amazonaws.com/breadcrumps.png)`,
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative container mx-auto px-20 h-full flex flex-col justify-center">
        <nav className="flex items-center text-gray-200 text-sm">
          <Link
            to="/"
            className="hover:text-green-400 transition-colors flex items-center gap-1"
          >
            <Home size={16} />
            <span className="hidden sm:inline">Trang chủ</span>
          </Link>

          {itemsToShow.map((item, index) => {
            const isLast = index === itemsToShow.length - 1;
            return (
              <div key={index} className="flex items-center">
                <ChevronRight size={14} className="mx-2 text-gray-300" />

                {/* Nếu là mục cuối cùng (trang hiện tại) thì in đậm, màu xanh và không bấm được */}
                {isLast || !item.href ? (
                  <span className="text-green-400 font-bold tracking-wide">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="hover:text-green-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
