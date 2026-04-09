import { useState, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  Check,
  X,
  LockKeyhole,
} from "lucide-react";
import identityApi from "@/api/identityApi";
import { toast } from "react-toastify";

const PasswordSection = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Logic kiểm tra độ mạnh mật khẩu theo thời gian thực
  const strengthChecks = useMemo(() => {
    const pass = formData.newPassword;
    return {
      length: pass.length >= 8,
      hasUpper: /[A-Z]/.test(pass),
      hasNumber: /[0-9]/.test(pass),
      hasSpecial: /[!@#$%^&*]/.test(pass),
    };
  }, [formData.newPassword]);

  const strengthScore = Object.values(strengthChecks).filter(Boolean).length;

  const mutation = useMutation({
    mutationFn: (data) => identityApi.changePassword(data),
    onSuccess: () => {
      toast.success("Thay đổi mật khẩu thành công!");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setErrors({});
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        setErrors({ oldPassword: "Mật khẩu hiện tại không chính xác." });
      } else {
        toast.error("Có lỗi hệ thống xảy ra. Vui lòng thử lại!");
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (!formData.oldPassword)
      tempErrors.oldPassword = "Vui lòng nhập mật khẩu hiện tại.";
    if (!formData.newPassword)
      tempErrors.newPassword = "Vui lòng nhập mật khẩu mới.";
    if (formData.newPassword !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Xác nhận mật khẩu không trùng khớp.";
    }
    if (
      formData.oldPassword === formData.newPassword &&
      formData.oldPassword !== ""
    ) {
      tempErrors.newPassword = "Mật khẩu mới không được giống mật khẩu cũ.";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    mutation.mutate({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-xl">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            Bảo mật tài khoản
          </h3>
          <p className="text-sm text-muted-foreground">
            Cập nhật mật khẩu định kỳ để bảo vệ dữ liệu của bạn
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mật khẩu cũ */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <LockKeyhole className="w-4 h-4 text-muted-foreground" /> Mật
                khẩu hiện tại
              </Label>
              <div className="relative group">
                <Input
                  name="oldPassword"
                  type={showOld ? "text" : "password"}
                  placeholder="••••••••"
                  className={`h-12 rounded-xl transition-all ${errors.oldPassword ? "border-destructive ring-destructive/20" : "focus:ring-primary/20"}`}
                  value={formData.oldPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  tabIndex="-1"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary p-1 rounded-md transition-colors"
                >
                  {showOld ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="text-destructive text-xs font-medium pl-1 italic">
                  {errors.oldPassword}
                </p>
              )}
            </div>

            <hr className="border-dashed" />

            {/* Mật khẩu mới */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Mật khẩu mới</Label>
                <div className="relative group">
                  <Input
                    name="newPassword"
                    type={showNew ? "text" : "password"}
                    placeholder="Nhập mật khẩu mới"
                    className={`h-12 rounded-xl transition-all ${errors.newPassword ? "border-destructive" : "focus:ring-primary/20"}`}
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    tabIndex="-1"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showNew ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="space-y-3 bg-muted/30 p-4 rounded-xl border border-border/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Độ an toàn
                    </span>
                    <span
                      className={`text-xs font-bold ${strengthScore <= 2 ? "text-orange-500" : "text-green-600"}`}
                    >
                      {strengthScore <= 2
                        ? "Yếu"
                        : strengthScore === 3
                          ? "Trung bình"
                          : "Rất mạnh"}
                    </span>
                  </div>
                  <div className="flex gap-1.5 h-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`flex-1 rounded-full transition-all duration-500 ${step <= strengthScore ? (strengthScore <= 2 ? "bg-orange-500" : "bg-green-500") : "bg-gray-200"}`}
                      />
                    ))}
                  </div>
                  <ul className="grid grid-cols-2 gap-2 mt-2">
                    <RequirementItem
                      met={strengthChecks.length}
                      text="Ít nhất 8 ký tự"
                    />
                    <RequirementItem
                      met={strengthChecks.hasUpper}
                      text="1 chữ in hoa"
                    />
                    <RequirementItem
                      met={strengthChecks.hasNumber}
                      text="1 chữ số"
                    />
                    <RequirementItem
                      met={strengthChecks.hasSpecial}
                      text="1 ký tự đặc biệt"
                    />
                  </ul>
                </div>
              )}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Xác nhận mật khẩu mới
              </Label>
              <div className="relative group">
                <Input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu mới"
                  className={`h-12 rounded-xl transition-all ${errors.confirmPassword ? "border-destructive" : "focus:ring-primary/20"}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  tabIndex="-1"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showConfirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-destructive text-xs font-medium pl-1 italic">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                className="h-12 flex-1 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all text-base font-bold"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Đang lưu thay đổi...
                  </>
                ) : (
                  "Cập nhật mật khẩu ngay"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-xl border-border hover:bg-muted"
                onClick={() =>
                  setFormData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                }
              >
                Hủy bỏ
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Component con hiển thị từng dòng điều kiện
const RequirementItem = ({ met, text }) => (
  <li
    className={`flex items-center gap-2 text-[11px] font-medium transition-colors ${met ? "text-green-600" : "text-muted-foreground"}`}
  >
    {met ? (
      <Check className="w-3 h-3 stroke-[3]" />
    ) : (
      <X className="w-3 h-3 stroke-[3]" />
    )}
    {text}
  </li>
);

export default PasswordSection;
