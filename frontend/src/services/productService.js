import axiosClient from "../api/axiosClient";

const productService = {
  // Lấy danh sách sản phẩm tổng quát
  getGenerals: (page = 0, size = 20) => {
    const url = "/product-generals";
    return axiosClient.get(url, { params: { page, size } });
  },

  // Lấy danh sách chi tiết sản phẩm
  getDetails: (page = 0, size = 20) => {
    const url = "/product-details";
    return axiosClient.get(url, { params: { page, size } });
  },

  // Bạn có thể thêm các hàm khác sau này
  getById: (id) => {
    return axiosClient.get(`/product-details/${id}`);
  },

  updateProduct: (id, data) => {
    return axiosClient.put(`/product-details/${id}`, data);
  },
};

export default productService;
