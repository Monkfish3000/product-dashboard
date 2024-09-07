"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ProductContextType = {
  selectedProd: string;
  setSelectedProd: (product: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProd, setSelectedProd] = useState<string>("");

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
