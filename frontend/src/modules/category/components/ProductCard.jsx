import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../store/slices/cartSlice";
import {
  toggleWishlist,
  selectWishlistItems,
} from "../../../store/slices/wishlistSlice";
import Star from "./Star";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../../routes/endPoints";
import { motion } from "framer-motion";
import { useState } from "react";
const ProductCard = ({
  id,
  image,
  name,
  description,
  currentPrice,
  originalPrice,
  rating,
  discount,
  quantityAvailable,
  createdAt,
  vendorImage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);
  const isInWishlist = wishlistItems.some((item) => item.id === id);
  const isOutOfStock = quantityAvailable === 0;
  const [isHovered, setIsHovered] = useState(false);

  const hasDiscount = discount > 0 && originalPrice > currentPrice;

  const getDetailedBadge = (createdAt) => {
    if (!createdAt) return null;

    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInMs = now - createdDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      // Dưới 1 giờ (Hiện số phút)
      return { text: `Vừa về ${diffInMinutes} phút trước`, type: "new" };
    }
    if (diffInHours <= 6) {
      // Từ 1h đến 6h
      return { text: `Mới về ${diffInHours}h trước`, type: "new" };
    }
    if (diffInDays < 1) {
      // Trên 6h nhưng vẫn trong cùng 1 ngày
      return { text: "Mới về trong ngày", type: "today" };
    }
    if (diffInDays === 1) {
      // Được 1 ngày
      return { text: "Nhập ngày hôm qua", type: "yesterday" };
    }
    if (diffInDays >= 2) {
      // Trên 2 ngày (Xả kho)
      return { text: "Hàng xả kho", type: "clearance" };
    }
    return null;
  };

  const badgeInfo = getDetailedBadge(createdAt);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock) {
      toast.error("Sản phẩm đã hết hàng");
      return;
    }

    dispatch(
      addToCart({
        id,
        name,
        currentPrice,
        salePrice: currentPrice,
        image,
        quantity: 1,
      }),
    );

    toast.success("Đã thêm vào giỏ hàng");

    // Điều hướng đến giỏ hàng
    setTimeout(() => {
      navigate(ENDPOINTS.USER.CART);
    }, 500);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    dispatch(
      toggleWishlist({
        id,
        name,
        currentPrice,
        salePrice: currentPrice,
        image,
        rating,
        discount,
      }),
    );

    if (isInWishlist) {
      toast.info("Đã xóa khỏi danh sách yêu thích");
    } else {
      toast.success("Đã thêm vào danh sách yêu thích");
    }
  };

  return (
    <motion.div
      className={`relative bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300
        ${isOutOfStock ? "opacity-70" : "hover:shadow-2xl hover:border-green-200"}
        shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
      `}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className={`bg-white rounded-lg overflow-hidden transition-shadow
        ${isOutOfStock ? "opacity-60" : "hover:shadow-lg"}
      `}
      >
        {/* Image container */}
        <div className="relative aspect-square bg-gray-50/50 flex items-center justify-center p-4">
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20">
              <span className="bg-gray-800/80 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                Sản phẩm tạm hết hàng
              </span>
            </div>
          )}
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-contain mix-blend-multiply"
            animate={{ scale: isHovered ? 1.1 : 1 }}
          />

          {/* Badges - Top Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 items-start">
            {badgeInfo && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`px-2.5 py-1 rounded-tr-lg rounded-bl-lg text-[10px] font-black uppercase tracking-tighter shadow-sm flex items-center gap-1 text-white
        ${badgeInfo.type === "new" ? "bg-gradient-to-r from-green-600 to-emerald-400" : ""}
        ${badgeInfo.type === "today" ? "bg-gradient-to-r from-blue-600 to-cyan-400" : ""}
        ${badgeInfo.type === "yesterday" ? "bg-gradient-to-r from-indigo-500 to-purple-400" : ""}
        ${badgeInfo.type === "clearance" ? "bg-gradient-to-r from-orange-600 to-amber-400" : ""}
      `}
              >
                {/* Hiệu ứng nhấp nháy chỉ dành cho hàng cực mới (dưới 6h) */}
                {badgeInfo.type === "new" && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                )}
                {badgeInfo.text}
              </motion.div>
            )}
          </div>

          {/* Vendor Image Circle */}
          {vendorImage && (
            <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full overflow-hidden border-4 border-white">
              <img
                src={vendorImage}
                alt="vendor"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center transition-colors ${
              isInWishlist ? "bg-red-100" : "bg-white"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${
                isInWishlist ? "fill-red-500 text-red-500" : "text-gray-800"
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 font-poppins line-clamp-2">
            {name}
            {description && (
              <span className="font-normal text-gray-600">
                {" "}
                / {description}
              </span>
            )}
          </h3>
          <div className="flex items-center mb-1 ">
            <div>
              <span className="text-2xl font-bold text-green-500 font-montserrat">
                {currentPrice.toLocaleString("vi-VN")}đ
              </span>
              {hasDiscount ? (
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm line-through text-gray-400 font-montserrat">
                    {originalPrice.toLocaleString("vi-VN")}đ
                  </span>
                  {/* Discount Badge - Right side */}
                  {discount > 0 && (
                    <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold z-10">
                      -{discount}%
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-4" />
              )}
            </div>
            {/* Buy Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="ml-auto mt-4 bg-green-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-green-700 transition-colors flex items-center gap-1 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mua
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => {
                const fill = Math.min(Math.max(rating - i, 0), 1);
                return <Star key={i} fill={fill} />;
              })}
            </div>

            <span className="text-xs text-gray-700 ml-1">{rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
