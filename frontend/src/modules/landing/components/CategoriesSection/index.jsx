import { motion } from "framer-motion";
import { useCategories } from "../../../../hooks/useCategories";

export default function CategoriesSection() {
  const { data: categories, isLoading } = useCategories(1, 20);

  if (isLoading) return <p className="text-center">Đang tải...</p>;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Danh mục sản phẩm</h2>

        <motion.div className="grid md:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((c) => (
            <div
              key={c.id}
              className="border rounded-xl overflow-hidden hover:shadow-lg"
            >
              <img
                src={c.iconUrl}
                alt={c.categoryName}
                className="h-48 w-full object-cover"
              />
              <p className="text-center font-bold py-4">{c.categoryName}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
