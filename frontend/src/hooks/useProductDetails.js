import { useQuery } from "@tanstack/react-query";
import request from "../utils/request";

/**
 * Hook để fetch danh sách ProductDetail từ backend
 * Endpoint: GET /api/product-details?page=0&size=100
 */
export const useProductDetails = (page = 0, size = 100) => {
  return useQuery({
    queryKey: ["productDetails", page, size],
    queryFn: async () => {
      const response = await request.get("http://192.168.96.110:9300/api/product-details", {
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
 * Hook để fetch chi tiết một ProductDetail
 */
export const useProductDetailData = (productDetailId) => {
  return useQuery({
    queryKey: ["productDetail", productDetailId],
    queryFn: async () => {
      const response = await request.get(
        `http://192.168.96.110:9300/api/product-details/${productDetailId}`
      );
      return response;
    },
    enabled: !!productDetailId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

/**
 * Hook để fetch ProductDetails theo ProductGeneral
 */
export const useProductDetailsByGeneral = (
  productGeneralId,
  page = 0,
  size = 100
) => {
  return useQuery({
    queryKey: ["productDetails", "byGeneral", productGeneralId, page, size],
    queryFn: async () => {
      const response = await request.get("/api/product-details", {
        params: {
          page,
          size,
          productGeneralId,
        },
      });
      return response || [];
    },
    enabled: !!productGeneralId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
