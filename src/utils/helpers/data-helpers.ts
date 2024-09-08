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
  data: {
    date: string;
    sales?: number;
    conversionRate?: number;
    avgRating?: number;
  }[],
  timeFrame: string,
  key: "sales" | "conversionRate" | "averageRating"
) => {
  const months = generateMonths();

  // console.log("in FN --> ", data);
  // console.log("in FN --> ", timeFrame);
  // console.log("in FN --> ", key);

  const dataMap = data.reduce<Record<string, number>>((acc, item) => {
    // check format of date
    const dataMonth =
      item.date.length > 7 ? format(new Date(item.date), "yyyy-MM") : item.date;

    // const value = key === "sales" ? item.sales : item.conversionRate;
    let value: number | undefined;

    if (key === "sales") {
      value = item.sales;
    } else if (key === "conversionRate") {
      value = item.conversionRate;
    } else if (key === "averageRating") {
      value = item.avgRating;
    }

    // TODO: refactor to separate functions for normalising data depending on the data
    // for sales data only - sum the sales the occur in a single month
    if (key === "sales" && value) {
      acc[dataMonth] = (acc[dataMonth] || 0) + value;
    } else {
      acc[dataMonth] = value || 0;
    }
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
