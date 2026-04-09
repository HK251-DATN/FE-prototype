import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { orderApi } from "@/api/ecommerceApi";

const statusLabelMap = {
  PENDING: "Chờ xử lý",
  PAID: "Đã thanh toán",
  CONFIRMED: "Đã xác nhận",
  PACKAGED: "Đã đóng gói",
  SHIPPED: "Đang giao",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
};

const OrderDetail = ({ orderId, onBack }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await orderApi.getOrderDetail(orderId);
        if (res.detail) {
          setOrder(res.detail);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [orderId]);

  if (loading) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 lg:p-8 text-center text-muted-foreground">
        Đang tải thông tin chi tiết đơn hàng...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 lg:p-8 text-center text-red-500">
        Không tìm thấy thông tin đơn hàng
        <br />
        <Button onClick={onBack} variant="outline" className="mt-4">
          Quay lại
        </Button>
      </div>
    );
  }

  const subtotal = order.orderItems?.reduce(
    (s, p) => s + (p.unitPriceAtPurchase || 0) * p.quantity,
    0
  ) || 0;

  // Fake tracking steps based on status logic (can be improved)
  const steps = [
    { label: "Chờ xử lý", completed: true },
    { label: "Đã xác nhận", completed: ["CONFIRMED", "PACKAGED", "SHIPPED", "COMPLETED"].includes(order.status) },
    { label: "Đóng gói", completed: ["PACKAGED", "SHIPPED", "COMPLETED"].includes(order.status) },
    { label: "Đang giao", completed: ["SHIPPED", "COMPLETED"].includes(order.status) },
    { label: "Hoàn thành", completed: order.status === "COMPLETED" },
  ];
  if (order.status === "CANCELLED") {
    steps.push({ label: "Đã hủy", completed: true });
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-foreground">
            Chi tiết đơn hàng
          </h3>
          <span className="text-sm text-muted-foreground">
            · {new Date(order.createdAt).toLocaleDateString("vi-VN")} · {order.orderItems?.length || 0} sản phẩm
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
          <p className="text-sm font-medium text-foreground">Địa chỉ ID: {order.addressId}</p>
          <p className="text-xs text-muted-foreground">
            (Thông tin chi tiết địa chỉ sẽ được hiển thị khi tích hợp API Address)
          </p>
        </div>
        <div className="border border-border rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Mã đơn hàng:</span>
            <span className="font-medium text-foreground">#{order.orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Trạng thái:</span>
            <span className="font-medium text-foreground">
              {statusLabelMap[order.status] || order.status}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tổng cộng:</span>
            <span className="font-medium text-foreground">
              {subtotal.toLocaleString()}đ
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Vận chuyển:</span>
            <span className="font-medium text-foreground">
              Miễn phí
            </span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-border">
            <span className="font-semibold text-foreground">Thành tiền:</span>
            <span className="font-bold text-lg text-primary">
              {order.totalPrice ? order.totalPrice.toLocaleString() : 0}đ
            </span>
          </div>
        </div>
      </div>

      {/* Tracking */}
      {order.status !== "CANCELLED" && (
        <div className="mb-8">
          <div className="flex items-center justify-between relative py-4">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all"
              style={{
                width: `${((steps.filter((s) => s.completed).length - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
            {steps.map((step, i) => (
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div>
        <div className="hidden md:grid grid-cols-4 gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
          <span>Sản phẩm</span>
          <span className="text-center">Đơn giá</span>
          <span className="text-center">Số lượng</span>
          <span className="text-right">Thành tiền</span>
        </div>
        <div className="divide-y divide-border">
          {order.orderItems?.map((product, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 py-4 items-center"
            >
              <div className="flex items-center gap-3">
                {/* Fallback image if product detail is not fullly joined */}
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500 shrink-0">
                  Ảnh SP
                </div>
                <span className="text-sm font-medium text-foreground">
                  {product.productName || `Sản phẩm lô ${product.batchDetailId}`}
                </span>
              </div>
              <span className="text-sm text-muted-foreground md:text-center">
                {product.unitPriceAtPurchase ? product.unitPriceAtPurchase.toLocaleString() : 0}đ
              </span>
              <span className="text-sm text-muted-foreground md:text-center">
                x{product.quantity}
              </span>
              <span className="text-sm font-medium text-foreground md:text-right">
                {product.totalPrice ? product.totalPrice.toLocaleString() : 0}đ
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end mt-6">
        <Button variant="outline">Liên hệ hỗ trợ</Button>
      </div>
    </div>
  );
};

export default OrderDetail;
