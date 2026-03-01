import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8080/api/categories?page=0&size=20")
      .then((res) => res.json())
      .then((data) => {
        setCategories(buildCategoryTree(data));
      });
  }, []);

  const toggleCategory = (id) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="w-64 bg-white border text-black rounded-lg p-4">
      <ul className="space-y-2">
        {categories.map((category) => {
          const hasChildren = category.children.length > 0;
          const isOpen = openCategories[category.categoryId];

          return (
            <li key={category.categoryId}>
              {/* CATEGORY CHA */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // NGĂN click nổi lên
                  if (hasChildren) {
                    toggleCategory(category.categoryId);
                  } else {
                    navigate(
                      `/user/category/user/category?category=${category.categoryId}`
                    );
                  }
                }}
                className="flex items-center justify-between w-full text-left px-2 py-2 rounded hover:bg-green-100"
              >
                <span className="flex items-center gap-2">
                  {category.iconUrl && (
                    <img src={category.iconUrl} alt="" className="w-5 h-5" />
                  )}
                  {category.categoryName}
                </span>

                {hasChildren &&
                  (isOpen ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  ))}
              </button>

              {/* CATEGORY CON */}
              {hasChildren && isOpen && (
                <ul className="ml-6 mt-2 space-y-1">
                  {category.children.map((child) => (
                    <li
                      key={child.categoryId}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/user/category?category=${child.categoryId}`);
                      }}
                      className="px-2 py-1 text-sm text-gray-700 rounded hover:bg-green-100 cursor-pointer"
                    >
                      {child.categoryName}
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

// ================= helper =================

const buildCategoryTree = (categories) => {
  const parents = categories.filter((c) => c.isSubCategory === "false");

  return parents.map((parent) => ({
    ...parent,
    children: categories.filter(
      (c) =>
        c.isSubCategory === "true" && c.belongToCategory === parent.categoryId
    ),
  }));
};

export default CategoryMenu;
