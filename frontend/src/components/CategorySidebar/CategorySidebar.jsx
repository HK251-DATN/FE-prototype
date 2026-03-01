import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react"; // Cài đặt: npm install lucide-react

const CategorySidebar = ({ categories = [] }) => {
  // Trạng thái lưu trữ ID của danh mục đang được mở
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [selectedSubId, setSelectedSubId] = useState(null);

  // 1. Phân loại danh mục Cha và Con
  const parentCategories = categories.filter(
    (cat) => cat.belong_to_category === null
  );

  const getSubCategories = (parentId) => {
    return categories.filter((cat) => cat.belong_to_category === parentId);
  };

  const toggleCategory = (id) => {
    setOpenCategoryId(openCategoryId === id ? null : id);
  };

  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Header Giảm giá/Khuyến mãi giống hình */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
        <div className="bg-red-100 p-1.5 rounded-full">
          <span className="text-red-600 font-bold text-sm">%</span>
        </div>
        <span className="font-bold text-gray-800 uppercase text-sm tracking-wide">
          Khuyến mãi sốc
        </span>
      </div>

      {/* Danh sách danh mục */}
      <div className="divide-y divide-gray-100">
        {parentCategories.map((parent) => {
          const subs = getSubCategories(parent.category_id);
          const isOpen = openCategoryId === parent.category_id;

          return (
            <div key={parent.category_id} className="flex flex-col">
              {/* Danh mục Cha */}
              <button
                onClick={() => toggleCategory(parent.category_id)}
                className="flex items-center justify-between p-4 w-full text-left hover:bg-gray-50 transition-colors"
              >
                <span
                  className={`font-bold text-sm uppercase tracking-tight ${isOpen ? "text-green-700" : "text-gray-700"}`}
                >
                  {parent.category_name}
                </span>
                {subs.length > 0 && (
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} className="text-gray-400" />
                  </motion.div>
                )}
              </button>

              {/* Danh mục Con (Accordion Content) */}
              <AnimatePresence>
                {isOpen && subs.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-gray-50/50"
                  >
                    <div className="pb-2 px-4 flex flex-col">
                      {subs.map((sub) => (
                        <button
                          key={sub.category_id}
                          onClick={() => setSelectedSubId(sub.category_id)}
                          className={`py-2.5 text-left text-sm transition-all border-l-2 pl-4 -ml-4 ${
                            selectedSubId === sub.category_id
                              ? "text-green-600 font-semibold border-green-600 bg-green-50"
                              : "text-gray-600 border-transparent hover:text-green-600 hover:border-gray-300"
                          }`}
                        >
                          {sub.category_name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySidebar;
