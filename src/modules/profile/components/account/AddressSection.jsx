import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, X } from "lucide-react";
import { mockAddresses, Address } from "@/data/mockData";

const AddressSection = () => {
  const [addresses, setAddresses] = useState<Address>(mockAddresses);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", phone: "", address: "", ward: "", district: "", province: "" });

  const setDefault = (id) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const addAddress = () => {
    const addr = { ...newAddress, id: Date.now().toString(), isDefault: false };
    setAddresses([...addresses, addr]);
    setNewAddress({ name: "", phone: "", address: "", ward: "", district: "", province: "" });
    setShowForm(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Địa chỉ của tôi</h3>
        </div>
        <Button onClick={() => setShowForm(true)} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Thêm địa chỉ mới
        </Button>
      </div>

      {showForm && (
        <div className="border border-primary/30 bg-accent/30 rounded-xl p-5 mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-foreground">Địa chỉ mới</h4>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Họ tên</Label>
              <Input value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Số điện thoại</Label>
              <Input value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label className="text-xs text-muted-foreground">Địa chỉ cụ thể</Label>
              <Input value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Phường/Xã</Label>
              <Input value={newAddress.ward} onChange={(e) => setNewAddress({ ...newAddress, ward: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Quận/Huyện</Label>
              <Input value={newAddress.district} onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Tỉnh/Thành phố</Label>
              <Input value={newAddress.province} onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })} />
            </div>
          </div>
          <Button onClick={addAddress} size="sm">Lưu địa chỉ</Button>
        </div>
      )}

      <div className="divide-y divide-border">
        {addresses.map((addr) => (
          <div key={addr.id} className="py-5 first:pt-0 last:pb-0">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{addr.name}</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground text-sm">{addr.phone}</span>
                </div>
                <p className="text-sm text-muted-foreground">{addr.address}</p>
                <p className="text-sm text-muted-foreground">{addr.ward}, {addr.district}, {addr.province}</p>
                {addr.isDefault && (
                  <Badge variant="outline" className="mt-2 border-primary text-primary text-xs">Mặc định</Badge>
                )}
              </div>
              <div className="flex items-start gap-3 text-sm shrink-0">
                <button className="text-primary hover:underline font-medium">Cập nhật</button>
                {!addr.isDefault && (
                  <button onClick={() => deleteAddress(addr.id)} className="text-destructive hover:underline font-medium">Xóa</button>
                )}
                {!addr.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => setDefault(addr.id)}>Thiết lập mặc định</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressSection;
