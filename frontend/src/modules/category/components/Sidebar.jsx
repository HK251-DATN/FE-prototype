import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = ({ onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    ratings: true,
    tags: true,
  });

  const [selectedCategory, setSelectedCategory] = useState("culinary");
  const [priceRange, setPriceRange] = useState([5000, 500000]);
  const [selectedRatings, setSelectedRatings] = useState([4]);
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const categories = [
    { id: "leaf", label: "Rau lá", count: 134 },
    { id: "culinary", label: "Củ, quả", count: 150 },
  ];

  const tags = [
    "Sức khỏe",
    "Giảm cân",
    "Ăn kiêng",
    "Trẻ em",
    "Vitamin",
    "Bữa sáng",
    "Bữa tối",
    "Đủ chất",
    "Bữa trưa",
    "Cá",
    "Thịt",
    "Sạch",
  ];

  return (
    <div className="w-full md:w-72 bg-white">
      {/* Filter Button - Mobile */}
      <button className="md:hidden w-full bg-primary text-white py-3 px-4 rounded-full font-semibold text-sm mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Lọc
      </button>

      {/* Categories Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <button
          onClick={() => toggleSection("categories")}
          className="w-full flex justify-between items-center mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 font-poppins">
            Rau củ tươi
          </h3>
          {expandedSections.categories ? (
            <ChevronUp className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {expandedSections.categories && (
          <div className="space-y-3">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat.id}
                  checked={selectedCategory === cat.id}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-5 h-5"
                />
                <span className="text-sm text-gray-800 font-poppins">
                  {cat.label}
                </span>
                <span className="text-sm text-gray-500 font-poppins">
                  ({cat.count})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex justify-between items-center mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 font-poppins">
            Giá
          </h3>
          {expandedSections.price ? (
            <ChevronUp className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <div className="flex-1 h-1 bg-gray-300 rounded-full relative">
                <div
                  className="absolute h-1 bg-primary rounded-full"
                  style={{ width: "42%" }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-gray-700 font-poppins">
              <span className="font-semibold">Từ:</span> 5.000đ — 500.000đ
            </div>
          </div>
        )}
      </div>

      {/* Ratings Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <button
          onClick={() => toggleSection("ratings")}
          className="w-full flex justify-between items-center mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 font-poppins">
            Sao
          </h3>
          {expandedSections.ratings ? (
            <ChevronUp className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {expandedSections.ratings && (
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => (
              <label
                key={stars}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(stars)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRatings([...selectedRatings, stars]);
                    } else {
                      setSelectedRatings(
                        selectedRatings.filter((r) => r !== stars)
                      );
                    }
                  }}
                  className="w-5 h-5"
                />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < stars ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M12.6935 5.90392L17.1434 6.52493C17.5119 6.57473 17.8215 6.82079 17.9392 7.15767C18.0569 7.49747 17.9609 7.86656 17.6946 8.11848L14.4679 11.1122L15.2297 15.4066C15.2916 15.7582 15.1399 16.1155 14.8302 16.3235C14.5236 16.5315 14.118 16.5579 13.7866 16.3909L9.81059 14.3843L5.83764 16.3909C5.5032 16.5579 5.09755 16.5315 4.79098 16.3235C4.48442 16.1155 4.32959 15.7582 4.39462 15.4066L5.15638 11.1122L1.92909 8.11848C1.66247 7.86656 1.56772 7.49747 1.68477 7.15767C1.80151 6.82079 2.11024 6.57473 2.48153 6.52493L6.92765 5.90392L8.92187 2.02754C9.08599 1.70485 9.43281 1.5 9.81059 1.5C10.1915 1.5 10.5383 1.70485 10.7024 2.02754L12.6935 5.90392Z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-800 font-poppins ml-2">
                  {stars === 5 ? "5.0" : `${stars}.0 trở lên`}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Tags Section */}
      <div className="pb-6 mb-6">
        <button
          onClick={() => toggleSection("tags")}
          className="w-full flex justify-between items-center mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 font-poppins">
            Tag phổ biến
          </h3>
          {expandedSections.tags ? (
            <ChevronUp className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {expandedSections.tags && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    setSelectedTags(selectedTags.filter((t) => t !== tag));
                  } else {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-poppins transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Promotion Banner */}
      <div className="bg-gradient-to-b from-red-100 to-pink-100 rounded-lg p-6 text-center">
        <div className="mb-4">
          <div className="text-4xl font-bold">
            <span className="text-orange-500">79%</span>
            <span className="text-gray-800 text-2xl ml-2">giảm giá</span>
          </div>
          <p className="text-gray-600 text-sm mt-2 font-poppins">
            cho đơn hàng trong tuần đầu tiên
          </p>
        </div>
        <button className="text-primary font-semibold text-sm font-poppins flex items-center justify-center gap-2 mx-auto hover:underline">
          Mua ngay
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
