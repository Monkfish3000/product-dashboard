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

import { prepareData } from "../../utils/helpers/data-helpers";
import { useProduct } from "@/utils/context/ProductContext";
import { SalesData } from "@/utils/types/sales-types/sales-types";
import { ConversionData } from "@/utils/types/conversion-types/conversion-types";
import { RatingsData } from "@/utils/types/ratings-types/ratings-types";
import { MonthPicker, TrendChart } from "..";

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
            <div key={index} className="bg-primary-white chart">
              <div className="flex justify-end space-x-2 mb-4 pt-1 pr-1">
                <MonthPicker
                  selectedTimeFrame={selectedTimeFrames[index]}
                  onTimeFrameChange={(timeFrame) =>
                    updateTimeFrame(index, timeFrame)
                  }
                />
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
