export type ProductSearchProps = {
  productInfo: ProductInfo[];
};

export type ProductInfo = {
  productName: string;
  productId: number;
  productInventory: number;
};

export type ProductContextType = {
  selectedProd: ProductInfo | null;
  setSelectedProd: (product: ProductInfo) => void;
};
