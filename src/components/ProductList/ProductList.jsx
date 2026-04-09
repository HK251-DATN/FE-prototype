import ProductCard from "../../modules/category/components/ProductCard";
import { useProductSearch } from "../../hooks/useProductSearch";
import nongtraixanh from "../../assets/images/logo_nongtraixanh.png";

export default function ProductList({ products = [] }) {
  // HÀM TẠO ẢNH VENDOR TẠM
  const getVendorPlaceholder = (providerId) => {
    return `https://picsum.photos/seed/${providerId || "default-vendor"}/100/100`;
  };
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Không có sản phẩm nào khớp với lựa chọn của bạn.
      </div>
    );
  }

  // if (isLoading)
  //   return <div className="text-center py-10">Đang tìm sản phẩm...</div>;
  // if (isError)
  //   return (
  //     <div className="text-center py-10 text-red-500">Lỗi khi tải sản phẩm</div>
  //   );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((item, index) => (
        <ProductCard
          key={`${item.productGeneralId}-${item.batchId}-${index}`}
          id={item.productGeneralId}
          batchId={item.batchId}
          name={item.name}
          image={item.img}
          description={item.description}
          currentPrice={item.salePrice}
          originalPrice={item.originPrice}
          discount={item.disVal}
          rating={item.avgRate ? Number(item.avgRate.toFixed(1)) : 0}
          quantityAvailable={item.quantity}
          createdAt={item.createdAt}
          isBestSeller={item.numRate >= 5}
          vendorImage={getVendorPlaceholder(item.providerId)}
        />
      ))}
    </div>
  );
}
