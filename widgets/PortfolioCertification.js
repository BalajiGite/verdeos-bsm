import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdowns/Dropdown.js"; // Create Dropdown component

import { getApiDataFromAws } from "../api/dashboardDataService";

const PortfolioCertification = () => {
  const [filter, setFilter] = useState("NABERS"); // Set "All" as the initial filter
  const [certificationData, setCertificationData] = useState([]); // State to store the fetched data
  const options = [{ name: "NABERS" }, { name: "Green Star" }]; //

  // Function to filter data based on the selected filter
  const filteredData = certificationData?.filter((item) =>
    filter === "All" ? true : item.certification === filter
  );

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const resp = await getApiDataFromAws(
        "buildingType=Hotel&functionName=verdeosDemoGetAllNabersRatings&ratingType=Water&certification=NABERS"
      );
      setCertificationData(resp);
    };

    fetchData();
  }, []); // Empty dependency array means this effect will run once when the component mounts

  return (
    <div className="relative flex flex-col min-w-0 break-words text-white table-bg-color w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              Portfolio Certifications
            </h3>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <Dropdown
              className="table-bg-color"
              selected={filter}
              options={options}
              onSelect={(selectedFilter) => setFilter(selectedFilter)}
            />
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Certification
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Name
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Star Score
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Rating Type
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Valid Date
              </th>
            </tr>
          </thead>
        </table>
        <table className="items-center w-full bg-transparent border-collapse">
          <tbody>
            <tr className="w-full overflow-auto">
              <td className="w-full overflow-auto">
                <div
                  className="w-full overflow-auto"
                  style={{ maxHeight: "500px" }}
                >
                  <table className="items-center w-full bg-transparent border-collapse">
                    <tbody className="items-center w-full bg-transparent border-collapse">
                      {filteredData &&
                        filteredData.map((item, index) => (
                          <tr
                            key={index}
                            className="items-center w-full bg-transparent border-collapse"
                          >
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              {item.building}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              {item.certification}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              {item.starValue}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              {item.ratingType}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              {item.certificateValidTo}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioCertification;
