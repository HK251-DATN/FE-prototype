# 📖 HOOKS DOCUMENTATION

## Tất cả Custom Hooks được tạo

Những hooks này kết nối frontend với backend API thông qua React Query.

---

## 1️⃣ useCategories

**File:** `src/hooks/useCategories.js`

### useCategories(page, size)

Lấy danh sách categories từ backend.

```javascript
import { useCategories } from "../../../hooks/useCategories";

function MyComponent() {
  const { data: categories, isLoading, error } = useCategories(0, 10);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {categories?.map((cat) => (
        <div key={cat.categoryId}>{cat.categoryName}</div>
      ))}
    </div>
  );
}
```

**Parameters:**

- `page`: number (default: 0) - Trang thứ bao nhiêu
- `size`: number (default: 100) - Bao nhiêu items mỗi trang

**Returns:**

```javascript
{
  data: Category[],          // Array of categories
  isLoading: boolean,         // Đang load?
  isError: boolean,           // Có lỗi?
  error: Error | null,        // Error object
  isFetching: boolean,        // Đang fetch?
  refetch: () => {},          // Refetch manually
  // ... other React Query methods
}
```

**API Endpoint:**

```
GET /api/categories?page=0&size=10
```

---

### useCategoryDetail(categoryId)

Lấy chi tiết một category.

```javascript
const { data: category } = useCategoryDetail(1);
```

**Parameters:**

- `categoryId`: number - ID của category

---

## 2️⃣ useProductGenerals

**File:** `src/hooks/useProductGenerals.js`

### useProductGenerals(page, size)

Lấy danh sách ProductGenerals (sản phẩm chung).

```javascript
import { useProductGenerals } from "../../../hooks/useProductGenerals";

function Products() {
  const { data: products, isLoading } = useProductGenerals(0, 20);

  if (isLoading) return <div>Loading products...</div>;

  return (
    <div className="grid">
      {products?.map((prod) => (
        <ProductCard key={prod.productGeneralId} product={prod} />
      ))}
    </div>
  );
}
```

**Parameters:**

- `page`: number (default: 0)
- `size`: number (default: 100)

**API Endpoint:**

```
GET /api/product-generals?page=0&size=20
```

**Response Example:**

```javascript
[
  {
    productGeneralId: 1,
    categoryId: 1,
    productName: "MacBook Pro",
    description: "High-end laptop",
    status: "ACTIVE",
    photoUrls: '["url1", "url2"]',
    createdAt: "2025-12-05T10:30:00",
    updatedAt: "2025-12-05T11:00:00",
  },
  // ...
];
```

---

### useProductGeneralDetail(productGeneralId)

Lấy chi tiết một ProductGeneral.

```javascript
const { data: product } = useProductGeneralDetail(1);
// product.productGeneralId
// product.productName
// product.categoryId
// ...
```

---

### useProductGeneralsByCategory(categoryId, page, size)

Lấy sản phẩm theo category.

```javascript
const { data: products } = useProductGeneralsByCategory(1, 0, 20);
// Lấy 20 sản phẩm từ category ID 1
```

**Parameters:**

- `categoryId`: number - ID của category (required)
- `page`: number (default: 0)
- `size`: number (default: 100)

---

## 3️⃣ useProductDetails

**File:** `src/hooks/useProductDetails.js`

### useProductDetails(page, size)

Lấy danh sách ProductDetails (chi tiết sản phẩm).

```javascript
import { useProductDetails } from "../../../hooks/useProductDetails";

function ProductDetailsPage() {
  const { data: details, isLoading } = useProductDetails(0, 100);

  return (
    <div>
      {details?.map((detail) => (
        <div key={detail.productDetailId}>
          <p>Price: {detail.price}₫</p>
          <p>Quantity: {detail.quantityAvailable}</p>
        </div>
      ))}
    </div>
  );
}
```

**Parameters:**

- `page`: number (default: 0)
- `size`: number (default: 100)

**API Endpoint:**

```
GET /api/product-details?page=0&size=100
```

**Response Example:**

```javascript
[
  {
    productDetailId: 1,
    productGeneralId: 1,
    description: "16GB RAM, 512GB SSD",
    status: "ACTIVE",
    quantityAvailable: 50,
    price: 3499.99,
    createdAt: "2025-12-05T10:30:00",
    updatedAt: "2025-12-05T11:00:00",
  },
  // ...
];
```

---

### useProductDetailData(productDetailId)

Lấy chi tiết một ProductDetail.

```javascript
const { data: detail } = useProductDetailData(1);
// detail.price
// detail.quantityAvailable
// detail.description
// ...
```

---

### useProductDetailsByGeneral(productGeneralId, page, size)

Lấy ProductDetails theo ProductGeneral.

```javascript
const { data: details } = useProductDetailsByGeneral(1, 0, 20);
// Lấy tất cả variants của product ID 1
// Ví dụ: MacBook Pro 16GB RAM, MacBook Pro 32GB RAM, etc.
```

**Parameters:**

- `productGeneralId`: number - ID của product general (required)
- `page`: number (default: 0)
- `size`: number (default: 100)

---

## 🎯 COMMON USE CASES

### Case 1: Display Product Grid

```javascript
import { useProductGenerals } from "../hooks/useProductGenerals";
import ProductCard from "./ProductCard";

function ProductGrid() {
  const { data: products, isLoading } = useProductGenerals(0, 20);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="grid grid-cols-5 gap-4">
      {products?.map((product) => (
        <ProductCard key={product.productGeneralId} data={product} />
      ))}
    </div>
  );
}
```

---

### Case 2: Product Detail Page

```javascript
import { useProductGeneralDetail } from "../hooks/useProductGenerals";
import { useProductDetailsByGeneral } from "../hooks/useProductDetails";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { productId } = useParams();

  const { data: product } = useProductGeneralDetail(productId);
  const { data: variants } = useProductDetailsByGeneral(productId);

  return (
    <div>
      <h1>{product?.productName}</h1>
      <p>{product?.description}</p>

      <h3>Available Variants:</h3>
      {variants?.map((variant) => (
        <button key={variant.productDetailId}>
          {variant.description} - {variant.price}₫
        </button>
      ))}
    </div>
  );
}
```

---

### Case 3: Filter by Category

```javascript
import { useProductGeneralsByCategory } from "../hooks/useProductGenerals";

function CategoryProducts({ categoryId }) {
  const { data: products, isLoading } = useProductGeneralsByCategory(
    categoryId,
    0,
    50
  );

  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : (
        products?.map((p) => <Card key={p.productGeneralId} {...p} />)
      )}
    </div>
  );
}
```

---

### Case 4: Combine Data

```javascript
import { useProductGenerals } from "../hooks/useProductGenerals";
import { useProductDetails } from "../hooks/useProductDetails";

function CombinedProductList() {
  const { data: products } = useProductGenerals(0, 20);
  const { data: details } = useProductDetails(0, 100);

  // Combine products with details
  const enrichedProducts = products?.map((prod) => {
    const detail = details?.find(
      (d) => d.productGeneralId === prod.productGeneralId
    );
    return {
      ...prod,
      price: detail?.price,
      quantity: detail?.quantityAvailable,
    };
  });

  return (
    <div>
      {enrichedProducts?.map((prod) => (
        <div key={prod.productGeneralId}>
          <h3>{prod.productName}</h3>
          <p>Price: {prod.price}₫</p>
          <p>Stock: {prod.quantity}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## ⚙️ REACT QUERY CONFIGURATION

Tất cả hooks được cấu hình với:

```javascript
{
  staleTime: 1000 * 60 * 5,      // Data cũ sau 5 phút
  retry: 2,                       // Retry 2 lần nếu fail
  gcTime: 1000 * 60 * 60,        // Cache 1 giờ
  enabled: /* depends on params */
}
```

---

## 🔄 REFETCHING

```javascript
const { data, refetch } = useProductGenerals(0, 20);

// Manual refetch
<button onClick={() => refetch()}>Refresh</button>;

// Auto refetch when window focus
// (built-in React Query behavior)
```

---

## 🛠️ ERROR HANDLING

```javascript
const { data, isError, error } = useProductGenerals(0, 20);

if (isError) {
  return (
    <div className="text-red-600">
      Error: {error?.message || "Failed to load products"}
    </div>
  );
}
```

---

## 📊 LOADING STATES

```javascript
const { isLoading, isFetching } = useProductGenerals(0, 20);

if (isLoading) return <FullPageSkeleton />; // Initial load
if (isFetching) return <PartialUpdate />; // Refetching
```

---

## 💾 CACHING

React Query automatically caches data:

```javascript
// First call - fetches from API
const result1 = useProductGenerals(0, 20);

// Second call - uses cached data (stale time: 5 min)
const result2 = useProductGenerals(0, 20);

// After 5 minutes - refetches automatically
```

---

## 📝 BEST PRACTICES

1. **Use correct hooks** - Pick the right hook for your use case
2. **Handle loading** - Show skeleton or loader
3. **Handle errors** - Catch and display errors
4. **Combine data** - Merge product + details for rich UI
5. **Pagination** - Use page/size params
6. **Refetch** - Manual refetch when needed

---

## 🚀 QUICK REFERENCE

```javascript
// Categories
useCategories(0, 10); // List
useCategoryDetail(1); // Single

// Products
useProductGenerals(0, 20); // List
useProductGeneralDetail(1); // Single
useProductGeneralsByCategory(1); // By category

// Details
useProductDetails(0, 100); // List
useProductDetailData(1); // Single
useProductDetailsByGeneral(1); // By product
```

---

## 📞 SUPPORT

Cần giúp? Check:

- `FRONTEND_SETUP_GUIDE.md` - Detailed setup
- `INTEGRATION_COMPLETE.md` - Complete overview
- Browser DevTools Network tab - API calls
- Console - Error messages

---

Happy coding! 🚀
