import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  applyCoupon,
  removeCoupon,
  selectSelectedCoupon,
  clearCart,
} from "../../../store/slices/cartSlice";
import { ENDPOINTS } from "../../../routes/endPoints";
import { QrCode, Copy, Check } from "lucide-react";
import { toast } from "react-toastify";

// Mock data cho các mã giảm giá
const MOCK_COUPONS = [
  {
    code: "FRESHDISCOUNT",
    discount: 50000,
    description: "Giảm 50.000đ cho đơn hàng",
    minAmount: 150000,
  },
  {
    code: "SAVE10",
    discount: 100000,
    description: "Giảm 100.000đ cho đơn hàng",
    minAmount: 300000,
  },
  {
    code: "WELCOME20",
    discount: 20000,
    description: "Giảm 20.000đ cho tất cả đơn hàng",
    minAmount: 0,
  },
  {
    code: "SUMMER30",
    discount: 150000,
    description: "Giảm 150.000đ cho mùa hè",
    minAmount: 500000,
  },
];

export default function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { subtotal, discount, total } = useSelector(selectCartTotal);
  const selectedCoupon = useSelector(selectSelectedCoupon);

  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Xử lý áp dụng mã giảm giá
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponMessage("Vui lòng nhập mã giảm giá");
      return;
    }

    const foundCoupon = MOCK_COUPONS.find(
      (c) => c.code === couponCode.toUpperCase(),
    );

    if (!foundCoupon) {
      setCouponMessage("❌ Mã giảm giá không hợp lệ");
      return;
    }

    if (subtotal < foundCoupon.minAmount) {
      setCouponMessage(
        `❌ Đơn hàng phải từ ${foundCoupon.minAmount.toLocaleString("vi-VN")}đ để sử dụng mã này`,
      );
      return;
    }

    dispatch(applyCoupon(foundCoupon));
    setCouponMessage(`✓ Áp dụng mã thành công: ${foundCoupon.description}`);
    toast.success("Áp dụng mã giảm giá thành công");
  };

  // Xử lý xóa mã giảm giá
  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponMessage("");
    setCouponCode("");
    toast.info("Đã xóa mã giảm giá");
  };

  // Copy QR code
  const handleCopyQR = () => {
    navigator.clipboard.writeText("TRANSFER_QR_CODE_DATA");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Xử lý thanh toán
  const handlePayment = async () => {
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống");
      return;
    }

    // Giả lập API call
    toast.loading("Đang xử lý thanh toán...");

    setTimeout(() => {
      dispatch(clearCart());
      navigate(ENDPOINTS.USER.PAYMENT_SUCCESS);
      toast.dismiss();
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Giỏ hàng của bạn đang trống
          </h1>
          <button
            onClick={() => navigate(ENDPOINTS.INDEX.HOME)}
            className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition-colors"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Thanh toán
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Sản phẩm và mã giảm giá */}
          <div className="md:col-span-2 space-y-6 font-[Poppins]">
            {/* Sản phẩm */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Sản phẩm trong giỏ ({cartItems.length})
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-gray-200 pb-4 last:border-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">x{item.quantity}</p>
                      <p className="text-green-600 font-bold">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mã giảm giá */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Mã giảm giá
              </h2>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá..."
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      setCouponMessage("");
                    }}
                    className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition-colors"
                  >
                    Áp dụng
                  </button>
                </div>

                {couponMessage && (
                  <p
                    className={
                      couponMessage.includes("✓")
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {couponMessage}
                  </p>
                )}

                {selectedCoupon && (
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {selectedCoupon.code}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedCoupon.description}
                        </p>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Mã phổ biến:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {MOCK_COUPONS.map((coupon) => (
                      <button
                        key={coupon.code}
                        onClick={() => {
                          setCouponCode(coupon.code);
                          setCouponMessage("");
                        }}
                        className="text-left text-sm p-2 bg-white border border-gray-200 rounded hover:border-green-500 hover:bg-green-50 transition-colors"
                      >
                        <p className="font-semibold text-gray-800">
                          {coupon.code}
                        </p>
                        <p className="text-xs text-gray-600">
                          Giảm {coupon.discount.toLocaleString("vi-VN")}đ
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: QR code và tóm tắt đơn hàng */}
          <div className="space-y-6">
            {/* Phương thức thanh toán */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Phương thức thanh toán
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="qr"
                    checked={paymentMethod === "qr"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">QR Code</p>
                    <p className="text-sm text-gray-600">
                      Quét mã QR để thanh toán
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Chuyển khoản</p>
                    <p className="text-sm text-gray-600">
                      Chuyển khoản ngân hàng
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">COD</p>
                    <p className="text-sm text-gray-600">
                      Thanh toán khi nhận hàng
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* QR Code */}
            {paymentMethod === "qr" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  <QrCode className="inline w-5 h-5 mr-2" />
                  Mã QR thanh toán
                </h2>

                <div className="bg-gray-100 p-4 rounded flex flex-col items-center gap-4">
                  {/* Mock QR code */}
                  <div className="w-48 h-48 bg-white border-4 border-gray-300 flex items-center justify-center">
                    <div className="space-y-2 text-center">
                      <QrCode className="w-20 h-20 text-gray-400 mx-auto" />
                      <p className="text-gray-600 text-sm">
                        Quét mã QR để thanh toán
                      </p>
                      <p className="text-xs text-gray-500">
                        {total.toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyQR}
                    className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Đã copy
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy dữ liệu
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Tóm tắt đơn hàng */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="font-semibold">
                    {subtotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá:</span>
                    <span className="font-semibold">
                      -{discount.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold text-gray-800">
                  <span>Tổng cộng:</span>
                  <span className="text-green-600">
                    {total.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition-colors mt-4"
              >
                Thanh toán ngay
              </button>

              <button
                onClick={() => navigate(ENDPOINTS.USER.CART)}
                className="w-full bg-gray-100 text-gray-800 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
              >
                Quay lại giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
