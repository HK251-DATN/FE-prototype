import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CategoryMenu from "../CategorySidebar/CategoryMenu";
import { Sidebar } from "../CategorySidebar/Sidebar";
// Nếu bạn dùng thư viện icon như lucide-react, hãy import:
// import { Menu, ChevronDown, Phone } from "lucide-react";

export default function Navigation() {
  const [openCategory, setOpenCategory] = useState(false);
  const [openPromotion, setOpenPromotion] = useState(false);
  const categoryRef = useRef(null);
  const promotionRef = useRef(null);
  const toggleCategory = () => {
    setOpenCategory((prev) => !prev);
    setOpenPromotion(false);
  };
  const togglePromotion = () => {
    setOpenPromotion((prev) => !prev);
    setOpenCategory(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setOpenCategory(false);
      }
      if (
        promotionRef.current &&
        !promotionRef.current.contains(event.target)
      ) {
        setOpenPromotion(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // 1. Nền tổng thể màu xám nhạt (bg-gray-100)
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* --- Phần bên trái: Danh mục & Menu --- */}
        <div className="flex items-center">
          {/* 2. Mục "Danh mục sản phẩm": Nền xanh, chữ trắng, padding lớn */}
          <div
            onClick={toggleCategory}
            ref={categoryRef}
            className="relative bg-green-600 text-white px-6 py-3 flex items-center gap-2 cursor-pointer hover:bg-green-700 transition-colors"
          >
            {/* Menu Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span className="font-medium">Danh mục sản phẩm</span>
            {/* Chevron Icon */}
            <svg
              className={`w-4 h-4 transition-transform ${openCategory ? "rotate-180" : ""
                }`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
            {/* DROPDOWN CATEGORY */}
            {openCategory && (
              <div className="absolute left-0 top-full z-50 mt-1">
                <CategoryMenu />
              </div>
            )}
          </div>

          {/* 3. Navigation Links: Nằm bên cạnh khối danh mục */}
          <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium">
            {/* Trang chủ - Đang active (Chữ xanh) */}
            <Link
              to="/"
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              Trang chủ
            </Link>

            {/* Các menu khác - Chữ xám */}
            <div className="flex items-center gap-1 text-gray-600 hover:text-green-600 cursor-pointer transition-colors">
              Khuyến mãi sốc
              <svg
                className={`w-4 h-4 transition-transform ${openCategory ? "rotate-180" : ""
                  }`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
              {openCategory && (
                <Sidebar />

              )}
            </div>

            <a
              href="#bestseller"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Sản phẩm bán chạy
            </a>

            <a
              href="#handbook"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Cẩm nang Bếp xanh
            </a>

            <a
              href="#about"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Giới thiệu
            </a>

            <a
              href="/user/contact"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Liên hệ
            </a>
          </nav>
        </div>

        {/* --- Phần bên phải: Số điện thoại --- */}
        <div className="hidden lg:flex items-center gap-2 text-gray-700 font-medium px-4">
          {/* Phone Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>(219) 555-0114</span>
        </div>
      </div>
    </div>
  );
}
