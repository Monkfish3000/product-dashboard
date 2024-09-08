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

// normalise data for LineChart
export const prepareData = (
  data: { date: string; sales?: number; conversionRate?: number }[],
  timeFrame: string,
  key: "sales" | "conversionRate"
) => {
  const months = generateMonths();
  const dataMap = data.reduce<Record<string, number>>((acc, item) => {
    // check format of date
    const dataMonth =
      item.date.length > 7 ? format(new Date(item.date), "yyyy-MM") : item.date;

    const value = key === "sales" ? item.sales : item.conversionRate;

    // this is getting silly - TODO- refactor to two functions prepSales and prepConvRate
    // for sales data only - sum the sales the occur in a single month
    if (key === "sales" && value) {
      acc[dataMonth] = (acc[dataMonth] || 0) + value;
    } else {
      acc[dataMonth] = value || 0;
    }

    // acc[dataMonth] = value || [];
    return acc;
  }, {});

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
    [key]: dataMap[month] || 0,
  }));
};
