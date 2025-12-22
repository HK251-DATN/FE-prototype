import { motion } from "framer-motion";

/**
 * Skeleton Loading Component for Product Cards
 */
export default function ProductCardSkeleton() {
  const skeletonVariants = {
    shimmer: {
      backgroundPosition: ["200% 0", "-200% 0"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      {/* Image Skeleton */}
      <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-200% animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Rating Skeleton */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-md w-4/5 animate-pulse" />
        </div>

        {/* Price Skeleton */}
        <div className="flex gap-2">
          <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </motion.div>
  );
}
