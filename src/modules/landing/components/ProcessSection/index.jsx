export default function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quy trình hoạt động
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tươi sống Tận Tay, Trọn Vẹn Hương Vị chỉ qua 4 Bước
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Timeline */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300">
            <div className="absolute w-1 bg-green-600 top-1/3 bottom-0"></div>
          </div>

          {/* Steps */}
          {[
            {
              number: "01",
              title: "Đặt hàng & Chốt đơn (Trước 22:00)",
              desc: "Bạn chỉ cần hoàn tất đơn hàng trước 10 giờ tối. Hệ thống của chúng tôi sẽ tổng hợp, lên kế hoạch thu mua chính xác.",
            },
            {
              number: "02",
              title: "Thu hoạch & Kiểm định nghiêm ngặt",
              desc: "Đội ngũ thu mua của chúng tôi khởi hành từ 4 giờ sáng để lấy hàng tươi mới nhất từ nông trại.",
            },
            {
              number: "03",
              title: "Đóng gói Chuẩn",
              desc: "Sản phẩm được đóng gói tại kho lúc 7 giờ sáng theo quy chuẩn riêng.",
            },
            {
              number: "04",
              title: "Giao hàng Tận tay & Nhanh chóng",
              desc: "Đơn hàng sẽ đến tay bạn từ 8 giờ sáng đến 12 giờ trưa cùng ngày.",
            },
          ].map((step, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-600 text-white text-3xl font-bold">
                  {step.number}
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
