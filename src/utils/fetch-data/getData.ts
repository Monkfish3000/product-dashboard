import { ProductData } from "../types/data-types/data-types";

export const getAllData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const oneHour = 3600;

  try {
    const res = await fetch(`${baseUrl}/data/data.json`, {
      // revalidate data every hour
      next: { revalidate: oneHour },
    });

    if (!res.ok) {
      console.error(`Error: failed to fetch data. Status code: ${res.status}`);
      return null;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return null;
  }
};

export const getProductInfo = async () => {
  const data = await getAllData();

  if (!data) {
    console.log("Failed to fetch product info");
    return null;
  }

  const productInfo = data.map((item: ProductData) => {
    return {
      productName: item.product.name,
      productId: item.product.id,
      productInventory: item.inventory,
    };
  });

  return productInfo;
};

export const getSalesData = async () => {
  const data = await getAllData();

  if (!data) {
    console.log("Failed to fetch sales data");
    return null;
  }

  const salesData = data.map((item: ProductData) => {
    return {
      productId: item.product.id,
      sales: item.sales,
    };
  });

  return salesData;
};

export const getConversionData = async () => {
  const data = await getAllData();

  if (!data) {
    console.log("Failed to fetch conversion data");
    return null;
  }

  const conversionData = data.map((item: ProductData) => {
    return {
      productId: item.product.id,
      conversionRate: item.conversionRates,
    };
  });

  return conversionData;
};

export const getAvgRating = async () => {
  const data = await getAllData();

  if (!data) {
    console.log("Failed to fetch average ratings data");
    return null;
  }

  const avgRating = data.map((item: ProductData) => {
    return {
      productId: item.product.id,
      avgRating: item.reviewsTrend,
    };
  });

  return avgRating;
};

export const getComments = async () => {
  const data = await getAllData();

  if (!data) {
    console.log("Failed to fetch average ratings data");
    return null;
  }

  const comments = data.map((item: ProductData) => {
    return {
      productId: item.product.id,
      comments: item.latestComments,
    };
  });

  return comments;
};
