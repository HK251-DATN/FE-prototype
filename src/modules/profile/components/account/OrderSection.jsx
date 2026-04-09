import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import OrderDetail from "./OrderDetail";
import { orderApi } from "@/api/ecommerceApi";

const statusMap = {
  PENDING: {
    label: "Chờ xử lý",
    className: "bg-warning/10 text-warning border-warning/30",
  },
  PAID: {
    label: "Đã thanh toán",
    className: "bg-info/10 text-info border-info/30",
  },
  CONFIRMED: {
    label: "Đã xác nhận",
    className: "bg-warning/10 text-warning border-warning/30",
  },
  PACKAGED: {
    label: "Đã đóng gói",
    className: "bg-primary/10 text-primary border-primary/30",
  },
  SHIPPED: {
    label: "Đang giao",
    className: "bg-primary/10 text-primary border-primary/30",
  },
  COMPLETED: {
    label: "Hoàn thành",
    className: "bg-success/10 text-success border-success/30",
  },
  CANCELLED: {
    label: "Đã hủy",
    className: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

const statusTabs = [
  { id: "ALL", label: "Tất cả" },
  { id: "PENDING", label: "Chờ xử lý" },
  { id: "SHIPPED", label: "Đang giao" },
  { id: "COMPLETED", label: "Hoàn thành" },
  { id: "CANCELLED", label: "Đã hủy" },
];

const OrdersSection = () => {
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await orderApi.getOrders(1, 100);
        if (res.detail) {
          setOrders(res.detail);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders =
    activeStatus === "ALL"
      ? orders
      : orders.filter((o) => o.status === activeStatus);

  if (selectedOrder) {
    return (
      <OrderDetail
        orderId={selectedOrder.orderId}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="border-b border-border flex overflow-x-auto">
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveStatus(tab.id)}
            className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeStatus === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-5">
          Lịch sử đơn hàng
        </h3>

        {/* Header */}
        <div className="hidden md:grid grid-cols-5 gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
          <span>Mã đơn</span>
          <span>Ngày</span>
          <span>Tổng tiền</span>
          <span>Trạng thái</span>
          <span className="text-right">Chi tiết</span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-muted-foreground">Đang tải...</div>
        ) : (
          <div className="divide-y divide-border">
            {filteredOrders.map((order) => {
              const status = statusMap[order.status] || statusMap["PENDING"];
              return (
                <div
                  key={order.orderId}
                  className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 py-4 items-center"
                >
                  <span className="font-semibold text-foreground">
                    #{order.orderId}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {order.totalPrice ? order.totalPrice.toLocaleString() : 0}đ
                  </span>
                  <Badge variant="outline" className={status.className}>
                    {status.label}
                  </Badge>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-sm text-primary font-medium hover:underline md:text-right"
                  >
                    Xem chi tiết
                  </button>
                </div>
              );
            })}

            {filteredOrders.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                Không có đơn hàng nào.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersSection;
