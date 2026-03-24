import React, { useState } from "react";
import ProductDetails from "../components/productDetail";
import ProductDescription from "../components/productDescription";

export default function Product() {
    return (
    <div className="max-w-7xl mx-auto p-10 bg-white rounded-xl shadow-2xl flex flex-col gap-10 relative">
      {/* Nút đóng Modal */}
      <ProductDetails />
      <ProductDescription />
    </div>
  );
}
