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

    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(
      workbook,
      worksheet,
      `Product Data(${selectedProd})`
    );

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
