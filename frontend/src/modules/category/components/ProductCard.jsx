import { Heart } from "lucide-react";
import Star from "./Star";
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
  isNew = true,
  newLabel = "",
  badge = "",
  vendorImage,
}) => {
  const isOutOfStock = quantityAvailable === 0;
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden transition-shadow
        ${isOutOfStock ? "opacity-60 pointer-events-none" : "hover:shadow-lg"}
      `}
    >
      {/* Image container */}
      <div className="relative w-full h-56 bg-gray-50 overflow-hidden flex items-center justify-center">
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
            <span className="text-gray-500 font-semibold text-lg text-center px-4">
              Sản phẩm tạm hết hàng
            </span>
          </div>
        )}
        <img
          src={image}
          alt={name}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges - Top Left */}
        {isNew && (
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-sm text-xs font-semibold">
            {newLabel}
          </div>
        )}

        {badge && (
          <div className="absolute top-12 left-3 bg-primary text-white px-3 py-1 rounded-sm text-xs font-semibold">
            {badge}
          </div>
        )}

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
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded hover:bg-gray-100 flex items-center justify-center transition-colors">
          <Heart className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 font-poppins line-clamp-2">
          {name}
          {description && (
            <span className="font-normal text-gray-600"> / {description}</span>
          )}
        </h3>
        <div className="flex items-center mb-1">
          <div>
            <span className="text-2xl font-bold text-green-500 font-montserrat">
              {currentPrice.toLocaleString("vi-VN")}đ
            </span>
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
          </div>
          {/* Buy Button */}
          <button className="ml-8 mt-4 bg-green-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-green-700 transition-colors flex items-center gap-1 z-10">
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
  );
};

export default ProductCard;
