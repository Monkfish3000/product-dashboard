import { getSalesData } from "@/utils/getData";

import LineChart from "./LineChart";

const ChartsContainer = async () => {
  const salesData = await getSalesData();

  console.log("inside ChartsContainer --> ", salesData);

  return (
    <div className="chartsContainer">
      <LineChart salesData={salesData} />
    </div>
  );
};

export default ChartsContainer;
