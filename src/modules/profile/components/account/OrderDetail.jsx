import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { Order } from "@/data/mockData";

const OrderDetail = ({ order, onBack }) => {
  const subtotal = order.products.reduce((s, p) => s + p.price * p.quantity, 0);

  return (
    <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-foreground">
            Chi tiết đơn hàng
          </h3>
          <span className="text-sm text-muted-foreground">
            · {order.date} · {order.productCount} sản phẩm
          </span>
        </div>
        <button
          onClick={onBack}
          className="text-primary font-medium text-sm hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border border-border rounded-xl p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Địa chỉ nhận hàng
          </p>
          <p className="text-sm font-medium text-foreground">Hồ Quốc Khương</p>
          <p className="text-xs text-muted-foreground">
            {order.shippingAddress}
          </p>
        </div>
        <div className="border border-border rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Mã đơn hàng:</span>
            <span className="font-medium text-foreground">{order.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Thanh toán:</span>
            <span className="font-medium text-foreground">
              {order.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tổng cộng:</span>
            <span className="font-medium text-foreground">
              {subtotal.toLocaleString()}đ
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Giảm giá:</span>
              <span className="font-medium text-primary">
                {order.discount}%
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Vận chuyển:</span>
            <span className="font-medium text-foreground">
              {order.shippingFee === 0
                ? "Miễn phí"
                : `${order.shippingFee.toLocaleString()}đ`}
            </span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-border">
            <span className="font-semibold text-foreground">Thành tiền:</span>
            <span className="font-bold text-lg text-primary">
              {order.total.toLocaleString()}đ
            </span>
          </div>
        </div>
      </div>

      {/* Tracking */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative py-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all"
            style={{
              width: `${((order.trackingSteps.filter((s) => s.completed).length - 1) / (order.trackingSteps.length - 1)) * 100}%`,
            }}
          />
          {order.trackingSteps.map((step, i) => (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                  step.completed
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                {step.completed ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </div>
              <span
                className={`text-xs font-medium text-center max-w-[80px] ${step.completed ? "text-primary" : "text-muted-foreground"}`}
              >
                {step.label}
              </span>
              {step.date && (
                <span className="text-[10px] text-muted-foreground">
                  {step.date}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <div className="hidden md:grid grid-cols-4 gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
          <span>Sản phẩm</span>
          <span className="text-center">Đơn giá</span>
          <span className="text-center">Số lượng</span>
          <span className="text-right">Thành tiền</span>
        </div>
        <div className="divide-y divide-border">
          {order.products.map((product, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 py-4 items-center"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{product.image}</span>
                <span className="text-sm font-medium text-foreground">
                  {product.name}
                </span>
              </div>
              <span className="text-sm text-muted-foreground md:text-center">
                {product.price.toLocaleString()}đ
              </span>
              <span className="text-sm text-muted-foreground md:text-center">
                x{product.quantity}
              </span>
              <span className="text-sm font-medium text-foreground md:text-right">
                {(product.price * product.quantity).toLocaleString()}đ
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end mt-6">
        <Button variant="outline">Liên hệ người bán</Button>
        <Button>Mua lại</Button>
      </div>
    </div>
  );
};

export default OrderDetail;
