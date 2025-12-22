# 🚀 HƯỚNG DẪN CHI TIẾT: CHẠY BACKEND VÀ TEST API TRÊN POSTMAN

## 📋 MỤC LỤC

1. [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
2. [Cách 1: Chạy với Docker (RECOMMENDED)](#cách-1-chạy-với-docker-recommended)
3. [Cách 2: Chạy Local với Maven](#cách-2-chạy-local-với-maven)
4. [Test API trên Postman](#test-api-trên-postman)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Yêu cầu hệ thống

### Docker (Cách 1)

- **Docker Desktop** (bao gồm Docker Engine và Docker Compose)
- Tải tại: https://www.docker.com/products/docker-desktop
- Kiểm tra: Mở PowerShell và gõ `docker --version`

### Maven (Cách 2)

- **Java 21** (Spring Boot 3.5.6 yêu cầu)
- **Maven** (mvn command)
- **PostgreSQL** (chạy local hoặc dùng container riêng)

---

## 🐳 Cách 1: Chạy với Docker (RECOMMENDED)

### Bước 1: Mở Terminal

```powershell
cd 'd:\My_documents\Workspace\ĐACN_251\backend\ecommerce'
```

### Bước 2: Xây dựng và chạy Docker

```powershell
docker-compose up --build
```

**Giải thích:**

- `docker-compose up`: Khởi động tất cả services (PostgreSQL + Spring Boot App)
- `--build`: Rebuild Docker image từ Dockerfile

### Bước 3: Chờ đến khi thấy log này

```
ecommerce-app  | 2025-12-04T21:46:13.859Z  INFO ... Started BaseSourceApplication in 5.151 seconds
```

✅ **Backend đã sẵn sàng!**

### Thông tin kết nối:

- **API URL**: `http://localhost:8080`
- **Database**: PostgreSQL
  - Host: `localhost`
  - Port: `5433` (external) / `5432` (internal)
  - Username: `admin`
  - Password: `admin123`
  - Database: `ecommerce_db`

### Dừng Backend

Nhấn `Ctrl + C` trong terminal

---

## 📦 Cách 2: Chạy Local với Maven

### Bước 1: Chuẩn bị Database

**Option A: Dùng PostgreSQL từ Docker (Chỉ DB, không app)**

```powershell
cd 'd:\My_documents\Workspace\ĐACN_251\backend\ecommerce'
docker-compose up postgres
```

**Option B: Dùng PostgreSQL đã cài trên máy**

- Chạy PostgreSQL locally
- Tạo database: `ecommerce_db`
- Username: `admin`, Password: `admin123`

### Bước 2: Chạy Spring Boot với Maven

```powershell
cd 'd:\My_documents\Workspace\ĐACN_251\backend\ecommerce'
./mvnw spring-boot:run
```

Trên Windows PowerShell:

```powershell
cd 'd:\My_documents\Workspace\ĐACN_251\backend\ecommerce'
.\mvnw.cmd spring-boot:run
```

### Bước 3: Chờ log này

```
: Tomcat started on port 8080 (http) with context path '/'
: Started BaseSourceApplication in X.XXX seconds
```

---

## 🧪 Test API trên Postman

### Cách 1: Import Collection sẵn có (Nhanh nhất)

1. **Mở Postman**
2. **Tìm file** `ecom_dacn.json` trong thư mục:
   ```
   d:\My_documents\Workspace\ĐACN_251\backend\ecommerce\
   ```
3. **Import**: Collections → Import → Chọn file `ecom_dacn.json`
4. **Chọn request** từ collection
5. **Nhấn Send** để test

---

### Cách 2: Test Manual từng API

#### 📌 **1. CREATE CATEGORY**

**URL**: `POST http://localhost:8080/api/categories`

**Headers**:

```
Content-Type: application/json
```

**Body** (JSON):

```json
{
  "categoryName": "Electronics",
  "displayOrder": 1,
  "description": "Electrical devices and gadgets",
  "iconUrl": "https://cdn.com/electronics.png",
  "isSubCategory": "N",
  "belongToCategory": null
}
```

**Expected Response** (201 Created):

```json
{
  "categoryId": 1,
  "categoryName": "Electronics",
  "displayOrder": 1,
  "description": "Electrical devices and gadgets",
  "iconUrl": "https://cdn.com/electronics.png",
  "isSubCategory": "N",
  "belongToCategory": null,
  "createdAt": "2025-12-05T10:30:00",
  "updatedAt": null
}
```

---

#### 📌 **2. GET ALL CATEGORIES**

**URL**: `GET http://localhost:8080/api/categories?page=0&size=20`

**Query Parameters**:

- `page`: 0 (trang đầu tiên)
- `size`: 20 (20 items mỗi trang)

**Expected Response** (200 OK):

```json
[
    {
        "categoryId": 1,
        "categoryName": "Electronics",
        ...
    }
]
```

---

#### 📌 **3. GET CATEGORY BY ID**

**URL**: `GET http://localhost:8080/api/categories/1`

**Path Parameter**:

- `id`: 1 (ID của category)

**Expected Response** (200 OK):

```json
{
    "categoryId": 1,
    "categoryName": "Electronics",
    ...
}
```

---

#### 📌 **4. UPDATE CATEGORY**

**URL**: `PUT http://localhost:8080/api/categories/1`

**Headers**:

```
Content-Type: application/json
```

**Body** (JSON):

```json
{
  "categoryName": "Electronics & Gadgets",
  "displayOrder": 2,
  "description": "Updated description",
  "iconUrl": "https://cdn.com/updated-icon.png",
  "isSubCategory": "N",
  "belongToCategory": null
}
```

**Expected Response** (200 OK):

```json
{
    "categoryId": 1,
    "categoryName": "Electronics & Gadgets",
    "displayOrder": 2,
    "updatedAt": "2025-12-05T10:35:00",
    ...
}
```

---

#### 📌 **5. DELETE CATEGORY**

**URL**: `DELETE http://localhost:8080/api/categories/1`

**Expected Response** (200 OK):

```
(Trống - 200 OK)
```

---

### 🔗 ProductGeneral Endpoints

#### **CREATE ProductGeneral**

```
POST http://localhost:8080/api/product-generals

{
    "categoryId": 1,
    "productName": "MacBook Pro 16",
    "description": "High-performance laptop for professionals",
    "status": "ACTIVE",
    "photoUrls": "[\"https://cdn.com/macbook1.png\", \"https://cdn.com/macbook2.png\"]"
}
```

#### **GET ALL ProductGenerals**

```
GET http://localhost:8080/api/product-generals?page=0&size=20
```

#### **GET ProductGeneral BY ID**

```
GET http://localhost:8080/api/product-generals/1
```

#### **UPDATE ProductGeneral**

```
PUT http://localhost:8080/api/product-generals/1

{
    "categoryId": 1,
    "productName": "MacBook Pro 16 2025",
    "description": "Updated description",
    "status": "ACTIVE",
    "photoUrls": "[\"https://cdn.com/new-photo.png\"]"
}
```

#### **DELETE ProductGeneral**

```
DELETE http://localhost:8080/api/product-generals/1
```

---

### 🔗 ProductDetail Endpoints

#### **CREATE ProductDetail**

```
POST http://localhost:8080/api/product-details

{
    "productGeneralId": 1,
    "description": "16-inch MacBook Pro with M3 Max",
    "status": "ACTIVE",
    "quantityAvailable": 50,
    "price": 3499.99
}
```

#### **GET ALL ProductDetails**

```
GET http://localhost:8080/api/product-details?page=0&size=20
```

#### **GET ProductDetail BY ID**

```
GET http://localhost:8080/api/product-details/1
```

#### **UPDATE ProductDetail**

```
PUT http://localhost:8080/api/product-details/1

{
    "productGeneralId": 1,
    "description": "Updated 16-inch MacBook Pro",
    "status": "ACTIVE",
    "quantityAvailable": 45,
    "price": 3599.99
}
```

#### **DELETE ProductDetail**

```
DELETE http://localhost:8080/api/product-details/1
```

---

## 📊 Postman Collection Structure

Mở file `ecom_dacn.json` để thấy cấu trúc đầy đủ:

```
Base Source API Collection
├── Category APIs
│   ├── Create Category
│   ├── Get Category By ID
│   ├── Get All Categories
│   ├── Update Category
│   └── Delete Category
├── ProductGeneral APIs
│   ├── Create Product General
│   ├── Get Product General By ID
│   ├── Get All Product Generals
│   ├── Update Product General
│   └── Delete Product General
└── ProductDetail APIs
    ├── Create Product Detail
    ├── Get Product Detail By ID
    ├── Get All Product Details
    ├── Update Product Detail
    └── Delete Product Detail
```

---

## ✅ Validation Rules

### Category

- `categoryName`: **Bắt buộc** (Not blank)
- `isSubCategory`: "Y" hoặc "N"
- `belongToCategory`: NULL nếu là danh mục chính

### ProductGeneral

- `productName`: **Bắt buộc**
- `categoryId`: Phải tồn tại trong Category

### ProductDetail

- `productGeneralId`: **Bắt buộc** (Foreign key)
- `price`: Định dạng Decimal(10,2)
- `quantityAvailable`: Integer

---

## ❌ Troubleshooting

### ❌ Lỗi: "Cannot connect to PostgreSQL"

**Giải pháp:**

```powershell
# Kiểm tra container chạy chưa
docker ps

# Nếu postgres không chạy:
docker-compose up postgres -d
```

### ❌ Lỗi: "Port 8080 already in use"

**Giải pháp:**

```powershell
# Tìm process dùng port 8080
netstat -ano | findstr :8080

# Kill process (PID = xxx)
taskkill /PID xxx /F
```

### ❌ Lỗi: "Port 5433 already in use"

**Giải pháp:**

```powershell
# Dừng tất cả containers
docker-compose down

# Hoặc chỉ dừng postgres
docker stop postgres-db
```

### ❌ Lỗi: "CategoryNotFoundException" khi update/delete

**Nguyên nhân**: ID không tồn tại
**Giải pháp**:

- Tạo category trước với POST
- Kiểm tra ID trong GET all

### ❌ Validation Failed - 400 Bad Request

**Nguyên nhân**: Field không hợp lệ
**Giải pháp**:

- Kiểm tra CategoryRequest validation rules
- Đảm bảo `categoryName` không bỏ trống

---

## 🔍 Debug Tips

### View Real-time Logs

```powershell
docker-compose logs -f ecommerce-app
```

### View Database

```powershell
# Connect vào PostgreSQL
docker exec -it postgres-db psql -U admin -d ecommerce_db

# Xem tables
\dt

# Xem data
SELECT * FROM category;
```

### Check Service Health

```powershell
# GET health check endpoint
curl http://localhost:8080/api/categories
```

---

## 🎯 Quick Start Commands

```powershell
# 1. Start Backend
cd 'd:\My_documents\Workspace\ĐACN_251\backend\ecommerce'
docker-compose up --build

# 2. Stop Backend
docker-compose down

# 3. View logs
docker-compose logs -f

# 4. Restart only app
docker-compose restart ecommerce-app

# 5. Clean rebuild
docker-compose down -v
docker-compose up --build
```

---

## ✨ Chúc bạn test thành công! 🎉

Nếu có bất kỳ lỗi nào, hãy:

1. Kiểm tra logs: `docker-compose logs`
2. Đảm bảo ports không bị chiếm
3. Restart: `docker-compose restart`
