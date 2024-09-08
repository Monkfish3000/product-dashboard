export type Sale = {
  date: string;
  sales: number;
};

export type ProductSales = {
  productId: number;
  sales: Sale[];
};

export type SalesData = ProductSales[];
