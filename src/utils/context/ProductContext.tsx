"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  ProductContextType,
  ProductInfo,
} from "../types/product-types/product-types";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProd, setSelectedProd] = useState<ProductInfo | null>(null);

  return (
    <ProductContext.Provider value={{ selectedProd, setSelectedProd }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const product = useContext(ProductContext);

  if (!product) {
    throw new Error("useProduct must be used inside ProductProvider");
  }

  return product;
};
