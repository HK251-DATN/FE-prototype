import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCartAsync } from "../../../store/slices/cartSlice";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../../routes/endPoints";

// =====================
// MOCK DATA - Replace with real API data when available
// =====================
const mockProduct = {
  id: "1",
  name: "Cải thìa",
  status: "Còn hàng", // "Còn hàng" | "Hết hàng"
  rating: 5,
  reviewCount: 4,
  sku: "WW75K5210YW/SV",
  originalPrice: 10000,
  salePrice: 14000,
  discountPercent: -14,
  description:
    "Cải thìa tươi xanh, được thu hoạch trong ngày, lá non giòn, thân trắng mọng nước và vị ngọt tự nhiên. Sản phẩm thích hợp cho các món xào, nấu canh hoặc lẩu, giàu chất xơ, vitamin và khoáng chất, tốt cho sức khỏe cả gia đình.",
  category: "Rau củ tươi",
  tags: ["Rau củ", "Sức khỏe", "Sạch"],
  shop: {
    name: "farmary",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/b6242515f69e6e3bced65384fb12fdfe60507f07?width=160",
  },
  images: [
    {
      id: "1",
      src: "https://api.builder.io/api/v1/image/assets/TEMP/548c4419b997dee51a58fbce5a268d5c8751099a?width=1112",
      alt: "Cải thìa tươi",
    },
    {
      id: "2",
      src: "https://api.builder.io/api/v1/image/assets/TEMP/b6242515f69e6e3bced65384fb12fdfe60507f07?width=160",
      alt: "Cải thìa tươi - ảnh 2",
    },
    {
      id: "3",
      src: "https://api.builder.io/api/v1/image/assets/TEMP/6f19792f7fdd87fb9dc876c00f37d4ee3a02a525?width=160",
      alt: "Cải thìa tươi - ảnh 3",
    },
    {
      id: "4",
      src: "https://api.builder.io/api/v1/image/assets/TEMP/ff8e5eaa8a9afff8fc1e96abf111b35098ab09c8?width=160",
      alt: "Cải thìa tươi - ảnh 4",
    },
    {
      id: "5",
      src: "https://api.builder.io/api/v1/image/assets/TEMP/9c07e4a6968ae4a3f3e78472c9670ba3ee90cb25?width=160",
      alt: "Cải thìa tươi - ảnh 5",
    },
  ],
};

// =====================
// HELPER COMPONENTS
// =====================

function StarIcon({ filled = true }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.30984 13.4111L12.8564 15.6577C13.3098 15.9446 13.8723 15.5177 13.7378 14.9884L12.7135 10.9581C12.6846 10.8458 12.6879 10.7276 12.7232 10.6172C12.7584 10.5067 12.8241 10.4085 12.9127 10.3337L16.093 7.68712C16.5104 7.33949 16.2955 6.64593 15.7583 6.61105L11.6054 6.34105C11.4936 6.33312 11.3863 6.29359 11.2961 6.22707C11.2059 6.16055 11.1364 6.06977 11.0958 5.9653L9.54665 2.06493C9.50447 1.95408 9.42959 1.85867 9.33195 1.79136C9.2343 1.72404 9.1185 1.68799 8.9999 1.68799C8.8813 1.68799 8.7655 1.72404 8.66786 1.79136C8.57021 1.85867 8.49533 1.95408 8.45315 2.06493L6.90403 5.9653C6.86348 6.06988 6.79404 6.16077 6.70381 6.2274C6.61359 6.29402 6.50628 6.33364 6.3944 6.34161L2.24147 6.61161C1.70484 6.64593 1.48884 7.33949 1.90678 7.68712L5.08715 10.3342C5.17564 10.409 5.24126 10.5072 5.27648 10.6175C5.3117 10.7278 5.3151 10.8459 5.28628 10.9581L4.33678 14.6959C4.17534 15.3309 4.8509 15.8434 5.39428 15.4986L8.69053 13.4111C8.78317 13.3522 8.89068 13.3209 9.00047 13.3209C9.11025 13.3209 9.21776 13.3522 9.3104 13.4111H9.30984Z"
        fill={filled ? "#FF8A00" : "#D1D5DB"}
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9976 2.98875H13.6409V0.12675C13.3574 0.08775 12.3824 0 11.2469 0C8.87764 0 7.25464 1.49025 7.25464 4.22925V6.75H4.64014V9.9495H7.25464V18H10.4601V9.95025H12.9689L13.3671 6.75075H10.4594V4.5465C10.4601 3.62175 10.7091 2.98875 11.9976 2.98875Z"
        fill="white"
      />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 3.41888C17.3306 3.7125 16.6174 3.90713 15.8737 4.00163C16.6387 3.54488 17.2226 2.82713 17.4971 1.962C16.7839 2.38725 15.9964 2.68763 15.1571 2.85525C14.4799 2.13413 13.5146 1.6875 12.4616 1.6875C10.4186 1.6875 8.77387 3.34575 8.77387 5.37863C8.77387 5.67113 8.79862 5.95238 8.85938 6.22013C5.7915 6.0705 3.07688 4.60013 1.25325 2.36025C0.934875 2.91263 0.748125 3.54488 0.748125 4.2255C0.748125 5.5035 1.40625 6.63638 2.38725 7.29225C1.79437 7.281 1.21275 7.10888 0.72 6.83775C0.72 6.849 0.72 6.86363 0.72 6.87825C0.72 8.6715 1.99912 10.161 3.6765 10.5041C3.37612 10.5863 3.04875 10.6256 2.709 10.6256C2.47275 10.6256 2.23425 10.6121 2.01037 10.5626C2.4885 12.024 3.84525 13.0984 5.4585 13.1333C4.203 14.1154 2.60888 14.7071 0.883125 14.7071C0.5805 14.7071 0.29025 14.6936 0 14.6565C1.63462 15.7106 3.57188 16.3125 5.661 16.3125C12.4515 16.3125 16.164 10.6875 16.164 5.81175C16.164 5.64863 16.1584 5.49113 16.1505 5.33475C16.8829 4.815 17.4982 4.16588 18 3.41888Z"
        fill="#4D4D4D"
      />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.24471 0C4.31136 0 1.68774 3.16139 1.68774 6.60855C1.68774 8.20724 2.58103 10.2008 4.01097 10.8331C4.22811 10.931 4.34624 10.8894 4.39462 10.688C4.43737 10.535 4.62525 9.79806 4.71638 9.45042C4.74451 9.33904 4.72988 9.24229 4.63988 9.13766C4.16511 8.58864 3.78821 7.58847 3.78821 6.65017C3.78821 4.24594 5.69967 1.91146 8.9522 1.91146C11.7648 1.91146 13.7325 3.73854 13.7325 6.35204C13.7325 9.30529 12.1698 11.3484 10.1391 11.3484C9.0152 11.3484 8.17816 10.4663 8.44367 9.37505C8.76431 8.07561 9.39321 6.6783 9.39321 5.74113C9.39321 4.90072 8.91844 4.20544 7.94865 4.20544C6.80447 4.20544 5.87631 5.33836 5.87631 6.85943C5.87631 7.82585 6.21832 8.47838 6.21832 8.47838C6.21832 8.47838 5.08652 13.0506 4.87614 13.9045C4.52062 15.3502 4.92451 17.6914 4.95939 17.8928C4.98077 18.0042 5.10565 18.0391 5.1754 17.9479C5.28678 17.8017 6.65484 15.8497 7.03848 14.4389C7.17799 13.9248 7.75064 11.84 7.75064 11.84C8.12753 12.5207 9.21546 13.0911 10.3743 13.0911C13.8214 13.0911 16.3123 10.0613 16.3123 6.30141C16.2999 2.69675 13.215 0 9.24471 0Z"
        fill="#4D4D4D"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip-ig)">
        <path
          d="M17.9822 5.29205C17.9401 4.33564 17.7854 3.67812 17.5639 3.10836C17.3353 2.50359 16.9837 1.96213 16.523 1.51201C16.0729 1.05489 15.5278 0.699691 14.9301 0.474702C14.357 0.253147 13.7029 0.0984842 12.7465 0.0563159C11.783 0.0105764 11.4771 0 9.03324 0C6.58941 0 6.28351 0.0105764 5.32354 0.0527447C4.36713 0.0949129 3.70961 0.249713 3.13999 0.471131C2.53508 0.699691 1.99362 1.05132 1.54351 1.51201C1.08639 1.96213 0.731321 2.50716 0.506195 3.10493C0.284641 3.67812 0.129978 4.33207 0.08781 5.28848C0.0420705 6.25203 0.0314941 6.55792 0.0314941 9.00176C0.0314941 11.4456 0.0420705 11.7515 0.0842387 12.7115C0.126407 13.6679 0.281207 14.3254 0.502762 14.8952C0.731321 15.4999 1.08639 16.0414 1.54351 16.4915C1.99362 16.9486 2.53865 17.3038 3.13642 17.5288C3.70961 17.7504 4.36356 17.905 5.3201 17.9472C6.27994 17.9895 6.58597 17.9999 9.0298 17.9999C11.4736 17.9999 11.7795 17.9895 12.7395 17.9472C13.6959 17.905 14.3534 17.7504 14.9231 17.5288C16.1327 17.0611 17.0892 16.1047 17.5568 14.8952C17.7783 14.322 17.9331 13.6679 17.9752 12.7115C18.0174 11.7515 18.028 11.4456 18.028 9.00176C18.028 6.55792 18.0244 6.25203 17.9822 5.29205ZM16.3613 12.6411C16.3226 13.5202 16.1749 13.9949 16.0518 14.3114C15.7494 15.0956 15.127 15.7179 14.3429 16.0204C14.0264 16.1434 13.5483 16.2911 12.6726 16.3297C11.7232 16.372 11.4385 16.3824 9.03681 16.3824C6.63514 16.3824 6.34684 16.372 5.40087 16.3297C4.52179 16.2911 4.04709 16.1434 3.73062 16.0204C3.34039 15.8761 2.98519 15.6476 2.69688 15.3487C2.398 15.0568 2.16944 14.7052 2.02521 14.315C1.90214 13.9985 1.75448 13.5202 1.71589 12.6447C1.67358 11.6953 1.66314 11.4104 1.66314 9.00876C1.66314 6.60709 1.67358 6.31878 1.71589 5.37295C1.75448 4.49387 1.90214 4.01917 2.02521 3.7027C2.16944 3.31234 2.398 2.95727 2.70045 2.66883C2.9922 2.36994 3.34383 2.14138 3.73419 1.99729C4.05066 1.87422 4.52893 1.72656 5.40444 1.68783C6.35384 1.64566 6.63872 1.63508 9.04024 1.63508C11.4455 1.63508 11.7302 1.64566 12.6762 1.68783C13.5553 1.72656 14.03 1.87422 14.3464 1.99729C14.7367 2.14138 15.0919 2.36994 15.3802 2.66883C15.6791 2.96071 15.9076 3.31234 16.0518 3.7027C16.1749 4.01917 16.3226 4.49731 16.3613 5.37295C16.4035 6.32236 16.414 6.60709 16.414 9.00876C16.414 11.4104 16.4035 11.6917 16.3613 12.6411Z"
          fill="#4D4D4D"
        />
        <path
          d="M9.03337 4.37781C6.48061 4.37781 4.40942 6.44886 4.40942 9.00176C4.40942 11.5547 6.48061 13.6257 9.03337 13.6257C11.5863 13.6257 13.6573 11.5547 13.6573 9.00176C13.6573 6.44886 11.5863 4.37781 9.03337 4.37781ZM9.03337 12.0012C7.37727 12.0012 6.03393 10.658 6.03393 9.00176C6.03393 7.34552 7.37727 6.00232 9.03337 6.00232C10.6896 6.00232 12.0328 7.34552 12.0328 9.00176C12.0328 10.658 10.6896 12.0012 9.03337 12.0012Z"
          fill="#4D4D4D"
        />
        <path
          d="M14.9199 4.19496C14.9199 4.79109 14.4365 5.27445 13.8402 5.27445C13.2441 5.27445 12.7607 4.79109 12.7607 4.19496C12.7607 3.5987 13.2441 3.11548 13.8402 3.11548C14.4365 3.11548 14.9199 3.5987 14.9199 4.19496Z"
          fill="#4D4D4D"
        />
      </g>
      <defs>
        <clipPath id="clip-ig">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.16667 5.83333H1.66667L0 15H15L13.3333 5.83333H10.8333M4.16667 5.83333V3.33333C4.16667 1.49239 5.65905 0 7.5 0C9.34095 0 10.8333 1.49238 10.8333 3.33333V5.83333M4.16667 5.83333H10.8333M4.16667 5.83333V8.33333M10.8333 5.83333V8.33333"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.9996 17.5451C-6.66672 8.3333 4.99993 -1.6667 9.9996 4.65668C14.9999 -1.6667 26.6666 8.3333 9.9996 17.5451Z"
        stroke="#2C742F"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ShopLogo() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.4"
        y="0.4"
        width="55.2"
        height="55.2"
        rx="3.6"
        fill="white"
        stroke="#E6E6E6"
        strokeWidth="0.8"
      />
      <path
        d="M17.1333 21.0015C29.2644 8.40391 43.2617 21.0015 43.2617 21.0015C43.2617 21.0015 29.2644 33.5991 17.1333 21.0015Z"
        fill="#36C63F"
      />
      <path
        d="M34.8938 26.196C39.954 24.6073 43.4454 21.4992 43.5916 21.3676L44 21L43.5916 20.6324C43.4454 20.5008 39.954 17.3927 34.8938 15.804C31.902 14.8647 28.9897 14.6615 26.2377 15.2C22.858 15.8612 19.7256 17.6464 16.9243 20.5054L12 20.5054L12 21.4946L16.9243 21.4946C19.7257 24.3536 22.8579 26.1387 26.2377 26.8C28.9897 27.3384 31.9021 27.1352 34.8938 26.196ZM26.4097 25.8258C23.5163 25.2559 20.806 23.8005 18.3384 21.4946L25.3259 21.4946L27.9805 24.1492L28.6798 23.4498L26.7247 21.4946L32.5294 21.4946L32.5294 20.5054L29.0575 20.5054L31.0127 18.5502L30.3133 17.8509L27.6587 20.5054L22.992 20.5054L24.4806 19.0168L23.7812 18.3174L21.5931 20.5055L18.3384 20.5055C20.806 18.1996 23.5163 16.7441 26.4097 16.1742C28.9942 15.6652 31.7388 15.855 34.5674 16.7384C38.4272 17.9437 41.4068 20.1329 42.4887 21.0001C41.4067 21.8673 38.4272 24.0563 34.5674 25.2618C31.7388 26.145 28.9942 26.3348 26.4097 25.8258Z"
        fill="#009F06"
      />
      <text
        fill="#555555"
        style={{ whiteSpace: "pre" }}
        fontFamily="Dancing Script"
        fontSize="13"
        fontWeight="bold"
        letterSpacing="0em"
      >
        <tspan x="8" y="39.66">
          farmary
        </tspan>
      </text>
    </svg>
  );
}

// =====================
// MAIN COMPONENT
// =====================

export default function ProductDetails({ product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (product.status === "Hết hàng") {
      toast.error("Sản phẩm tạm thời hết hàng");
      return;
    }

    dispatch(addToCartAsync({ batchDetailId: product.batchId, quantity }));
    toast.success("Đã thêm vào giỏ hàng");
    
    setTimeout(() => {
      navigate(ENDPOINTS.USER.CART);
    }, 500);
  };

  const images =
    product?.images?.length > 0
      ? product.images
      : [{ id: 1, src: "/placeholder.jpg", alt: "No image" }];

  const visibleStart = Math.max(
    0,
    Math.min(selectedImageIndex - 1, images.length - 4),
  );
  const visibleImages = images.slice(visibleStart, visibleStart + 4);

  const handlePrev = () => {
    setSelectedImageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => Math.min(images.length - 1, prev + 1));
  };

  const formatPrice = (price) =>
    price ? price.toLocaleString("vi-VN") + "đ" : "0đ";

  return (
    <div className="bg-white rounded-lg p-6 md:p-10 font-[Poppins]">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* ---- LEFT: Image Gallery ---- */}
        <div className="flex gap-4 lg:w-[50%]">
          {/* Thumbnail Sidebar */}
          <div className="flex flex-col items-center gap-3 w-[80px] flex-shrink-0">
            {/* Up arrow */}
            <button
              onClick={handlePrev}
              disabled={selectedImageIndex === 0}
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 15.5L12 8.5L5 15.5"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {visibleImages.map((img, idx) => {
                const realIdx = visibleStart + idx;
                return (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(realIdx)}
                    className={`w-[80px] h-[90px] rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                      realIdx === selectedImageIndex
                        ? "border-[#00B207]"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Down arrow */}
            <button
              onClick={handleNext}
              disabled={selectedImageIndex === images.length - 1}
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 8.5L12 15.5L5 8.5"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Main Image */}
          <div className="flex-1 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center min-h-[300px] md:min-h-[420px]">
            <img
              src={images[selectedImageIndex]?.src}
              alt={images[selectedImageIndex]?.alt}
              className="w-full h-full object-contain max-h-[500px]"
            />
          </div>
        </div>

        {/* ---- RIGHT: Product Info ---- */}
        <div className="flex flex-col gap-5 lg:w-[50%]">
          {/* Name + Status */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
                {product.name}
              </h1>
              <span
                className={`px-2 py-1 rounded text-sm font-normal ${
                  product.status === "Còn hàng"
                    ? "bg-[rgba(32,181,38,0.2)] text-[#2C742F]"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.status}
              </span>
            </div>

            {/* Rating + SKU */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < product.rating} />
                ))}
                <span className="text-[#666] text-sm ml-1">
                  {product.reviewCount} lượt đánh giá
                </span>
              </div>
              <span className="text-[#B3B3B3] font-medium">•</span>
              <div className="flex items-center gap-1">
                <span className="text-[#333] text-sm font-medium">SKU:</span>
                <span className="text-[#666] text-sm">{product.sku}</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-[#B3B3B3] text-xl line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="text-[#2C742F] text-2xl font-medium">
              {formatPrice(product.salePrice)}
            </span>
            <span className="px-3 py-0.5 bg-[rgba(234,75,72,0.10)] text-[#EA4B48] text-sm font-medium rounded-full">
              {product.discountPercent}%
            </span>
          </div>

          <div className="h-px bg-[#E6E6E6]" />

          {/* Shop + Share */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[#1A1A1A] text-sm">Shop:</span>
              <ShopLogo />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[#1A1A1A] text-sm">Chia sẻ sản phẩm:</span>
              <div className="flex items-center gap-1.5">
                {/* Facebook */}
                <button className="w-10 h-10 rounded-full bg-[#00B207] flex items-center justify-center hover:bg-[#009a06] transition-colors">
                  <FacebookIcon />
                </button>
                {/* Twitter */}
                <button className="w-10 h-10 rounded-full border border-[#E6E6E6] flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <TwitterIcon />
                </button>
                {/* Pinterest */}
                <button className="w-10 h-10 rounded-full border border-[#E6E6E6] flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <PinterestIcon />
                </button>
                {/* Instagram */}
                <button className="w-10 h-10 rounded-full border border-[#E6E6E6] flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <InstagramIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-[#808080] text-sm leading-relaxed">
            {product.description}
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center gap-3 py-5 border-y border-[#E5E5E5]">
            {/* Quantity */}
            <div className="flex items-center gap-1 px-2 py-2 rounded-full border border-[#E6E6E6] bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-[34px] h-[34px] rounded-full bg-[#F2F2F2] flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.3335 7H11.6668"
                    stroke="#666666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="w-10 text-center text-[#1A1A1A] text-base">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-[34px] h-[34px] rounded-full bg-[#F2F2F2] flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.3335 7.00004H11.6668M7.00016 2.33337V11.6667"
                    stroke="#1A1A1A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#00B207] text-white text-base font-semibold hover:bg-[#009a06] transition-colors"
            >
              Thêm vào giỏ
              <CartIcon />
            </button>

            {/* Pre-order */}
            <button className="px-6 py-3.5 rounded-full border border-[#00B207] bg-[#EBFFEF] text-[#00B207] text-base font-semibold hover:bg-[#d4f7da] transition-colors whitespace-nowrap">
              Đặt trước
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlisted((w) => !w)}
              className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-colors ${
                isWishlisted
                  ? "bg-[rgba(32,181,38,0.2)]"
                  : "bg-[rgba(32,181,38,0.10)] hover:bg-[rgba(32,181,38,0.2)]"
              }`}
            >
              <HeartIcon />
            </button>
          </div>

          {/* Category + Tags */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[#1A1A1A] text-sm font-medium">
                Danh mục:
              </span>
              <span className="text-[#808080] text-sm">{product.category}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[#1A1A1A] text-sm font-medium">Tag:</span>
              {product.tags.map((tag, index) => (
                <span
                  key={tag}
                  className={`text-sm ${
                    index === product.tags.length - 1
                      ? "text-[#1A1A1A] underline cursor-pointer hover:text-[#00B207]"
                      : "text-[#808080]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
