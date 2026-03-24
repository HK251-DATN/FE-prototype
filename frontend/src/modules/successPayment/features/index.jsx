import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[600px] bg-white font-[Poppins] p-4">
      <div className="max-w-md w-full text-center flex flex-col items-center">
        {/* Biểu tượng dấu tích xanh */}
        <div className="w-20 h-20 bg-[#00B207] rounded-full flex items-center justify-center mb-8 shadow-sm">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        {/* Tiêu đề trạng thái */}
        <h1 className="text-[32px] font-semibold text-[#1A1A1A] mb-4 leading-tight">
          Đơn hàng của bạn đã được đặt thành công!
        </h1>

        {/* Thông báo mô tả */}
        <p className="text-[#666666] text-sm leading-relaxed mb-8 px-2">
          Cảm ơn bạn đã tin tưởng lựa chọn nông sản sạch từ FreshHarvest. Chúng
          tôi sẽ sớm liên hệ để xác nhận và giao hàng đến bạn trong thời gian
          ngắn nhất.
        </p>

        {/* Nhóm nút điều hướng */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Nút Về bảng điều khiển */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-[#E6E6E6] bg-white text-[#00B207] font-semibold text-sm hover:bg-gray-50 transition-all uppercase tracking-wide group"
          >
            <svg className="w-5 h-5 fill-[#00B207]" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            Về bảng điều khiển
          </button>

          {/* Nút Xem đơn hàng */}
          <button
            onClick={() => navigate("/order-history")}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#00B207] text-white font-semibold text-sm hover:bg-[#009a06] transition-all uppercase tracking-wide shadow-md"
          >
            Xem đơn hàng
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
