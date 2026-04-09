import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const Sidebar = ({ onFilterChange, filters = {}, availableTags = [] }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    ratings: true,
    tags: true,
  });

  const [selectedCategory, setSelectedCategory] = useState(
    filters.categoryId || 0,
  );
  const [priceRange, setPriceRange] = useState([
    filters.minPrice || 0,
    filters.maxPrice || 500000,
  ]);
  const [selectedRatings, setSelectedRatings] = useState(
    filters.selectedRatings || [],
  );
  const [selectedTags, setSelectedTags] = useState(filters.searchTags || []);
  useEffect(() => {
    setSelectedTags(filters.searchTags || []);
  }, [filters.searchTags]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (onFilterChange) {
      onFilterChange({
        categoryId: parseInt(catId),
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        selectedRatings,
        searchTags: selectedTags,
      });
    }
  };

  const handleRatingChange = (newRatings) => {
    setSelectedRatings(newRatings);
    if (onFilterChange) {
      onFilterChange({
        categoryId: selectedCategory,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        selectedRatings: newRatings,
        searchTags: selectedTags,
      });
    }
  };

  const handleTagChange = (newTags) => {
    setSelectedTags(newTags);
    if (onFilterChange) {
      onFilterChange({
        categoryId: selectedCategory,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        selectedRatings,
        searchTags: newTags,
      });
    }
  };

  const handlePriceChange = (newPrice) => {
    setPriceRange(newPrice);
    if (onFilterChange) {
      onFilterChange({
        categoryId: selectedCategory,
        minPrice: newPrice[0],
        maxPrice: newPrice[1],
        selectedRatings,
        searchTags: selectedTags,
      });
    }
  };

  const categories = [
    { id: "leaf", label: "Rau lá" },
    { id: "culinary", label: "Củ, quả" },
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
    "Grape",
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
      {/* <div className="border-b border-gray-200 pb-6 mb-6">
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
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-5 h-5"
                />
                <span className="text-sm text-gray-800 font-poppins">
                  {cat.label}
                </span>
              
              </label>
            ))}
          </div>
        )}
      </div> */}

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
            <Slider
              // type="number"
              // value={priceRange[0]}
              // onChange={(e) =>
              //   handlePriceChange([parseInt(e.target.value), priceRange[1]])
              // }
              // className="w-1/2 px-2 py-1 border border-gray-300 rounded text-sm"
              // placeholder="Min"
              range
              min={0}
              max={500000}
              step={1000}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
              onChangeComplete={(value) => handlePriceChange(value)}
            />
            {/* <div className="flex gap-2">
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  handlePriceChange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-1/2 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Max"
              />
            </div> */}
            {/* 🎯 Input min max */}
            <div className="flex gap-3">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => {
                  const min = Math.max(0, Number(e.target.value));
                  const newRange = [min, priceRange[1]];
                  setPriceRange(newRange);
                  handlePriceChange(newRange);
                }}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Từ"
              />

              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => {
                  const max = Math.max(priceRange[0], Number(e.target.value));
                  const newRange = [priceRange[0], max];
                  setPriceRange(newRange);
                  handlePriceChange(newRange);
                }}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Đến"
              />
            </div>
            {/* <div className="text-sm text-gray-700 font-poppins">
              <span className="font-semibold">Từ:</span>{" "}
              {priceRange[0].toLocaleString()}đ —{" "}
              {priceRange[1].toLocaleString()}đ
            </div> */}
            <div className="text-sm text-gray-700 font-poppins text-center">
              <span className="font-semibold text-green-600">
                {priceRange[0].toLocaleString()}đ
              </span>
              {" — "}
              <span className="font-semibold text-green-600">
                {priceRange[1].toLocaleString()}đ
              </span>
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
                    let newRatings;
                    if (e.target.checked) {
                      newRatings = [...selectedRatings, stars];
                    } else {
                      newRatings = selectedRatings.filter((r) => r !== stars);
                    }
                    handleRatingChange(newRatings);
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
            {availableTags.length > 0 ? (
              availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    const newTags = selectedTags.includes(tag)
                      ? selectedTags.filter((t) => t !== tag)
                      : [...selectedTags, tag];
                    handleTagChange(newTags);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-poppins transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {tag.replace(/_/g, " ")} {/* Hiển thị dep_da thành dep da cho đẹp */}
                </button>
              ))
            ) : (
              <p className="text-xs text-gray-400">Đang tải tag...</p>
            )}
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
