const TESTIMONIALS = [
  {
    name: "Nguyễn Văn A",
    role: "Khách hàng",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/809a02b7f123005728d547df3fb8d5d4729a1372?width=112",
    text: "Sản phẩm tươi mới, dịch vụ nhanh chóng. Rất hài lòng với chất lượng và giá cả tại FreshHarvest!",
    rating: 5,
  },
  {
    name: "Trần Thị B",
    role: "Khách hàng",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/809a02b7f123005728d547df3fb8d5d4729a1372?width=112",
    text: "Giao hàng đúng giờ, sản phẩm đóng gói cẩn thận. Tôi sẽ tiếp tục mua hàng tại đây!",
    rating: 5,
  },
  {
    name: "Lê Văn C",
    role: "Khách hàng",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/809a02b7f123005728d547df3fb8d5d4729a1372?width=112",
    text: "Đây là nơi tốt nhất để mua rau quả tươi. Chất lượng luôn đảm bảo, giá cạnh tranh!",
    rating: 5,
  },
];
export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Bình luận của khách hàng
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="#FFC831"
                  >
                    <path d="M12.6934 5.90392L17.1433 6.52493C17.5118 6.57473 17.8214 6.82079 17.9391 7.15767C18.0568 7.49747 17.9608 7.86656 17.6945 8.11848L14.4678 11.1122L15.2295 15.4066C15.2915 15.7582 15.1397 16.1155 14.8301 16.3235C14.5235 16.5315 14.1179 16.5579 13.7865 16.3909L9.81047 14.3843L5.83752 16.3909C5.50308 16.5579 5.09742 16.5315 4.79086 16.3235C4.4843 16.1155 4.32946 15.7582 4.39449 15.4066L5.15626 11.1122L1.92897 8.11848C1.66235 7.86656 1.56759 7.49747 1.68465 7.15767C1.80139 6.82079 2.11012 6.57473 2.48141 6.52493L6.92752 5.90392L8.92174 2.02754C9.08586 1.70485 9.43269 1.5 9.81047 1.5C10.1914 1.5 10.5382 1.70485 10.7023 2.02754L12.6934 5.90392Z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6">{testimonial.text}</p>
              <div className="flex items-center gap-3 border-t pt-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
