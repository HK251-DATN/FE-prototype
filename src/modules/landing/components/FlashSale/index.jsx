import React from "react";
import { Heart, Star } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const products = [
  {
    id: 1,
    name: "Đùi tỏi gà",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/17911391fa6136f0311d14482429b7f679e57c2e?width=478", // Thay bằng link ảnh thật
    price: 20000,
    oldPrice: 14000,
    discount: 27,
    rating: 4.9,
    soldCount: 48,
    isSafeFood: true,
  },
  {
    id: 2,
    name: "Chân gà rút xương",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/e124cf3a81d5de9bf990ea3390ed547e524ddb36?width=478",
    price: 12000,
    oldPrice: 14000,
    discount: 30,
    rating: 4.9,
    soldCount: 48,
    isSafeFood: true,
  },
  {
    id: 3,
    name: "2 Cánh gà",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/ce09fb10b8e8c2528122124b0bf018765a1fabc0?width=478",
    price: 14000,
    oldPrice: 20000,
    discount: 40,
    rating: 4.9,
    soldCount: 48,
    isSafeFood: true,
  },
  {
    id: 4,
    name: "Cá mòi",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/5a56b5e7807bff916b83369b0731b5c9ecf649c9?width=478",
    price: 20000,
    oldPrice: 14000,
    discount: 27,
    rating: 4.9,
    soldCount: 48,
    isSafeFood: false,
  },
  {
    id: 5,
    name: "Đùi diêu hồng",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/38a0f1612089349227244e51c91ba7d7fc0fd55c?width=478",
    price: 20000,
    oldPrice: 14000,
    discount: 27,
    rating: 4.9,
    soldCount: 48,
    isSafeFood: false,
    specialTag: "Chuẩn sạch",
  },
];

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl p-3 relative flex flex-col shadow-sm">
      {/* Badge Bán chạy */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-sm font-medium w-fit">
          Bán chạy
        </span>
        {product.specialTag && (
          <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-sm font-medium w-fit">
            {product.specialTag}
          </span>
        )}
      </div>

      {/* Nút tim */}
      <button className="absolute top-2 right-2 p-1.5 bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors">
        <Heart size={14} />
      </button>

      {/* Ảnh sản phẩm */}
      <div className="aspect-square mb-3 relative flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain h-32 w-32"
        />
        {product.isSafeFood && (
          <div className="absolute bottom-0 right-0 w-10 h-10">
            <div className="bg-green-700 text-white text-[8px] rounded-full w-full h-full flex flex-col items-center justify-center leading-tight border-2 border-white">
              <span className="font-bold">Safe</span>
              <span>food</span>
            </div>
          </div>
        )}
      </div>

      {/* Tên sản phẩm */}
      <h3 className="font-bold text-gray-800 text-sm mb-2 h-10 line-clamp-2 uppercase">
        {product.name}
      </h3>

      {/* Giá */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-green-600 font-bold text-lg">
          {product.price.toLocaleString()}đ
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-400 text-xs line-through">
          {product.oldPrice.toLocaleString()}đ
        </span>
        <span className="bg-red-500 text-white text-[10px] px-1 rounded font-bold">
          -{product.discount}%
        </span>
      </div>

      {/* Đánh giá và Nút Mua */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-yellow-400">
          <Star size={14} fill="currentColor" />
          <span className="text-gray-600 text-xs ml-1 font-medium">
            {product.rating}
          </span>
        </div>
        <button className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-emerald-600 transition-colors">
          Mua
        </button>
      </div>

      {/* Thanh tiến trình (Stock) */}
      <div className="relative h-4 bg-red-100 rounded-full overflow-hidden flex items-center justify-center">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 to-orange-400"
          style={{ width: "40%" }}
        ></div>
        <span className="relative z-10 text-[10px] text-white font-medium">
          Còn {product.soldCount} suất
        </span>
      </div>
    </div>
  );
};

const FlashSale = () => {
  const totalSeconds = 2 * 3600 + 48 * 60 + 48;
  return (
    <div className="bg-[#f09a3e] p-4 md:p-6 rounded-2xl w-full max-w-6xl mx-auto">
      {/* Header Flash Sale */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <h2 className="text-black text-3xl font-black italic tracking-wider">
          FLASH SALE
        </h2>
        <CountdownTimer initialSeconds={totalSeconds} />
      </div>

      {/* Tabs Thời gian */}
      <div className="grid grid-cols-2 gap-4 mb-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-2 text-center shadow-md">
          <div className="text-orange-600 font-black text-xl leading-tight">
            11h - 12h
          </div>
          <div className="text-orange-500 text-xs font-medium uppercase">
            Đang diễn ra
          </div>
        </div>
        <div className="bg-[#e9c08e] rounded-xl p-2 text-center opacity-80">
          <div className="text-gray-700 font-black text-xl leading-tight">
            19h - 21h
          </div>
          <div className="text-gray-600 text-xs font-medium uppercase">
            Sắp diễn ra
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
