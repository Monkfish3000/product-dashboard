"use client";

type MonthPickerProps = {
  selectedTimeFrame: string;
  onTimeFrameChange: (timeframe: string) => void;
};

const MonthPicker: React.FC<MonthPickerProps> = ({
  selectedTimeFrame,
  onTimeFrameChange,
}) => {
  const timeFrames = ["1", "3", "6", "12"];

  return (
    <div className="flex space-x-2 mb-4">
      {timeFrames.map((timeFrame) => (
        <button
          key={timeFrame}
          className={`timeFrameBtn ${
            selectedTimeFrame === timeFrame
              ? "bg-primary-gray text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => onTimeFrameChange(timeFrame)}
        >
          {timeFrame}M
        </button>
      ))}
    </div>
  );
};

export default MonthPicker;
