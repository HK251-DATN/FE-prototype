# 📚 POSTMAN TEST EXAMPLES - CHI TIẾT ĐẦY ĐỦ

## 🎯 Phần 1: CATEGORY APIs

---

### ✅ 1. CREATE CATEGORY - Tạo danh mục mới

**Endpoint:**

```
POST http://localhost:8080/api/categories
```

**Headers:**

```
Content-Type: application/json
```

**Body - Example 1: Danh mục chính**

```json
{
  "categoryName": "Electronics",
  "displayOrder": 1,
  "description": "All electronic devices and gadgets",
  "iconUrl": "https://cdn.com/electronics-icon.png",
  "isSubCategory": "N",
  "belongToCategory": null
}
```

**Response (201 Created):**

```json
{
  "categoryId": 1,
  "categoryName": "Electronics",
  "displayOrder": 1,
  "description": "All electronic devices and gadgets",
  "iconUrl": "https://cdn.com/electronics-icon.png",
  "isSubCategory": "N",
  "belongToCategory": null,
  "createdAt": "2025-12-05T10:30:00",
  "updatedAt": null
}
```

---

**Body - Example 2: Sub-category**

```json
{
  "categoryName": "Laptops",
  "displayOrder": 1,
  "description": "All laptop types",
  "iconUrl": "https://cdn.com/laptop-icon.png",
  "isSubCategory": "Y",
  "belongToCategory": 1
}
```

**Response (201 Created):**

```json
{
  "categoryId": 2,
  "categoryName": "Laptops",
  "displayOrder": 1,
  "description": "All laptop types",
  "iconUrl": "https://cdn.com/laptop-icon.png",
  "isSubCategory": "Y",
  "belongToCategory": 1,
  "createdAt": "2025-12-05T10:31:00",
  "updatedAt": null
}
```

---

### ✅ 2. GET ALL CATEGORIES - Lấy danh sách toàn bộ category

**Endpoint:**

```
GET http://localhost:8080/api/categories?page=0&size=20
```

**Query Parameters:**

- `page`: 0 (trang đầu tiên, index 0-based)
- `size`: 20 (số items trên mỗi trang)

**Response (200 OK):**

```json
[
  {
    "categoryId": 1,
    "categoryName": "Electronics",
    "displayOrder": 1,
    "description": "All electronic devices and gadgets",
    "iconUrl": "https://cdn.com/electronics-icon.png",
    "isSubCategory": "N",
    "belongToCategory": null,
    "createdAt": "2025-12-05T10:30:00",
    "updatedAt": null
  },
  {
    "categoryId": 2,
    "categoryName": "Laptops",
    "displayOrder": 1,
    "description": "All laptop types",
    "iconUrl": "https://cdn.com/laptop-icon.png",
    "isSubCategory": "Y",
    "belongToCategory": 1,
    "createdAt": "2025-12-05T10:31:00",
    "updatedAt": null
  }
]
```

---

### ✅ 3. GET CATEGORY BY ID - Lấy chi tiết 1 category

**Endpoint:**

```
GET http://localhost:8080/api/categories/1
```

**Path Parameter:**

- `id`: 1 (categoryId)

**Response (200 OK):**

```json
{
  "categoryId": 1,
  "categoryName": "Electronics",
  "displayOrder": 1,
  "description": "All electronic devices and gadgets",
  "iconUrl": "https://cdn.com/electronics-icon.png",
  "isSubCategory": "N",
  "belongToCategory": null,
  "createdAt": "2025-12-05T10:30:00",
  "updatedAt": null
}
```

**Response (400 Bad Request) - Nếu category không tồn tại:**

```json
{
  "timestamp": "2025-12-05T10:35:00",
  "warn": "Bad Request",
  "message": "Category not found"
}
```

---

### ✅ 4. UPDATE CATEGORY - Cập nhật category

**Endpoint:**

```
PUT http://localhost:8080/api/categories/1
```

**Path Parameter:**

- `id`: 1 (categoryId)

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "categoryName": "Electronics & Gadgets",
  "displayOrder": 2,
  "description": "Updated: Premium electronic devices",
  "iconUrl": "https://cdn.com/new-electronics-icon.png",
  "isSubCategory": "N",
  "belongToCategory": null
}
```

**Response (200 OK):**

```json
{
  "categoryId": 1,
  "categoryName": "Electronics & Gadgets",
  "displayOrder": 2,
  "description": "Updated: Premium electronic devices",
  "iconUrl": "https://cdn.com/new-electronics-icon.png",
  "isSubCategory": "N",
  "belongToCategory": null,
  "createdAt": "2025-12-05T10:30:00",
  "updatedAt": "2025-12-05T10:35:00"
}
```

---

### ✅ 5. DELETE CATEGORY - Xoá category

**Endpoint:**

```
DELETE http://localhost:8080/api/categories/1
```

**Path Parameter:**

- `id`: 1 (categoryId)

**Response (200 OK):**

```
(Empty body)
```

---

---

## 🎯 Phần 2: PRODUCT GENERAL APIs

---

### ✅ 1. CREATE PRODUCT GENERAL

**Endpoint:**

```
POST http://localhost:8080/api/product-generals
```

**Headers:**

```
Content-Type: application/json
```

**Body - Example 1:**

```json
{
  "categoryId": 1,
  "productName": "MacBook Pro 16",
  "description": "High-performance laptop with M3 Max chip for professionals",
  "status": "ACTIVE",
  "photoUrls": "[\"https://cdn.com/macbook-1.png\", \"https://cdn.com/macbook-2.png\", \"https://cdn.com/macbook-3.png\"]"
}
```

**Response (201 Created):**

```json
{
  "productGeneralId": 1,
  "categoryId": 1,
  "productName": "MacBook Pro 16",
  "description": "High-performance laptop with M3 Max chip for professionals",
  "status": "ACTIVE",
  "photoUrls": "[\"https://cdn.com/macbook-1.png\", \"https://cdn.com/macbook-2.png\", \"https://cdn.com/macbook-3.png\"]",
  "createdAt": "2025-12-05T10:40:00",
  "updatedAt": null
}
```

---

**Body - Example 2:**

```json
{
  "categoryId": 1,
  "productName": "iPhone 16 Pro",
  "description": "Latest smartphone with advanced camera system",
  "status": "ACTIVE",
  "photoUrls": "[\"https://cdn.com/iphone-1.png\", \"https://cdn.com/iphone-2.png\"]"
}
```

---

### ✅ 2. GET ALL PRODUCT GENERALS

**Endpoint:**

```
GET http://localhost:8080/api/product-generals?page=0&size=20
```

**Query Parameters:**

- `page`: 0
- `size`: 20

**Response (200 OK):**

```json
[
  {
    "productGeneralId": 1,
    "categoryId": 1,
    "productName": "MacBook Pro 16",
    "description": "High-performance laptop with M3 Max chip for professionals",
    "status": "ACTIVE",
    "photoUrls": "[\"https://cdn.com/macbook-1.png\", \"https://cdn.com/macbook-2.png\", \"https://cdn.com/macbook-3.png\"]",
    "createdAt": "2025-12-05T10:40:00",
    "updatedAt": null
  },
  {
    "productGeneralId": 2,
    "categoryId": 1,
    "productName": "iPhone 16 Pro",
    "description": "Latest smartphone with advanced camera system",
    "status": "ACTIVE",
    "photoUrls": "[\"https://cdn.com/iphone-1.png\", \"https://cdn.com/iphone-2.png\"]",
    "createdAt": "2025-12-05T10:41:00",
    "updatedAt": null
  }
]
```

---

### ✅ 3. GET PRODUCT GENERAL BY ID

**Endpoint:**

```
GET http://localhost:8080/api/product-generals/1
```

**Response (200 OK):**

```json
{
  "productGeneralId": 1,
  "categoryId": 1,
  "productName": "MacBook Pro 16",
  "description": "High-performance laptop with M3 Max chip for professionals",
  "status": "ACTIVE",
  "photoUrls": "[\"https://cdn.com/macbook-1.png\", \"https://cdn.com/macbook-2.png\", \"https://cdn.com/macbook-3.png\"]",
  "createdAt": "2025-12-05T10:40:00",
  "updatedAt": null
}
```

---

### ✅ 4. UPDATE PRODUCT GENERAL

**Endpoint:**

```
PUT http://localhost:8080/api/product-generals/1
```

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "categoryId": 1,
  "productName": "MacBook Pro 16 2025",
  "description": "Updated: Premium laptop for professionals",
  "status": "INACTIVE",
  "photoUrls": "[\"https://cdn.com/new-macbook.png\"]"
}
```

**Response (200 OK):**

```json
{
  "productGeneralId": 1,
  "categoryId": 1,
  "productName": "MacBook Pro 16 2025",
  "description": "Updated: Premium laptop for professionals",
  "status": "INACTIVE",
  "photoUrls": "[\"https://cdn.com/new-macbook.png\"]",
  "createdAt": "2025-12-05T10:40:00",
  "updatedAt": "2025-12-05T10:45:00"
}
```

---

### ✅ 5. DELETE PRODUCT GENERAL

**Endpoint:**

```
DELETE http://localhost:8080/api/product-generals/1
```

**Response (200 OK):**

```
(Empty body)
```

---

---

## 🎯 Phần 3: PRODUCT DETAIL APIs

---

### ✅ 1. CREATE PRODUCT DETAIL

**Endpoint:**

```
POST http://localhost:8080/api/product-details
```

**Headers:**

```
Content-Type: application/json
```

**Body - Example 1:**

```json
{
  "productGeneralId": 1,
  "description": "16-inch display, M3 Max, 36GB RAM, 512GB SSD",
  "status": "ACTIVE",
  "quantityAvailable": 50,
  "price": 3499.99
}
```

**Response (201 Created):**

```json
{
  "productDetailId": 1,
  "productGeneralId": 1,
  "description": "16-inch display, M3 Max, 36GB RAM, 512GB SSD",
  "status": "ACTIVE",
  "quantityAvailable": 50,
  "price": 3499.99,
  "createdAt": "2025-12-05T10:50:00",
  "updatedAt": null
}
```

---

**Body - Example 2: Cùng product nhưng config khác**

```json
{
  "productGeneralId": 1,
  "description": "16-inch display, M3 Pro, 18GB RAM, 256GB SSD",
  "status": "ACTIVE",
  "quantityAvailable": 30,
  "price": 2799.99
}
```

---

### ✅ 2. GET ALL PRODUCT DETAILS

**Endpoint:**

```
GET http://localhost:8080/api/product-details?page=0&size=20
```

**Query Parameters:**

- `page`: 0
- `size`: 20

**Response (200 OK):**

```json
[
  {
    "productDetailId": 1,
    "productGeneralId": 1,
    "description": "16-inch display, M3 Max, 36GB RAM, 512GB SSD",
    "status": "ACTIVE",
    "quantityAvailable": 50,
    "price": 3499.99,
    "createdAt": "2025-12-05T10:50:00",
    "updatedAt": null
  },
  {
    "productDetailId": 2,
    "productGeneralId": 1,
    "description": "16-inch display, M3 Pro, 18GB RAM, 256GB SSD",
    "status": "ACTIVE",
    "quantityAvailable": 30,
    "price": 2799.99,
    "createdAt": "2025-12-05T10:51:00",
    "updatedAt": null
  }
]
```

---

### ✅ 3. GET PRODUCT DETAIL BY ID

**Endpoint:**

```
GET http://localhost:8080/api/product-details/1
```

**Response (200 OK):**

```json
{
  "productDetailId": 1,
  "productGeneralId": 1,
  "description": "16-inch display, M3 Max, 36GB RAM, 512GB SSD",
  "status": "ACTIVE",
  "quantityAvailable": 50,
  "price": 3499.99,
  "createdAt": "2025-12-05T10:50:00",
  "updatedAt": null
}
```

---

### ✅ 4. UPDATE PRODUCT DETAIL

**Endpoint:**

```
PUT http://localhost:8080/api/product-details/1
```

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "productGeneralId": 1,
  "description": "SALE: 16-inch display, M3 Max, 36GB RAM, 512GB SSD",
  "status": "ACTIVE",
  "quantityAvailable": 25,
  "price": 2999.99
}
```

**Response (200 OK):**

```json
{
  "productDetailId": 1,
  "productGeneralId": 1,
  "description": "SALE: 16-inch display, M3 Max, 36GB RAM, 512GB SSD",
  "status": "ACTIVE",
  "quantityAvailable": 25,
  "price": 2999.99,
  "createdAt": "2025-12-05T10:50:00",
  "updatedAt": "2025-12-05T10:55:00"
}
```

---

### ✅ 5. DELETE PRODUCT DETAIL

**Endpoint:**

```
DELETE http://localhost:8080/api/product-details/1
```

**Response (200 OK):**

```
(Empty body)
```

---

---

## ⚠️ ERROR RESPONSES

### Validation Error (400 Bad Request)

**Khi categoryName bỏ trống:**

```json
{
  "timestamp": "2025-12-05T10:35:00",
  "warn": "Validation Failed",
  "message": {
    "categoryName": "must not be blank"
  }
}
```

### Not Found Error (400 Bad Request)

**Khi ID không tồn tại:**

```json
{
  "timestamp": "2025-12-05T10:35:00",
  "warn": "Bad Request",
  "message": "Category not found"
}
```

### Internal Server Error (500)

```json
{
  "timestamp": "2025-12-05T10:35:00",
  "error": "Internal Server Error",
  "message": "java.lang.NullPointerException: ..."
}
```

---

## 🔄 TEST WORKFLOW - DỰ LỤ ĐẦYĐỦ

**Step 1: Create Category**

```
POST /api/categories
Body: { categoryName: "Electronics", ... }
Response: { categoryId: 1, ... }
```

**Step 2: Create ProductGeneral**

```
POST /api/product-generals
Body: { categoryId: 1, productName: "MacBook", ... }
Response: { productGeneralId: 1, ... }
```

**Step 3: Create ProductDetail**

```
POST /api/product-details
Body: { productGeneralId: 1, price: 3499.99, ... }
Response: { productDetailId: 1, ... }
```

**Step 4: Get All (Verify)**

```
GET /api/categories
GET /api/product-generals
GET /api/product-details
```

**Step 5: Update**

```
PUT /api/categories/1
PUT /api/product-generals/1
PUT /api/product-details/1
```

**Step 6: Delete (Reverse order)**

```
DELETE /api/product-details/1
DELETE /api/product-generals/1
DELETE /api/categories/1
```

---

## 💡 TIPS

1. **Lưu các responses**: Dùng response để lấy IDs cho requests tiếp theo
2. **Set variables**: Postman cho phép save IDs vào variables
3. **Test scripts**: Thêm pre-request scripts để tự động test
4. **Environment**: Tạo environment cho localhost:8080
