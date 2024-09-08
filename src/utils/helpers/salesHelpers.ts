import { format } from "date-fns";
import { Sale } from "../types/sales-types/sales-types";

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
export const prepareSalesData = (sales: Sale[], timeFrame: string) => {
  const months = generateMonths();
  const salesDataMap = sales.reduce<Record<string, number>>(
    (acc, sale: Sale) => {
      const saleMonth = format(new Date(sale.date), "yyyy-MM");
      acc[saleMonth] = sale.sales;
      return acc;
    },
    {}
  );

  let filteredMonths = months;

  // Filter data by time frame (12 months by default)
  // last month
  if (timeFrame === "1") {
    filteredMonths = months.slice(-1);
    // last 3 months
  } else if (timeFrame === "3") {
    filteredMonths = months.slice(-3);
    // last 6 months
  } else if (timeFrame === "6") {
    filteredMonths = months.slice(-6);
  }
  return filteredMonths.map((month) => ({
    date: month,
    sales: salesDataMap[month] || 0,
  }));
};
