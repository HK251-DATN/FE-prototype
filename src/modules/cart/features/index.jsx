import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeFromCart,
} from "../../../store/slices/cartSlice";
import { ENDPOINTS } from "../../../routes/endPoints";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const { subtotal, discount, total } = useSelector(selectCartTotal);

  const formatVND = (amount) => {
    return amount.toLocaleString("vi-VN") + "đ";
  };

  const handleQuantityChange = (id, delta) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity < 1) {
        dispatch(removeFromCart({ id }));
        toast.info("Đã xóa sản phẩm khỏi giỏ hàng");
      } else {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
      }
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id }));
    toast.info("Đã xóa sản phẩm khỏi giỏ hàng");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen font-sans text-center py-20">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-4">
          Giỏ hàng của bạn đang trống
        </h1>
        <p className="text-[#666] mb-6">
          Hãy thêm một số sản phẩm để bắt đầu shopping
        </p>
        <Link
          to={ENDPOINTS.INDEX.HOME}
          className="px-8 py-3 bg-[#00B207] text-white rounded-full font-bold hover:bg-[#009a06] transition-colors"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#1A1A1A]">
        Giỏ hàng của tôi ({cartItems.length})
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* BÊN TRÁI: DANH SÁCH SẢN PHẨM */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg border border-[#E6E6E6] overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E6E6E6] text-[#808080] text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Sản phẩm</th>
                  <th className="p-4 font-medium">Giá</th>
                  <th className="p-4 font-medium">Số lượng</th>
                  <th className="p-4 font-medium">Tạm tính</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#E6E6E6] last:border-0 group"
                  >
                    {/* Hình ảnh & Tên */}
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <span className="text-[#1A1A1A] font-medium">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    {/* Giá niêm yết */}
                    <td className="p-4 text-[#1A1A1A]">
                      {formatVND(item.price)}
                    </td>
                    {/* Bộ tăng giảm số lượng */}
                    <td className="p-4">
                      <div className="flex items-center w-fit border border-[#E6E6E6] rounded-full p-1 bg-white">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2F2F2] hover:bg-gray-200 text-[#666] transition-colors"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-[#1A1A1A] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2F2F2] hover:bg-gray-200 text-[#666] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    {/* Tổng cộng dòng sản phẩm */}
                    <td className="p-4 text-[#1A1A1A] font-semibold">
                      {formatVND(item.price * item.quantity)}
                    </td>
                    {/* Nút xóa sản phẩm */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 rounded-full border border-[#CCCCCC] text-[#666] hover:text-red-500 hover:border-red-500 transition-colors"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Các nút điều hướng dưới bảng */}
            <div className="p-4 flex justify-between bg-white border-t border-[#E6E6E6]">
              <Link
                to={ENDPOINTS.INDEX.HOME}
                className="px-6 py-2.5 bg-[#F2F2F2] text-[#4D4D4D] rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Tiếp tục mua sắm
              </Link>
              <Link
                to={ENDPOINTS.USER.WISHLIST}
                className="px-6 py-2.5 bg-[#F2F2F2] text-[#4D4D4D] rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Xem danh sách yêu thích
              </Link>
            </div>
          </div>
        </div>

        {/* BÊN PHẢI: TỔNG KẾT ĐƠN HÀNG */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg border border-[#E6E6E6] shadow-sm sticky top-4">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-6 border-b border-[#E6E6E6] pb-4">
              Tổng tiền giỏ hàng
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b border-[#E6E6E6]">
                <span className="text-[#4D4D4D]">Tạm tính:</span>
                <span className="text-[#1A1A1A] font-semibold">
                  {formatVND(subtotal)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-green-600">
                  <span>Giảm giá:</span>
                  <span className="font-semibold">-{formatVND(discount)}</span>
                </div>
              )}

              <div className="flex justify-between pb-3 border-b border-[#E6E6E6]">
                <span className="text-[#4D4D4D]">Vận chuyển:</span>
                <span className="text-[#1A1A1A] font-semibold">Miễn phí</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-medium text-[#1A1A1A]">
                  Tổng cộng:
                </span>
                <span className="text-2xl font-bold text-[#00B207]">
                  {formatVND(total)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate(ENDPOINTS.USER.ORDER)}
              className="w-full mt-8 py-4 bg-[#00B207] text-white rounded-full font-bold text-lg hover:bg-[#009a06] transition-all shadow-md active:scale-[0.98]"
            >
              Thanh toán ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
