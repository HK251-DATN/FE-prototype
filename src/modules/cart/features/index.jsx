import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeFromCart,
  toggleItemSelection,
  toggleAllSelection,
  toggleSelectionAsync,
  fetchCart,
} from "../../../store/slices/cartSlice";
import { ENDPOINTS } from "../../../routes/endPoints";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { cartApi } from "../../../api/ecommerceApi";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const { subtotal, discount, total } = useSelector(selectCartTotal);

  const [isUpdating, setIsUpdating] = useState(false);

  const formatVND = (amount) => amount.toLocaleString("vi-VN") + "đ";

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // const handleQuantityChange = async (id, delta) => {
  //   const item = cartItems.find((i) => i.id === id);
  //   if (item) {
  //     const newQuantity = item.quantity + delta;
  //     try {
  //       if (newQuantity < 1) {
  //         await cartApi.removeCartItem(item.cartItemId);
  //         dispatch(removeFromCart({ id }));
  //         toast.info("Đã xóa sản phẩm khỏi giỏ hàng");
  //       } else {
  //         await cartApi.updateCartItem(item.cartItemId, {
  //           quantity: newQuantity,
  //           is_selected: true,
  //         });
  //         dispatch(updateQuantity({ id, quantity: newQuantity }));
  //       }
  //     } catch (error) {
  //       toast.error("Lỗi cập nhật giỏ hàng");
  //     }
  //   }
  // };

  const handleQuantityChange = async (item, delta) => {
    if (isUpdating) return;
    const newQuantity = item.quantity + delta;

    if (newQuantity < 1) return; // Không cho giảm dưới 1 bằng nút -, phải dùng nút thùng rác

    setIsUpdating(true);
    try {
      await cartApi.updateCartItem(item.cartItemId, {
        quantity: newQuantity,
        is_selected: item.isSelected,
      });
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    } catch (error) {
      toast.error("Lỗi cập nhật số lượng");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleSelect = (item) => {
    const newStatus = !item.isSelected;

    // Dispatch Thunk để nó tự lo việc cập nhật UI và gọi API
    dispatch(
      toggleSelectionAsync({
        cartItemId: item.cartItemId,
        quantity: item.quantity,
        isSelected: newStatus,
      }),
    )
      .unwrap()
      .catch(() => {
        toast.error("Không thể lưu trạng thái chọn sản phẩm");
      });
  };

  const handleToggleAll = async (e) => {
    const isChecked = e.target.checked;
    dispatch(toggleAllSelection(isChecked));

    // Gọi API cập nhật cho tất cả sản phẩm
    try {
      await Promise.all(
        cartItems.map((item) =>
          cartApi.updateCartItem(item.cartItemId, {
            quantity: item.quantity,
            isSelected: isChecked, // Đảm bảo key này khớp API
          }),
        ),
      );
    } catch (err) {
      toast.error("Một số sản phẩm không được đồng bộ lên máy chủ");
      dispatch(fetchCart()); // Reset lại data chuẩn từ server nếu có lỗi xảy ra
    }
  };

  const handleRemoveItem = async (id) => {
    if (window.confirm("Bạn có chắc muốn bỏ sản phẩm này khỏi giỏ hàng?")) {
      try {
        await cartApi.removeCartItem(item.cartItemId);
        dispatch(removeFromCart({ id: item.id }));
        toast.success("Đã xóa sản phẩm");
      } catch (error) {
        toast.error("Lỗi xóa sản phẩm");
      }
    }
  };

  // Trạng thái cho Checkbox "Chọn tất cả"
  const isAllSelected =
    cartItems.length > 0 && cartItems.every((item) => item.isSelected);
  const selectedCount = cartItems.filter((item) => item.isSelected).length;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen font-sans text-center py-20">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-4">
          Giỏ hàng của bạn đang trống
        </h1>
        <p className="text-[#666] mb-6">
          Hãy thêm một số sản phẩm để bắt đầu shopping
        </p>
        <Link
          to={ENDPOINTS.INDEX.HOME}
          className="px-8 py-3 bg-[#00B207] text-white rounded-full font-bold hover:bg-[#009a06] transition-colors"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  //   return (
  //     <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
  //       <h1 className="text-3xl font-bold text-center mb-10 text-[#1A1A1A]">
  //         Giỏ hàng của tôi ({cartItems.length})
  //       </h1>

  //       <div className="flex flex-col lg:flex-row gap-8">
  //         {/* BÊN TRÁI: DANH SÁCH SẢN PHẨM */}
  //         <div className="lg:w-2/3">
  //           <div className="bg-white rounded-lg border border-[#E6E6E6] overflow-hidden shadow-sm">
  //             <table className="w-full text-left border-collapse">
  //               <thead>
  //                 <tr className="border-b border-[#E6E6E6] text-[#808080] text-xs uppercase tracking-wider">
  //                   <th className="p-4 font-medium">Sản phẩm</th>
  //                   <th className="p-4 font-medium">Giá</th>
  //                   <th className="p-4 font-medium">Số lượng</th>
  //                   <th className="p-4 font-medium">Tạm tính</th>
  //                   <th className="p-4"></th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {cartItems.map((item) => (
  //                   <tr
  //                     key={item.id}
  //                     className="border-b border-[#E6E6E6] last:border-0 group"
  //                   >
  //                     {/* Hình ảnh & Tên */}
  //                     <td className="p-4">
  //                       <div className="flex items-center gap-4">
  //                         <img
  //                           src={item.image}
  //                           alt={item.name}
  //                           className="w-20 h-20 object-cover rounded-md"
  //                         />
  //                         <span className="text-[#1A1A1A] font-medium">
  //                           {item.name}
  //                         </span>
  //                       </div>
  //                     </td>
  //                     {/* Giá niêm yết */}
  //                     <td className="p-4 text-[#1A1A1A]">
  //                       {formatVND(item.price)}
  //                     </td>
  //                     {/* Bộ tăng giảm số lượng */}
  //                     <td className="p-4">
  //                       <div className="flex items-center w-fit border border-[#E6E6E6] rounded-full p-1 bg-white">
  //                         <button
  //                           onClick={() => handleQuantityChange(item.id, -1)}
  //                           className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2F2F2] hover:bg-gray-200 text-[#666] transition-colors"
  //                         >
  //                           −
  //                         </button>
  //                         <span className="w-10 text-center text-[#1A1A1A] font-medium">
  //                           {item.quantity}
  //                         </span>
  //                         <button
  //                           onClick={() => handleQuantityChange(item.id, 1)}
  //                           className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2F2F2] hover:bg-gray-200 text-[#666] transition-colors"
  //                         >
  //                           +
  //                         </button>
  //                       </div>
  //                     </td>
  //                     {/* Tổng cộng dòng sản phẩm */}
  //                     <td className="p-4 text-[#1A1A1A] font-semibold">
  //                       {formatVND(item.price * item.quantity)}
  //                     </td>
  //                     {/* Nút xóa sản phẩm */}
  //                     <td className="p-4 text-right">
  //                       <button
  //                         onClick={() => handleRemoveItem(item.id)}
  //                         className="p-1 rounded-full border border-[#CCCCCC] text-[#666] hover:text-red-500 hover:border-red-500 transition-colors"
  //                         title="Xóa sản phẩm"
  //                       >
  //                         <Trash2 className="w-4 h-4" />
  //                       </button>
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>

  //             {/* Các nút điều hướng dưới bảng */}
  //             <div className="p-4 flex justify-between bg-white border-t border-[#E6E6E6]">
  //               <Link
  //                 to={ENDPOINTS.INDEX.HOME}
  //                 className="px-6 py-2.5 bg-[#F2F2F2] text-[#4D4D4D] rounded-full font-semibold hover:bg-gray-200 transition-colors"
  //               >
  //                 Tiếp tục mua sắm
  //               </Link>
  //               <Link
  //                 to={ENDPOINTS.USER.WISHLIST}
  //                 className="px-6 py-2.5 bg-[#F2F2F2] text-[#4D4D4D] rounded-full font-semibold hover:bg-gray-200 transition-colors"
  //               >
  //                 Xem danh sách yêu thích
  //               </Link>
  //             </div>
  //           </div>
  //         </div>

  //         {/* BÊN PHẢI: TỔNG KẾT ĐƠN HÀNG */}
  //         <div className="lg:w-1/3">
  //           <div className="bg-white p-6 rounded-lg border border-[#E6E6E6] shadow-sm sticky top-4">
  //             <h2 className="text-xl font-bold text-[#1A1A1A] mb-6 border-b border-[#E6E6E6] pb-4">
  //               Tổng tiền giỏ hàng
  //             </h2>

  //             <div className="space-y-4">
  //               <div className="flex justify-between pb-3 border-b border-[#E6E6E6]">
  //                 <span className="text-[#4D4D4D]">Tạm tính:</span>
  //                 <span className="text-[#1A1A1A] font-semibold">
  //                   {formatVND(subtotal)}
  //                 </span>
  //               </div>

  //               {discount > 0 && (
  //                 <div className="flex justify-between pb-3 border-b border-[#E6E6E6] text-green-600">
  //                   <span>Giảm giá:</span>
  //                   <span className="font-semibold">-{formatVND(discount)}</span>
  //                 </div>
  //               )}

  //               <div className="flex justify-between pb-3 border-b border-[#E6E6E6]">
  //                 <span className="text-[#4D4D4D]">Vận chuyển:</span>
  //                 <span className="text-[#1A1A1A] font-semibold">Miễn phí</span>
  //               </div>

  //               <div className="flex justify-between items-center pt-2">
  //                 <span className="text-lg font-medium text-[#1A1A1A]">
  //                   Tổng cộng:
  //                 </span>
  //                 <span className="text-2xl font-bold text-[#00B207]">
  //                   {formatVND(total)}
  //                 </span>
  //               </div>
  //             </div>

  //             <button
  //               onClick={() => navigate(ENDPOINTS.USER.ORDER)}
  //               className="w-full mt-8 py-4 bg-[#00B207] text-white rounded-full font-bold text-lg hover:bg-[#009a06] transition-all shadow-md active:scale-[0.98]"
  //             >
  //               Thanh toán ngay
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-[80vh] font-sans pb-24">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        Giỏ hàng của bạn{" "}
        <span className="text-sm font-medium bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
          {cartItems.length} sản phẩm
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* BÊN TRÁI: DANH SÁCH SẢN PHẨM */}
        <div className="w-full lg:w-[68%] flex flex-col gap-4">
          {/* Header Bảng (Mobile sẽ ẩn đi) */}
          <div className="hidden md:grid grid-cols-[auto_3fr_1fr_1.5fr_1fr_auto] gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm items-center text-sm font-semibold text-gray-500 uppercase tracking-wide">
            <div className="pl-2 flex items-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleToggleAll}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer accent-green-600"
              />
            </div>
            <div>Sản phẩm</div>
            <div className="text-center">Đơn giá</div>
            <div className="text-center">Số lượng</div>
            <div className="text-right pr-4">Tạm tính</div>
            <div></div>
          </div>

          {/* Danh sách Item */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100 overflow-hidden">
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className={`grid grid-cols-[auto_1fr] md:grid-cols-[auto_3fr_1fr_1.5fr_1fr_auto] gap-4 p-4 md:p-5 items-center transition-colors ${item.isSelected ? "bg-green-50/30" : "hover:bg-gray-50"}`}
              >
                {/* 1. Checkbox */}
                <div className="pl-1 md:pl-2 pt-2 md:pt-0 h-full flex items-start md:items-center">
                  <input
                    type="checkbox"
                    checked={item.isSelected}
                    onChange={() => handleToggleSelect(item)}
                    className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer accent-green-600"
                  />
                </div>

                {/* 2. Ảnh & Tên (Gộp trên Mobile) */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Link
                      to={`/product/${item.id}`}
                      className="font-bold text-gray-800 hover:text-green-600 transition-colors line-clamp-2 leading-tight"
                    >
                      {item.name}
                    </Link>
                    {/* Phần hiển thị Đơn vị & Lượng đơn vị */}
                    <span className="text-sm text-gray-500 bg-gray-100 w-fit px-2 py-0.5 rounded-md mt-1">
                      {item.unitQuantity} {item.unit}
                    </span>

                    {/* UI Đơn giá trên Mobile */}
                    <div className="md:hidden text-green-600 font-bold mt-1">
                      {formatVND(item.price)}
                    </div>
                  </div>
                </div>

                {/* 3. Đơn giá (Chỉ hiện trên Desktop) */}
                <div className="hidden md:block text-center font-medium text-gray-700">
                  {formatVND(item.price)}
                </div>

                {/* 4. Tăng giảm số lượng */}
                <div className="col-span-2 md:col-span-1 flex items-center md:justify-center mt-2 md:mt-0">
                  <div className="flex items-center border border-gray-200 rounded-full bg-white h-10 w-fit overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(item, -1)}
                      disabled={isUpdating || item.quantity <= 1}
                      className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-600 disabled:opacity-50 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-semibold text-gray-800 text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item, 1)}
                      disabled={isUpdating}
                      className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-600 disabled:opacity-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 5. Tạm tính (Chỉ hiện Desktop) */}
                <div className="hidden md:block text-right pr-4 font-bold text-green-600">
                  {formatVND(item.price * item.quantity)}
                </div>

                {/* 6. Xóa (Thùng rác) */}
                <div className="absolute right-4 md:relative md:right-0 md:pl-2">
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    title="Xóa khỏi giỏ"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link
            to={ENDPOINTS.INDEX.HOME}
            className="text-green-600 font-medium hover:underline flex items-center gap-2 mt-2 w-fit"
          >
            ← Tiếp tục mua sắm
          </Link>
        </div>

        {/* BÊN PHẢI: BILL SUMMARY */}
        <div className="w-full lg:w-[32%] sticky top-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              Tổng quan đơn hàng
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Tổng phụ ({selectedCount} sản phẩm)</span>
                <span className="font-semibold text-gray-800">
                  {formatVND(subtotal)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Khuyến mãi</span>
                  <span className="font-semibold">-{formatVND(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600 pb-4 border-b border-gray-100">
                <span>Phí vận chuyển</span>
                <span className="font-semibold text-gray-800">Miễn phí</span>
              </div>

              <div className="flex justify-between items-end pt-2">
                <span className="text-gray-800 font-medium">
                  Tổng thanh toán
                </span>
                <span className="text-2xl font-black text-green-600">
                  {formatVND(total)}
                </span>
              </div>
              <p className="text-right text-xs text-gray-400 mt-1">
                (Đã bao gồm VAT nếu có)
              </p>
            </div>

            <button
              onClick={() => navigate(ENDPOINTS.USER.ORDERING)}
              disabled={selectedCount === 0}
              className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none mb-4"
            >
              {selectedCount === 0
                ? "Vui lòng chọn sản phẩm"
                : "Tiến hành thanh toán"}
            </button>

            <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <p className="text-xs text-emerald-800 leading-relaxed">
                Giao dịch của bạn được bảo mật tuyệt đối. Hỗ trợ đổi trả miễn
                phí trong vòng 24h đối với thực phẩm tươi sống.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
