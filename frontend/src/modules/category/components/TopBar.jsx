import { useState } from "react";
import { ChevronDown } from "lucide-react";

const TopBar = ({ productCount = 52, onSortChange }) => {
  const [sortBy, setSortBy] = useState("latest");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleSortChange = (value) => {
    setSortBy(value);
    setShowSortMenu(false);
    if (onSortChange) {
      onSortChange(value);
    }
  };

  const sortOptions = [
    { value: "latest", label: "Mới nhất" },
    { value: "price-low", label: "Giá: Thấp đến Cao" },
    { value: "price-high", label: "Giá: Cao đến Thấp" },
    { value: "rating", label: "Đánh giá cao nhất" },
  ];

  return (
    <div className="w-full bg-white mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Filter Button */}
        <button className="hidden sm:flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-green-700 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Lọc
        </button>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 font-poppins">
            Sắp xếp theo
          </span>

          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-700 font-poppins">
                {sortOptions.find((opt) => opt.value === sortBy)?.label ||
                  "Mới nhất"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-700" />
            </button>

            {showSortMenu && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`w-full text-left px-4 py-2 text-sm font-poppins hover:bg-gray-50 transition-colors ${
                      sortBy === option.value
                        ? "bg-gray-100 text-primary font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Count */}
        <div className="text-right sm:text-left">
          <span className="text-sm text-gray-800 font-poppins">
            <span className="font-bold text-base">{productCount}</span> sản phẩm
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
