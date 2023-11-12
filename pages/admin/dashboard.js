import React, { useEffect, useState, useContext } from "react";

// components

import EnergyUsageIntensity from "widgets/EnergyUsageIntensity.js";
import PortfolioCertification from "widgets/PortfolioCertification.js";
import NabersRatingWidget from "widgets/NabersRatingWidget";
import GreenStarRatingWidget from "widgets/GreenStarRatingWidget";
import PortfolioPerformanceChart from "widgets/PortfolioPerformanceChart.js";
import MapExample from "components/Maps/PortfolioMap";
import GoogleMap from "components/Maps/GoogleMap.js";
import Dropdown from "../../components/Dropdowns/Dropdown";
import { MenuSelectionContext } from "../MenuSelectionContext";
import {
  getApiDataFromAws,
  getApiDataFromAwsDemo,
} from "../../api/dashboardDataService";

export default function Dashboard(props) {
  const [dateSet, setDateSet] = useState(null);
  const [dateSpan, setDateSpan] = useState(null);
  const [buildingType, setBuildingType] = useState(null);
  const [selectedDataSet, setSelectedDataSet] = useState(null);
  const [selectedDateSpan, setSelectedDateSpan] = useState(null);
  const [selectedBuildingType, setSelectedBuildingType] = useState(null);
  const menuSelection = useContext(MenuSelectionContext);

  const fetchDataInitial = async () => {
    const buildingTypeJson = await getApiDataFromAws(
      "functionName=verdeosDemoBuildingType"
    );
    setBuildingType(buildingTypeJson);
    setSelectedBuildingType(buildingTypeJson[0].name);

    const dateSpan = await getApiDataFromAwsDemo("21");
    setDateSpan(dateSpan);
    setSelectedDateSpan(dateSpan[0].name);

    const dataSets = await getApiDataFromAws(
      "functionName=verdeosDemoDataSets"
    );
    setDateSet(dataSets);
    setSelectedDataSet(dataSets[0].name);
  };

  useEffect(() => {
    fetchDataInitial();
  }, []);
  useEffect(() => {
    setSelectedBuildingType(props.menuSelection);
  }, [props.menuSelection]);

  const handleOptionSelect = (option) => {
    setSelectedDataSet(option);
  };

  const handleBuildingType = (option) => {
    setSelectedBuildingType(option);
  };

  const handleDateSpan = (option) => {
    setSelectedDateSpan(option);
  };
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <div className="flex mb-2 justify-end pt-4">
            <div className="mr-4 hidden">
              <Dropdown
                className="energy-usage-intensity-button-bg-color"
                selected={selectedBuildingType}
                options={buildingType}
                onSelect={handleBuildingType}
              />
            </div>
            <div className="mr-4">
              <Dropdown
                selected={selectedDateSpan}
                options={dateSpan}
                onSelect={handleDateSpan}
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
          <MapExample
            buildingType={selectedBuildingType}
            dateSpan={selectedDateSpan}
            dataSet={selectedDataSet}
          />
        </div>
      </div>
      <hr className="my-4 md:min-w-full" />

      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <EnergyUsageIntensity
            buildingType={selectedBuildingType}
            dateSpan={selectedDateSpan}
            dataSet={selectedDataSet}
          />
        </div>
      </div>
      <hr className="my-4 md:min-w-full" />
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <PortfolioPerformanceChart
            buildingType={selectedBuildingType}
            dateSpan={selectedDateSpan}
            dataSet={selectedDataSet}
          />
        </div>
      </div>

      <hr className="my-4 md:min-w-full" />
      <div className="flex flex-wrap mt-4">
        <div className="p-1 w-full flex">
          <div className="m-2 mb-8 w-1/2 bg-portfolio-certification">
            <NabersRatingWidget
              buildingType={selectedBuildingType}
              dateSpan={selectedDateSpan}
              dataSet={selectedDataSet}
            />
          </div>
          <div className="m-2 mb-8 w-1/2 bg-portfolio-certification">
            <GreenStarRatingWidget
              buildingType={selectedBuildingType}
              dateSpan={selectedDateSpan}
              dataSet={selectedDataSet}
            />
          </div>
        </div>
      </div>

      <hr className="my-4 md:min-w-full" />
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <div className="p-1 w-full">
            <PortfolioCertification
              buildingType={selectedBuildingType}
              dateSpan={selectedDateSpan}
              dataSet={selectedDataSet}
            />
          </div>
        </div>
      </div>

      <hr className="my-4 md:min-w-full" />
    </>
  );
}
