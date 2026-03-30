import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import Navigation from "../../../components/Navigation/Navigation";
import HeroSection from "../components/HeroSection";
import Benefits from "../components/BenefitSection";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/CategoriesSection";
import Blog from "../components/Blog";
import Testimonials from "../components/Testimonials";
import ProcessSection from "../components/ProcessSection";
import img_banner from "../../../assets/images/img_banner.png";
import { useCategories } from "../../../hooks/useCategories";
import { useProductGenerals } from "../../../hooks/useProductGenerals";
import { useProductDetails } from "../../../hooks/useProductDetails";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import FlashSale from "../components/FlashSale";
import ProductList from "../../../components/ProductList/ProductList";

// Animation variants
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

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Keep sample data as fallback
const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Chuối vàng",
    price: 15000,
    originalPrice: 18000,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/b27fa9e4cdb07949197126a35d2d462512b90457?width=380",
    rating: 5.0,
    discount: 14,
    badges: ["Mới về 3h trước"],
  },
  {
    id: "2",
    name: "Thịt bò",
    price: 99000,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/59bb0445b17bc1f20afc2063c06e380eafb82d0f?width=478",
    rating: 5.0,
    badges: ["Bán chạy", "Mới về 2h trước"],
  },
  {
    id: "3",
    name: "Đùi tỏi gà",
    price: 48000,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/17911391fa6136f0311d14482429b7f679e57c2e?width=478",
    rating: 4.9,
    badges: ["Bán chạy", "Mới về 1h trước"],
  },
  {
    id: "4",
    name: "Cải thìa",
    price: 10000,
    originalPrice: 14000,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/12b39791062985152489730bcad5cb1685104119?width=478",
    rating: 4.7,
    discount: 14,
    badges: ["Chuẩn sạch", "Mới về 2h trước"],
  },
  {
    id: "5",
    name: "Đùi tỏi gà",
    price: 48000,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/ef3cb4ea30c96ec3151e1c2af44ff37dfd979ef1?width=120",
    rating: 4.9,
    badges: ["Bán chạy"],
  },
  {
    id: "6",
    name: "Cải thìa",
    price: 10000,
    originalPrice: 14000,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/12b39791062985152489730bcad5cb1685104119?width=478",
    rating: 4.7,
    discount: 14,
    badges: ["Chuẩn sạch", "Mới về 2h trước"],
  },
];

const FLASH_SALE_PRODUCTS = [
  {
    id: "fs1",
    name: "Đùi tỏi gà",
    price: 20000,
    originalPrice: 27000,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/17911391fa6136f0311d14482429b7f679e57c2e?width=478",
    rating: 4.9,
    discount: 27,
    isFlashSale: true,
    stock: 48,
  },
  {
    id: "fs2",
    name: "Chân gà rút xương",
    price: 12000,
    originalPrice: 17000,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/e124cf3a81d5de9bf990ea3390ed547e524ddb36?width=478",
    rating: 4.9,
    discount: 30,
    isFlashSale: true,
    stock: 48,
  },
  {
    id: "fs3",
    name: "2 Cánh gà",
    price: 14000,
    originalPrice: 20000,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/ce09fb10b8e8c2528122124b0bf018765a1fabc0?width=478",
    rating: 4.9,
    discount: 40,
    isFlashSale: true,
    stock: 48,
  },
  {
    id: "fs4",
    name: "Cá mòi",
    price: 20000,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/5a56b5e7807bff916b83369b0731b5c9ecf649c9?width=478",
    rating: 4.9,
    discount: 27,
    isFlashSale: true,
    stock: 48,
  },
  {
    id: "fs5",
    name: "Đùi diêu hồng",
    price: 20000,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/38a0f1612089349227244e51c91ba7d7fc0fd55c?width=478",
    rating: 4.9,
    discount: 27,
    isFlashSale: true,
    stock: 48,
  },
];

export default function Index() {
  const { data: categories, isLoading: categoriesLoading } = useCategories(
    1,
    20,
  );
  const { data: productGenerals, isLoading: productsLoading } =
    useProductGenerals(1, 20);
  const { data: productDetails, isLoading: detailsLoading } = useProductDetails(
    1,
    100,
  );

  // Combine product generals with product details for rich product cards
  const enrichedProducts = useMemo(() => {
    if (!productGenerals || !productDetails) return [];

    const generalMap = {};
    productGenerals.forEach((g) => {
      generalMap[g.productGeneralId] = g;
    });

    return productDetails.map((d) => {
      const general = generalMap[d.productGeneralId];

      let imageUrl = "";
      if (general?.photoUrls) {
        try {
          const parsed = JSON.parse(general.photoUrls);
          imageUrl = parsed?.[0];
        } catch {
          imageUrl = general.photoUrls;
        }
      }

      return {
        id: d.productDetailId,
        name: general?.productName,
        description: d.description,
        currentPrice: d.price,
        originalPrice: Math.round(d.price * 1.3),
        rating: 4.8,
        discount: Math.round(((1.3 - 1) / 1.3) * 100),
        image: imageUrl,
        quantityAvailable: d.quantityAvailable,
        isNew: true,
        isBestSeller: true,
        vendorImage: null,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      };
    });
  }, [productGenerals, productDetails]);
  const newestProducts = useMemo(() => {
    return [...enrichedProducts]
      .sort((a, b) => {
        const timeA = new Date(a.updatedAt || a.createdAt).getTime();
        const timeB = new Date(b.updatedAt || b.createdAt).getTime();
        return timeB - timeA; // mới nhất lên đầu
      })
      .slice(0, 5); //  CHỈ LẤY 5 SẢN PHẨM
  }, [enrichedProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumbs items={[{ label: "Trang chủ" }]} />
      <HeroSection />
      {/* <FeaturedProducts />
      <Categories /> */}

      {/* Featured Products Section */}
      <section id="products" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between mb-12"
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                Sản phẩm mới & bán chạy
              </h2>
              <p className="text-gray-600 mt-2">
                Những sản phẩm được khách hàng yêu thích nhất
              </p>
            </div>
            <motion.button
              className="text-green-600 hover:text-green-700 font-bold text-lg flex items-center gap-2"
              whileHover={{ x: 10 }}
            >
              Xem tất cả
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m-7-7l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </motion.div>

          {productsLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Đang tải sản phẩm...</p>
            </div>
          ) : enrichedProducts.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {newestProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-500">Không có sản phẩm</p>
          )}
        </div>
      </section>

      <FlashSale />

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between mb-12"
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                Danh mục sản phẩm
              </h2>
              <p className="text-gray-600 mt-2">Tìm kiếm theo loại sản phẩm</p>
            </div>
            <motion.button
              className="text-green-600 hover:text-green-700 font-bold text-lg flex items-center gap-2"
              whileHover={{ x: 10 }}
            >
              Xem tất cả
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m-7-7l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </motion.div>

          {categoriesLoading ? (
            <p className="text-center text-gray-500">Đang tải danh mục...</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {(categories || []).slice(0, 8).map((category, idx) => (
                <motion.div
                  key={idx}
                  className="rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-green-600 bg-white transition-all shadow-md hover:shadow-xl cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={
                        category.iconUrl ||
                        "https://via.placeholder.com/300x200?text=" +
                          encodeURIComponent(category.categoryName)
                      }
                      alt={category.categoryName}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-center font-bold py-4 text-gray-900 hover:text-green-600 transition-colors">
                    {category.categoryName}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <ProcessSection />
      <ProductList />
      <Benefits />
      <Testimonials />
      <Blog />
    </div>
  );
}
