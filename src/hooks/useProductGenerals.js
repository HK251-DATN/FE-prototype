import { useQuery } from "@tanstack/react-query";
import request from "../utils/request";

/**
 * Hook để fetch danh sách ProductGeneral từ backend
 * Endpoint: GET /api/product-generals?page=0&size=100
 */
export const useProductGenerals = (page = 0, size = 100) => {
  return useQuery({
    queryKey: ["productGenerals", page, size],
    queryFn: async () => {
      const response = await request.get("/api/product-generals", {
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
 * Hook để fetch chi tiết một ProductGeneral
 */
export const useProductGeneralDetail = (productGeneralId) => {
  return useQuery({
    queryKey: ["productGeneral", productGeneralId],
    queryFn: async () => {
      const response = await request.get(
        `/api/product-generals/${productGeneralId}`
      );
      return response;
    },
    enabled: !!productGeneralId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

/**
 * Hook để fetch ProductGenerals theo category
 */
export const useProductGeneralsByCategory = (
  categoryId,
  page = 0,
  size = 100
) => {
  return useQuery({
    queryKey: ["productGenerals", "byCategory", categoryId, page, size],
    queryFn: async () => {
      const response = await request.get("/api/product-generals", {
        params: {
          page,
          size,
          categoryId,
        },
      });
      return response || [];
    },
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
