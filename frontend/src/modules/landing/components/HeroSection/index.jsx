import { motion } from "framer-motion";
import img_banner from "../../../../assets/images/img_banner.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function HeroSection() {
  return (
    <motion.section
      className="relative bg-gradient-to-r from-green-500 via-green-600 to-green-700 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full opacity-10"
          animate={{
            y: [0, 20, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-4 md:space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
              variants={itemVariants}
            >
              Tươi ngon từ nông đến bàn ăn
              <motion.span
                className="block text-green-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              ></motion.span>
            </motion.h1>
            <motion.p
              className="text-white text-lg md:text-xl leading-relaxed"
              variants={itemVariants}
            >
              Khám phá những loại trái cây, rau củ và ngũ cốc hữu cơ hảo hạng
              nhất được lấy trực tiếp từ những người nông dân địa phương đáng
              tin cậy.
            </motion.p>
            <motion.button
              className="bg-white hover:bg-gray-100 text-green-600 hover:text-green-700 px-8 py-3.5 rounded-full font-bold text-lg transition-all shadow-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Khám phá ngay →
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative h-64 md:h-96"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={img_banner}
              alt="Fresh vegetables"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
