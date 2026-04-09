// export interface Order {
//   id: string;
//   date: string;
//   total: number;
//   productCount: number;
//   status: "processing" | "shipping" | "completed" | "cancelled";
//   products: OrderProduct[];
//   shippingAddress: string;
//   paymentMethod: string;
//   discount: number;
//   shippingFee: number;
//   trackingSteps: TrackingStep[];
// }

// export interface OrderProduct {
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
// }

// export interface TrackingStep {
//   label: string;
//   date: string;
//   completed: boolean;
// }

// export interface Address {
//   id: string;
//   name: string;
//   phone: string;
//   address: string;
//   ward: string;
//   district: string;
//   province: string;
//   isDefault: boolean;
// }

// export interface Voucher {
//   id: string;
//   code: string;
//   description: string;
//   discount: number;
//   minOrder: number;
//   expiry: string;
//   used: boolean;
// }

// export interface Farm {
//   id: string;
//   name: string;
//   location: string;
//   image: string;
//   products: number;
//   followers: number;
//   rating: number;
// }

export const mockOrders = [
  {
    id: "#3933",
    date: "4 Tháng 4, 2021",
    total: 135000,
    productCount: 5,
    status: "processing",
    discount: 20,
    shippingFee: 0,
    paymentMethod: "Thanh toán khi nhận hàng",
    shippingAddress:
      "Ktx Khu A ĐH Quốc Gia Tphcm, Đông Hòa, Phường Đông Hòa, Thành Phố Dĩ An, Bình Dương",
    products: [
      { name: "Ớt chuông đỏ / 2 trái", image: "🫑", price: 5000, quantity: 4 },
      {
        name: "Ớt chuông xanh / 2 trái",
        image: "🌶️",
        price: 5000,
        quantity: 2,
      },
      { name: "Ớt xanh / 200g", image: "🥬", price: 7000, quantity: 10 },
      { name: "Cà chua bi / 500g", image: "🍅", price: 12000, quantity: 3 },
      { name: "Rau muống / bó", image: "🥗", price: 8000, quantity: 2 },
    ],
    trackingSteps: [
      { label: "Xác nhận đơn", date: "13:46 04/04/2021", completed: true },
      { label: "Chờ lấy hàng", date: "", completed: false },
      { label: "Đang giao hàng", date: "", completed: false },
      { label: "Đã giao", date: "", completed: false },
    ],
  },
  {
    id: "#5045",
    date: "27 Tháng 3, 2021",
    total: 25000,
    productCount: 1,
    status: "shipping",
    discount: 0,
    shippingFee: 15000,
    paymentMethod: "Chuyển khoản",
    shippingAddress:
      "Vùng 2, Thôn Định Phong, Xã An Nghiệp, Huyện Tuy An, Phú Yên",
    products: [
      { name: "Bơ sáp Đắk Lắk / 1kg", image: "🥑", price: 25000, quantity: 1 },
    ],
    trackingSteps: [
      { label: "Xác nhận đơn", date: "10:00 27/03/2021", completed: true },
      { label: "Chờ lấy hàng", date: "14:00 27/03/2021", completed: true },
      { label: "Đang giao hàng", date: "08:00 28/03/2021", completed: true },
      { label: "Đã giao", date: "", completed: false },
    ],
  },
  {
    id: "#5028",
    date: "20 Tháng 3, 2021",
    total: 250000,
    productCount: 4,
    status: "completed",
    discount: 10,
    shippingFee: 0,
    paymentMethod: "Ví điện tử",
    shippingAddress:
      "A206C, Bình Đức, Phường Lái Thiêu, Thành Phố Thuận An, Bình Dương",
    products: [
      {
        name: "Xoài cát Hòa Lộc / 1kg",
        image: "🥭",
        price: 45000,
        quantity: 2,
      },
      { name: "Sầu riêng Ri6 / 1kg", image: "🍈", price: 80000, quantity: 1 },
      {
        name: "Thanh long ruột đỏ / 1kg",
        image: "🐉",
        price: 35000,
        quantity: 2,
      },
      {
        name: "Dưa hấu không hạt / 1 trái",
        image: "🍉",
        price: 45000,
        quantity: 1,
      },
    ],
    trackingSteps: [
      { label: "Xác nhận đơn", date: "09:00 20/03/2021", completed: true },
      { label: "Chờ lấy hàng", date: "11:00 20/03/2021", completed: true },
      { label: "Đang giao hàng", date: "07:00 21/03/2021", completed: true },
      { label: "Đã giao", date: "16:00 21/03/2021", completed: true },
    ],
  },
  {
    id: "#4600",
    date: "19 Tháng 3, 2021",
    total: 35000,
    productCount: 1,
    status: "completed",
    discount: 0,
    shippingFee: 0,
    paymentMethod: "Thanh toán khi nhận hàng",
    shippingAddress: "Ktx Khu A ĐH Quốc Gia Tphcm, Đông Hòa",
    products: [
      { name: "Rau cải ngọt / 500g", image: "🥬", price: 35000, quantity: 1 },
    ],
    trackingSteps: [
      { label: "Xác nhận đơn", date: "08:00 19/03/2021", completed: true },
      { label: "Chờ lấy hàng", date: "10:00 19/03/2021", completed: true },
      { label: "Đang giao hàng", date: "14:00 19/03/2021", completed: true },
      { label: "Đã giao", date: "17:00 19/03/2021", completed: true },
    ],
  },
  {
    id: "#4152",
    date: "18 Tháng 3, 2021",
    total: 578000,
    productCount: 13,
    status: "completed",
    discount: 15,
    shippingFee: 0,
    paymentMethod: "Thanh toán khi nhận hàng",
    shippingAddress:
      "Ktx Khu A ĐH Quốc Gia Tphcm, Đông Hòa, Phường Đông Hòa, TP Dĩ An, Bình Dương",
    products: [
      { name: "Ớt chuông đỏ / 2 trái", image: "🫑", price: 5000, quantity: 4 },
      {
        name: "Ớt chuông xanh / 2 trái",
        image: "🌶️",
        price: 5000,
        quantity: 2,
      },
      { name: "Ớt xanh / 200g", image: "🥬", price: 7000, quantity: 10 },
    ],
    trackingSteps: [
      { label: "Xác nhận đơn", date: "13:46 18/03/2021", completed: true },
      { label: "Chờ lấy hàng", date: "13:46 18/03/2021", completed: true },
      { label: "Đang giao hàng", date: "18:18 19/03/2021", completed: true },
      { label: "Đã giao", date: "16:00 20/03/2021", completed: true },
    ],
  },
  {
    id: "#8811",
    date: "10 Tháng 3, 2021",
    total: 345000,
    productCount: 7,
    status: "completed",
    discount: 0,
    shippingFee: 20000,
    paymentMethod: "Chuyển khoản",
    shippingAddress:
      "Số 170, Đường 3 Tháng 2, Thị Trấn Ngô Mây, Huyện Phù Cát, Bình Định",
    products: [
      { name: "Nấm rơm tươi / 300g", image: "🍄", price: 25000, quantity: 3 },
      { name: "Đậu bắp / 500g", image: "🫘", price: 18000, quantity: 4 },
    ],
    trackingSteps: [
      { label: "Xác nhận đơn", date: "09:00 10/03/2021", completed: true },
      { label: "Chờ lấy hàng", date: "11:00 10/03/2021", completed: true },
      { label: "Đang giao hàng", date: "06:00 11/03/2021", completed: true },
      { label: "Đã giao", date: "15:00 11/03/2021", completed: true },
    ],
  },
  {
    id: "#3536",
    date: "5 Tháng 3, 2021",
    total: 560000,
    productCount: 2,
    status: "cancelled",
    discount: 0,
    shippingFee: 0,
    paymentMethod: "Thanh toán khi nhận hàng",
    shippingAddress:
      "9/4 đường số 2 trường thanh q9, Phường Long Trường, TP Thủ Đức, TP. Hồ Chí Minh",
    products: [
      {
        name: "Mật ong hoa cà phê / 500ml",
        image: "🍯",
        price: 280000,
        quantity: 2,
      },
    ],
    trackingSteps: [
      { label: "Xác nhận đơn", date: "10:00 05/03/2021", completed: true },
      { label: "Đã hủy", date: "12:00 05/03/2021", completed: true },
    ],
  },
];

export const mockAddresses = [
  {
    id: "1",
    name: "Hồ Quốc Khương",
    phone: "(+84) 858 864 357",
    address: "Ktx Khu A ĐH Quốc Gia Tphcm, Đông Hòa",
    ward: "Phường Đông Hòa",
    district: "Thành Phố Dĩ An",
    province: "Bình Dương",
    isDefault: true,
  },
  {
    id: "2",
    name: "Hồ Quốc Khương",
    phone: "(+84) 858 864 357",
    address: "Vùng 2, Thôn Định Phong",
    ward: "Xã An Nghiệp",
    district: "Huyện Tuy An",
    province: "Phú Yên",
    isDefault: false,
  },
  {
    id: "3",
    name: "Lưu Thị Hiền Thanh",
    phone: "(+84) 348 673 688",
    address: "A206C, Bình Đức",
    ward: "Phường Lái Thiêu",
    district: "Thành Phố Thuận An",
    province: "Bình Dương",
    isDefault: false,
  },
  {
    id: "4",
    name: "Quỳnh Anh",
    phone: "(+84) 969 896 377",
    address: "Số 170, Đường 3 Tháng 2",
    ward: "Thị Trấn Ngô Mây",
    district: "Huyện Phù Cát",
    province: "Bình Định",
    isDefault: false,
  },
];

export const mockVouchers = [
  {
    id: "1",
    code: "FRESH20",
    description: "Giảm 20% cho đơn rau củ",
    discount: 20,
    minOrder: 100000,
    expiry: "30/04/2026",
    used: false,
  },
  {
    id: "2",
    code: "FREESHIP",
    description: "Miễn phí vận chuyển",
    discount: 30000,
    minOrder: 50000,
    expiry: "15/05/2026",
    used: false,
  },
  {
    id: "3",
    code: "NEWUSER",
    description: "Giảm 50k cho khách hàng mới",
    discount: 50000,
    minOrder: 200000,
    expiry: "01/04/2026",
    used: false,
  },
  {
    id: "4",
    code: "FRUIT10",
    description: "Giảm 10% cho trái cây",
    discount: 10,
    minOrder: 80000,
    expiry: "20/03/2026",
    used: true,
  },
  {
    id: "5",
    code: "ORGANIC15",
    description: "Giảm 15% sản phẩm hữu cơ",
    discount: 15,
    minOrder: 150000,
    expiry: "10/05/2026",
    used: false,
  },
];

export const mockFarms = [
  {
    id: "1",
    name: "Trang Trại Rau Sạch Đà Lạt",
    location: "Đà Lạt, Lâm Đồng",
    image: "🌿",
    products: 45,
    followers: 1200,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Vườn Trái Cây Bến Tre",
    location: "Bến Tre",
    image: "🌴",
    products: 32,
    followers: 890,
    rating: 4.6,
  },
  {
    id: "3",
    name: "Nông Trại Hữu Cơ Củ Chi",
    location: "Củ Chi, TP.HCM",
    image: "🌾",
    products: 28,
    followers: 2100,
    rating: 4.9,
  },
  {
    id: "4",
    name: "HTX Nông Sản Tây Nguyên",
    location: "Đắk Lắk",
    image: "☕",
    products: 18,
    followers: 650,
    rating: 4.5,
  },
];
