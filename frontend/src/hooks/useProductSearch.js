import { useQuery } from "@tanstack/react-query";
import request from "../utils/request";

// 🧹 Helper: loại bỏ param không hợp lệ
const cleanParams = (params) => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "number" && isNaN(value)) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      return true;
    }),
  );
};

// 🔢 Helper: parse number an toàn
const safeNumber = (value, defaultValue = 0) => {
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

export const useProductSearch = (filters = {}) => {
  return useQuery({
    queryKey: ["product-search", filters],

    queryFn: async () => {
      // 🧱 Build params chuẩn
      const rawParams = {
        page: safeNumber(filters.page, 1),
        size: safeNumber(filters.size, 20),

        categoryId: safeNumber(filters.categoryId, 0),
        productGeneralId: safeNumber(filters.productGeneralId, 8),

        searchString: filters.searchString || "",

        minPrice: safeNumber(filters.minPrice, 0),
        maxPrice:
          filters.maxPrice && filters.maxPrice > 0
            ? safeNumber(filters.maxPrice)
            : undefined, // ❗ không gửi nếu = 0

        minRating: safeNumber(filters.minRating, 0),
        maxRating: safeNumber(filters.maxRating, 5),

        minNumRate: safeNumber(filters.minNumRate, 0),
        maxNumRate:
          filters.maxNumRate && filters.maxNumRate > 0
            ? safeNumber(filters.maxNumRate)
            : undefined,

        // 🏷️ Tags
        searchTags:
          Array.isArray(filters.searchTags) && filters.searchTags.length > 0
            ? filters.searchTags.join(",")
            : undefined,

        // 🔃 Sort
        createdSortOption: filters.createdSortOption || "DESC",
        ratingSortOption: filters.ratingSortOption || undefined,
        numRateSortOption: filters.numRateSortOption || undefined,
      };

      // 🧹 Clean params trước khi gửi
      const params = cleanParams(rawParams);

      // 🔍 Call API
      const response = await request.get("http://192.168.96.110:9300/api/product-search", {
        params,
      });

      return response?.detail || [];
    },

    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,

    // ❗ tránh spam API khi data chưa hợp lệ
    enabled: true,
  });
};
