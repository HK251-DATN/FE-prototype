import React, { useState, useEffect } from "react";
import ProductDetails from "../components/productDetail";
import ProductDescription from "../components/productDescriptionNew2";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumbs";
import { useSearchParams } from "react-router-dom";
import request from "../../../utils/request";

export default function Product() {
  const [searchParams] = useSearchParams();
  const productGeneralId = searchParams.get("productGeneralId");
  const batchId = searchParams.get("batchId"); // Optional

  const [productData, setProductData] = useState(null);
  const [descriptionData, setDescriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      if (!productGeneralId) {
        setError("Không tìm thấy mã sản phẩm.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Fetch từ product-search
        const searchRes = await request.get("/api/product-search", {
          params: { productGeneralId }
        });
        
        let details = searchRes?.detail;
        if (!details || details.length === 0) {
          throw new Error("Sản phẩm không còn tồn tại");
        }

        // Nếu có batchId, ưu tiên lấy đúng lô, nếu không lấy lô đầu tiên
        let item = details.find((d) => d.batchId === batchId) || details[0];

        // 1. Map data cho ProductDetail Component
        const mappedProduct = {
          id: item.productGeneralId,
          batchId: item.batchId, // Dùng để add to cart
          name: item.name,
          status: item.quantity > 0 ? "Còn hàng" : "Hết hàng",
          rating: item.avgRate || 5,
          reviewCount: item.numRate || 0,
          sku: item.batchId,
          originalPrice: item.originPrice,
          salePrice: item.salePrice,
          discountPercent: item.disVal ? Number(item.disVal.toFixed(0)) : 0, 
          description: item.description,
          category: `Danh mục ${item.categoryId}`, // Fake category name
          tags: ["Rau củ"], // Mặc định nếu API không trả về
          shop: {
            name: item.providerId,
            logo: "https://via.placeholder.com/150", 
          },
          images: [
            { id: "1", src: item.img, alt: item.name },
          ].filter(img => img.src)
        };

        // 2. Lấy thêm thông tin detailHTML từ product-generals hoặc batch-details nếu cần mở rộng
        const mappedDescription = {
          tabs: ["Mô tả", "Thông tin thêm", "Đánh giá"],
          description: {
            htmlContent: item.description || "Chưa có mô tả chi tiết.",
            features: [
              "Chất lượng đảm bảo",
              "Giá thành hợp lý"
            ],
          },
          additionalInfo: {
            weight: "Cập nhật sau", 
            origin: item.providerId,
            storage: "Bảo quản nơi khô ráo",
            certification: "VietGAP",
          },
          reviews: [] 
        };

        setProductData(mappedProduct);
        setDescriptionData(mappedDescription);
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [productGeneralId, batchId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto bg-white rounded-xl flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-[#808080]">
          <svg
            className="animate-spin w-8 h-8 text-[#00B207]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span className="text-sm">Đang tải sản phẩm...</span>
        </div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="max-w-7xl mx-auto bg-white rounded-xl flex items-center justify-center min-h-[400px]">
        <div className="text-center text-red-500">
          <p className="text-lg font-medium">Tải dữ liệu thất bại</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl flex flex-col relative gap-8 pb-10">
      <Breadcrumb
        items={[
          { label: "Trang chủ", link: "/" },
          { label: "Sản phẩm", link: "/category" },
          {
            label: productData.name,
            link: `/product?productGeneralId=${productGeneralId}`,
          },
        ]}
      />
      <ProductDetails product={productData} />
      <ProductDescription data={descriptionData} />
    </div>
  );
}
