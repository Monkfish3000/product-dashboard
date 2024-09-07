import { format } from "date-fns";

// get months for x-axis
const generateMonths = () => {
  const startDate = new Date(2023, 9);
  const endDate = new Date();
  const months = [];

  const currentDate = startDate;
  while (currentDate <= endDate) {
    months.push(format(currentDate, "yyyy-MM"));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months;
};

// map sales data to months
// TODO - sales Types
export const prepareSalesData = (sales: string[], timeFrame: string) => {
  const months = generateMonths();
  const salesDataMap = sales.reduce((acc, sale) => {
    const saleMonth = format(new Date(sale.date), "yyyy-MM");
    acc[saleMonth] = sale.sales;
    return acc;
  }, {});

  let filteredMonths = months;

  // Filter data based on the time frame
  if (timeFrame === "1") {
    filteredMonths = months.slice(-1); // Last 1 month
  } else if (timeFrame === "3") {
    filteredMonths = months.slice(-3); // Last 3 months
  } else if (timeFrame === "6") {
    filteredMonths = months.slice(-6); // Last 6 months
  }

  return filteredMonths.map((month) => ({
    date: month,
    sales: salesDataMap[month] || 0,
  }));
};
