import { motion } from "framer-motion";
import { useState } from "react";

// interface ProductCardProps {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   rating: number;
//   discount?: number;
//   badges?: string[];
//   isFlashSale?: boolean;
//   stock?: number;
// }

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  discount,
  badges = [],
  isFlashSale = false,
  stock,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.15, transition: { duration: 0.4 } },
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow border border-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          variants={imageVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {discount && (
            <motion.div
              className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg"
              custom={0}
              variants={badgeVariants}
              initial="hidden"
              animate={isHovered ? "visible" : "hidden"}
            >
              -{discount}%
            </motion.div>
          )}
          {badges.map((badge, idx) => (
            <motion.div
              key={idx}
              className={`px-3 py-1 rounded-lg text-xs font-medium text-white shadow-lg ${
                badge.includes("Mới")
                  ? "bg-green-600"
                  : badge.includes("chạy")
                    ? "bg-orange-500"
                    : "bg-blue-600"
              }`}
              custom={idx + (discount ? 1 : 0)}
              variants={badgeVariants}
              initial="hidden"
              animate={isHovered ? "visible" : "hidden"}
            >
              {badge}
            </motion.div>
          ))}
        </div>

        {/* Add to Wishlist */}
        <motion.button
          className={`absolute top-4 right-4 w-10 h-10 rounded-full transition-all shadow-md flex items-center justify-center ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white text-gray-800 hover:bg-red-100"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 18 18"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke={isWishlisted ? "none" : "currentColor"}
            strokeWidth={isWishlisted ? "0" : "1.5"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.7452 2.9925C12.7652 1.6425 10.3202 2.2725 9.00016 3.8175C7.68016 2.2725 5.23516 1.635 3.25516 2.9925C2.20516 3.7125 1.54516 4.9275 1.50016 6.21C1.39516 9.12 3.97516 11.4525 7.91266 15.03L7.98766 15.0975C8.55766 15.615 9.43516 15.615 10.0052 15.09L10.0877 15.015C14.0252 11.445 16.5977 9.1125 16.5002 6.2025C16.4552 4.9275 15.7952 3.7125 14.7452 2.9925ZM9.07516 13.9125L9.00016 13.9875L8.92516 13.9125C5.35516 10.68 3.00016 8.5425 3.00016 6.375C3.00016 4.875 4.12516 3.75 5.62516 3.75C6.78016 3.75 7.90516 4.4925 8.30266 5.52H9.70516C10.0952 4.4925 11.2202 3.75 12.3752 3.75C13.8752 3.75 15.0002 4.875 15.0002 6.375C15.0002 8.5425 12.6452 10.68 9.07516 13.9125Z"
              fill="currentColor"
            />
          </svg>
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <motion.div
          className="flex items-center gap-1 mb-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex gap-px">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                width="16"
                height="16"
                viewBox="0 0 20 18"
                fill={i < Math.floor(rating) ? "#FFC831" : "#E5E7EB"}
                xmlns="http://www.w3.org/2000/svg"
                whileHover={{ scale: 1.2 }}
              >
                <path d="M12.6934 5.90392L17.1433 6.52493C17.5118 6.57473 17.8214 6.82079 17.9391 7.15767C18.0568 7.49747 17.9608 7.86656 17.6945 8.11848L14.4678 11.1122L15.2295 15.4066C15.2915 15.7582 15.1397 16.1155 14.8301 16.3235C14.5235 16.5315 14.1179 16.5579 13.7865 16.3909L9.81047 14.3843L5.83752 16.3909C5.50308 16.5579 5.09742 16.5315 4.79086 16.3235C4.4843 16.1155 4.32946 15.7582 4.39449 15.4066L5.15626 11.1122L1.92897 8.11848C1.66235 7.86656 1.56759 7.49747 1.68465 7.15767C1.80139 6.82079 2.11012 6.57473 2.48141 6.52493L6.92752 5.90392L8.92174 2.02754C9.08586 1.70485 9.43269 1.5 9.81047 1.5C10.1914 1.5 10.5382 1.70485 10.7023 2.02754L12.6934 5.90392Z" />
              </motion.svg>
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1 font-semibold">
            {rating}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h3
          className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2 hover:text-green-600 transition-colors"
          whileHover={{ x: 2 }}
        >
          {name}
        </motion.h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <motion.span
            className="text-lg font-bold text-green-600"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {typeof price === "number" ? price.toLocaleString() : price}₫
          </motion.span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {typeof originalPrice === "number"
                ? originalPrice.toLocaleString()
                : originalPrice}
              ₫
            </span>
          )}
        </div>

        {/* Flash Sale Stock */}
        {isFlashSale && stock !== undefined && (
          <motion.div
            className="mb-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-2"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-red-500 via-orange-500 to-orange-600 h-full rounded-full"
                style={{
                  width: `${(stock / 100) * 100}%`,
                }}
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
            <motion.p
              className="text-xs text-gray-700 font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Còn {stock} suất
            </motion.p>
          </motion.div>
        )}

        {/* Buy Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 rounded-lg font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          whileHover={{
            y: -3,
            boxShadow: "0 10px 20px rgba(22, 163, 74, 0.3)",
          }}
          whileTap={{ y: 0, scale: 0.98 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            🛒
          </motion.span>
          Mua ngay
        </motion.button>
      </div>
    </motion.div>
  );
}
