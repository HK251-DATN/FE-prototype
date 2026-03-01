import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
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

        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2.5 border border-gray-200 w-full max-w-[320px] focus-within:ring-1 focus-within:ring-green-500 transition-all">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            type="text"
            placeholder="Nhập tên sản phẩm cần tìm"
            className="flex-1 bg-transparent border-none outline-none px-3 text-sm text-green-700 placeholder-green-600 w-full"
          />

          <button className="text-green-600 hover:text-green-700 transition-colors">
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
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        </div>

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
          <button className="bg-green-600 text-white px-2 py-2 rounded-full hover:bg-green-700 transition-colors font-medium">
            <Heart className="w-6 h-5 inline-block" />
          </button>
          <button className="bg-green-600 text-white px-2 py-2 rounded-full hover:bg-green-700 transition-colors font-medium">
            <ShoppingCart className="w-6 h-5  inline-block" />
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-medium">
            Đặt hàng
          </button>
        </div>
      </div>
    </header>
  );
}
