import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { mockOrders, Order } from "@/data/mockData";
import OrderDetail from "./OrderDetail";

const statusMap = {
  processing: {
    label: "Đang xử lý",
    className: "bg-warning/10 text-warning border-warning/30",
  },
  shipping: {
    label: "Đang giao",
    className: "bg-primary/10 text-primary border-primary/30",
  },
  completed: {
    label: "Hoàn thành",
    className: "bg-success/10 text-success border-success/30",
  },
  cancelled: {
    label: "Đã hủy",
    className: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

const statusTabs = [
  { id: "all", label: "Tất cả" },
  { id: "processing", label: "Đang xử lý" },
  { id: "shipping", label: "Đang giao" },
  { id: "completed", label: "Hoàn thành" },
  { id: "cancelled", label: "Đã hủy" },
];

const OrdersSection = () => {
  const [activeStatus, setActiveStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = (useState < Order) | (null > null);

  const filteredOrders =
    activeStatus === "all"
      ? mockOrders
      : mockOrders.filter((o) => o.status === activeStatus);

  if (selectedOrder) {
    return (
      <OrderDetail
        order={selectedOrder}
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

        <div className="divide-y divide-border">
          {filteredOrders.map((order) => {
            const status = statusMap[order.status];
            return (
              <div
                key={order.id}
                className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 py-4 items-center"
              >
                <span className="font-semibold text-foreground">
                  {order.id}
                </span>
                <span className="text-sm text-muted-foreground">
                  {order.date}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {order.total.toLocaleString()}đ{" "}
                  <span className="text-muted-foreground">
                    ({order.productCount} SP)
                  </span>
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
        </div>

        {filteredOrders.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            Không có đơn hàng nào.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersSection;
