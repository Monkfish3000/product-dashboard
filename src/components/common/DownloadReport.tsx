"use client";
import { utils, writeFile } from "xlsx";

type DataRow = {
  [key: string]: string | number | null;
};

const DownloadReport: React.FC<{
  data: DataRow[];
  selectedProd: string | undefined;
  fileName: string;
  timeFrame?: string;
}> = ({ data, selectedProd, fileName, timeFrame }) => {
  const handleDownload = () => {
    if (!data || data.length === 0) {
      alert("There isn't currently any data to download.");
      return;
    }

    // sheet name cannot exceed 31 chars
    const sheetName = `Prod Data(${selectedProd?.slice(0, 20) || "Unknown"})`;

    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, sheetName);

    writeFile(
      workbook,
      `${timeFrame}-month-data-${fileName}-for-${selectedProd}.xlsx`
    );
  };

  return (
    <button className="downloadBtn" onClick={handleDownload}>
      Download
    </button>
  );
};

export default DownloadReport;
