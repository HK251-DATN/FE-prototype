import { useState } from "react";

// =====================
// ICON COMPONENTS
// =====================

function CheckIcon() {
  return (
    <div className="w-5 h-5 rounded-full bg-[#00B207] flex-shrink-0 flex items-center justify-center mt-0.5">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M10.4167 3.125L4.68754 8.85417L2.08337 6.25"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function PlayIcon() {
  return (
    <div className="w-12 h-12 rounded-full bg-[#00B307] flex items-center justify-center shadow-lg">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4 2.5V15.5L15 9L4 2.5Z" fill="white" />
      </svg>
    </div>
  );
}

function PriceTagIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip-price)">
        <path
          d="M28.0671 24.2501C28.326 24.2501 28.5359 24.0402 28.5359 23.7813V12.5313C28.5359 11.9718 28.3178 11.3995 27.9219 10.9198L24.4454 6.70769C24.2633 6.487 24.0539 6.301 23.8265 6.15287C23.8405 6.00962 23.8484 5.86494 23.8484 5.71887V0.468872C23.8484 0.209997 23.6385 0.00012207 23.3797 0.00012207C23.1208 0.00012207 22.9109 0.209997 22.9109 0.468872V5.78594C22.7762 5.76231 22.6409 5.75012 22.5047 5.75012H16.4422C16.0154 5.75012 15.597 5.86987 15.2224 6.08994C15.2062 6.09575 15.1902 6.10225 15.1744 6.10994L10.605 8.33568C10.0987 8.58962 9.69392 9.01556 9.46498 9.535L7.56861 14.3441C7.47367 14.585 7.59192 14.8572 7.83279 14.9522C7.88923 14.9744 7.94736 14.9849 8.00461 14.9849C8.19148 14.9849 8.36811 14.8724 8.44079 14.688L10.3264 9.90525C10.4682 9.58844 10.7161 9.32887 11.0204 9.17612L13.4347 8.00019L11.0249 10.9199C10.6641 11.357 10.4734 11.9143 10.4734 12.5314V28.7189C10.4734 28.9074 10.49 29.092 10.52 29.2719L5.68992 27.1316C4.59879 26.6482 4.10429 25.364 4.58779 24.269L7.64904 16.6619C7.74567 16.4217 7.62936 16.1487 7.38917 16.0521C7.14886 15.9554 6.87598 16.0718 6.77929 16.3119L3.72679 23.8976C3.04042 25.4632 3.74942 27.2971 5.31011 27.9886L10.9741 30.4984C11.57 31.4046 12.5639 32.0001 13.6922 32.0001H25.2547C27.0333 32.0001 28.5359 30.4974 28.5359 28.7188V25.9688C28.5359 25.7099 28.326 25.5001 28.0672 25.5001C27.8083 25.5001 27.5984 25.7099 27.5984 25.9688V28.7188C27.5984 29.9893 26.5251 31.0626 25.2547 31.0626H13.6922C12.4343 31.0626 11.4109 30.0112 11.4109 28.7188V12.5313C11.4109 12.1289 11.5243 11.7875 11.748 11.5166L15.2244 7.30444C15.548 6.91244 15.9919 6.68756 16.4422 6.68756H22.5047C22.593 6.68756 22.681 6.6965 22.7679 6.71337C22.4745 7.71406 21.7476 8.54906 20.766 8.9675C20.5094 8.53819 20.0401 8.25006 19.5046 8.25006C18.6947 8.25006 18.0359 8.90894 18.0359 9.71881C18.0359 10.5287 18.6947 11.1876 19.5046 11.1876C20.2535 11.1876 20.8729 10.6239 20.962 9.89862C22.2244 9.42112 23.179 8.40937 23.6044 7.17444C23.6452 7.2155 23.6847 7.25869 23.7224 7.30444L27.1989 11.5166C27.4565 11.8287 27.5984 12.1891 27.5984 12.5314V23.7814C27.5984 24.0402 27.8082 24.2501 28.0671 24.2501Z"
          fill="#00B307"
        />
      </g>
      <defs>
        <clipPath id="clip-price">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip-leaf)">
        <path
          d="M31.9761 0.871204C31.913 0.678579 31.737 0.545392 31.5345 0.536954C30.515 0.494517 27.7282 0.501829 23.8825 1.4852C20.3027 2.40064 16.9435 3.90533 14.1678 5.8367C13.9475 5.99002 13.8932 6.29283 14.0464 6.51314C14.1996 6.73345 14.5025 6.78777 14.7228 6.63452C17.4042 4.7687 20.6549 3.31377 24.1232 2.42683C25.4192 2.09545 26.7589 1.84389 28.0293 1.68627C27.5084 1.9112 26.9503 2.17439 26.3693 2.48289C22.4404 4.56858 20.2452 7.23552 19.0322 9.3792C18.8728 8.66395 18.8292 7.84189 18.8288 7.47552C18.8288 7.2072 18.6112 6.98977 18.3429 6.98977C18.0745 6.98977 17.857 7.20733 17.857 7.4757C17.857 7.69077 17.8742 9.48302 18.4169 10.5878C17.6688 12.1852 16.9691 13.7821 16.292 15.3286C16.0045 15.9855 15.7213 16.632 15.4407 17.2649C15.0028 16.4405 14.4258 14.9479 14.5841 12.9956C14.6057 12.7282 14.4065 12.4937 14.139 12.472C13.8723 12.4508 13.637 12.6496 13.6153 12.9171C13.3879 15.7219 14.5032 17.6801 14.9557 18.348C14.1076 20.2223 13.2713 21.9484 12.3904 23.4217C11.9369 22.395 11.2265 20.4387 11.2265 18.2604C11.2265 17.992 11.009 17.7745 10.7406 17.7745C10.4722 17.7745 10.2547 17.992 10.2547 18.2604C10.2547 21.1498 11.3722 23.6069 11.7744 24.3975C10.8122 25.8353 9.7846 26.9596 8.62391 27.6438C5.08804 23.8037 4.74316 16.5988 10.9204 9.92739C11.6225 9.16902 12.3932 8.44508 13.2109 7.77577C13.4187 7.60577 13.4492 7.29964 13.2792 7.09195C13.1092 6.88427 12.803 6.85377 12.5954 7.0237C11.7432 7.72133 10.9397 8.47614 10.2072 9.26708C3.69129 16.3043 4.05841 23.9746 7.7946 28.1765C4.54098 30.3661 0.515225 30.5029 0.4731 30.5041C0.204975 30.5113 -0.00658704 30.7344 0.000412956 31.0026C0.00735046 31.2665 0.223475 31.4758 0.485975 31.4758C0.490288 31.4758 0.494663 31.4757 0.498975 31.4756C0.685475 31.4707 4.97979 31.33 8.49747 28.8732C9.56335 29.7429 11.2353 30.272 13.2624 30.272C15.5573 30.272 18.3074 29.5937 21.1483 27.9638C23.78 26.4538 25.6668 24.1438 26.7563 21.0981C27.6893 18.4901 28.004 15.3521 27.6662 12.0234C27.0642 6.08933 29.3059 3.41164 31.8179 1.40202C31.9761 1.27533 32.0392 1.06383 31.9761 0.871204Z"
          fill="#00B307"
        />
      </g>
      <defs>
        <clipPath id="clip-leaf">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 18 18" fill="none">
          <path
            d="M9.30984 13.4111L12.8564 15.6577C13.3098 15.9446 13.8723 15.5177 13.7378 14.9884L12.7135 10.9581C12.6846 10.8458 12.6879 10.7276 12.7232 10.6172C12.7584 10.5067 12.8241 10.4085 12.9127 10.3337L16.093 7.68712C16.5104 7.33949 16.2955 6.64593 15.7583 6.61105L11.6054 6.34105C11.4936 6.33312 11.3863 6.29359 11.2961 6.22707C11.2059 6.16055 11.1364 6.06977 11.0958 5.9653L9.54665 2.06493C9.50447 1.95408 9.42959 1.85867 9.33195 1.79136C9.2343 1.72404 9.1185 1.68799 8.9999 1.68799C8.8813 1.68799 8.7655 1.72404 8.66786 1.79136C8.57021 1.85867 8.49533 1.95408 8.45315 2.06493L6.90403 5.9653C6.86348 6.06988 6.79404 6.16077 6.70381 6.2274C6.61359 6.29402 6.50628 6.33364 6.3944 6.34161L2.24147 6.61161C1.70484 6.64593 1.48884 7.33949 1.90678 7.68712L5.08715 10.3342C5.17564 10.409 5.24126 10.5072 5.27648 10.6175C5.3117 10.7278 5.3151 10.8459 5.28628 10.9581L4.33678 14.6959C4.17534 15.3309 4.8509 15.8434 5.39428 15.4986L8.69053 13.4111C8.78317 13.3522 8.89068 13.3209 9.00047 13.3209C9.11025 13.3209 9.21776 13.3522 9.3104 13.4111H9.30984Z"
            fill={i < rating ? "#FF8A00" : "#D1D5DB"}
          />
        </svg>
      ))}
    </div>
  );
}

// =====================
// TAB CONTENT COMPONENTS
// =====================

/**
 * Tab "Mô tả":
 * Đọc nội dung HTML từ productDetail.detail.HTML
 * hoặc batchDetail.detailContent (dạng "HTML: ..., CSS: ...")
 */
function DescriptionTab({ productDetail, batchDetail, productGeneral }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Lấy HTML content từ productDetail.detail hoặc batchDetail.detailContent
  let htmlContent = "";
  if (productDetail?.detail?.HTML) {
    htmlContent = productDetail.detail.HTML;
  } else if (batchDetail?.detailContent) {
    // Parse "HTML: <nội dung>, CSS: <nội dung>"
    const htmlMatch = batchDetail.detailContent.match(
      /HTML:\s*(.*?)(?:,\s*CSS:|$)/s,
    );
    if (htmlMatch) htmlContent = htmlMatch[1].trim();
  }

  // Highlights: tính % giảm giá nếu có, và tag hữu cơ
  const highlights = [
    {
      icon: "leaf",
      title: "100% tươi sạch",
      subtitle: `Từ ${productGeneral?.providerId || "nhà cung cấp uy tín"}`,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Left: HTML Content */}
      <div className="flex flex-col gap-5 lg:w-[55%]">
        {htmlContent ? (
          // Render nội dung HTML từ API
          <div
            className="text-[#808080] text-sm leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          // Fallback nếu chưa có nội dung
          <p className="text-[#808080] text-sm leading-relaxed">
            {productGeneral?.description ||
              "Chưa có mô tả chi tiết cho sản phẩm này."}
          </p>
        )}
      </div>

      {/* Right: Ảnh sản phẩm + Highlights */}
      <div className="flex flex-col gap-4 lg:w-[45%]">
        {/* Ảnh sản phẩm thay cho video nếu không có video URL */}
        <div
          className="relative rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
        >
          <img
            src={productDetail?.img || productGeneral?.img}
            alt={productGeneral?.name}
            className="w-full h-[300px] object-cover rounded-lg"
          />
          {!isVideoPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
              <PlayIcon />
            </div>
          )}
        </div>

        {/* Highlights */}
        <div className="flex items-center justify-between gap-4 border border-[#E6E6E6] rounded-lg px-5 py-6">
          {highlights.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {item.icon === "price-tag" ? <PriceTagIcon /> : <LeafIcon />}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#1A1A1A] text-sm font-medium leading-[150%]">
                  {item.title}
                </span>
                <span className="text-[#808080] text-xs leading-[150%]">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Tab "Thông tin thêm":
 * Hiển thị các trường từ productGeneral và batchDetail
 */
function AdditionalInfoTab({ productGeneral, batchDetail }) {
  const rows = [
    { label: "Quy cách", value: productGeneral?.description },
    { label: "Nhà cung cấp", value: productGeneral?.providerId },
    { label: "Số lô", value: `#${batchDetail?.batchDetailId}` },
    { label: "Còn lại", value: `${batchDetail?.quantity} sản phẩm` },
    {
      label: "Trạng thái",
      value:
        productGeneral?.status === "ACTIVE"
          ? "Đang kinh doanh"
          : "Ngừng kinh doanh",
    },
    {
      label: "Tags",
      value: (productGeneral?.tags || []).join(", "),
    },
  ].filter((row) => row.value);

  return (
    <div className="max-w-2xl">
      <table className="w-full">
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"}>
              <td className="py-3 px-4 text-[#1A1A1A] text-sm font-medium w-40 border border-[#E6E6E6]">
                {row.label}
              </td>
              <td className="py-3 px-4 text-[#808080] text-sm border border-[#E6E6E6]">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Tab "Đánh giá":
 * Hiển thị rating tổng từ batchDetail.avgRate và batchDetail.numRate
 * (chưa có danh sách review từ API — để placeholder)
 */
function ReviewsTab({ batchDetail }) {
  const avgRate = batchDetail?.avgRate || 0;
  const numRate = batchDetail?.numRate || 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-5xl font-semibold text-[#1A1A1A]">
            {Number(avgRate).toFixed(1)}
          </span>
          <StarRating rating={Math.round(avgRate)} />
          <span className="text-[#808080] text-xs mt-1">
            {numRate} đánh giá
          </span>
        </div>
      </div>

      {numRate === 0 && (
        <p className="text-[#808080] text-sm">
          Chưa có đánh giá nào cho sản phẩm này.
        </p>
      )}
    </div>
  );
}

// =====================
// MAIN COMPONENT
// =====================

const TABS = ["Mô tả", "Thông tin thêm", "Đánh giá"];

/**
 * Props:
 *  - productGeneral: data từ /api/product-generals/:id
 *  - batchDetail:    data từ /api/batch-details/:id
 *  - productDetail:  data từ /api/product-details/:id
 */
export default function ProductDescription({
  productGeneral,
  batchDetail,
  productDetail,
}) {
  const [activeTab, setActiveTab] = useState(0);

  if (!productGeneral || !batchDetail || !productDetail) return null;

  return (
    <div className="bg-white font-[Poppins]">
      {/* Tab Navigation */}
      <div className="border-b border-[#E5E5E5]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10">
          <div className="flex">
            {TABS.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-4 text-base font-medium leading-[150%] transition-all whitespace-nowrap ${
                  activeTab === index
                    ? "text-[#1A1A1A] shadow-[0_-2px_0_0_#20B526_inset]"
                    : "text-[#808080] hover:text-[#1A1A1A]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-8">
        {activeTab === 0 && (
          <DescriptionTab
            productDetail={productDetail}
            batchDetail={batchDetail}
            productGeneral={productGeneral}
          />
        )}
        {activeTab === 1 && (
          <AdditionalInfoTab
            productGeneral={productGeneral}
            batchDetail={batchDetail}
          />
        )}
        {activeTab === 2 && <ReviewsTab batchDetail={batchDetail} />}
      </div>
    </div>
  );
}
