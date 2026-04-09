// import { useState, useEffect, useRef } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { format, parseISO } from "date-fns";
// import { Camera, Loader2, CalendarDays } from "lucide-react";
// import buyerApi from "@/api/buyerApi";
// import { toast } from "react-toastify";

// const ProfileSection = () => {
//   const fileInputRef = useRef(null);
//   const queryClient = useQueryClient();
//   const [profile, setProfile] = useState({
//     fName: "",
//     lName: "",
//     dob: "",
//     pNum: "",
//     gender: "",
//     hobbies: "Chưa có thông tin",
//     email: "",
//     avtUrl: "",
//   });

//   const { data: respone, isLoading } = useQuery({
//     queryKey: ["buyerProfile"],
//     queryFn: buyerApi.getProfile,
//   });

//   useEffect(() => {
//     if (respone?.detail) {
//       setProfile(respone.detail);
//     }
//   }, [respone]);

//   // 3. Xử lý cập nhật
//   const mutation = useMutation({
//     mutationFn: (newData) => buyerApi.updateProfile(newData),
//     onSuccess: () => {
//       toast.success("Cập nhật hồ sơ thành công!");
//       queryClient.invalidateQueries(["buyerProfile"]);
//     },
//     onError: () => {
//       toast.error("Cập nhật hồ sơ thất bại. Vui lòng thử lại.");
//     },
//   });
//   const avatarMutation = useMutation({
//     mutationFn: (formData) => buyerApi.updateAvatar(formData),
//     onSuccess: () => {
//       toast.success("Cập nhật ảnh đại diện thành công!");
//       queryClient.invalidateQueries(["buyerProfile"]); // Load lại profile để hiện ảnh mới
//     },
//     onError: () => toast.error("Upload ảnh thất bại!"),
//   });

//   const handleChange = (nameOrEvent, value) => {
//     if (nameOrEvent?.target) {
//       // Dùng cho Input (nhận event)
//       const { name, value } = nameOrEvent.target;
//       setProfile((prev) => ({ ...prev, [name]: value }));
//     } else {
//       // Dùng cho Select (nhận name và value trực tiếp)
//       setProfile((prev) => ({ ...prev, [nameOrEvent]: value }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // 1. Kiểm tra định dạng (Optional)
//       if (!file.type.startsWith("image/")) {
//         return toast.error("Vui lòng chọn file ảnh!");
//       }

//       // 2. Tạo FormData để gửi đi (khớp với Postman của bạn)
//       const formData = new FormData();
//       formData.append("file", file); // Key 'file' phải khớp với Postman

//       // 3. Gọi API
//       avatarMutation.mutate(formData);
//     }
//   };

//   const formatDateVN = (dateStr) => {
//     if (!dateStr) return "Chưa cập nhật";
//     try {
//       return format(parseISO(dateStr), "dd/MM/yyyy");
//     } catch {
//       return dateStr;
//     }
//   };

//   const handleSubmit = () => {
//     const updateData = {
//       fName: profile.fName,
//       lName: profile.lName,
//       dob: profile.dob,
//       pNum: profile.pNum,
//       gender: profile.gender,
//       // hobbies: profile.hobbies //
//     };
//     mutation.mutate(updateData);
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center p-20">
//         <Loader2 className="animate-spin" />
//       </div>
//     );

//   return (
//     <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
//       <h3 className="text-xl font-semibold text-foreground mb-6">
//         Thông tin cá nhân
//       </h3>
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div className="space-y-2">
//             <Label className="text-xs uppercase">Họ</Label>
//             <Input name="fName" value={profile.fName} onChange={handleChange} />
//           </div>
//           <div className="space-y-2">
//             <Label className="text-muted-foreground text-xs uppercase tracking-wide">
//               Tên
//             </Label>
//             <Input name="lName" value={profile.lName} onChange={handleChange} />
//           </div>
//           <div className="space-y-2">
//             <Label className="text-muted-foreground text-xs uppercase tracking-wide">
//               Ngày sinh
//             </Label>
//             <Input
//               type="date"
//               name="dob"
//               value={profile.dob}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="space-y-2 md:col-span-1">
//             <Label className="text-muted-foreground text-xs uppercase tracking-wide">
//               Giới tính
//             </Label>
//             <Select
//               value={profile.gender}
//               onValueChange={(value) => handleChange("gender", value)}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Chọn giới tính" />
//               </SelectTrigger>
//               <SelectContent
//                 className="w-[var(--radix-select-trigger-width)]"
//                 position="popper"
//                 sideOffset={1}
//               >
//                 <SelectItem value="MALE">Nam</SelectItem>
//                 <SelectItem value="FEMALE">Nữ</SelectItem>
//                 <SelectItem value="OTHER">Khác</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label className="text-muted-foreground text-xs uppercase tracking-wide">
//               Số điện thoại
//             </Label>
//             <Input name="pNum" value={profile.pNum} onChange={handleChange} />
//           </div>
//           <div className="space-y-2">
//             <Label className="text-muted-foreground text-xs uppercase tracking-wide">
//               Email
//             </Label>
//             <Input
//               name="email"
//               value={profile.email}
//               disabled
//               className="bg-gray-100"
//             />
//           </div>
//           <div className="space-y-2 md:col-span-2">
//             <Label className="text-muted-foreground text-xs uppercase tracking-wide">
//               Sở thích / Thói quen mua
//             </Label>
//             <Input
//               name="hobbies"
//               value={profile.hobbies}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-32 h-32 rounded-full bg-muted border-4 border-primary/20 overflow-hidden flex items-center justify-center">
//             {avatarMutation.isPending ? (
//               <div className="absolute inset-0 flex items-center justify-center bg-black/20">
//                 <Loader2 className="animate-spin text-white" />
//               </div>
//             ) : null}
//             {profile.avtUrl ? (
//               <img
//                 src={profile.avtUrl}
//                 alt="Avatar"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <span className="text-5xl">👤</span>
//             )}
//           </div>

//           {/* Input file ẩn */}
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="hidden"
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//           <Button
//             variant="outline"
//             size="sm"
//             className="border-primary text-primary hover:bg-accent rounded-sm"
//             onClick={() => fileInputRef.current.click()} // Kích hoạt input file
//             disabled={avatarMutation.isPending}
//           >
//             <Camera className="w-4 h-4 mr-2" />
//             {avatarMutation.isPending ? "Đang tải..." : "Thay đổi avatar"}
//           </Button>
//         </div>
//       </div>
//       <div className="flex justify-center mt-8">
//         <Button
//           className="px-10 py-5"
//           onClick={handleSubmit}
//           disabled={mutation.isPending}
//         >
//           {mutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProfileSection;

import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { format, parseISO } from "date-fns";
import {
  Camera,
  Loader2,
  User,
  Mail,
  Phone,
  CalendarDays,
  Heart,
  ShieldCheck,
} from "lucide-react";
import buyerApi from "@/api/buyerApi";
import { toast } from "react-toastify";

const ProfileSection = () => {
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState({
    fName: "",
    lName: "",
    dob: "",
    pNum: "",
    gender: "",
    hobbies: "Chưa có thông tin",
    email: "",
    avtUrl: "",
  });

  const { data: response, isLoading } = useQuery({
    queryKey: ["buyerProfile"],
    queryFn: buyerApi.getProfile,
  });

  useEffect(() => {
    if (response?.detail) {
      setProfile(response.detail);
    }
  }, [response]);

  const mutation = useMutation({
    mutationFn: (newData) => buyerApi.updateProfile(newData),
    onSuccess: () => {
      toast.success("Cập nhật hồ sơ thành công!");
      queryClient.invalidateQueries(["buyerProfile"]);
    },
    onError: () => toast.error("Cập nhật hồ sơ thất bại. Vui lòng thử lại."),
  });

  const avatarMutation = useMutation({
    mutationFn: (formData) => buyerApi.updateAvatar(formData),
    onSuccess: () => {
      toast.success("Cập nhật ảnh đại diện thành công!");
      queryClient.invalidateQueries(["buyerProfile"]);
    },
    onError: () => toast.error("Upload ảnh thất bại!"),
  });

  const handleChange = (nameOrEvent, value) => {
    if (nameOrEvent?.target) {
      const { name, value } = nameOrEvent.target;
      setProfile((prev) => ({ ...prev, [name]: value }));
    } else {
      setProfile((prev) => ({ ...prev, [nameOrEvent]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("file", file);
      avatarMutation.mutate(formData);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* AVATAR SECTION */}
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="w-32 h-32 rounded-full border-4 border-primary/10 overflow-hidden relative">
              {avatarMutation.isPending ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                  <Loader2 className="animate-spin text-white" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Camera className="text-white w-8 h-8" />
                </div>
              )}
              {profile.avtUrl ? (
                <img
                  src={profile.avtUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-4xl">
                  👤
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white">
              <Camera className="w-4 h-4" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-1">
            <h3 className="text-2xl font-bold text-foreground">
              {profile.fName} {profile.lName}
            </h3>
            <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 italic">
              <Mail className="w-4 h-4" /> {profile.email}
            </p>
            <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
                Thành viên tích cực
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                Đã xác thực
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* INFORMATION FORM */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border bg-muted/30">
          <h4 className="font-bold text-foreground flex items-center gap-2">
            <User className="w-5 h-5 text-primary" /> Thông tin chi tiết
          </h4>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* HỌ & TÊN */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                Họ
              </Label>
              <Input
                name="fName"
                value={profile.fName}
                onChange={handleChange}
                className="focus-visible:ring-primary"
                placeholder="VD: Hồ"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                Tên
              </Label>
              <Input
                name="lName"
                value={profile.lName}
                onChange={handleChange}
                className="focus-visible:ring-primary"
                placeholder="VD: Khương"
              />
            </div>

            {/* NGÀY SINH & GIỚI TÍNH */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays className="w-4 h-4 text-muted-foreground" /> Ngày
                sinh
              </Label>
              <Input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                className="focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label className="flex items-center gap-2 text-sm font-medium">
                Giới tính
              </Label>
              <Select
                value={profile.gender}
                onValueChange={(v) => handleChange("gender", v)}
              >
                <SelectTrigger className="w-full focus:ring-primary">
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Nam</SelectItem>
                  <SelectItem value="FEMALE">Nữ</SelectItem>
                  <SelectItem value="OTHER">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* LIÊN HỆ */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Phone className="w-4 h-4 text-muted-foreground" /> Số điện
                thoại
              </Label>
              <Input
                name="pNum"
                value={profile.pNum}
                onChange={handleChange}
                className="focus-visible:ring-primary"
                placeholder="VD: 0321..."
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-muted-foreground" /> Email
                xác thực
              </Label>
              <Input
                value={profile.email}
                disabled
                className="bg-muted/50 cursor-not-allowed border-dashed"
              />
            </div>

            {/* SỞ THÍCH */}
            <div className="space-y-2 md:col-span-2 pt-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Heart className="w-4 h-4 text-primary" /> Sở thích / Thói quen
                mua sắm
              </Label>
              <Input
                name="hobbies"
                value={profile.hobbies}
                onChange={handleChange}
                className="focus-visible:ring-primary"
                placeholder="VD: Thích mua rau củ hữu cơ, trái cây sạch..."
              />
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-3 pt-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => setProfile(response.detail)}
            >
              Hoàn tác
            </Button>
            <Button
              onClick={() => mutation.mutate(profile)}
              className="px-8 shadow-md"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang lưu...
                </>
              ) : (
                "Cập nhật hồ sơ"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
