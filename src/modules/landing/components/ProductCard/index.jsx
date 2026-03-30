import { motion } from "framer-motion";
import { useState } from "react";

// export default function ProductCard({
//   name,
//   price,
//   originalPrice,
//   image,
//   rating = 4.8,
//   discount,
//   badges = ["Mới về 3h trước", "Bán chạy"],
// }) {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100"
//       whileHover={{ y: -6 }}
//       transition={{ duration: 0.3 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//     >
//       {/* IMAGE */}
//       <div className="relative aspect-square bg-white flex items-center justify-center p-3">
//         <motion.img
//           src={image}
//           alt={name}
//           className="w-full h-full object-contain"
//           animate={{ scale: isHovered ? 1.05 : 1 }}
//           transition={{ duration: 0.3 }}
//         />

//         {/* Badges */}
//         <div className="absolute top-3 left-3 flex flex-col gap-1">
//           <span className="bg-green-500 text-white text-[11px] px-2 py-0.5 rounded">
//             {badges[0]}
//           </span>
//           <span className="bg-orange-500 text-white text-[11px] px-2 py-0.5 rounded">
//             {badges[1]}
//           </span>
//         </div>

//         {/* Wishlist */}
//         <button
//           onClick={() => setIsWishlisted(!isWishlisted)}
//           className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
//         >
//           <span className={isWishlisted ? "text-red-500" : "text-gray-400"}>
//             ♥
//           </span>
//         </button>

//         {/* Brand logo (hard-code) */}
//         <img
//           src="https://agriculture-ecommerce.s3.ap-southeast-2.amazonaws.com/logocty1.png"
//           alt="Freshleaf"
//           className="absolute bottom-3 right-3 w-10 h-10 rounded-full shadow-md bg-white"
//         />
//       </div>

//       {/* CONTENT */}
//       <div className="px-4 pb-4">
//         <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 line-clamp-2">
//           {name}
//         </h3>

//         {/* Price */}
//         <div className="flex items-end gap-2 mb-1">
//           <span className="text-green-600 text-xl font-bold">
//             {price?.toLocaleString()}đ
//           </span>
//           <span className="text-sm text-gray-500">/ 4 trái</span>
//         </div>

//         {/* Original price + discount */}
//         {originalPrice && discount && (
//           <div className="flex items-center gap-2 mb-2">
//             <span className="line-through text-gray-400 text-sm">
//               {originalPrice.toLocaleString()}đ
//             </span>
//             <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">
//               -{discount}%
//             </span>
//           </div>
//         )}

//         {/* Rating + Button */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-1 text-sm text-gray-700">
//             <span className="text-yellow-400">★</span>
//             <span className="font-medium">{rating}</span>
//           </div>

//           <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg font-semibold text-sm">
//             Mua
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

export default function ProductCard({
  id,
  image,
  name,
  description,
  currentPrice,
  originalPrice,
  rating = 4.8,
  discount = 0,
  quantityAvailable,
  isNew,
  isBestSeller,
  vendorImage,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isOutOfStock = quantityAvailable === 0;

  return (
    <motion.div
      className={`bg-white rounded-2xl overflow-hidden shadow-md border
        ${isOutOfStock ? "opacity-60 pointer-events-none" : "hover:shadow-xl"}
      `}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* IMAGE */}
      <div className="relative aspect-square bg-white flex items-center justify-center p-3">
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
            <span className="text-gray-500 font-semibold">Tạm hết hàng</span>
          </div>
        )}

        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {isNew && (
            <span className="bg-green-500 text-white text-[11px] px-2 py-0.5 rounded">
              Hàng mới
            </span>
          )}
          {isBestSeller && (
            <span className="bg-orange-500 text-white text-[11px] px-2 py-0.5 rounded">
              Bán chạy
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
        >
          <span className={isWishlisted ? "text-red-500" : "text-gray-400"}>
            ♥
          </span>
        </button>

        {/* Vendor */}
        {vendorImage && (
          <img
            src={vendorImage}
            alt="vendor"
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full shadow-md bg-white"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4">
        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 line-clamp-2">
          {name}
          {description && (
            <span className="font-normal text-gray-500"> / {description}</span>
          )}
        </h3>

        <div className="flex items-end gap-2 mb-1">
          <span className="text-green-600 text-xl font-bold">
            {currentPrice.toLocaleString("vi-VN")}đ
          </span>
        </div>

        {originalPrice && discount > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <span className="line-through text-gray-400 text-sm">
              {originalPrice.toLocaleString("vi-VN")}đ
            </span>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">
              -{discount}%
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <span className="text-yellow-400">★</span>
            <span className="font-medium">{rating}</span>
          </div>

          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg font-semibold text-sm">
            Mua
          </button>
        </div>
      </div>
    </motion.div>
  );
}
