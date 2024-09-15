import React, { useEffect, useState, useContext , createContext} from "react";
// components
import EnergyUsageIntensity from "widgets/EnergyUsageIntensity.js";
import PortfolioCertification from "widgets/PortfolioCertification.js";
import NabersRatingWidget from "widgets/NabersRatingWidget";
import GreenStarRatingWidget from "widgets/GreenStarRatingWidget";
import PortfolioPerformanceChart from "widgets/PortfolioPerformanceChart.js";
import MapExample from "components/Maps/PortfolioMap";
import GoogleMap from "components/Maps/GoogleMap.js";
import Dropdown from "../../components/Dropdowns/Dropdown";
import { MenuSelectionContext } from "../../components/PageChange/MenuSelectionContext";
import Airtable from "../../components/Airtable_Gegroup_demo/airtable_interface";
export const UserContext = createContext(false);

import {
  getApiDataFromAws,
  getApiDataFromAwsDemo,
} from "../../api/dashboardDataService";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
export default function Dashboard(props) {
  const router = useRouter();
  const [dateSet, setDateSet] = useState([]);
  const [dateSpan, setDateSpan] = useState([]);
  const [buildingType, setBuildingType] = useState([]);
  const [selectedDataSet, setSelectedDataSet] = useState([]);
  const [selectedDateSpan, setSelectedDateSpan] = useState([]);
  const [selectedBuildingType, setSelectedBuildingType] = useState([]);
  const menuSelection = useContext(MenuSelectionContext);

  let popup = useContext(UserContext)
  const [open, setOpen] = useState(false);
  const fetchDataInitial = async () => {
    const buildingTypeJson = await getApiDataFromAws("functionName=verdeosDemoBuildingType");
    if (buildingTypeJson !== undefined) {
      if (buildingType.length === 0) {
        setBuildingType(buildingTypeJson);
        setSelectedBuildingType(buildingTypeJson[0].name);
      }
    }

    const dataSets = await getApiDataFromAws("functionName=verdeosDemoDataSets");
    if (dataSets !== undefined) {
      if (dateSet.length === 0) {
        setDateSet(dataSets);
        setSelectedDataSet(dataSets[0].name);
      }
    }

    const dateSpans = await getApiDataFromAwsDemo("21");
    if (dateSpans !== undefined) {
      if (dateSpan.length === 0) {
        setDateSpan(dateSpans);
        setSelectedDateSpan(dateSpans[4].name);
      }
    }
  };


  useEffect(() => {
    const isAuthenticated = !!Cookies.get("auth");
    if (!isAuthenticated) {
      router.push("/");
    } else {
      if (selectedBuildingType.length == 0 && selectedDateSpan.length == 0 && selectedDataSet.length == 0) {
        fetchDataInitial();
      }
    }
  }, []);

  useEffect(() => {
    setSelectedBuildingType(menuSelection);
  }, [menuSelection]);

  const handleOptionSelect = (option) => {
    if (option !== selectedDataSet) {
      setSelectedDataSet(option);
    }
  };

  const handleBuildingType = (option) => {
    if (option !== selectedBuildingType) {
      setSelectedBuildingType(option);
    }
  };

  const handleDateSpan = (option) => {
    if (option !== selectedDateSpan) {
      setSelectedDateSpan(option);
    }
  };
  
  return (
    <>
    <UserContext.Provider value={{open , setOpen}}>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <div className="flex mb-2 justify-start ">
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

      {selectedDataSet && selectedDataSet.length > 0 && !(selectedDataSet == "Faults" || selectedDataSet == "Insights" || selectedDataSet == "Overrides") && (
        <div className="flex flex-wrap mt-5">
          <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
            {selectedBuildingType && selectedBuildingType.length > 0 && selectedBuildingType === menuSelection &&
              selectedDateSpan && selectedDateSpan.length > 0 ? (
              <EnergyUsageIntensity
                buildingType={selectedBuildingType}
                dateSpan={selectedDateSpan}
                dataSet={selectedDataSet}
              />
            ) : (
              <p>No data available or loading...</p>
            )}
          </div>
        </div>
      )}


      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          {selectedBuildingType && (selectedBuildingType.length > 0 && selectedBuildingType == menuSelection) &&
            selectedDateSpan && selectedDateSpan.length > 0 &&
            selectedDataSet && selectedDataSet.length > 0 ? (
            <PortfolioPerformanceChart
              buildingType={selectedBuildingType}
              dateSpan={selectedDateSpan}
              dataSet={selectedDataSet}
              setOpen={setOpen}
            />
          ) : (
            <p>Loading data...</p> // or some other fallback content
          )}
        </div>
      </div>

      {/**<hr className="my-4 md:min-w-full" />
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <div className="p-1 w-full bg-portfolio-certification">
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
      </div> **/}

      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <div className="p-1 w-full">
            {selectedBuildingType && (selectedBuildingType.length > 0 && selectedBuildingType == menuSelection) &&
              selectedDateSpan && selectedDateSpan.length > 0 &&
              selectedDataSet && selectedDataSet.length > 0 ? (
              <PortfolioCertification
                buildingType={selectedBuildingType}
                dateSpan={selectedDateSpan}
                dataSet={selectedDataSet}
              />) : (
              <p>Loading data...</p> // or some other fallback content
            )}
          </div>
        </div>
      </div>

      <hr className="my-4 md:min-w-full" />
      {open &&  <Airtable/>}
      </UserContext.Provider>
    </>
  );
}
