"use client";

import { useProduct } from "@/utils/context/ProductContext";

const ProductInfo = () => {
  const { selectedProd } = useProduct();

  console.log("NOW inside ProductINFO --> ", selectedProd);
  return selectedProd ? (
    <div className="productInfo">
      <h1 className="text-xl font-semibold">{`Viewing data for ${selectedProd}`}</h1>
      <p className="text-gray-600">{`In Stock: 51 items`}</p>
    </div>
  ) : null;
};

export default ProductInfo;
