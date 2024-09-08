import { getAvgRating, getConversionData, getSalesData } from "@/utils/getData";

import LineChart from "./LineChart";

const ChartsContainer = async () => {
  const salesData = await getSalesData();
  const conversionData = await getConversionData();
  const customerRatingsData = await getAvgRating();

  // fetching data on server
  console.log("inside ChartsContainer (server) salesData --> ", salesData);
  console.log(
    "inside ChartsContainer (server) conversionsData --> ",
    conversionData
  );

  return (
    <div className="chartsContainer">
      <LineChart
        conversionData={conversionData}
        salesData={salesData}
        customerRatingsData={customerRatingsData}
      />
    </div>
  );
};

export default ChartsContainer;
