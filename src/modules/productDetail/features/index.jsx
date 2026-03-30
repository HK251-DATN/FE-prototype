import React, { useState, useEffect } from "react";
import ProductDetails from "../components/productDetail";
import ProductDescription from "../components/productDescription";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumbs";
import { useParams } from "react-router";

// const BASE_URL =
//   import.meta.env.VITE_API_ECOMMERCE_URL || "http://localhost:8080";

export default function Product() {
  // Lấy id từ URL: /products/:id
  const { id } = useParams();
  const productDetailId = id || "1";

  const [productGeneral, setProductGeneral] = useState(null);
  const [batchDetail, setBatchDetail] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch product-details trước để lấy productGeneralId và batchId
        const detailRes = await fetch(
          `/api/product-details/${productDetailId}`,
        );
        if (!detailRes.ok) throw new Error("Không thể tải thông tin sản phẩm");
        const detailData = await detailRes.json();
        const detail = detailData.detail;
        setProductDetail(detail);

        // 2. Fetch product-generals và batch-details song song
        const [generalRes, batchRes] = await Promise.all([
          fetch(`/api/product-generals/${detail.productGeneralId}`),
          fetch(`/api/batch-details/${detail.batchId}`),
        ]);

        if (!generalRes.ok)
          throw new Error("Không thể tải thông tin chung sản phẩm");
        if (!batchRes.ok) throw new Error("Không thể tải thông tin lô hàng");

        const generalData = await generalRes.json();
        const batchData = await batchRes.json();

        setProductGeneral(generalData.detail);
        setBatchDetail(batchData.detail);
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [productDetailId]);

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

  if (error) {
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
    <div className="max-w-7xl mx-auto bg-white rounded-xl flex flex-col relative">
      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "Product", link: "/product" },
          {
            label: productGeneral?.name || "Chi tiết sản phẩm",
            link: `/products/${productDetailId}`,
          },
        ]}
      />
      <ProductDetails
        productGeneral={productGeneral}
        batchDetail={batchDetail}
        productDetail={productDetail}
      />
      <ProductDescription
        productGeneral={productGeneral}
        batchDetail={batchDetail}
        productDetail={productDetail}
      />
    </div>
  );
}
