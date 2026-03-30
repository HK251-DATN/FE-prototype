import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialSeconds }) => {
  // Trạng thái lưu trữ tổng số giây còn lại
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    // Nếu hết thời gian thì dừng lại
    if (timeLeft <= 0) return;

    // Thiết lập bộ đếm mỗi 1000ms (1 giây)
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // QUAN TRỌNG: Xóa bộ đếm khi component unmount để tránh rò rỉ bộ nhớ
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Hàm định dạng số luôn có 2 chữ số (VD: 9 -> 09)
  const formatTime = (time) => String(time).padStart(2, "0");

  // Tính toán giờ, phút, giây từ tổng số giây
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-2">
      <div className="bg-black text-white px-2 py-1 rounded font-bold">
        {formatTime(hours)}
      </div>
      <span className="font-bold">:</span>
      <div className="bg-black text-white px-2 py-1 rounded font-bold">
        {formatTime(minutes)}
      </div>
      <span className="font-bold">:</span>
      <div className="bg-black text-white px-2 py-1 rounded font-bold">
        {formatTime(seconds)}
      </div>
    </div>
  );
};

export default CountdownTimer;
