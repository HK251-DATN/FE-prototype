import { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { Menu, X } from "lucide-react";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navigation from "../../../components/Navigation/Navigation";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

const mockProducts = [
  {
    id: "1",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/12b39791062985152489730bcad5cb1685104119?width=478",
    name: "Cải thìa",
    currentPrice: 10000,
    originalPrice: 14000,
    rating: 4.7,
    discount: 39,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/fc7f73798abfb147ebcdf40a13a44ff7e1568869?width=120",
  },
  {
    id: "2",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/2e176fc653b9096d523f560e97f4557758ac1dac?width=478",
    name: "Cà chua",
    currentPrice: 10000,
    originalPrice: 15000,
    rating: 4.7,
    discount: 34,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/afcb20eef2193010e5f972e7f317b385445610ce?width=120",
  },
  {
    id: "3",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/826a1908a3139a0f7473d38e557db3b56eb02a66?width=478",
    name: "Ớt chuông 3 trái",
    currentPrice: 6160,
    originalPrice: 14000,
    rating: 5.0,
    discount: 56,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/9883dd9b90eb5d6b971e4988968299119900a526?width=120",
  },
  {
    id: "4",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/1e171cb002c255bf4c89f3da601531b538da1c24?width=478",
    name: "Táo xanh 3 trái",
    currentPrice: 17400,
    originalPrice: 30000,
    rating: 4.8,
    discount: 42,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/afcb20eef2193010e5f972e7f317b385445610ce?width=120",
  },
  {
    id: "5",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/12b39791062985152489730bcad5cb1685104119?width=478",
    name: "Cải thìa",
    currentPrice: 10000,
    originalPrice: 14000,
    rating: 4.7,
    discount: 39,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/fc7f73798abfb147ebcdf40a13a44ff7e1568869?width=120",
  },
  {
    id: "6",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/2e176fc653b9096d523f560e97f4557758ac1dac?width=478",
    name: "Cà chua",
    currentPrice: 10000,
    originalPrice: 15000,
    rating: 4.7,
    discount: 34,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/afcb20eef2193010e5f972e7f317b385445610ce?width=120",
  },
  {
    id: "7",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/826a1908a3139a0f7473d38e557db3b56eb02a66?width=478",
    name: "Ớt chuông 3 trái",
    currentPrice: 6160,
    originalPrice: 14000,
    rating: 5.0,
    discount: 56,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/9883dd9b90eb5d6b971e4988968299119900a526?width=120",
  },
  {
    id: "8",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/1e171cb002c255bf4c89f3da601531b538da1c24?width=478",
    name: "Táo xanh 3 trái",
    currentPrice: 17400,
    originalPrice: 30000,
    rating: 4.8,
    discount: 42,
    vendorImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/afcb20eef2193010e5f972e7f317b385445610ce?width=120",
  },
];

export default function Index() {
  const [sortType, setSortType] = useState("latest");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const sortedProducts = useMemo(() => {
    const cloned = [...products];

    switch (sortType) {
      case "price-low":
        return cloned.sort((a, b) => a.currentPrice - b.currentPrice);

      case "price-high":
        return cloned.sort((a, b) => b.currentPrice - a.currentPrice);

      case "rating":
        return cloned.sort((a, b) => b.rating - a.rating);

      case "latest":
      default:
        // hiện chưa có createdAt → giữ nguyên thứ tự backend trả về
        return cloned;
    }
  }, [products, sortType]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [generalRes, detailRes] = await Promise.all([
          fetch("http://localhost:8080/api/product-generals?page=0&size=20"),
          fetch("http://localhost:8080/api/product-details?page=0&size=20"),
        ]);

        const generals = await generalRes.json();
        const details = await detailRes.json();

        // Map productGeneralId -> productGeneral
        const generalMap = {};
        generals.forEach((g) => {
          generalMap[g.productGeneralId] = g;
        });

        // Mỗi PRODUCT DETAIL = 1 CARD
        const mappedProducts = details.map((d) => {
          const general = generalMap[d.productGeneralId];

          return {
            id: d.productDetailId,
            image: general?.photoUrls,
            name: general?.productName,
            description: d.description,
            currentPrice: d.price,
            originalPrice: d.price * 1.3, //tạm hardcode, sau này thêm db sau
            rating: 4.5, // tạm hardcode, sau này lấy từ review
            discount: Math.round(
              ((d.price * 1.3 - d.price) / (d.price * 1.3)) * 100
            ),
            // quantityAvailable: d.quantityAvailable,
            vendorImage: null, // sau này gắn vendor
          };
        });

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Fetch products error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Header />
      <Navigation />
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Danh mục sản phẩm", href: "/user/category" },
          { label: "Rau củ quả tươi" },
        ]}
      />
      <main className="container mx-auto px-4 py-8">
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="md:hidden mb-8">
            <Sidebar />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top Bar */}
            <TopBar
              productCount={sortedProducts.length}
              onSortChange={setSortType}
            />

            {/* Product Grid */}
            {loading ? (
              <div className="text-center py-20">Đang tải sản phẩm...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
            {/* Load More Button */}
            <div className="flex justify-center mt-12">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors">
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
