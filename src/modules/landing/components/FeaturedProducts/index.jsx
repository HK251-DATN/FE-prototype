import { motion } from "framer-motion";
import ProductCard from "../ProductCard";
import { useProductGenerals } from "../../../../hooks/useProductGenerals";
import { useProductDetails } from "../../../../hooks/useProductDetails";

export default function FeaturedProducts() {
  const { data: generals } = useProductGenerals(0, 20);
  const { data: details } = useProductDetails(0, 100);

  const products = (generals || []).slice(0, 10).map((p) => {
    const d = (details || []).find(
      (x) => x.productGeneralId === p.productGeneralId
    );

    return {
      id: p.productGeneralId,
      name: p.productName,
      price: d?.price || 0,
      image:
        JSON.parse(p.photoUrls || "[]")[0] || "https://via.placeholder.com/300",
      rating: 4.9,
      quantity: d?.quantityAvailable || 0,
    };
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Sản phẩm mới & bán chạy</h2>

        <motion.div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
