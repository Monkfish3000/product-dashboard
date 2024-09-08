export type ProductData = {
  product: {
    name: string;
    id: number;
  };
  inventory: number;
  sales: { date: string; sales: number }[];
  conversionRates: { date: string; conversionRate: number }[];
  reviewsTrend: { date: string; avgRating: number }[];
  latestComments: { id: number; author: string; text: string }[];
};
