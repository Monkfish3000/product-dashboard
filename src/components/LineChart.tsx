"use client";
import { useState } from "react";

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

import { prepareSalesData } from "../utils/helpers/salesHelpers";
import { useProduct } from "@/utils/context/ProductContext";
import { SalesData } from "@/utils/types/sales-types/sales-types";

const chartsOverTime = ["Sales Over Time", "Conversion Rate Over Time"];

const sales = [
  { date: "2024-09-12", sales: 10 },
  { date: "2024-09-23", sales: 8 },
  { date: "2024-08-05", sales: 15 },
  { date: "2024-08-17", sales: 7 },
  { date: "2024-07-11", sales: 9 },
  { date: "2024-07-22", sales: 6 },
  { date: "2024-06-04", sales: 12 },
  { date: "2024-05-09", sales: 14 },
  { date: "2024-04-15", sales: 5 },
  { date: "2024-03-12", sales: 11 },
  { date: "2024-02-18", sales: 13 },
  { date: "2023-12-10", sales: 6 },
  { date: "2023-11-21", sales: 8 },
  { date: "2023-11-29", sales: 7 },
];

const LineChart: React.FC<{ salesData: SalesData }> = ({ salesData }) => {
  const { selectedProd } = useProduct();
  console.log("inside LineChart --> ", selectedProd);
  console.log("inside LineChart salesData --> ", salesData);

  // state for first two charts timeframe - initally 12 months
  const [selectedTimeFrames, setSelectedTimeFrames] = useState({
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

  console.log("selectedTimeFrames --> ", selectedTimeFrames);

  return selectedProd ? (
    <>
      <h2 className="text-xl mb-4">Product Sales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chartsOverTime.map((chart, index) => {
          const filteredSalesData = prepareSalesData(
            sales,
            selectedTimeFrames[index]
          );

          return (
            <div
              key={index}
              className="bg-primary-white shadow-xl rounded-xl opacity-50 h-96"
            >
              <div className="flex justify-end space-x-2 mb-4 pt-1 pr-1">
                {/* TODO - btns could be a separate component */}
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
                  data={filteredSalesData}
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
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                </Chart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
      <h2 className="text-xl my-5">Customer Reviews Trend</h2>

      <div className="bg-gray-200 h-80 flex items-center justify-center mt-6">
        <span>Customer Reviews Trend</span>
      </div>
    </>
  ) : null;
};

export default LineChart;
