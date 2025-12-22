# 🎨 HƯỚNG DẪN: KẾT NỐI BACKEND & CẢI THIỆN UI - ECOMMERCE FRONTEND

## ✅ CÔNG VIỆC ĐÃ HOÀN THÀNH

### 1. ✨ Hooks React Query cho Backend API

Đã tạo các custom hooks để kết nối với backend:

```
src/hooks/
├── useCategories.js ✅
├── useProductGenerals.js ✅
└── useProductDetails.js ✅
```

**Hooks có sẵn:**

- `useCategories(page, size)` - Lấy danh sách categories
- `useCategoryDetail(categoryId)` - Chi tiết category
- `useProductGenerals(page, size)` - Lấy sản phẩm chung
- `useProductGeneralDetail(id)` - Chi tiết sản phẩm chung
- `useProductGeneralsByCategory(categoryId, page, size)` - Sản phẩm theo category
- `useProductDetails(page, size)` - Lấy chi tiết sản phẩm
- `useProductDetailData(id)` - Chi tiết sản phẩm
- `useProductDetailsByGeneral(productGeneralId)` - Chi tiết theo product general

### 2. 🎬 Animations & UI Enhancements

- ✅ ProductCard component: Framer Motion animations (hover effects, scale, fade-in)
- ✅ Landing page: Scroll animations, stagger effects, gradient backgrounds
- ✅ Modern styling với Tailwind + shadow effects
- ✅ Responsive grid layouts

### 3. 🔗 Landing Page Updated

- ✅ Connected to real backend data
- ✅ Dynamic product loading from API
- ✅ Category display từ database
- ✅ Error handling & loading states
- ✅ Fallback data untuk demo

### 4. ⚙️ Environment Configuration

- ✅ Created `.env` file với `VITE_API_URL` = `http://localhost:8080`

---

## 🚀 BƯỚC TIẾP THEO: CHẠY & TEST

### **Bước 1: Đảm bảo Backend đang chạy**

```powershell
cd 'd:\My_documents\Workspace\ĐACN_251\backend\ecommerce'
docker-compose up --build
# Hoặc nếu đã chạy từ trước thì skip
```

**Kiểm tra backend:**

```powershell
curl http://localhost:8080/api/categories
```

### **Bước 2: Cài dependencies Frontend**

```powershell
cd 'd:\My_documents\Workspace\ĐACN_251\frontend'
npm install
# Hoặc: yarn install
```

### **Bước 3: Chạy Frontend Dev Server**

```powershell
npm run dev
# Hoặc: yarn dev
```

**Output sẽ hiển thị:**

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000
  ➜  press h + enter to show help
```

### **Bước 4: Mở trình duyệt**

```
http://localhost:3000
```

Bạn sẽ thấy:

- ✅ Banner hero với gradient xanh
- ✅ Sản phẩm từ backend hiển thị với animations
- ✅ Categories list từ database
- ✅ Animations khi hover & scroll

---

## 🔧 TROUBLESHOOTING

### ❌ Lỗi CORS khi gọi API

**Nếu DevTools console thấy lỗi CORS:**

**Option A: Bật CORS ở Backend (Spring Boot)**
Thêm vào `BaseSourceApplication.java`:

```java
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("*")
                    .allowedHeaders("*");
        }
    };
}
```

**Option B: Thêm Proxy vào `vite.config.mjs`**

```javascript
// Thêm vào defineConfig({ ...
server: {
  port: 3000,
  open: true,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    },
  },
},
```

### ❌ Images từ backend không hiển thị

**Nguyên nhân:** Backend chỉ trả URL mà không có protocol/host

**Giải pháp:** Chỉnh `landing/features/index.jsx`:

```jsx
image: product.photoUrls
  ? (product.photoUrls.startsWith('http')
      ? product.photoUrls
      : `http://localhost:8080${product.photoUrls}`)
  : "https://via.placeholder.com/300",
```

### ❌ Port 3000 đã bị sử dụng

```powershell
# Tìm process dùng port
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F
```

---

## 📊 KIỂM TRA DỮ LIỆU FRONTEND

### **1. Mở DevTools (F12) → Network tab**

- Kiểm tra requests tới `/api/categories`, `/api/product-generals`, `/api/product-details`
- Status phải là 200 (hoặc 304 nếu cache)

### **2. Console tab**

- Không nên có lỗi CORS
- Nếu có "Cannot read property" → API chưa trả đúng format

### **3. React DevTools (Extension)**

- Kiểm tra component tree
- Verify hooks state (useQuery status)

---

## 🎨 CUSTOM UI THÊM (CÓ THỂ LÀM TIẾP)

### **1. Thêm Search Bar**

```jsx
// Trong landing page, thêm vào Hero section:
<input
  type="text"
  placeholder="Tìm sản phẩm..."
  className="w-full px-4 py-3 rounded-lg border-2 border-green-200"
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

### **2. Thêm Filter/Sort**

```jsx
<select
  className="px-4 py-2 border rounded-lg"
  onChange={(e) => setSortBy(e.target.value)}
>
  <option value="newest">Mới nhất</option>
  <option value="price-asc">Giá: Thấp - Cao</option>
  <option value="price-desc">Giá: Cao - Thấp</option>
  <option value="rating">Đánh giá cao</option>
</select>
```

### **3. Thêm Cart Integration**

```jsx
// Thêm vào Redux store (slices/cartSlice.js):
export const addToCart = (product) => (dispatch) => {
  dispatch(addItem(product));
  toast.success("Đã thêm vào giỏ hàng!");
};
```

### **4. Thêm Product Detail Page**

Tạo file: `src/modules/productDetail/features/index.jsx`

```jsx
import { useProductGeneralDetail } from "../../../hooks/useProductGenerals";
import { useProductDetailsByGeneral } from "../../../hooks/useProductDetails";
// ... render chi tiết sản phẩm
```

### **5. Thêm Checkout Flow**

Tạo Redux slice cho checkout process

---

## 📁 FILE STRUCTURE FRONTEND

```
frontend/
├── src/
│   ├── hooks/
│   │   ├── useCategories.js ✅
│   │   ├── useProductGenerals.js ✅
│   │   └── useProductDetails.js ✅
│   ├── modules/
│   │   ├── landing/
│   │   │   ├── features/
│   │   │   │   └── index.jsx ✅ (Updated with API)
│   │   │   ├── components/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── ProductCard/
│   │   │   │   │   └── index.jsx ✅ (Animations added)
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── ...
│   │   └── ...
│   ├── utils/
│   │   └── request.js (Axios instance)
│   ├── store/
│   │   ├── index.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       └── loadingSlice.js
│   ├── App.jsx
│   ├── main.jsx
│   └── .env ✅
├── vite.config.mjs
├── package.json
└── ...
```

---

## 💾 GIT COMMIT (OPTIONAL)

```powershell
cd 'd:\My_documents\Workspace\ĐACN_251'
git add .
git commit -m "feat: connect backend API, add animations, improve landing UI"
git push origin khuong
```

---

## ✨ CÁC ANIMATIONS HIỆN CÓ

### **ProductCard**

- Fade-in on load
- Scale up on hover (image)
- Lift effect (y: -8px)
- Price highlight animation
- Star rating animation

### **Landing Page**

- Section headers slide-down
- Products grid stagger animation
- Categories hover zoom
- Benefits section parallax (optional)

### **Global**

- Smooth transitions
- Framer Motion variants
- Viewport-based animations (scroll-triggered)

---

## 🎯 NEXT STEPS (TÙY BẠN)

1. **Test API integration** → Xem console DevTools
2. **Add more pages** → Product detail, cart, checkout
3. **Optimize images** → Next/Image component
4. **Add Pagination** → Cho list products
5. **Add Filters** → Category, price range, rating
6. **Implement Search** → Full-text search
7. **Add Auth flow** → Login, register, profile
8. **Dark mode** → Toggle theme
9. **PWA support** → Offline capability
10. **Analytics** → Track user behavior

---

## 📞 CẦN GIÚP?

Nếu lỗi:

1. Kiểm tra backend logs: `docker-compose logs -f`
2. Kiểm tra browser console: F12 → Console
3. Kiểm tra Network tab: Requests status
4. Kiểm tra `.env` file: URL đúng chưa?

**Good luck! 🚀**
