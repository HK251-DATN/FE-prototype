const BLOG_POSTS = [
  {
    id: "1",
    title: "Công thức tạo món ăn ngon chỉ với thịt, trứng và rau",
    category: "Chế biến",
    readTime: "3 phút đọc",
    comments: 22,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/dbbc71bf2d878f6bb1082b57b3fb481a127f7a16?width=848",
    author: "Nguyễn Văn A",
    date: "12/11/2025",
  },
  {
    id: "2",
    title: "Cách lựa chọn cam ngon khi đi chợ để tránh sai lầm khi mua",
    category: "Đi chợ",
    readTime: "5 phút đọc",
    comments: 36,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/c0aae5f674681ce50a132078534b186ac2515c99?width=848",
    author: "Nguyễn Văn A",
    date: "12/11/2025",
  },
  {
    id: "3",
    title: "Bảo quản thực phẩm như thế nào để luôn tươi ngon",
    category: "Bảo quản",
    readTime: "3 phút đọc",
    comments: 22,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/36e3b388f74cd861b90aeee1be45fec0c08d3f58?width=848",
    author: "Nguyễn Văn A",
    date: "12/11/2025",
  },
];
export default function Blog() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Cẩm nang Bếp Xanh
          </h2>
          <button className="text-green-600 hover:text-green-700 font-bold text-lg flex items-center gap-2">
            Xem tất cả
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14m-7-7l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                  <span className="text-xs font-semibold bg-red-600 text-white px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="16" height="16" fill="gray">
                      <circle cx="8" cy="8" r="3" fill="gray" />
                    </svg>
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/809a02b7f123005728d547df3fb8d5d4729a1372?width=112"
                      alt={post.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-xs">
                      <p className="font-semibold text-gray-900">
                        {post.author}
                      </p>
                      <p className="text-gray-600">{post.date}</p>
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
                    Đọc thêm →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
