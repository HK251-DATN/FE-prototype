# 🚀 QUICK REFERENCE - CHẠY BACKEND VÀ TEST API

## ⚡ START NHANH NHẤT

### 1️⃣ Mở PowerShell

```powershell
cd 'd:\My_documents\Workspace\ĐACN_251\backend\ecommerce'
```

### 2️⃣ Chạy Backend

```powershell
docker-compose up --build
```

### 3️⃣ Chờ thấy dòng này

```
ecommerce-app  | Started BaseSourceApplication
```

✅ **Backend Ready!**

---

## 📝 TEST API - COPY PASTE NGAY

### **Postman - Cách dễ nhất**

1. Mở Postman
2. Click **Collections** → **Import**
3. Chọn file: `d:\My_documents\Workspace\ĐACN_251\backend\ecommerce\ecom_dacn.json`
4. Click vào request → **Send**

---

## 🧪 TEST VỚI cURL / PowerShell

### 1. CREATE CATEGORY

```powershell
$url = "http://localhost:8080/api/categories"
$headers = @{"Content-Type" = "application/json"}
$body = @{
    categoryName = "Electronics"
    displayOrder = 1
    description = "Electronic devices"
    isSubCategory = "N"
    belongToCategory = $null
} | ConvertTo-Json

Invoke-RestMethod -Uri $url -Method POST -Headers $headers -Body $body
```

**Expected**: HTTP 201 + Dữ liệu category mới

---

### 2. GET ALL CATEGORIES

```powershell
$url = "http://localhost:8080/api/categories?page=0&size=20"
Invoke-RestMethod -Uri $url -Method GET
```

**Expected**: HTTP 200 + Array of categories

---

### 3. GET CATEGORY BY ID

```powershell
$url = "http://localhost:8080/api/categories/1"
Invoke-RestMethod -Uri $url -Method GET
```

**Expected**: HTTP 200 + Category object

---

### 4. UPDATE CATEGORY

```powershell
$url = "http://localhost:8080/api/categories/1"
$headers = @{"Content-Type" = "application/json"}
$body = @{
    categoryName = "Updated Electronics"
    displayOrder = 2
    description = "Updated description"
} | ConvertTo-Json

Invoke-RestMethod -Uri $url -Method PUT -Headers $headers -Body $body
```

**Expected**: HTTP 200 + Updated category

---

### 5. DELETE CATEGORY

```powershell
$url = "http://localhost:8080/api/categories/1"
Invoke-RestMethod -Uri $url -Method DELETE
```

**Expected**: HTTP 200 (Empty body)

---

## 📌 PRODUCT GENERAL APIs

### Create ProductGeneral

```powershell
$url = "http://localhost:8080/api/product-generals"
$body = @{
    categoryId = 1
    productName = "MacBook Pro"
    description = "High-end laptop"
    status = "ACTIVE"
    photoUrls = '["https://cdn.com/mac1.png"]'
} | ConvertTo-Json

Invoke-RestMethod -Uri $url -Method POST -Headers $headers -Body $body
```

### Get All ProductGenerals

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/product-generals?page=0&size=20" -Method GET
```

### Get ProductGeneral By ID

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/product-generals/1" -Method GET
```

### Update ProductGeneral

```powershell
$url = "http://localhost:8080/api/product-generals/1"
$body = @{
    productName = "MacBook Pro 2025"
    status = "INACTIVE"
} | ConvertTo-Json

Invoke-RestMethod -Uri $url -Method PUT -Headers $headers -Body $body
```

### Delete ProductGeneral

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/product-generals/1" -Method DELETE
```

---

## 🛍️ PRODUCT DETAIL APIs

### Create ProductDetail

```powershell
$url = "http://localhost:8080/api/product-details"
$body = @{
    productGeneralId = 1
    description = "16GB RAM, 512GB SSD"
    quantityAvailable = 50
    price = 3499.99
    status = "ACTIVE"
} | ConvertTo-Json

Invoke-RestMethod -Uri $url -Method POST -Headers $headers -Body $body
```

### Get All ProductDetails

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/product-details?page=0&size=20" -Method GET
```

### Get ProductDetail By ID

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/product-details/1" -Method GET
```

### Update ProductDetail

```powershell
$url = "http://localhost:8080/api/product-details/1"
$body = @{
    quantityAvailable = 45
    price = 3599.99
} | ConvertTo-Json

Invoke-RestMethod -Uri $url -Method PUT -Headers $headers -Body $body
```

### Delete ProductDetail

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/product-details/1" -Method DELETE
```

---

## 🛠️ DOCKER COMMANDS

| Lệnh                        | Mục đích                  |
| --------------------------- | ------------------------- |
| `docker-compose up --build` | Build + Chạy backend      |
| `docker-compose up`         | Chạy (không build)        |
| `docker-compose down`       | Dừng + Xoá containers     |
| `docker-compose logs -f`    | Xem log real-time         |
| `docker ps`                 | Danh sách containers chạy |
| `docker-compose restart`    | Khởi động lại             |

---

## 🔍 KIỂM TRA STATUS

### Kiểm tra ports

```powershell
netstat -ano | findstr :8080
```

### Kiểm tra docker containers

```powershell
docker ps
```

### Kiểm tra logs

```powershell
docker-compose logs -f ecommerce-app
```

### Kết nối database

```powershell
docker exec -it postgres-db psql -U admin -d ecommerce_db
# Trong psql:
\dt                  # Liệt kê tables
SELECT * FROM category;  # Xem data
\q                   # Thoát
```

---

## ❌ TROUBLESHOOT

### Port 8080 đã được sử dụng

```powershell
taskkill /PID <PID> /F
# Hoặc thay đổi port trong docker-compose.yml
```

### Database kết nối không được

```powershell
docker-compose down -v
docker-compose up --build
```

### API không trả về kết quả

1. Kiểm tra logs: `docker-compose logs -f`
2. Kiểm tra database: `docker exec -it postgres-db psql ...`
3. Restart: `docker-compose restart`

---

## 📍 URLs CHÍNH

| Service     | URL                                                             |
| ----------- | --------------------------------------------------------------- |
| API Base    | `http://localhost:8080`                                         |
| Database    | `localhost:5433` (from host) / `postgres:5432` (from container) |
| DB User     | `admin`                                                         |
| DB Password | `admin123`                                                      |
| DB Name     | `ecommerce_db`                                                  |

---

## 💡 MẸO

- **Postman Collection**: `ecom_dacn.json` - Import vào Postman để test dễ hơn
- **Pagination**: Mặc định `page=0&size=20`
- **Validation**: `categoryName` bắt buộc phải có
- **Timestamps**: `createdAt` & `updatedAt` tự động

---

## 🎯 WORKFLOW TEST ĐỦ ĐAO ĐỊA

1. **Start Backend**: `docker-compose up --build`
2. **Tạo Category**: POST `/api/categories`
3. **Tạo ProductGeneral**: POST `/api/product-generals` (dùng categoryId vừa tạo)
4. **Tạo ProductDetail**: POST `/api/product-details` (dùng productGeneralId vừa tạo)
5. **Get All**: GET `/api/categories` / `/api/product-generals` / `/api/product-details`
6. **Update**: PUT `/api/categories/1` (dùng ID từ bước 2)
7. **Delete**: DELETE `/api/categories/1`
