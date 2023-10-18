import React, { useState, useEffect } from 'react';


import {
    getDataSourcesDemo
  } from "../api/dashboardDataService"; 

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
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div className="block w-full overflow-x-auto">
      <table className="items-center w-full bg-transparent border-collapse">
        <thead className="thead-light">
          <tr>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Data Quality
            </th>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              {totalDataQualityPer} + helloooooo
            </th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((data, index) => (
            <tr key={index}>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                {data.name}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="flex items-center">
                  <span className="mr-2">{data.percentage}</span>
                  <div className="relative w-full">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                      <div
                        style={{ width: data.percentage }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default DataSourceWidget;
