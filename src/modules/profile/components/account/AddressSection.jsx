import { useState, useMemo } from "react";
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
import { addressApi } from "@/api/ecommerceApi";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import provinces from "@/modules/profile/components/account/AddressData/province_old.json";
import districts from "@/modules/profile/components/account/AddressData/district_old.json";
import wards from "@/modules/profile/components/account/AddressData/ward_old.json";

const provinceList = Object.values(provinces);
const districtList = Object.values(districts);
const wardList = Object.values(wards);

const AddressSection = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const queryClient = useQueryClient();

  // 1. Danh sách huyện sẽ thay đổi khi tỉnh thay đổi
  const availableDistricts = districtList.filter(d => d.parent_code === selectedProvince);

  // 2. Danh sách xã sẽ thay đổi khi huyện thay đổi
  const availableWards = wardList.filter(w => w.parent_code === selectedDistrict);

  // Hàm xử lý khi chọn Tỉnh
  const handleProvinceChange = (e) => {
    const selectedProvinceData = provinceList.find(p => p.code === e.target.value);
    setFormData(prev => ({
      ...prev,
      province: selectedProvinceData ? selectedProvinceData.name_with_type : ""
    }));
    setSelectedProvince(e.target.value);
    setSelectedDistrict(""); // Reset huyện khi đổi tỉnh
    setSelectedWard("");     // Reset xã khi đổi tỉnh
  };

  // Hàm xử lý khi chọn Huyện
  const handleDistrictChange = (e) => {
    const selectedDistrictData = districtList.find(d => d.code === e.target.value);
    setFormData(prev => ({
      ...prev,
      district: selectedDistrictData ? selectedDistrictData.name_with_type : ""
    }));
    setSelectedDistrict(e.target.value);
    setSelectedWard("");     // Reset xã khi đổi huyện
  };

  const handleWardChange = (e) => {
    const selectedWardData = availableWards.find(w => w.code === e.target.value);
    setFormData(prev => ({
      ...prev,
      commune: selectedWardData ? selectedWardData.name_with_type : ""
    }));
    setSelectedWard(e.target.value);
  };

  const provinceOptions = useMemo(() => provinceList.map(p => ({
    value: p.code,
    label: p.name_with_type
  })), []);

  const districtOptions = useMemo(() => availableDistricts.map(d => ({
    value: d.code,
    label: d.name_with_type
  })), [availableDistricts]);

  const wardOptions = useMemo(() => availableWards.map(w => ({
    value: w.code,
    label: w.name_with_type
  })), [availableWards]);

  // --- STATES QUẢN LÝ POPUP & FORM ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" | "edit"
  const [deleteConfirmId, setDeleteConfirmId] = useState(null); // ID của địa chỉ đang chờ xóa

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

  const { data: response, isLoading } = useQuery({
    queryKey: ["userAddresses"],
    queryFn: addressApi.getAddress,
  });

  const addresses = response?.detail || [];

  // --- LOGIC: Đẩy địa chỉ mặc định lên đầu ---
  const sortedAddresses = useMemo(() => {
    return [...addresses].sort(
      (a, b) => Number(b.isDefault) - Number(a.isDefault),
    );
  }, [addresses]);

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

  const setDefaultMutation = useMutation({
    mutationFn: (addr) =>
      addressApi.updateAddress(addr.addressId, { ...addr, isDefault: true }),
    onSuccess: () => {
      toast.success("Đã thay đổi địa chỉ mặc định");
      queryClient.invalidateQueries(["userAddresses"]);
    },
  });

  const handleSave = () => {
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
    const p = provinceList.find(item => item.name_with_type === addr.province);
    const d = districtList.find(item => item.name_with_type === addr.district);
    const w = wardList.find(item => item.name_with_type === addr.commune);

    setSelectedProvince(p ? p.code : "");
    setSelectedDistrict(d ? d.code : "");
    setSelectedWard(w ? w.code : "");

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
      {/* --- HEADER --- */}
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
        <Button onClick={openAddForm} className="shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Thêm địa chỉ mới
        </Button>
      </div>

      {/* --- DANH SÁCH ĐỊA CHỈ --- */}
      <div className="grid gap-4">
        {sortedAddresses.map((addr) => (
          <div
            key={addr.addressId}
            className={`p-5 rounded-xl border transition-all duration-200 hover:shadow-md ${addr.isDefault
              ? "border-primary/50 bg-primary/5"
              : "border-border bg-card"
              }`}
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-semibold text-foreground text-lg">
                    {addr.receiverName}
                  </span>
                  <span className="text-muted-foreground hidden sm:inline">
                    |
                  </span>
                  <span className="text-muted-foreground">
                    {addr.receiverPNum}
                  </span>
                  {addr.isDefault && (
                    <Badge
                      variant="default"
                      className="bg-primary text-primary-foreground text-xs ml-2"
                    >
                      Mặc định
                    </Badge>
                  )}
                </div>
                <div className="text-muted-foreground">
                  <p>{addr.detail}</p>
                  <p>
                    {addr.commune}, {addr.district}, {addr.province}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between gap-3 shrink-0 border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => openEditForm(addr)}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium transition-colors"
                  >
                    <Edit2 className="w-4 h-4" /> Cập nhật
                  </button>
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDeleteConfirmId(addr.addressId)}
                      className="text-destructive hover:text-red-700 flex items-center gap-1 text-sm font-medium transition-colors"
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
                    className="w-full sm:w-auto mt-auto"
                  >
                    Thiết lập mặc định
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        {addresses.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed rounded-xl border-border text-muted-foreground">
            Bạn chưa có địa chỉ nào. Hãy thêm một địa chỉ mới nhé!
          </div>
        )}
      </div>

      {/* --- MODAL THÊM / SỬA ĐỊA CHỈ --- */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/30">
              <h4 className="font-semibold text-lg text-foreground">
                {formMode === "add" ? "Thêm địa chỉ mới" : "Cập nhật địa chỉ"}
              </h4>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label>Họ tên</Label>
                <Input
                  value={formData.receiverName}
                  onChange={(e) =>
                    setFormData({ ...formData, receiverName: e.target.value })
                  }
                  placeholder="VD: Hồ Quốc Khương"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Số điện thoại</Label>
                <Input
                  value={formData.receiverPNum}
                  onChange={(e) =>
                    setFormData({ ...formData, receiverPNum: e.target.value })
                  }
                  placeholder="VD: 0987654321"
                />
              </div>

              <div className="space-y-1.5">
                <Label>Tỉnh/Thành phố</Label>
                <select
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {provinceList.map((prov) => (
                    <option key={prov.code} value={prov.code}>
                      {prov.name_with_type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label>Quận/Huyện</Label>
                <select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!selectedProvince}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {availableDistricts.map((dist) => (
                    <option key={dist.code} value={dist.code}>
                      {dist.name_with_type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label>Phường/Xã</Label>
                <select
                  value={selectedWard}
                  onChange={handleWardChange}
                  disabled={!selectedDistrict}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Chọn Phường/Xã</option>
                  {availableWards.map((ward) => (
                    <option key={ward.code} value={ward.code}>
                      {ward.name_with_type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label>Địa chỉ cụ thể</Label>
                <Input
                  value={formData.detail}
                  onChange={(e) =>
                    setFormData({ ...formData, detail: e.target.value })
                  }
                  placeholder="Số nhà, tên đường..."
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border flex justify-end gap-3 bg-muted/30">
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>
                Hủy
              </Button>
              <Button
                onClick={handleSave}
                disabled={addMutation.isPending || updateMutation.isPending}
              >
                {(addMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}{" "}
                Hoàn thành
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL XÁC NHẬN XÓA --- */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Xác nhận xóa
            </h3>
            <p className="text-muted-foreground mb-6">
              Bạn có chắc chắn muốn xóa địa chỉ này? Hành động này không thể
              hoàn tác.
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteConfirmId(null)}
              >
                Hủy bỏ
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => deleteMutation.mutate(deleteConfirmId)}
              >
                Xóa địa chỉ
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSection;
