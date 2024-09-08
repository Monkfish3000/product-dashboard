export const getAllData = async () => {
  // revalidate data every hour
  const oneHour = 3600;

  try {
    const res = await fetch("http://localhost:3000/data/data.json", {
      // next: { revalidate: oneHour },
      cache: "no-store",
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

  const productInfo = data.map((item) => {
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

  const salesData = data.map((item) => {
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

  const conversionData = data.map((item) => {
    return {
      productId: item.product.id,
      conversionRate: item.conversionRates,
    };
  });

  return conversionData;
};
