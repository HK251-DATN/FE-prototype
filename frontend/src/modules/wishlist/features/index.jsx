import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectWishlistItems,
  removeFromWishlist,
} from "../../../store/slices/wishlistSlice";
import { addToCart } from "../../../store/slices/cartSlice";
import { ENDPOINTS } from "../../../routes/endPoints";
import { toast } from "react-toastify";
import { ShoppingCart, Trash2 } from "lucide-react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);

  const formatVND = (amount) => amount.toLocaleString("vi-VN") + " đ";

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        currentPrice: item.price,
        salePrice: item.price,
        image: item.image,
        quantity: 1,
      }),
    );

    toast.success("Đã thêm vào giỏ hàng");

    // Xóa khỏi wishlist khi thêm vào giỏ
    dispatch(removeFromWishlist({ id: item.id }));

    setTimeout(() => {
      navigate(ENDPOINTS.USER.CART);
    }, 500);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromWishlist({ id }));
    toast.info("Đã xóa khỏi danh sách yêu thích");
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold text-center mb-10 text-[#1A1A1A]">
        Sản phẩm yêu thích ({wishlistItems.length})
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-lg border border-[#E6E6E6] overflow-hidden shadow-sm p-8 text-center">
          <p className="text-gray-500 text-lg mb-4">
            Danh sách yêu thích của bạn đang trống
          </p>
          <button
            onClick={() => navigate(ENDPOINTS.USER.CATEGORY)}
            className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition-colors"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#E6E6E6] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6E6E6] text-[#808080] text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Sản phẩm</th>
                <th className="p-4 font-medium text-center">Giá</th>
                <th className="p-4 font-medium text-center">Đánh giá</th>
                <th className="p-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#E6E6E6] last:border-0 group hover:bg-gray-50 transition-colors"
                >
                  {/* Thông tin sản phẩm */}
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <span className="text-[#1A1A1A] font-medium">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  {/* Giá tiền */}
                  <td className="p-4 text-center">
                    <span className="text-[#1A1A1A] font-semibold text-lg">
                      {formatVND(item.price)}
                    </span>
                  </td>

                  {/* Đánh giá */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-[#1A1A1A] font-medium">
                        {item.rating}
                      </span>
                    </div>
                  </td>

                  {/* Thao tác */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-1"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="hidden sm:inline">Mua ngay</span>
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="bg-red-100 text-red-600 px-3 py-2 rounded text-sm font-semibold hover:bg-red-200 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Xóa</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
