export type ConversionRate = {
  productId: number;
  date: string;
  conversionRate: number;
};

export type ConversionRateData = {
  productId: number;
  conversionRates: ConversionRate[];
};

export type ConversionData = ConversionRate[];
