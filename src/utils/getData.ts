export const getAllData = async () => {
  // revalidate data every hour
  const oneHour = 3600;

  try {
    const res = await fetch("http://localhost:3005/data/data.json", {
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

export const getProductNames = async () => {
  const data = await getAllData();

  if (!data) {
    console.log("Failed to fetch product names");
    return null;
  }

  const productNames = data.map((item) => item.product.name);

  return productNames;
};
