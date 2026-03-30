import React, { useState, useEffect } from "react";
import ProductDetails from "../components/productDetailNew2";
import ProductDescription from "../components/productDescriptionNew2";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumbs";

export default function Product() {
  const [productData, setProductData] = useState(null);
  const [descriptionData, setDescriptionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hàm gọi 3 API cùng lúc
    const fetchProductData = async () => {
      try {
        // ID sản phẩm hiện tại (giả sử lấy từ URL param, ở đây fix cứng là 1)
        const id = 1; 
        
        const [generalRes, batchRes, detailRes] = await Promise.all([
          fetch(`/api/product-generals/${id}`).then(res => res.json()),
          fetch(`/api/batch-details/${id}`).then(res => res.json()),
          fetch(`/api/product-details/${id}`).then(res => res.json())
        ]);

        const general = generalRes.detail;
        const batch = batchRes.detail;
        const detail = detailRes.detail;

        // 1. Map data cho ProductDetail Component
        const mappedProduct = {
          id: general.productGeneralId,
          name: general.name,
          status: detail.status === "ACTIVE" ? "Còn hàng" : "Hết hàng",
          rating: batch.avgRate,
          reviewCount: batch.numRate,
          sku: detail.batchId || "N/A",
          originalPrice: batch.price, // API chưa có giá gốc, dùng tạm giá bán
          salePrice: batch.price,
          discountPercent: 0, 
          description: general.description, // Đang là "500g", bạn có thể tùy chỉnh
          category: `Danh mục ${general.categoryId}`, // Cần gọi thêm API category nếu muốn tên thật
          tags: general.tags || [],
          shop: {
            name: general.providerId,
            logo: "https://via.placeholder.com/150", // Mặc định vì API chưa có logo
          },
          // Gộp ảnh từ general và detail
          images: [
            { id: "1", src: general.img, alt: general.name },
            { id: "2", src: detail.img, alt: general.name + " detail" }
          ].filter(img => img.src) // Lọc bỏ nếu ko có link ảnh
        };

        // 2. Map data cho ProductDescription Component
        const mappedDescription = {
          tabs: ["Mô tả", "Thông tin thêm", "Đánh giá"],
          description: {
            // Lấy nội dung HTML từ API
            htmlContent: detail.detail?.HTML || batch.detailContent || "Chưa có mô tả chi tiết.",
            features: [
              "Rau được trồng theo quy trình an toàn",
              "Không sử dụng hóa chất độc hại"
            ],
          },
          additionalInfo: {
            weight: general.description, // Ví dụ: 500g
            origin: general.providerId,
            storage: "Bảo quản ngăn mát",
            certification: "VietGAP",
          },
          // Mock data cho reviews vì API chỉ trả về numRate và avgRate
          reviews: [] 
        };

        setProductData(mappedProduct);
        setDescriptionData(mappedDescription);
      } catch (error) {
        console.error("Lỗi khi fetch data sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  if (loading) {
    return <div className="p-10 text-center flex justify-center text-[#00B207]">Đang tải dữ liệu sản phẩm...</div>;
  }

  if (!productData) {
    return <div className="p-10 text-center text-red-500">Không tìm thấy sản phẩm.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl flex flex-col relative gap-8 pb-10">
      <Breadcrumb
        items={[
          { label: "Trang chủ", link: "/" },
          { label: "Sản phẩm", link: "/product" },
          { label: productData.name, link: `/products/${productData.id}` },
        ]}
      />
      {/* Truyền dữ liệu thật xuống components con */}
      <ProductDetails product={productData} />
      <ProductDescription data={descriptionData} />
    </div>
  );
}