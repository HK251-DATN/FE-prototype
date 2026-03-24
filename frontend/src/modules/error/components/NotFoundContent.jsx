import React from "react";

const NotFoundContent = () => {
  return (
    <div className="w-full bg-white py-2 lg:py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8">
          {/* Cột bên trái: Nội dung Text */}
          <div className="w-full lg:w-5/12 text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ôi không...
            </h1>

            <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
              Trang này hiện không khả dụng
            </h2>

            <p className="text-gray-500 mb-8 leading-relaxed text-base md:text-lg">
              Rất tiếc! Trang bạn tìm kiếm không tồn tại. Hãy quay lại để tiếp
              tục chọn mua nông sản tươi ngon nhé!
            </p>

            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#00b207] hover:bg-[#009906] text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 shadow-sm"
            >
              {/* Icon mũi tên quay lại (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Trở về trang chủ
            </a>
          </div>

          {/* Cột bên phải: Hình ảnh minh họa */}
          <div className="w-full lg:w-6/12 order-1 lg:order-2 flex justify-center">
            <img
              src="https://agriculture-ecommerce.s3.ap-southeast-2.amazonaws.com/Oops!+404+Error+with+a+broken+robot-rafiki.png"
              alt="404 Illustration"
              className="w-full max-w-md lg:max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundContent;
