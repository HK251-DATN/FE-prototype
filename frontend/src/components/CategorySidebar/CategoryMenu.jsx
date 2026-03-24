import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

const CategoryMenu = () => {
  const navigate = useNavigate();
  const [openCategories, setOpenCategories] = useState({});
  const { data: categories = [], isLoading, isError } = useCategories();

  const toggleCategory = (id) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNavigation = (id) => {
    navigate(`/category?category=${id}`);
  };

  if (isLoading)
    return (
      <div className="p-4 text-sm text-gray-500">Đang tải danh mục...</div>
    );
  if (isError)
    return (
      <div className="p-4 text-sm text-red-500">Không thể tải dữ liệu.</div>
    );

  return (
    <aside className="w-64 bg-white border border-gray-200 text-black rounded-lg p-4 shadow-sm">
      <ul className="space-y-1">
        {categories.map((category) => {
          const hasChildren = category.subs && category.subs.length > 0;
          const isOpen = openCategories[category.id];

          return (
            <li key={category.id} className="select-none">
              {/* CATEGORY CHA - Container chính */}
              <div
                className={`flex items-center justify-between w-full rounded-md transition-colors ${
                  isOpen ? "bg-green-50" : "hover:bg-gray-50"
                }`}
              >
                {/* PHẦN 1: TEXT VÀ ICON - Nhấn vào đây luôn chuyển trang */}
                <div
                  onClick={() => handleNavigation(category.id)}
                  className="flex items-center gap-3 flex-grow px-3 py-2.5 cursor-pointer"
                >
                  {category.iconUrl && (
                    <img
                      src={category.iconUrl}
                      alt={category.name}
                      className="w-5 h-5 object-contain"
                    />
                  )}
                  <span
                    className={`text-sm font-medium ${isOpen ? "text-green-700" : "text-gray-800"}`}
                  >
                    {category.name}
                  </span>
                </div>

                {/* PHẦN 2: NÚT MŨI TÊN - Chỉ xuất hiện nếu có con, nhấn vào đây để Đóng/Mở */}
                {hasChildren && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
                      toggleCategory(category.id);
                    }}
                    className="p-2.5 hover:bg-green-100 rounded-md transition-colors text-gray-500"
                  >
                    {isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                )}
              </div>

              {/* CATEGORY CON - Giữ nguyên logic hiển thị */}
              {hasChildren && isOpen && (
                <ul className="ml-9 mt-1 space-y-1 border-l border-gray-100">
                  {category.subs
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((sub) => (
                      <li
                        key={sub.id}
                        onClick={() => handleNavigation(sub.id)}
                        className="px-4 py-1.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-r-md cursor-pointer transition-all"
                      >
                        {sub.name}
                      </li>
                    ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default CategoryMenu;
