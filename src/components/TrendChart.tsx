"use-client";

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

import { prepareData } from "../utils/helpers/salesHelpers";
import { useProduct } from "@/utils/context/ProductContext";

export const TrendChart = ({ customerRatingsData }) => {
  const { selectedProd } = useProduct();
  const [selectedReviewsTrend, setSelectedReviewsTrends] = useState<any[]>([]);
  const [timeFrame, setTimeFrame] = useState("12");

  const [selectedTimeFrames, setSelectedTimeFrames] = useState<
    Record<number, string>
  >({
    0: "12",
    1: "12",
  });

  console.log("inside TrendChart --> ", customerRatingsData);

  useEffect(() => {
    if (selectedProd) {
      console.log(selectedProd.productId);
      const reviewsTrend = customerRatingsData.find(
        (data) => data.productId === selectedProd.productId
      );

      console.log(reviewsTrend.avgRating);

      setSelectedReviewsTrends(reviewsTrend ? reviewsTrend.avgRating : []);
    }

    console.log(selectedReviewsTrend);
  }, [selectedProd, customerRatingsData]);

  const filteredReviewsData = prepareData(
    selectedReviewsTrend,
    timeFrame,
    "averageRating"
  );

  console.dir(filteredReviewsData);

  return (
    <div className="h-80 flex items-center justify-center mt-20">
      <h2 className="chartHeader">Customer Ratings Trend</h2>
      {filteredReviewsData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <Chart
            data={filteredReviewsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="averageRating" stroke="#82ca9d" />
          </Chart>
        </ResponsiveContainer>
      ) : (
        <span>No Data Available</span>
      )}
    </div>
  );
};
