import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  applyCoupon,
  removeCoupon,
  selectSelectedCoupon,
  fetchCart,
} from "../../../store/slices/cartSlice";
import { ENDPOINTS } from "../../../routes/endPoints";
import { Link } from "react-router-dom";
import { QrCode, Copy, Check, Ticket, Info, MapPin, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { addressApi, orderApi } from "../../../api/ecommerceApi";

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
  const selectedItems = cartItems.filter((item) => item.isSelected);
  // Cần tính lại subtotal/total cho các item được chọn
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = useSelector(selectCartTotal).discount;
  const total = Math.max(0, subtotal - discount);

  const selectedCoupon = useSelector(selectSelectedCoupon);

  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Address state
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    receiverName: "",
    receiverPNum: "",
    province: "",
    district: "",
    commune: "",
    detail: "",
    isDefault: true,
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await addressApi.getAddress();
        if (res.detail) {
          setAddresses(res.detail);
          const defAddr = res.detail.find((a) => a.isDefault) || res.detail[0];
          if (defAddr) setSelectedAddressId(defAddr.addressId);
        } else {
          setShowNewAddressForm(true);
        }
      } catch (err) {
        console.error(err);
        setShowNewAddressForm(true);
      } finally {
        setIsLoadingAddress(false);
      }
    };
    fetchAddress();
  }, []);

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await addressApi.addAddress(newAddress);
      setAddresses([...addresses, res.detail]);
      setSelectedAddressId(res.detail.addressId);
      setShowNewAddressForm(false);
      toast.success("Thêm địa chỉ thành công!");
    } catch (err) {
      toast.error("Lỗi khi thêm địa chỉ");
    }
  };

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
    if (selectedItems.length === 0) {
      toast.error("Chưa có sản phẩm nào được chọn");
      return;
    }
    if (!selectedAddressId) {
      toast.error("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    toast.loading("Đang xử lý đặt hàng...");

    try {
      await orderApi.createOrder(selectedAddressId);
      dispatch(fetchCart());
      navigate(ENDPOINTS.USER.PAYMENT_SUCCESS);
      toast.dismiss();
    } catch (e) {
      toast.dismiss();
      toast.error("Thanh toán thất bại. Vui lòng thử lại.");
    }
  };

  if (selectedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Giỏ hàng của bạn đang trống
          </h1>
          <Link
            to={ENDPOINTS.INDEX.HOME}
            className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  const qrCodeImage = `https://qr.sepay.vn/img?acc=SEPORDER240306&bank=OCB&amount=${total}&des=noi_dung_thanh_toan`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Thanh toán
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Sản phẩm và mã giảm giá */}
          <div className="md:col-span-2 space-y-6 font-[Poppins]">
            {/* Địa chỉ giao hàng */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <MapPin className="text-green-600" />
                  Địa chỉ giao hàng
                </h2>
                {!showNewAddressForm && (
                  <button
                    onClick={() => setShowNewAddressForm(true)}
                    className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    <Plus size={16} /> Thêm mới
                  </button>
                )}
              </div>

              {isLoadingAddress ? (
                <p>Đang tải địa chỉ...</p>
              ) : showNewAddressForm ? (
                <form
                  onSubmit={handleSaveAddress}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Họ & Tên
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full border p-2 rounded"
                        value={newAddress.receiverName}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, receiverName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại
                      </label>
                      <input
                        required
                        type="tel"
                        className="w-full border p-2 rounded"
                        value={newAddress.receiverPNum}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, receiverPNum: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tỉnh/Thành phố
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full border p-2 rounded"
                        value={newAddress.province}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, province: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quận/Huyện
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full border p-2 rounded"
                        value={newAddress.district}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, district: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phường/Xã
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full border p-2 rounded"
                        value={newAddress.commune}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, commune: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chi tiết (Số nhà, đường...)
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border p-2 rounded"
                      value={newAddress.detail}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, detail: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowNewAddressForm(false)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded"
                      >
                        Hủy
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Lưu và chọn
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr.addressId}
                      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedAddressId === addr.addressId
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        className="mt-1"
                        checked={selectedAddressId === addr.addressId}
                        onChange={() => setSelectedAddressId(addr.addressId)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800">
                            {addr.receiverName}
                          </span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-600">{addr.receiverPNum}</span>
                          {addr.isDefault && (
                            <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">
                              Mặc định
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {addr.detail}, {addr.commune}, {addr.district}, {addr.province}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Sản phẩm */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Sản phẩm trong giỏ ({selectedItems.length})
              </h2>
              <div className="space-y-4">
                {selectedItems.map((item) => (
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
              <div className="flex items-center gap-2 mb-6">
                <Ticket className="text-green-600 w-6 h-6" />
                <h2 className="text-xl font-bold text-gray-800">
                  Khuyến mãi dành cho bạn
                </h2>
              </div>

              {/* Ô nhập mã thủ công */}
              <div className="flex gap-2 mb-8">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá..."
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    setCouponMessage("");
                  }}
                  className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-green-600 text-white px-6 py-2 rounded-r font-semibold hover:bg-green-700 transition-colors"
                >
                  Áp dụng
                </button>
              </div>

              {/* Danh sách Voucher */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_COUPONS.map((coupon) => {
                  const isEligible = subtotal >= coupon.minAmount;
                  const isSelected = selectedCoupon?.code === coupon.code;

                  return (
                    <div
                      key={coupon.code}
                      onClick={() => isEligible && setCouponCode(coupon.code)}
                      className={`relative flex items-center border rounded-lg overflow-hidden transition-all ${
                        isEligible
                          ? "cursor-pointer border-green-200 bg-white hover:shadow-md"
                          : "opacity-60 cursor-not-allowed border-gray-200 bg-gray-50"
                      } ${isSelected ? "ring-2 ring-green-500 border-transparent" : ""}`}
                    >
                      {/* Cột trái: Icon/Màu sắc */}
                      <div
                        className={`w-24 h-24 flex flex-col items-center justify-center text-white p-2 ${isEligible ? "bg-green-500" : "bg-gray-400"}`}
                      >
                        <Ticket size={32} />
                        <span className="text-[10px] font-bold mt-1">
                          VOUCHER
                        </span>
                      </div>

                      {/* Cột phải: Thông tin */}
                      <div className="flex-1 p-3 pr-10">
                        <h3
                          className={`font-bold text-sm ${isEligible ? "text-gray-800" : "text-gray-500"}`}
                        >
                          {coupon.code}
                        </h3>
                        <p className="text-xs text-gray-600 mb-1">
                          {coupon.description}
                        </p>

                        {!isEligible ? (
                          <div className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                            <Info size={12} />
                            <span>
                              Mua thêm{" "}
                              {(coupon.minAmount - subtotal).toLocaleString()}đ
                              để sử dụng
                            </span>
                          </div>
                        ) : (
                          <p className="text-[10px] text-gray-400">
                            Đơn tối thiểu {coupon.minAmount.toLocaleString()}đ
                          </p>
                        )}
                      </div>

                      {/* Vòng tròn khuyết (tạo hiệu ứng vé) */}
                      <div className="absolute left-24 top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-50 rounded-full border-b border-gray-200"></div>
                      <div className="absolute left-24 bottom-0 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-gray-50 rounded-full border-t border-gray-200"></div>

                      {/* Radio check giả */}
                      {isEligible && (
                        <div
                          className={`absolute right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "bg-green-500 border-green-500" : "border-gray-300"}`}
                        >
                          {isSelected && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Thông báo kết quả */}
              {couponMessage && (
                <div
                  className={`mt-4 p-3 rounded text-sm font-medium ${couponMessage.includes("✓") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
                >
                  {couponMessage}
                </div>
              )}
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

                {/* <label className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
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
                </label> */}

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
                      <img
                        src={qrCodeImage}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                      {/* <p className="text-gray-600 text-sm">
                        Quét mã QR để thanh toán
                      </p> */}
                      {/* <p className="text-xs text-gray-500">
                        {total.toLocaleString("vi-VN")}đ
                      </p> */}
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
