import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ticket, Copy } from "lucide-react";
import { mockVouchers } from "@/data/mockData";
import { toast } from "sonner";

const VoucherSection = () => {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Đã sao chép mã voucher!");
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Ticket className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Kho voucher</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockVouchers.map((voucher) => (
          <div
            key={voucher.id}
            className={`relative border rounded-xl overflow-hidden transition-all ${
              voucher.used
                ? "border-border opacity-60"
                : "border-primary/30 hover:shadow-md hover:shadow-primary/5"
            }`}
          >
            <div className="flex">
              <div
                className={`w-24 shrink-0 flex flex-col items-center justify-center ${voucher.used ? "bg-muted" : "bg-primary"} p-3`}
              >
                <span
                  className={`text-2xl font-bold ${voucher.used ? "text-muted-foreground" : "text-primary-foreground"}`}
                >
                  {voucher.discount > 100
                    ? `${(voucher.discount / 1000).toFixed(0)}k`
                    : `${voucher.discount}%`}
                </span>
                <span
                  className={`text-[10px] uppercase ${voucher.used ? "text-muted-foreground" : "text-primary-foreground/80"}`}
                >
                  Giảm
                </span>
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {voucher.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Đơn tối thiểu: {voucher.minOrder.toLocaleString()}đ
                  </p>
                  <p className="text-xs text-muted-foreground">
                    HSD: {voucher.expiry}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <Badge variant="outline" className="font-mono text-xs">
                    {voucher.code}
                  </Badge>
                  {voucher.used ? (
                    <span className="text-xs text-muted-foreground">
                      Đã dùng
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyCode(voucher.code)}
                      className="text-primary hover:text-primary"
                    >
                      <Copy className="w-3 h-3 mr-1" /> Sao chép
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoucherSection;
