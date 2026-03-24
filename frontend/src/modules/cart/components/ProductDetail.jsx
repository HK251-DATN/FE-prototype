import { useState } from "react";
import { useCart } from "./CartContext";

// ============================================================
// MOCK DATA — Replace with real API data when available
// ============================================================
const PRODUCT = {
  id: "WW75K5210YW-SV",
  name: "Cải thìa",
  status: "Còn hàng",
  rating: 4,
  ratingCount: 4,
  sku: "WW75K5210YW/SV",
  originalPrice: 10,
  salePrice: 14,
  discountPercent: -14,
  category: "Rau củ tươi",
  tags: ["Rau củ", "Sức khỏe", "Sạch"],
  shopLogo: "https://placehold.co/36x36/22c55e/fff?text=S",
  images: [
    "https://placehold.co/500x400/e8f5e9/4caf50?text=Cải+thìa+1",
    "https://placehold.co/500x400/f1f8e9/558b2f?text=Cải+thìa+2",
    "https://placehold.co/500x400/e0f2f1/00897b?text=Cải+thìa+3",
    "https://placehold.co/500x400/f9fbe7/9e9d24?text=Cải+thìa+4",
  ],
  shortDesc:
    "Cải thìa tươi xanh, được thu hoạch trong ngày, lá non giòn, thân trắng mong nước và vị ngọt tự nhiên. Sản phẩm thích hợp cho các món xào, nấu canh hoặc lẩu, giàu chất xơ, vitamin và khoáng chất, tốt cho sức khoẻ cả gia đình.",
  description: `Cải thìa được chúng tôi trực tiếp trồng và chăm sóc theo quy trình canh tác an toàn, ưu tiên đất sạch, nguồn nước sạch và hạn chế tối đa việc sử dụng hóa chất. Mỗi luống rau đều được theo dõi kỹ từ khi gieo hạt đến lúc thu hoạch để đảm bảo cây phát triển tự nhiên, đồng đều và giữ trọn độ tươi ngon.

Chúng tôi chỉ thu hoạch khi cải đạt độ trưởng thành phù hợp, lá xanh non, thân trắng giòn và vị ngọt thanh tự nhiên. Rau sau khi thu hoạch được sơ tuyển và bảo quản cẩn thận nhằm giữ chất lượng tốt nhất trước khi giao đến tay người tiêu dùng.`,
  features: [
    "Rau được trồng theo quy trình an toàn, đảm bảo sạch và tươi",
    "Không sử dụng hóa chất độc hại trong quá trình chăm sóc",
    "Thu hoạch đúng thời điểm, giữ trọn độ giòn và dinh dưỡng",
    "Đảm bảo nguồn gốc rõ ràng, minh bạch",
  ],
  footerDesc:
    "Chúng tôi mong muốn mang đến cho người tiêu dùng những bó cải thìa không chỉ tươi ngon mà còn an tâm khi sử dụng, góp phần tạo nên những bữa ăn sạch, lành mạnh cho mỗi gia đình.",
  badges: [
    { icon: "🏷️", title: "Giảm 14%", desc: "Tiết kiệm 14% cho túi tiền" },
    { icon: "🌿", title: "100% hữu cơ", desc: "100% sản phẩm hữu cơ" },
  ],
  additionalInfo: [
    { label: "Xuất xứ", value: "Việt Nam" },
    { label: "Trọng lượng", value: "300g / bó" },
    { label: "Bảo quản", value: "Ngăn mát tủ lạnh, dùng trong 3–5 ngày" },
    { label: "Chứng nhận", value: "VietGAP" },
  ],
  reviews: [
    {
      name: "Nguyễn Thị Lan",
      rating: 5,
      date: "12/02/2025",
      comment: "Rau tươi ngon, đặt hôm trước hôm sau có ngay. Rất hài lòng!",
    },
    {
      name: "Trần Văn Minh",
      rating: 4,
      date: "05/01/2025",
      comment: "Cải thìa ngon, giòn. Sẽ mua lại lần sau.",
    },
    {
      name: "Phạm Quỳnh Anh",
      rating: 4,
      date: "20/12/2024",
      comment: "Sản phẩm sạch, đóng gói cẩn thận.",
    },
    {
      name: "Lê Hồng Phúc",
      rating: 3,
      date: "01/12/2024",
      comment: "Rau hơi nhỏ bó, nhưng chất lượng ổn.",
    },
  ],
};
// ============================================================

const fmt = (n) => `$${Number(n).toFixed(2)}`;

const StarRating = ({ rating, size = "sm" }) => {
  const s = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`${s} ${i <= rating ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const SocialIcon = ({ type }) => {
  const icons = {
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
    pinterest: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          ry="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="17.5"
          y1="6.5"
          x2="17.51"
          y2="6.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  };
  return icons[type] || null;
};

export default function ProductDetail({ onGoToCart }) {
  const product = PRODUCT;
  const { addToCart, items } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("moTa");
  const [wishlist, setWishlist] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  const handleAddToCart = async () => {
    await addToCart(product, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  const tabs = [
    { key: "moTa", label: "Mô tả" },
    { key: "thongTin", label: "Thông tin thêm" },
    { key: "danhGia", label: "Đánh giá" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Cart nav button */}
      <div className="max-w-6xl mx-auto px-4 pt-6 flex justify-end">
        <button
          onClick={onGoToCart}
          className="relative flex items-center gap-2 bg-white border border-gray-200 hover:border-green-400 text-gray-700 font-medium text-sm px-4 py-2.5 rounded-full shadow-sm transition-all hover:shadow-md"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9"
            />
          </svg>
          Giỏ hàng
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Images */}
            <div className="flex gap-4 md:w-1/2">
              <div className="flex flex-col gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? "border-green-500 shadow-md scale-105" : "border-gray-100 hover:border-green-300"}`}
                  >
                    <img
                      src={src}
                      alt={`thumb-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden bg-green-50 flex items-center justify-center min-h-72">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
            </div>

            {/* Info */}
            <div className="md:w-1/2 flex flex-col gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold text-gray-800">
                  {product.name}
                </h1>
                <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {product.status}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                <StarRating rating={product.rating} />
                <span className="text-gray-400">
                  {product.ratingCount} lượt đánh giá
                </span>
                <span className="text-gray-300">•</span>
                <span>SKU: {product.sku}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-400 line-through text-base">
                  {fmt(product.originalPrice)}
                </span>
                <span className="text-green-600 font-bold text-2xl">
                  {fmt(product.salePrice)}
                </span>
                <span className="bg-red-100 text-red-500 text-xs font-bold px-2 py-1 rounded-lg">
                  {product.discountPercent}%
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">Shop:</span>
                  <img
                    src={product.shopLogo}
                    alt="shop"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">
                    Chia sẻ sản phẩm:
                  </span>
                  {["facebook", "twitter", "pinterest", "instagram"].map(
                    (s) => (
                      <button
                        key={s}
                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-green-100 text-gray-500 hover:text-green-600 flex items-center justify-center transition-colors"
                      >
                        <SocialIcon type={s} />
                      </button>
                    ),
                  )}
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed">
                {product.shortDesc}
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-12 text-gray-500 hover:bg-green-50 hover:text-green-600 text-xl font-light transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-semibold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-12 text-gray-500 hover:bg-green-50 hover:text-green-600 text-xl font-light transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-white ${
                    addedFeedback
                      ? "bg-emerald-600 shadow-emerald-200 scale-95"
                      : "bg-green-500 hover:bg-green-600 shadow-green-200 active:scale-95"
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Đã thêm!
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9"
                        />
                      </svg>
                      Thêm vào giỏ
                    </>
                  )}
                </button>

                <button className="border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold py-3 px-5 rounded-xl transition-colors">
                  Đặt trước
                </button>

                <button
                  onClick={() => setWishlist((w) => !w)}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${wishlist ? "border-red-400 bg-red-50 text-red-500" : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"}`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={wishlist ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {cartCount > 0 && (
                <button
                  onClick={onGoToCart}
                  className="text-sm text-green-600 font-semibold hover:underline text-left transition-colors"
                >
                  → Xem giỏ hàng ({cartCount} sản phẩm)
                </button>
              )}

              <div className="text-sm text-gray-500 space-y-1 pt-1">
                <div>
                  <span className="font-medium text-gray-700">Danh mục:</span>{" "}
                  <span className="text-green-600">{product.category}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-700">Tag:</span>
                  {product.tags.map((t) => (
                    <span
                      key={t}
                      className="underline text-green-500 hover:text-green-700 cursor-pointer transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-4 text-sm font-semibold transition-all relative ${activeTab === tab.key ? "text-green-600" : "text-gray-500 hover:text-gray-700"}`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-t" />
                )}
              </button>
            ))}
          </div>
          <div className="p-6 md:p-10">
            {activeTab === "moTa" && (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-3/5 space-y-4 text-gray-600 text-sm leading-relaxed">
                  {product.description.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  <ul className="space-y-2 pt-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p>{product.footerDesc}</p>
                </div>
                <div className="md:w-2/5 space-y-4">
                  <div className="rounded-2xl overflow-hidden bg-green-50 relative h-52 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-50" />
                    <button className="relative z-10 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-300 transition-all hover:scale-110">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {product.badges.map((b, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1 border border-gray-100"
                      >
                        <span className="text-2xl">{b.icon}</span>
                        <span className="font-semibold text-gray-700 text-sm">
                          {b.title}
                        </span>
                        <span className="text-gray-400 text-xs">{b.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "thongTin" && (
              <div className="max-w-lg">
                <table className="w-full text-sm text-gray-600 border-collapse">
                  <tbody>
                    {product.additionalInfo.map((row, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="py-3 px-4 font-semibold text-gray-700 rounded-l w-40">
                          {row.label}
                        </td>
                        <td className="py-3 px-4 rounded-r">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "danhGia" && (
              <div className="space-y-5">
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl w-fit">
                  <span className="text-4xl font-bold text-green-600">
                    {(
                      product.reviews.reduce((s, r) => s + r.rating, 0) /
                      product.reviews.length
                    ).toFixed(1)}
                  </span>
                  <div>
                    <StarRating
                      rating={Math.round(
                        product.reviews.reduce((s, r) => s + r.rating, 0) /
                          product.reviews.length,
                      )}
                      size="md"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {product.reviews.length} đánh giá
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {product.reviews.map((r, i) => (
                    <div
                      key={i}
                      className="border border-gray-100 rounded-xl p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-sm flex items-center justify-center">
                            {r.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-700 text-sm">
                            {r.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <StarRating rating={r.rating} />
                          <span className="text-xs text-gray-400">
                            {r.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm pl-10">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
