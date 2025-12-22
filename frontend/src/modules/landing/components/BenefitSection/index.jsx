export default function Benefits() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className="relative h-96 md:h-[500px]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/ca396986e77d8d65c947e81d493a355d09ff9bf8?width=552"
              alt="Fresh produce 1"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            {/* <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/0c72dcd351b644b2acfdd8181cdcd74eaa3588c9?width=888"
                alt="Fresh produce 2"
                className="absolute bottom-0 right-0 w-3/5 h-2/3 object-cover rounded-lg shadow-lg"
              /> */}
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Cam Kết 100% <br /> Thực Phẩm Sạch
              </h2>
              <p className="text-gray-600 text-lg">
                Chúng tôi cam kết mọi sản phẩm đều được trồng trọt tự nhiên,
                không hóa chất, bảo vệ sức khỏe gia đình bạn.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Thực phẩm an toàn & tự nhiên",
                  desc: "Chúng tôi cam kết mọi sản phẩm đều được trồng trọt tự nhiên, không hóa chất.",
                },
                {
                  title: "Luôn tươi mới & chất lượng hàng đầu",
                  desc: "Sản phẩm được thu hoạch mỗi sáng và tuyển chọn kỹ lưỡng.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M13.3332 4L5.99984 11.3333L2.6665 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors w-fit">
              Khám phá ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
