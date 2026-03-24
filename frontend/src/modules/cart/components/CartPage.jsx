import { useState } from "react";
import { useCart } from "./CartContext";

// ─────────────────────────────────────────────
// CartPage — Giỏ hàng của tôi
// ─────────────────────────────────────────────

const formatPrice = (n) => `$${n.toFixed(2)}`;

function QuantityControl({ value, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden select-none">
      <button
        onClick={onDecrease}
        className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors text-lg font-light"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold text-gray-700">
        {value}
      </span>
      <button
        onClick={onIncrease}
        className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors text-lg font-light"
      >
        +
      </button>
    </div>
  );
}

export default function CartPage({ onReturnToShop }) {
  const {
    items,
    coupon,
    subtotal,
    discount,
    shipping,
    total,
    updateQuantity,
    removeItem,
    applyCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);
  const [applying, setApplying] = useState(false);
  // Local draft to track unsaved quantity changes
  const [draft, setDraft] = useState({});

  const handleQtyChange = (cartItemId, delta, currentQty) => {
    const next = Math.max(1, currentQty + delta);
    setDraft((d) => ({ ...d, [cartItemId]: next }));
  };

  const getQty = (item) =>
    draft[item.cartItemId] !== undefined
      ? draft[item.cartItemId]
      : item.quantity;

  const handleUpdateCart = () => {
    Object.entries(draft).forEach(([cartItemId, qty]) => {
      updateQuantity(cartItemId, qty);
    });
    setDraft({});
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplying(true);
    const result = await applyCoupon(couponCode.trim());
    setCouponMsg(
      result ? `✓ Áp dụng thành công: ${result.label}` : "✗ Mã không hợp lệ",
    );
    setApplying(false);
  };

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-10 px-4">
      {/* Page title */}
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8 tracking-tight">
        Giỏ hàng của tôi
      </h1>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        {/* ── Left: Cart Table ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="grid grid-cols-[2fr_1fr_1.2fr_1fr_auto] gap-4 px-6 py-3 border-b border-gray-100">
              {["PRODUCT", "PRICE", "QUANTITY", "SUBTOTAL", ""].map((h, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold text-gray-400 tracking-widest uppercase"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Empty state */}
            {isEmpty && (
              <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
                <svg
                  className="w-14 h-14 text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <p className="font-medium text-gray-500">Giỏ hàng trống</p>
                <p className="text-sm">Hãy thêm sản phẩm vào giỏ hàng</p>
              </div>
            )}

            {/* Items */}
            {items.map((item, idx) => {
              const qty = getQty(item);
              const subtotalItem = item.price * qty;
              return (
                <div
                  key={item.cartItemId}
                  className={`grid grid-cols-[2fr_1fr_1.2fr_1fr_auto] gap-4 items-center px-6 py-4 transition-colors hover:bg-gray-50 ${
                    idx !== items.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  {/* Product */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                      <img
                        src={
                          item.image ||
                          "https://placehold.co/56x56/f0fdf4/22c55e?text=🥬"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-700 text-sm truncate">
                      {item.name}
                    </span>
                  </div>

                  {/* Price */}
                  <span className="text-sm text-gray-600 font-medium">
                    {formatPrice(item.price)}
                  </span>

                  {/* Quantity */}
                  <QuantityControl
                    value={qty}
                    onDecrease={() => handleQtyChange(item.cartItemId, -1, qty)}
                    onIncrease={() => handleQtyChange(item.cartItemId, 1, qty)}
                  />

                  {/* Subtotal */}
                  <span className="text-sm font-semibold text-gray-700">
                    {formatPrice(subtotalItem)}
                  </span>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.cartItemId)}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-300 hover:text-red-400 hover:bg-red-50 transition-all flex-shrink-0"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}

            {/* Footer buttons */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <button
                onClick={onReturnToShop}
                className="text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-full transition-colors"
              >
                Return to shop
              </button>
              <button
                onClick={handleUpdateCart}
                disabled={Object.keys(draft).length === 0}
                className="text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 rounded-full transition-colors"
              >
                Update Cart
              </button>
            </div>
          </div>

          {/* Coupon */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-bold text-gray-800 text-sm whitespace-nowrap">
                Coupon Code
              </span>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setCouponMsg(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                placeholder="Enter code"
                className="flex-1 min-w-0 border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all placeholder-gray-300"
              />
              <button
                onClick={handleApplyCoupon}
                disabled={applying}
                className="bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {applying ? "Đang áp dụng..." : "Apply Coupon"}
              </button>
            </div>
            {couponMsg && (
              <p
                className={`mt-2 text-xs font-medium pl-1 ${
                  couponMsg.startsWith("✓") ? "text-green-500" : "text-red-400"
                }`}
              >
                {couponMsg}
              </p>
            )}
          </div>
        </div>

        {/* ── Right: Cart Total ── */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Cart Total</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-500">Subtotal:</span>
                <span className="font-semibold text-gray-700">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-500">Discount:</span>
                  <span className="font-semibold text-green-500">
                    −{formatPrice(discount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-500">Shipping:</span>
                <span className="font-semibold text-gray-700">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="font-semibold text-gray-700">Total:</span>
                <span className="font-bold text-gray-900 text-base">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <button className="mt-6 w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-green-200 text-sm">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
