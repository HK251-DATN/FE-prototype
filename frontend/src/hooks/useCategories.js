import { useQuery } from "@tanstack/react-query";
import request from "../utils/request";

/**
 * Hook để fetch danh sách categories từ backend
 * Endpoint: GET /api/categories?page=0&size=100
 */
export const useCategories = (page = 1, size = 20) => {
  return useQuery({
    queryKey: ["categories", page, size],
    queryFn: async () => {
      const response = await request.get("http://192.168.96.110:9300/api/categories", {
        params: { page, size },
      });

      // Lấy mảng từ trường "detail" theo cấu trúc JSON mới của bạn
      const rawData = response?.detail || [];
      console.log("Dữ liệu API trả về:", response);
      // Logic "Gom nhóm": Chuyển dữ liệu phẳng thành cấu trúc cây
      const categoryMap = {};

      rawData.forEach((item) => {
        // Nếu chưa có ParentId này trong map, tạo mới một object cha
        if (!categoryMap[item.parentId]) {
          categoryMap[item.parentId] = {
            id: item.parentId,
            name: item.parentName,
            description: item.parentDescription,
            iconUrl: item.parentIconUrl,
            displayOrder: item.parentDisplayOrder,
            subs: [], // Mảng chứa các danh mục con
          };
        }

        // Nếu có subId và subId chưa tồn tại trong danh sách con (tránh trùng lặp)
        if (
          item.subId &&
          !categoryMap[item.parentId].subs.find((s) => s.id === item.subId)
        ) {
          categoryMap[item.parentId].subs.push({
            id: item.subId,
            name: item.subName,
            description: item.subParentDescription,
            iconUrl: item.subIconUrl,
            displayOrder: item.subDisplayOrder,
          });
        }
      });

      // Chuyển object thành mảng và sắp xếp theo thứ tự hiển thị
      return Object.values(categoryMap).sort(
        (a, b) => a.displayOrder - b.displayOrder,
      );
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
