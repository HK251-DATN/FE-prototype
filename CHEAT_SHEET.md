# ⚡ CHEAT SHEET - CHẠY BACKEND + TEST API

## 🚀 START TRONG 3 BƯỚC

```powershell
# 1. Vào thư mục backend
cd 'd:\My_documents\Workspace\ĐACN_251\backend\ecommerce'

# 2. Chạy
docker-compose up --build

# 3. Chờ log:
# "Started BaseSourceApplication in X.XXX seconds"
```

✅ **Ready! Backend chạy trên `http://localhost:8080`**

---

## 🧪 TEST NGAY

### 📌 Postman (Dễ nhất)

```
1. File → Import → ecom_dacn.json
2. Click request → Send
```

### 📌 Hoặc PowerShell (Copy-paste)

**Create Category:**

```powershell
$h = @{"Content-Type"="application/json"}
$b = @{categoryName="Electronics";displayOrder=1;isSubCategory="N"} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8080/api/categories" -Method POST -Headers $h -Body $b
```

**Get All Categories:**

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/categories?page=0&size=20" -Method GET
```

**Get Category by ID:**

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/categories/1" -Method GET
```

**Update Category:**

```powershell
$h = @{"Content-Type"="application/json"}
$b = @{categoryName="Updated";displayOrder=2} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8080/api/categories/1" -Method PUT -Headers $h -Body $b
```

**Delete Category:**

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/categories/1" -Method DELETE
```

---

## 📚 API ENDPOINTS

### 📁 Categories

| Method | URL                    | Mục đích      |
| ------ | ---------------------- | ------------- |
| POST   | `/api/categories`      | Tạo category  |
| GET    | `/api/categories`      | Lấy danh sách |
| GET    | `/api/categories/{id}` | Lấy chi tiết  |
| PUT    | `/api/categories/{id}` | Cập nhật      |
| DELETE | `/api/categories/{id}` | Xoá           |

### 📦 ProductGenerals

| Method | URL                          | Mục đích      |
| ------ | ---------------------------- | ------------- |
| POST   | `/api/product-generals`      | Tạo product   |
| GET    | `/api/product-generals`      | Lấy danh sách |
| GET    | `/api/product-generals/{id}` | Lấy chi tiết  |
| PUT    | `/api/product-generals/{id}` | Cập nhật      |
| DELETE | `/api/product-generals/{id}` | Xoá           |

### 🛍️ ProductDetails

| Method | URL                         | Mục đích      |
| ------ | --------------------------- | ------------- |
| POST   | `/api/product-details`      | Tạo detail    |
| GET    | `/api/product-details`      | Lấy danh sách |
| GET    | `/api/product-details/{id}` | Lấy chi tiết  |
| PUT    | `/api/product-details/{id}` | Cập nhật      |
| DELETE | `/api/product-details/{id}` | Xoá           |

---

## 🔧 DOCKER COMMANDS

```powershell
# Start backend
docker-compose up --build

# Start (không rebuild)
docker-compose up

# Stop
docker-compose down

# Logs real-time
docker-compose logs -f

# Restart app
docker-compose restart ecommerce-app

# Xóa volumes
docker-compose down -v
```

---

## 🗄️ DATABASE

| Thông tin | Giá trị        |
| --------- | -------------- |
| Host      | localhost:5433 |
| Username  | admin          |
| Password  | admin123       |
| Database  | ecommerce_db   |

**Connect vào PostgreSQL:**

```powershell
docker exec -it postgres-db psql -U admin -d ecommerce_db
```

**Trong psql:**

```sql
\dt                      -- Liệt kê tables
SELECT * FROM category;  -- Xem data
\q                       -- Thoát
```

---

## 📝 POSTMAN BODY EXAMPLES

### Category

```json
{
  "categoryName": "Electronics",
  "displayOrder": 1,
  "description": "Electronic devices",
  "iconUrl": "https://cdn.com/icon.png",
  "isSubCategory": "N",
  "belongToCategory": null
}
```

### ProductGeneral

```json
{
  "categoryId": 1,
  "productName": "MacBook Pro",
  "description": "Laptop",
  "status": "ACTIVE",
  "photoUrls": "[\"https://cdn.com/mac.png\"]"
}
```

### ProductDetail

```json
{
  "productGeneralId": 1,
  "description": "16GB RAM, 512GB SSD",
  "status": "ACTIVE",
  "quantityAvailable": 50,
  "price": 3499.99
}
```

---

## ✅ SUCCESS RESPONSES

### 201 Created (POST)

```json
{ "id": 1, "name": "...", "createdAt": "..." }
```

### 200 OK (GET/PUT/DELETE)

```json
{ "id": 1, "name": "...", "updatedAt": "..." }
```

### 204 No Content (DELETE)

```
(Empty body)
```

---

## ❌ ERROR RESPONSES

### 400 Bad Request

```json
{
  "timestamp": "2025-12-05T10:35:00",
  "warn": "Bad Request",
  "message": "Category not found"
}
```

### 400 Validation Failed

```json
{
  "timestamp": "2025-12-05T10:35:00",
  "warn": "Validation Failed",
  "message": { "categoryName": "must not be blank" }
}
```

---

## 🎯 QUICK WORKFLOW

1. **Tạo Category** → Get categoryId
2. **Tạo ProductGeneral** → Use categoryId → Get productGeneralId
3. **Tạo ProductDetail** → Use productGeneralId
4. **GET** để verify
5. **PUT** để update
6. **DELETE** để xoá

---

## 💾 FILES

| File                   | Mục đích                         |
| ---------------------- | -------------------------------- |
| `HUONG_DAN_BACKEND.md` | Hướng dẫn chi tiết (đầy đủ nhất) |
| `QUICK_REFERENCE.md`   | Reference nhanh                  |
| `POSTMAN_EXAMPLES.md`  | Examples cho Postman             |
| `backend-manager.ps1`  | Script quản lý backend           |
| `ecom_dacn.json`       | Postman collection               |

---

## 🆘 TROUBLESHOOT

**Backend không chạy?**

```powershell
docker-compose logs -f  # Xem lỗi
docker-compose down -v  # Reset & rebuild
docker-compose up --build
```

**Port đã sử dụng?**

```powershell
taskkill /F /IM docker.exe  # Kill docker
# Hoặc thay port trong docker-compose.yml
```

**Database không kết nối?**

```powershell
docker ps                    # Check containers
docker-compose restart postgres  # Restart DB
```

---

## 🌐 BASE URL

```
http://localhost:8080
```

---

## ✨ DONE! Bạn đã sẵn sàng test 🎉
