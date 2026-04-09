import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  MapPin,
  X,
  AlertTriangle,
  Edit2,
  Trash2,
  Loader2,
} from "lucide-react";
import addressApi from "@/api/ecommerceApi"; // Đảm bảo đường dẫn này đúng
import { toast } from "react-toastify";

// Giữ lại locationData để phục vụ dropdown chọn Tỉnh/Huyện/Xã
const locationData = {
  "TP HCM": {
    "Thu Duc": ["Linh Trung", "Linh Tây", "Tam Phú"],
    "Quận 1": ["Phường Bến Nghé", "Phường Bến Thành"],
  },
  "TP Binh Duong": {
    "Lai Thieu": ["Linh Trung", "Vĩnh Phú"],
  },
};

const AddressSection = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    addressId: "",
    receiverName: "",
    receiverPNum: "",
    detail: "",
    province: "",
    district: "",
    commune: "",
    isDefault: false,
  });

  // --- 1. GET ADDRESSES ---
  const { data: response, isLoading } = useQuery({
    queryKey: ["userAddresses"],
    queryFn: addressApi.getAddress,
  });

  const addresses = response?.detail || [];

  // Đẩy địa chỉ mặc định lên đầu
  const sortedAddresses = useMemo(() => {
    return [...addresses].sort(
      (a, b) => Number(b.isDefault) - Number(a.isDefault),
    );
  }, [addresses]);

  // --- 2. MUTATIONS ---
  const addMutation = useMutation({
    mutationFn: addressApi.addAddress,
    onSuccess: () => {
      toast.success("Thêm địa chỉ mới thành công!");
      queryClient.invalidateQueries(["userAddresses"]);
      setIsFormOpen(false);
    },
    onError: () => toast.error("Không thể thêm địa chỉ!"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => addressApi.updateAddress(id, data),
    onSuccess: () => {
      toast.success("Cập nhật địa chỉ thành công!");
      queryClient.invalidateQueries(["userAddresses"]);
      setIsFormOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: addressApi.deleteAddress,
    onSuccess: () => {
      toast.success("Đã xóa địa chỉ!");
      queryClient.invalidateQueries(["userAddresses"]);
      setDeleteConfirmId(null);
    },
  });

  // Logic đặc biệt cho "Thiết lập mặc định" (thường là một API PUT update field isDefault)
  const setDefaultMutation = useMutation({
    mutationFn: (addr) =>
      addressApi.updateAddress(addr.addressId, { ...addr, isDefault: true }),
    onSuccess: () => {
      toast.success("Đã thay đổi địa chỉ mặc định");
      queryClient.invalidateQueries(["userAddresses"]);
    },
  });

  // --- 3. FORM HANDLERS ---
  const provinces = Object.keys(locationData);
  const districts = formData.province
    ? Object.keys(locationData[formData.province] || {})
    : [];
  const wards =
    formData.province && formData.district
      ? locationData[formData.province][formData.district]
      : [];

  const handleSave = () => {
    // Validate cơ bản
    if (!formData.receiverName || !formData.receiverPNum) {
      return toast.warning("Vui lòng điền đầy đủ thông tin!");
    }

    if (formMode === "add") {
      addMutation.mutate(formData);
    } else {
      updateMutation.mutate({ id: formData.addressId, data: formData });
    }
  };

  const openEditForm = (addr) => {
    setFormData(addr);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setFormData({
      addressId: "",
      receiverName: "",
      receiverPNum: "",
      detail: "",
      province: "",
      district: "",
      commune: "",
      isDefault: false,
    });
    setFormMode("add");
    setIsFormOpen(true);
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );

  return (
    <div className="bg-card rounded-xl border border-border p-6 lg:p-8 relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-full">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Địa chỉ của tôi
            </h3>
            <p className="text-sm text-muted-foreground">
              Quản lý địa chỉ nhận hàng của bạn
            </p>
          </div>
        </div>
        <Button onClick={openAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm địa chỉ mới
        </Button>
      </div>

      <div className="grid gap-4">
        {sortedAddresses.map((addr) => (
          <div
            key={addr.addressId}
            className={`p-5 rounded-xl border transition-all ${addr.isDefault ? "border-primary/50 bg-primary/5" : "border-border bg-card"}`}
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-semibold text-foreground text-lg">
                    {addr.receiverName}
                  </span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">
                    {addr.receiverPNum}
                  </span>
                  {addr.isDefault && (
                    <Badge className="bg-primary">Mặc định</Badge>
                  )}
                </div>
                <div className="text-muted-foreground">
                  <p>{addr.detail}</p>
                  <p>
                    {addr.commune}, {addr.district}, {addr.province}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between gap-3 shrink-0 sm:border-l border-border sm:pl-4 pt-4 sm:pt-0">
                <div className="flex gap-3">
                  <button
                    onClick={() => openEditForm(addr)}
                    className="text-blue-600 flex items-center gap-1 text-sm"
                  >
                    <Edit2 className="w-4 h-4" /> Cập nhật
                  </button>
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDeleteConfirmId(addr.addressId)}
                      className="text-destructive flex items-center gap-1 text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Xóa
                    </button>
                  )}
                </div>
                {!addr.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDefaultMutation.mutate(addr)}
                  >
                    Thiết lập mặc định
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL FORM */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-semibold text-lg">
                {formMode === "add" ? "Thêm địa chỉ mới" : "Cập nhật địa chỉ"}
              </h4>
              <button onClick={() => setIsFormOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="space-y-1.5">
                <Label>Họ tên người nhận</Label>
                <Input
                  value={formData.receiverName}
                  onChange={(e) =>
                    setFormData({ ...formData, receiverName: e.target.value })
                  }
                  placeholder="VD: Anh Khôi"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Số điện thoại</Label>
                <Input
                  value={formData.receiverPNum}
                  onChange={(e) =>
                    setFormData({ ...formData, receiverPNum: e.target.value })
                  }
                  placeholder="VD: 034..."
                />
              </div>
              <div className="space-y-1.5">
                <Label>Tỉnh/Thành phố</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.province}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      province: e.target.value,
                      district: "",
                      commune: "",
                    })
                  }
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Quận/Huyện</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  disabled={!formData.province}
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      district: e.target.value,
                      commune: "",
                    })
                  }
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Phường/Xã (Commune)</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  disabled={!formData.district}
                  value={formData.commune}
                  onChange={(e) =>
                    setFormData({ ...formData, commune: e.target.value })
                  }
                >
                  <option value="">Chọn Phường/Xã</option>
                  {wards.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Địa chỉ cụ thể (Detail)</Label>
                <Input
                  value={formData.detail}
                  onChange={(e) =>
                    setFormData({ ...formData, detail: e.target.value })
                  }
                  placeholder="Số nhà, tên đường..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>
                Hủy
              </Button>
              <Button
                onClick={handleSave}
                disabled={addMutation.isPending || updateMutation.isPending}
              >
                {(addMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Hoàn thành
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRM DELETE */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card w-full max-w-md rounded-2xl p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Xác nhận xóa</h3>
            <p className="text-muted-foreground mb-6">
              Bạn có chắc muốn xóa địa chỉ này?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteConfirmId(null)}
              >
                Hủy
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => deleteMutation.mutate(deleteConfirmId)}
              >
                Xác nhận Xóa
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSection;
