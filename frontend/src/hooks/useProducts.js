import { useState, useEffect } from "react";
import productService from "../services/productService";
export const useProducts = (page = 0, size = 20) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const [generalRes, detailRes] = await Promise.all([
        //   fetch("http://localhost:8080/api/product-generals?page=0&size=20"),
        //   fetch("http://localhost:8080/api/product-details?page=0&size=20"),
        // ]);

        // const generals = await generalRes.json();
        // const details = await detailRes.json();

        setLoading(true);
        // Axios giúp code gọn hơn, data đã được interceptor bóc tách sẵn
        const [generals, details] = await Promise.all([
          productService.getGenerals(page, size),
          productService.getDetails(page, size),
        ]);

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
              ((d.price * 1.3 - d.price) / (d.price * 1.3)) * 100,
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
  }, [page, size]);

  return { products, loading, error };
};
