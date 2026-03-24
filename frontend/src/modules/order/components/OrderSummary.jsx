import { useState } from "react";

// ── Mock data – replace with real API data when available ──────────────────

const MOCK_ORDER = {
  items: [
    {
      id: "1",
      name: "Green Capsicum",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/4ce632756fe34fd63396f0d4e1a32019ccc340da?width=120",
      quantity: 5,
      unitPrice: 14,
    },
    {
      id: "2",
      name: "Red Capsicum",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d49eaf6a8bca8911e6d815e83f5b65e75e488d4d?width=120",
      quantity: 1,
      unitPrice: 14,
    },
  ],
  shipping: "free",
  paymentMethod: "cod",
};

const PAYMENT_OPTIONS = [
  { value: "cod", label: "Thanh toán khi nhận hàng" },
  { value: "paypal", label: "Chuyển khoản" },
];

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

export default function OrderSummary({ data = MOCK_ORDER, onPlaceOrder }) {
  const [paymentMethod, setPaymentMethod] = useState(data.paymentMethod);

  const subtotal = data.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const shippingCost = data.shipping === "free" ? 0 : data.shipping;
  const total = subtotal + shippingCost;

  return (
    <div className="font-[Poppins] w-full rounded-[8px] border border-[#E6E6E6] bg-white p-6 flex flex-col gap-6">
      {/* ── Order Summary ── */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium text-[#1A1A1A]">Order Summery</h2>

        {/* Product list */}
        <div className="flex flex-col">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[60px] h-[60px] object-cover rounded"
                />
                <span className="text-sm text-[#1A1A1A]">{item.name}</span>
                <span className="text-sm text-[#1A1A1A]">x{item.quantity}</span>
              </div>
              <span className="text-sm font-medium text-[#1A1A1A]">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex flex-col gap-px">
          {/* Subtotal */}
          <div className="flex justify-between items-center py-3 bg-white">
            <span className="text-sm text-[#4D4D4D]">Tổng cộng:</span>
            <span className="text-sm font-medium text-[#1A1A1A]">
              {formatPrice(subtotal)}
            </span>
          </div>

          <div className="w-full h-px bg-[#E6E6E6]" />

          {/* Shipping */}
          <div className="flex justify-between items-center py-3 bg-white">
            <span className="text-sm text-[#4D4D4D]">Phí vận chuyển:</span>
            <span className="text-sm font-medium text-[#1A1A1A]">
              {data.shipping === "free"
                ? "Miễn phí"
                : formatPrice(shippingCost)}
            </span>
          </div>

          <div className="w-full h-px bg-[#E6E6E6]" />

          {/* Total */}
          <div className="flex justify-between items-center pt-3 bg-white">
            <span className="text-base text-[#4D4D4D]">Total:</span>
            <span className="text-lg font-semibold text-[#1A1A1A]">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Payment Method ── */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium text-[#1A1A1A]">
          Phương thức thanh toán
        </h2>

        <div className="flex flex-col gap-[10px]">
          {PAYMENT_OPTIONS.map((option) => {
            const checked = paymentMethod === option.value;
            return (
              <label
                key={option.value}
                className="flex items-center gap-[6px] cursor-pointer"
                onClick={() => setPaymentMethod(option.value)}
              >
                {/* Radio */}
                <div className="relative w-5 h-5 flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border ${
                      checked
                        ? "border-[#00B207] border-[1.5px]"
                        : option.value === "paypal"
                          ? "border-[#00B207]"
                          : "border-[#CCC]"
                    } bg-white`}
                  />
                  {checked && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00B207]" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    checked ? "text-[#4D4D4D]" : "text-[#4D4D4D]"
                  }`}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ── Place Order button ── */}
      <button
        onClick={() => onPlaceOrder?.(paymentMethod)}
        className="w-full py-4 rounded-[43px] bg-[#00B207] text-white text-base font-semibold leading-[120%] hover:bg-[#009a06] active:bg-[#008a05] transition-colors"
      >
        Đặt hàng
      </button>
    </div>
  );
}
