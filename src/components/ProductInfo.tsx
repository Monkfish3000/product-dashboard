"use client";

import { useProduct } from "@/utils/context/ProductContext";

const ProductInfo = () => {
  const { selectedProd } = useProduct();

  // TODO - future enhancement e.g. skeleton-charts placeholders or pre-search message.
  if (!selectedProd) return null;

  const { productName, productId, productInventory } = selectedProd;

  // console.log("NOW inside ProductINFO --> ", selectedProd);

  return selectedProd ? (
    <div className="productInfo">
      <h1 className="text-xl font-bold">{`Viewing data for ${productName}`}</h1>
      <p>{`In Stock: ${productInventory} items`}</p>
    </div>
  ) : null;
};

export default ProductInfo;
