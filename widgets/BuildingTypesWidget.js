import { useEffect, useState } from "react";
import axios from "axios";
import { getApiDataFromAws } from "../api/dashboardDataService";

const BuildingTypesWidget = (props) => {
  const [buildingTypes, setBuildingTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getApiDataFromAws(
        "functionName=verdeosDemoBuildingType"
      );
      setBuildingTypes(resp);
    };

    fetchData();
  }, []);

  const getIconForBuildingType = (buildingType) => {
    return "/buildingTypes/" + buildingType + ".svg";
  };
      
  const getMenuSelectionClass = (name) => {
    return props.menuSelection === name && "menu-Active";
  };

  return (
    <>
      <div className="flex">
        <div className="w-80 txt_sidebar text-[#c5c5c5] uppercase">
          Building Types
        </div>
      </div>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none font-montserrat text-white" style={{marginTop:"15px"}}>
      {buildingTypes && buildingTypes.length > 0 ? (
        buildingTypes.map((type) => (
          <li
            key={type.id}
            className={`flex items-center my-1 ${getMenuSelectionClass(
              type.name
            )}`}
            onClick={(e) => props.updateMenuSelection(type.name)}
          >
            <a
              href="#pablo"
              className="font-bold py-1 flex items-center hover:text-orange-500 "
            >
              <span className="mr-2">
                <img className="h-5"
                  src={getIconForBuildingType(type.name)}
                  
                  alt="Building Icon"
                />
              </span>
              <span className="text-[#c5c5c5] txt_sidebar">{type.name}</span>
            </a>
          </li>
        ))
      ) : (
        <li>No building types available</li>
      )}
      </ul>
      <div className="flex ml-1">
        <div className="w-10">
          <img className="h-5"
            src="/img/circleCheck.png"
            alt="circleCheck"
          />
        </div>
        <div className="w-80 ml-1 mt-1">
          <div className="font-medium text-[#c5c5c5] txt_sidebar">
            Building List Import
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildingTypesWidget;
