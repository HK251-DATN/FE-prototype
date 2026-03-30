import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />

              <span className="text-2xl font-bold">FreshHarvest</span>
            </div>
            <p className="text-gray-400 text-sm">
              Tươi ngon từ nông trại đến bàn ăn của bạn. Sản phẩm được tuyển
              chọn kĩ lưỡng, đảm bảo sức khỏe cho gia đình bạn.
            </p>
            <div className="flex gap-4 pt-4"></div>
          </div>

          {/* Tài khoản */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Tài khoản</h3>
            <hr className="border-green-700 mb-4 w-8 border-t-2" />
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Thông tin cá nhân
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Lịch sử mua
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Giỏ hàng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Yêu thích
                </a>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Hỗ trợ</h3>
            <hr className="border-green-700 mb-4 w-8 border-t-2" />
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Liên hệ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Điều khoản & Điều kiện
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Liên quan</h3>
            <hr className="border-green-700 mb-4 w-8 border-t-2" />
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Khuyến mãi sốc</li>
              <li>Bán chạy nhất</li>
              <li>Cẩm nang bếp xanh</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 FreshHarvest. Tất cả đã được kiểm duyệt.</p>
        </div>
      </div>
    </footer>
  );
}
