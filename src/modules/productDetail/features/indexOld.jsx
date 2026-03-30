import React, { useState } from "react";
import ProductDetails from "../components/productDetailOld";
import ProductDescription from "../components/productDescriptionOld";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumbs";

export default function Product() {
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl flex flex-col relative">
      {/* Nút đóng Modal */}
      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "Product", link: "/product" },
          { label: "Product Details", link: "/products/1" },
        ]}
      />
      <ProductDetails />
      <ProductDescription />
    </div>
  );
}
