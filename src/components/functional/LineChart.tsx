"use client";
import { useEffect, useState } from "react";

import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { prepareData } from "../../utils/helpers/salesHelpers";
import { useProduct } from "@/utils/context/ProductContext";
import { SalesData } from "@/utils/types/sales-types/sales-types";
import { ConversionData } from "@/utils/types/conversion-types/conversion-types";
import { TrendChart } from "./TrendChart";
import { RatingsData } from "@/utils/types/ratings-types/ratings-types";

const chartsOverTime = ["Sales Over Time", "Conversion Rate Over Time"];

const LineChart: React.FC<{
  salesData: SalesData;
  conversionData: ConversionData;
  customerRatingsData: RatingsData;
}> = ({ salesData, conversionData, customerRatingsData }) => {
  const { selectedProd } = useProduct();

  // TODO - types for sales and convRate state
  const [selectedSales, setSelectedSales] = useState<any[]>([]);
  const [selectedConvRate, setSelectedConvRate] = useState<any>([]);

  // console.log("inside LineChart --> ", selectedProd);
  // console.log("inside LineChart salesData --> ", salesData);
  console.log("inside LineChart conversionData --> ", conversionData);

  // track first two charts timeframe - initally 12 months
  const [selectedTimeFrames, setSelectedTimeFrames] = useState<
    Record<number, string>
  >({
    0: "12",
    1: "12",
  });

  // update state for time frame (1, 3, 6 or 12 months)
  const updateTimeFrame = (chartIndex: number, timeFrame: string) => {
    setSelectedTimeFrames((prev) => ({
      ...prev,
      [chartIndex]: timeFrame,
    }));
  };

  // set sales & conversion rate data for selectedProduct
  useEffect(() => {
    if (selectedProd) {
      const productSales = salesData.find(
        (data) => data.productId === selectedProd.productId
      );
      const conversionRates = conversionData.find(
        (data) => data.productId === selectedProd.productId
      );

      // console.log("inside useEffect --> ", conversionRates);

      setSelectedSales(productSales ? productSales.sales : []);
      setSelectedConvRate(
        conversionRates ? conversionRates.conversionRate : []
      );

      // console.log("inside useEffect --> ", selectedConvRate);
      // console.log("inside useEffect selectedSales --> ", selectedSales);
    }
  }, [selectedProd, salesData, conversionData]);

  //   console.log("selectedTimeFrames --> ", selectedTimeFrames);

  return selectedProd ? (
    <>
      <h2 className="chartHeader">Product Sales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chartsOverTime.map((chart, index) => {
          const chartData =
            index === 0
              ? prepareData(selectedSales, selectedTimeFrames[index], "sales")
              : prepareData(
                  selectedConvRate,
                  selectedTimeFrames[index],
                  "conversionRate"
                );

          // console.log("inside return chartData --> ", chartData);

          return (
            <div
              key={index}
              className="bg-primary-white shadow-xl rounded-xl opacity-50 h-96"
            >
              <div className="flex justify-end space-x-2 mb-4 pt-1 pr-1">
                {/* TODO - btns should be a separate component */}
                <button
                  className={`timeFrameBtn ${
                    selectedTimeFrames[index] === "1"
                      ? "bg-primary-gray text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => updateTimeFrame(index, "1")}
                >
                  1M
                </button>
                <button
                  className={`timeFrameBtn ${
                    selectedTimeFrames[index] === "3"
                      ? "bg-primary-gray text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => updateTimeFrame(index, "3")}
                >
                  3M
                </button>
                <button
                  className={`timeFrameBtn ${
                    selectedTimeFrames[index] === "6"
                      ? "bg-primary-gray text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => updateTimeFrame(index, "6")}
                >
                  6M
                </button>
                <button
                  className={`timeFrameBtn ${
                    selectedTimeFrames[index] === "12"
                      ? "bg-primary-gray text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => updateTimeFrame(index, "12")}
                >
                  12M
                </button>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <Chart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) =>
                      new Date(date).toLocaleString("default", {
                        month: "short",
                      })
                    }
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={index === 0 ? "sales" : "conversionRate"}
                    stroke="#8884d8"
                  />
                </Chart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
      <TrendChart customerRatingsData={customerRatingsData} />
    </>
  ) : null;
};

export default LineChart;
