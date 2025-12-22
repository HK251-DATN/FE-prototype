import { useQuery } from "@tanstack/react-query";
import request from "../utils/request";

/**
 * Hook để fetch danh sách categories từ backend
 * Endpoint: GET /api/categories?page=0&size=100
 */
export const useCategories = (page = 0, size = 100) => {
  return useQuery({
    queryKey: ["categories", page, size],
    queryFn: async () => {
      const response = await request.get("/api/categories", {
        params: {
          page,
          size,
        },
      });
      // API response: { value: [...], Count: n }
      const data = response?.value || response?.result || response || [];
      return Array.isArray(data) ? data : [];
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

/**
 * Hook để fetch chi tiết một category
 */
export const useCategoryDetail = (categoryId) => {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => {
      const response = await request.get(`/api/categories/${categoryId}`);
      return response;
    },
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
