import React, { useState, useEffect } from "react";
import {
  getPortfolioComplianceDemo,
  getDataSetsDemo,
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

      const buildingType = await getDataSetsDemo(2);
      setBuildingType(buildingType);
      setSelectedBuildingType(buildingType[0].name);

      const dataSets = await getDataSetsDemo(7);
      setDateSet(dataSets);
      setSelectedDataSet(dataSets[0].name);
    };

    fetchData();
  }, []);

  return (
    <div className="p-2 rounded shadow text-white energy-usage-intensity-button-bg-color-content">
      <div className="flex mb-2 justify-end">
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
        <div>
          <Dropdown
            selected={selectedDataSet}
            options={dateSet}
            onSelect={handleOptionSelect}
          />
        </div>
      </div>
      <div className="flex justify-between">
        {portfolioCompliance &&
          Object.entries(portfolioCompliance).map(([key, value]) => (
            <div key={key} className="w-1/6 ">
              <p className="text-center font-medium">{key}</p>
              <p
                className={`text-center text-${
                  portfolioCompliance[`${key}Color`]
                } energy-usage-intensity-button-bg p-3 rounded`}
              >
                {value}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EnergyIntensityWidget;
