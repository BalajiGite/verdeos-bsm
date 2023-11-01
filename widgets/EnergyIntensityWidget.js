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

      const buildingType = await getApiDataFromAws("functionName=verdeosDemoBuildingType");
      setBuildingType(buildingType);
      setSelectedBuildingType(buildingType[0].name);

      const dataSets = await getApiDataFromAws("functionName=verdeosDemoDataSets");
      setDateSet(dataSets);
      setSelectedDataSet(dataSets[0].name);
    };

    fetchData();
  }, []);

  return (
    <div className="p-2 rounded shadow text-white energy-usage-intensity-bg-color-content">
      
      <div className="flex mb-2 justify-end pt-4">
        <div className="mr-4">
          <Dropdown
            className="energy-usage-intensity-button-bg-color"
            selected={selectedBuildingType}
            options={buildingType}
            onSelect={handleBuildingType}
          />
        </div>
        <div className="mr-4">
          <Dropdown
            selected={selectedDataSet}
            options={dateSet}
            onSelect={handleOptionSelect}
          />
        </div>
        <div className="mr-4 pr-4">
          <Dropdown
            selected={selectedDataSet}
            options={dateSet}
            onSelect={handleOptionSelect}
          />
        </div>
      </div>
      <div className="flex justify-start pb-4">
          {portfolioCompliance && (
            <>
              <div className="w-1/6">
                <p className="text-center mr-4 ml-4 font-medium">Sites Connected</p>
                <p className="text-center mr-4 ml-4 text-orange energy-usage-intensity-button-bg p-3 rounded">
                  {portfolioCompliance.sitesConnected}
                </p>
              </div>
              <div className="w-1/6">
                <p className="text-center mr-4 ml-4 font-medium">Site EUI</p>
                <p className="text-center mr-4 ml-4 text-orange energy-usage-intensity-button-bg p-3 rounded">
                <div className="flex items-center">
                  <div style={{ background: portfolioCompliance.siteEuiColor }} className="w-3 h-3 rounded-full flex items-center justify-center"></div>
                  <span className="ml-2">{portfolioCompliance.siteEUI}</span>
                </div>                 
                </p>
              </div>
              <div className="w-1/6">
                <p className="text-center mr-4 ml-4 font-medium">Source EUI</p>
                <p className="text-center mr-4 ml-4 text-orange energy-usage-intensity-button-bg p-3 rounded">
                  <div className="flex items-center">
                    <div style={{ background: portfolioCompliance.sourceEuiColor }} className="w-3 h-3 rounded-full flex items-center justify-center"></div>
                    <span className="ml-2">{portfolioCompliance.sourceEui}</span>
                  </div>    
                </p>
              </div>
              <div className="w-1/6">
                <p className="text-center mr-4 ml-4 font-medium">Trend</p>
                <p className="text-center mr-4 ml-4 text-orange energy-usage-intensity-button-bg p-3 rounded">
                  {portfolioCompliance.trend}
                </p>
              </div>
              <div className="w-1/6">
                <p className="text-center font-medium">trendType</p>
                <p className="text-center mr-4 ml-4 text-orange energy-usage-intensity-button-bg p-3 rounded">
                  {portfolioCompliance.trendType}
                </p>
              </div>
            </>
          )}
        </div>

    </div>
  );
};

export default EnergyIntensityWidget;
