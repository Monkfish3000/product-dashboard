export type AvgRating = {
  productId: number;
  date: string;
  avgRating: number;
};

export type AvgRatingData = {
  productId: number;
  conversionRates: AvgRating[];
};

export type RatingsData = AvgRating[];
