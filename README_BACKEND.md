# 📚 HƯỚNG DẪN CHẠY BACKEND VÀ TEST API

Xin chào! Đây là hướng dẫn hoàn chỉnh để chạy backend E-commerce và test API trên Postman.

---

## 📖 CÁC HƯỚNG DẪN CÓ SẴN

### 1. **⚡ CHEAT_SHEET.md** ← START ĐÂY!

- **Nếu bạn muốn nhanh nhất**: Đọc file này
- Gồm: Start backend trong 3 bước, test ngay, quick reference
- ~2 phút để setup

### 2. **🚀 HUONG_DAN_BACKEND.md**

- **Hướng dẫn chi tiết đầy đủ**
- Gồm: 2 cách chạy (Docker, Maven), 15 API examples, troubleshooting
- ~10 phút để đọc hết

### 3. **📚 POSTMAN_EXAMPLES.md**

- **Ví dụ chi tiết cho từng API**
- Gồm: 15 API với request/response examples
- Dùng để copy-paste body vào Postman

### 4. **📝 QUICK_REFERENCE.md**

- **Tờ ghi chú nhanh**
- Gồm: PowerShell commands, cURL examples
- Giúp test API mà không cần Postman

---

## 🎯 RECOMMENDED FLOW

### 👤 Nếu bạn mới lần đầu:

1. Đọc **CHEAT_SHEET.md** (2 phút)
2. Chạy backend theo bước 1-3 trong CHEAT_SHEET
3. Import Postman collection → Test

### 👤 Nếu bạn muốn hiểu sâu hơn:

1. Đọc **HUONG_DAN_BACKEND.md** từ đầu đến cuối
2. Thử cả 2 cách chạy (Docker + Maven)
3. Đọc **POSTMAN_EXAMPLES.md** để hiểu API

### 👤 Nếu bạn muốn test bằng PowerShell:

1. Đọc **QUICK_REFERENCE.md**
2. Copy-paste commands từ đây

---

## 🚀 START NHANH NHẤT (3 BƯỚC)

### Bước 1: Mở PowerShell

```powershell
cd 'd:\My_documents\Workspace\ĐACN_251\backend\ecommerce'
```

### Bước 2: Chạy backend

```powershell
docker-compose up --build
```

### Bước 3: Chờ dòng này

```
Started BaseSourceApplication in X.XXX seconds
```

✅ **Backend sẵn sàng trên `http://localhost:8080`**

---

## 🧪 TEST API NGAY

### Cách 1: Postman (Dễ nhất)

```
1. Mở Postman
2. Collections → Import
3. Chọn file: ecom_dacn.json (trong thư mục backend/ecommerce/)
4. Chọn request → Send
```

### Cách 2: PowerShell

```powershell
# Test Category API
Invoke-RestMethod -Uri "http://localhost:8080/api/categories?page=0&size=20" -Method GET
```

---

## 📋 FILE LOCATIONS

```
d:\My_documents\Workspace\ĐACN_251\
├── CHEAT_SHEET.md ← ĐÂY!
├── HUONG_DAN_BACKEND.md
├── QUICK_REFERENCE.md
├── POSTMAN_EXAMPLES.md
├── backend-manager.ps1 (Script quản lý)
└── backend/ecommerce/
    ├── docker-compose.yml
    ├── ecom_dacn.json (Postman collection)
    └── ...
```

---

## 🔗 API ENDPOINTS

### Categories

- `POST /api/categories` - Tạo
- `GET /api/categories` - Lấy danh sách
- `GET /api/categories/{id}` - Lấy chi tiết
- `PUT /api/categories/{id}` - Cập nhật
- `DELETE /api/categories/{id}` - Xoá

### ProductGenerals

- `POST /api/product-generals`
- `GET /api/product-generals`
- `GET /api/product-generals/{id}`
- `PUT /api/product-generals/{id}`
- `DELETE /api/product-generals/{id}`

### ProductDetails

- `POST /api/product-details`
- `GET /api/product-details`
- `GET /api/product-details/{id}`
- `PUT /api/product-details/{id}`
- `DELETE /api/product-details/{id}`

---

## 📊 CONNECTION INFO

| Thông tin         | Giá trị                 |
| ----------------- | ----------------------- |
| **API URL**       | `http://localhost:8080` |
| **Database Host** | `localhost:5433`        |
| **DB Username**   | `admin`                 |
| **DB Password**   | `admin123`              |
| **Database**      | `ecommerce_db`          |

---

## 🛠️ COMMON COMMANDS

```powershell
# Start backend
docker-compose up --build

# Stop backend
docker-compose down

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Connect to database
docker exec -it postgres-db psql -U admin -d ecommerce_db

# Check running containers
docker ps
```

---

## 🆘 CẦN GIÚP?

| Vấn đề                   | Giải pháp                                              |
| ------------------------ | ------------------------------------------------------ |
| Backend không chạy       | Xem **HUONG_DAN_BACKEND.md** → Troubleshooting section |
| Port đã sử dụng          | `taskkill /F /IM docker.exe` hoặc restart              |
| Database không kết nối   | `docker-compose restart postgres`                      |
| Lỗi validation           | Kiểm tra POSTMAN_EXAMPLES.md → ví dụ request           |
| Không biết test cách nào | Đọc QUICK_REFERENCE.md                                 |

---

## 📚 FILES REFERENCE

| File                     | Độ dài    | Nội dung                  | Khi nào đọc          |
| ------------------------ | --------- | ------------------------- | -------------------- |
| **CHEAT_SHEET.md**       | ~3 trang  | Nhanh + đủ                | Lần đầu              |
| **HUONG_DAN_BACKEND.md** | ~10 trang | Chi tiết, troubleshoot    | Muốn hiểu sâu        |
| **POSTMAN_EXAMPLES.md**  | ~8 trang  | Request/Response examples | Copy body Postman    |
| **QUICK_REFERENCE.md**   | ~6 trang  | Commands, cURL            | Test bằng PowerShell |

---

## ✨ CHÚC BẠN THÀNH CÔNG!

Nếu có bất kỳ vấn đề, hãy:

1. Kiểm tra logs: `docker-compose logs -f`
2. Đọc troubleshooting section trong HUONG_DAN_BACKEND.md
3. Restart: `docker-compose down -v && docker-compose up --build`

Happy coding! 🎉
