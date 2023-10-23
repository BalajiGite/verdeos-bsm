import React, { useState, useEffect } from "react";

import { getDataSourcesDemo } from "../api/dashboardDataService";

const DataSourceWidget = () => {
  const [dataSource, setDataSource] = useState([]);
  const [totalDataQualityPer, setTotalDataQualityPer] = useState("");

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      const resp = await getDataSourcesDemo(3);
      const { totalDataQualityPer, dataSource } = resp;
      setTotalDataQualityPer(totalDataQualityPer);
      setDataSource(dataSource);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex mb-4">
        <div className="w-80 font-medium uppercase text-color-card-header">
          Data Sources
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-80 text-color-lable text-sm uppercase">
          Data Quality
        </div>
        <div className="w-20 ml-auto flex items-center justify-end">
          <span className="ml-1 text-color-lable-value ext-sm">
            {totalDataQualityPer}
          </span>
        </div>
      </div>
      {dataSource.map((data, index) => (
        <div className="flex mb-2" key={index}>
          <div className="w-40 text-color-lable text-sm">{data.name}</div>
          <div className="w-60 ml-auto flex items-center justify-end">
            <div className="w-10 text-sm text-color-lable-value">
              {data.percentage}
            </div>
            <div className="w-1/2 bg-gray-300 h-2 rounded-full">
              <div
                style={{ width: data.percentage }}
                className="h-full bg-red-500 rounded-full"
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataSourceWidget;
