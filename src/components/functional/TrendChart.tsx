"use client";

import { useState, useEffect } from "react";
import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { prepareData } from "../../utils/helpers/data-helpers";
import { useProduct } from "@/utils/context/ProductContext";
import { RatingsData } from "@/utils/types/ratings-types/ratings-types";

import { MonthPicker } from "@/components";

const TrendChart: React.FC<{ customerRatingsData: RatingsData }> = ({
  customerRatingsData,
}) => {
  const { selectedProd } = useProduct();
  const [selectedReviewsTrend, setSelectedReviewsTrends] = useState<
    {
      date: string;
      avgRating: number;
    }[]
  >([]);

  const [timeFrame, setTimeFrame] = useState("12");

  console.log("inside TrendChart --> ", customerRatingsData);

  useEffect(() => {
    if (selectedProd) {
      console.log(selectedProd.productId);
      const reviewsTrend = customerRatingsData.find(
        (data) => data.productId === selectedProd.productId
      );

      // @ts-ignore: Temporarily ignoring type error for avgRating
      setSelectedReviewsTrends(reviewsTrend ? reviewsTrend.avgRating : []);
    }
  }, [selectedProd, customerRatingsData]);

  const filteredReviewsData = prepareData(
    selectedReviewsTrend,
    timeFrame,
    "averageRating"
  );

  const handleTimeFrameChange = (newTimeFrame: string) => {
    setTimeFrame(newTimeFrame);
  };

  return (
    <div className="flex flex-col w-full mt-20 chart">
      <div className="flex justify-between items-start mb-4">
        <h2 className="chartHeader">Customer Ratings Trend</h2>
        <MonthPicker
          selectedTimeFrame={timeFrame}
          onTimeFrameChange={handleTimeFrameChange}
        />
      </div>

      {filteredReviewsData.length > 0 ? (
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <Chart
              data={filteredReviewsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
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
              <YAxis domain={[0, 5]} tickCount={6} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="averageRating"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </Chart>
          </ResponsiveContainer>
        </div>
      ) : (
        <span>No Data Available</span>
      )}
    </div>
  );
};

export default TrendChart;
