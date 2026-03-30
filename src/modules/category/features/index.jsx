import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductSearch } from "../../../hooks/useProductSearch";
import ProductList from "../../../components/ProductList/ProductList";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { useCategories } from "../../../hooks/useCategories";

const mockProducts = [
  {
    id: "1",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/12b39791062985152489730bcad5cb1685104119?width=478",
    name: "Cải thìa",
    currentPrice: 10000,
    originalPrice: 14000,
    rating: 4.7,
    discount: 39,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/fc7f73798abfb147ebcdf40a13a44ff7e1568869?width=120",
  },
  {
    id: "2",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/2e176fc653b9096d523f560e97f4557758ac1dac?width=478",
    name: "Cà chua",
    currentPrice: 10000,
    originalPrice: 15000,
    rating: 4.7,
    discount: 34,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/afcb20eef2193010e5f972e7f317b385445610ce?width=120",
  },
  {
    id: "3",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/826a1908a3139a0f7473d38e557db3b56eb02a66?width=478",
    name: "Ớt chuông 3 trái",
    currentPrice: 6160,
    originalPrice: 14000,
    rating: 5.0,
    discount: 56,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/9883dd9b90eb5d6b971e4988968299119900a526?width=120",
  },
  {
    id: "4",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/1e171cb002c255bf4c89f3da601531b538da1c24?width=478",
    name: "Táo xanh 3 trái",
    currentPrice: 17400,
    originalPrice: 30000,
    rating: 4.8,
    discount: 42,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/afcb20eef2193010e5f972e7f317b385445610ce?width=120",
  },
  {
    id: "5",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/12b39791062985152489730bcad5cb1685104119?width=478",
    name: "Cải thìa",
    currentPrice: 10000,
    originalPrice: 14000,
    rating: 4.7,
    discount: 39,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/fc7f73798abfb147ebcdf40a13a44ff7e1568869?width=120",
  },
  {
    id: "6",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/2e176fc653b9096d523f560e97f4557758ac1dac?width=478",
    name: "Cà chua",
    currentPrice: 10000,
    originalPrice: 15000,
    rating: 4.7,
    discount: 34,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/afcb20eef2193010e5f972e7f317b385445610ce?width=120",
  },
  {
    id: "7",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/826a1908a3139a0f7473d38e557db3b56eb02a66?width=478",
    name: "Ớt chuông 3 trái",
    currentPrice: 6160,
    originalPrice: 14000,
    rating: 5.0,
    discount: 56,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/9883dd9b90eb5d6b971e4988968299119900a526?width=120",
  },
  {
    id: "8",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/1e171cb002c255bf4c89f3da601531b538da1c24?width=478",
    name: "Táo xanh 3 trái",
    currentPrice: 17400,
    originalPrice: 30000,
    rating: 4.8,
    discount: 42,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/afcb20eef2193010e5f972e7f317b385445610ce?width=120",
  },
];

export default function Index() {
  const [searchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lấy categoryId từ URL
  const rawCategoryId = searchParams.get("category");
  const currentCategoryId = isNaN(Number(rawCategoryId))
    ? 0
    : Number(rawCategoryId);

  // 1. STATE CHO CÁC BỘ LỌC TỪ SIDEBAR
  const [filters, setFilters] = useState({
    categoryId: currentCategoryId,
    minPrice: 0,
    maxPrice: 500000,
    selectedRatings: [],
    searchTags: [],
  });

  // 2. STATE CHO PHÂN TRANG
  const [page, setPage] = useState(1);
  const size = 20;

  // 3. STATE CHO SẮP XẾP
  const [sortParams, setSortParams] = useState({
    createdSortOption: "DESC",
    ratingSortOption: "",
    numRateSortOption: "",
  });

  // Cập nhật categoryId khi URL thay đổi
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categoryId: currentCategoryId,
    }));
  }, [currentCategoryId]);

  // 4. XỬ LÝ KHI SIDEBAR FILTER THAY ĐỔI
  const handleFilterChange = (newFilters) => {
    setFilters({
      categoryId: newFilters.categoryId,
      minPrice: newFilters.minPrice,
      maxPrice: newFilters.maxPrice,
      selectedRatings: newFilters.selectedRatings,
      searchTags: newFilters.searchTags,
    });
    setPage(1); // Reset về trang 1 khi filter thay đổi
  };

  // 5. XỬ LÝ KHI SORT THAY ĐỔI
  const handleSortChange = (sortValue, sortParamsObj) => {
    setSortParams(sortParamsObj);
    setPage(1); // Reset về trang 1 khi sort thay đổi
  };

  // 6. MAPPING RATING FILTERS ĐỂ GỬI ĐẾN API
  // Nếu selectedRatings = [5, 4, 3], thì min = 3, max = 5
  const getRatingRange = () => {
    if (filters.selectedRatings.length === 0) {
      return { minRating: 0, maxRating: 5 };
    }
    const min = Math.min(...filters.selectedRatings);
    const max = Math.max(...filters.selectedRatings);
    return { minRating: min, maxRating: max };
  };

  const ratingRange = getRatingRange();

  // 7. GỌI SEARCH API VỚI TẤT CẢ FILTERS
  const {
    data: products = [],
    isLoading,
    isError,
  } = useProductSearch({
    categoryId: filters.categoryId,
    productGeneralId: 0,
    searchString: "",
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    minRating: ratingRange.minRating,
    maxRating: ratingRange.maxRating,
    minNumRate: 0,
    maxNumRate: 0,
    searchTags: filters.searchTags,
    createdSortOption: sortParams.createdSortOption,
    ratingSortOption: sortParams.ratingSortOption,
    numRateSortOption: sortParams.numRateSortOption,
    page,
    size,
  });

  const { data: categories = [] } = useCategories();

  // 8. LOGIC TÌM KIẾM ĐƯỜNG DẪN DANH MỤC
  const dynamicBreadcrumbs = useMemo(() => {
    const baseItems = [{ label: "Danh mục sản phẩm", href: "/category" }];

    if (!currentCategoryId || categories.length === 0) return baseItems;

    for (const parent of categories) {
      if (parent.id === currentCategoryId) {
        return [...baseItems, { label: parent.name }];
      }

      const subCategory = parent.subs?.find(
        (sub) => sub.id === currentCategoryId,
      );
      if (subCategory) {
        return [
          ...baseItems,
          { label: parent.name, href: `/category?category=${parent.id}` },
          { label: subCategory.name },
        ];
      }
    }

    return baseItems;
  }, [categories, currentCategoryId]);

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Breadcrumbs customItems={dynamicBreadcrumbs} />
      <main className="container mx-auto px-4 py-8">
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="md:hidden mb-8">
            <Sidebar onFilterChange={handleFilterChange} filters={filters} />
            <button
              onClick={() => setSidebarOpen(false)}
              className="mt-4 text-sm text-primary font-semibold"
            >
              Đóng bộ lọc
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <Sidebar onFilterChange={handleFilterChange} filters={filters} />
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top Bar */}
            <div className="relative z-30">
              <TopBar
                productCount={products.length}
                onSortChange={handleSortChange}
                filters={filters}
              />
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="text-center py-20">Đang tải sản phẩm...</div>
            ) : isError ? (
              <div className="text-center py-20 text-red-500">
                Lỗi kết nối server.
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.
              </div>
            ) : (
              <ProductList products={products} />
            )}

            {/* Load More Button */}
            {/* {products.length > 0 && (
              <div className="flex justify-center mt-12">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md active:scale-95">
                  Xem thêm sản phẩm
                </button>
              </div>
            )} */}
          </div>
        </div>
      </main>
    </div>
  );
}
