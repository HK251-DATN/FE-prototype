# 🚀 QUICK START - CHẠY FRONTEND + BACKEND + TEST

## ⚡ 5 PHÚT START

### Terminal 1: Chạy Backend

```powershell
cd 'd:\My_documents\Workspace\ĐACN_251\backend\ecommerce'
docker-compose up --build
```

**Chờ đến khi thấy:**

```
Started BaseSourceApplication
```

---

### Terminal 2: Chạy Frontend

```powershell
cd 'd:\My_documents\Workspace\ĐACN_251\frontend'
npm run dev
```

**Chờ đến khi thấy:**

```
  ➜  Local:   http://localhost:3000
```

---

### Terminal 3 (Optional): Test API

```powershell
# Kiểm tra backend
curl http://localhost:8080/api/categories

# Kiểm tra frontend dev server
curl http://localhost:3000
```

---

## 🌐 Mở Trình Duyệt

```
http://localhost:3000
```

### Bạn sẽ thấy:

✅ Landing page với banner gradient xanh  
✅ Danh sách sản phẩm từ database (với animations)  
✅ Danh mục từ backend  
✅ Quy trình, benefits, testimonials  
✅ Blog section

---

## 📊 KIỂM TRA DỮ LIỆU

### DevTools (F12)

1. **Network tab**: Kiểm tra requests

   - `GET /api/categories` → 200 OK
   - `GET /api/product-generals` → 200 OK
   - `GET /api/product-details` → 200 OK

2. **Console tab**: Không nên có lỗi

3. **React DevTools**: Check component state

---

## 🔗 FLOW HOẠT ĐỘNG

```
Browser (http://localhost:3000)
           ↓
Landing Page (src/modules/landing/features/index.jsx)
           ↓
useCategories / useProductGenerals / useProductDetails
           ↓
React Query (Caching + Retry logic)
           ↓
Axios Instance (src/utils/request.js)
           ↓
Backend API (http://localhost:8080)
           ↓
Spring Boot + PostgreSQL
```

---

## 🎨 UI/UX FEATURES

### Animations

- ✨ Product card hover effects (scale, lift)
- ✨ Fade-in on scroll
- ✨ Stagger grid animation
- ✨ Image zoom on hover
- ✨ Price highlight

### Responsive

- 📱 Mobile: 1 column
- 📱 Tablet: 2-3 columns
- 💻 Desktop: 5 columns

### Modern Design

- 🎨 Gradient backgrounds
- 🎨 Shadow effects
- 🎨 Rounded corners
- 🎨 Hover transitions
- 🎨 Smooth scrolling

---

## 🛠️ TROUBLESHOOTING

### ❌ "Cannot GET /api/categories"

**→ Backend không chạy**

```powershell
docker-compose up --build
```

### ❌ "Cannot GET http://localhost:8080/api/categories" (CORS Error)

**→ Thêm CORS config vào Backend** (xem FRONTEND_SETUP_GUIDE.md)

### ❌ Images không hiển thị

**→ Backend chỉ trả filename, cần thêm full URL** (xem guide)

### ❌ Animations chậm/lag

**→ Disable DevTools hoặc dùng Chrome Performance tab để check**

### ❌ Port 3000 / 8080 đã bị dùng

```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📖 FILES CHÍNH

| File                                                            | Mục đích                     |
| --------------------------------------------------------------- | ---------------------------- |
| `frontend/.env`                                                 | Config VITE_API_URL          |
| `frontend/vite.config.mjs`                                      | Vite config (port 3000)      |
| `frontend/src/hooks/useCategories.js`                           | Hook fetch categories        |
| `frontend/src/hooks/useProductGenerals.js`                      | Hook fetch products          |
| `frontend/src/hooks/useProductDetails.js`                       | Hook fetch details           |
| `frontend/src/modules/landing/features/index.jsx`               | Landing page (main)          |
| `frontend/src/modules/landing/components/ProductCard/index.jsx` | Product card with animations |
| `FRONTEND_SETUP_GUIDE.md`                                       | Hướng dẫn chi tiết           |

---

## 💡 TIPS

1. **Hot reload**: Vite tự reload khi bạn chỉnh sửa file
2. **React Query**: Tự động cache data + retry
3. **Framer Motion**: Smooth animations without jank
4. **Tailwind**: Responsive classes (sm:, md:, lg:)

---

## 🎯 NEXT STEPS

1. ✅ Chạy backend & frontend
2. ✅ Xem landing page
3. ✅ Check DevTools Network
4. ✅ Thêm CORS config nếu cần
5. ⏳ Tạo product detail page
6. ⏳ Thêm cart functionality
7. ⏳ Implement search/filter
8. ⏳ Setup checkout flow

---

## ✨ READY! 🎉

Bạn đã có:

- ✅ Backend API chạy trên port 8080
- ✅ Frontend dev server chạy trên port 3000
- ✅ Real data từ database
- ✅ Modern animations
- ✅ Responsive UI
- ✅ Error handling

**Bắt đầu chạy ngay! 🚀**

Mở 2 terminal, chạy lệnh ở trên, rồi mở http://localhost:3000 trong browser.
