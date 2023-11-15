import React, { useState, useEffect } from "react";
import {
  getPortfolioComplianceDemo,
  getApiDataFromAws,
} from "../api/dashboardDataService";
import Dropdown from "../components/Dropdowns/Dropdown.js"; // Create Dropdown component

const EnergyIntensityWidget = () => {
  const [portfolioCompliance, setPortfolioCompliance] = useState(null);
  const [dateSet, setDateSet] = useState(null);
  const [selectedDataSet, setSelectedDataSet] = useState(null);

  const [buildingType, setBuildingType] = useState(null);
  const [selectedBuildingType, setSelectedBuildingType] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedDataSet(option);
  };

  const handleBuildingType = (option) => {
    setSelectedBuildingType(option);
  };

  useEffect(() => {
    const fetchData = async () => {
      const portfolioCompliance = await getPortfolioComplianceDemo(9);
      setPortfolioCompliance(portfolioCompliance);

      const buildingType = await getApiDataFromAws(
        "functionName=verdeosDemoBuildingType"
      );
      setBuildingType(buildingType);
      setSelectedBuildingType(buildingType[0].name);

      const dataSets = await getApiDataFromAws(
        "functionName=verdeosDemoDataSets"
      );
      setDateSet(dataSets);
      setSelectedDataSet(dataSets[0].name);
    };

    fetchData();
  }, []);

  return (
    <div className="p-2 rounded shadow text-white energy-usage-intensity-button-bg-color-content">
      <div className="flex w-full">
        <div className="flex justify-start w-full">
          <div>
            <div className="flex">
              <span className="text-color-card-header border-b border-slate-500 text-sm p-1 energy-usage-intensity-button-bg-color border border-slate-500 energy-usage-intensity-tab">
                Energy Usage Intensity
              </span>
              <span className="flex">
                <img
                  alt="user"
                  className="w-8 h-8"
                  style={{ marginTop: "-11px" }}
                  src="/img/warehouse.png"
                />
                <span className="text-color-card-header ml-4 text-sm p-1 energy-usage-intensity-tab">
                  Warehouse(48 - 236)
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        {portfolioCompliance && (
          <>
            <table>
              <tbody>
                <tr>
                  <td className="text-center font-medium">Sites Connected</td>
                  <td className="text-center font-medium">Site EUI</td>
                  <td className="text-center font-medium">Trend</td>
                 
                </tr>
                <tr>
                  <td>
                    <p className="text-center mr-4 ml-4 energy-usage-intensity-button-bg p-3 w-30 rounded flex">
                      <span
                        style={{ background: portfolioCompliance.siteEuiColor }}
                        className="w-3 h-3 rounded-full mt-1 flex items-center justify-center"
                      ></span>
                      <span className="flex items-center justify-center ml-2">
                        {portfolioCompliance.sitesConnected}
                      </span>
                    </p>
                  </td>
                  <td>
                    <p className="text-center mr-4 ml-4 energy-usage-intensity-button-bg p-3 w-30 rounded flex">
                      <span
                        style={{ background: portfolioCompliance.siteEuiColor }}
                        className="w-3 h-3 rounded-full mt-1 flex items-center justify-center"
                      ></span>
                      <span className="flex items-center justify-center ml-2">
                        {portfolioCompliance.sitesConnected}
                      </span>
                    </p>
                  </td>
                  <td>
                    <p className="text-center mr-4 ml-4 energy-usage-intensity-button-bg p-3 w-30 rounded flex">
                      <span
                        style={{ background: portfolioCompliance.siteEuiColor }}
                        className="w-3 h-3 rounded-full mt-1 flex items-center justify-center"
                      ></span>
                      <span className="flex items-center justify-center ml-2">
                        {portfolioCompliance.trend}
                      </span>
                    </p>
                  </td>
                 
                  <td>
                    <div className="text-center mr-4 ml-4 energy-usage-intensity-button-bg p-3 w-30 rounded">
                      <img
                        alt="Polygon2"
                        className="w-3 h-3"
                        src="/img/Polygon3.png"
                      />
                      <img
                        alt="Polygon3"
                        className="w-3 h-3"
                        src="/img/Polygon2.png"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default EnergyIntensityWidget;
