import { useEffect, useState } from "react";
import axios from "axios";
import { getApiDataFromAws } from "../api/dashboardDataService";

const BuildingTypesWidget = () => {
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

  return (
    <>
      <div className="flex mb-2">
        <div className="w-80 text-color-card-header font-medium uppercase">
          Buildings
        </div>
      </div>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none font-montserrat text-white">
        {buildingTypes.map((type) => (
          <li key={type.id} className="flex items-center my-1">
            <a
              href="#pablo"
              className="font-bold py-1 flex items-center hover:text-orange-500 "
            >
              <span className="mr-2">
                <img
                  src={getIconForBuildingType(type.name)}
                  className="w-8 h-8"
                  alt="Building Icon"
                />
              </span>
              <span className="text-sm text-color-lable">{type.name}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex ml-1 mt-3">
        <div className="w-20">
          <img
            className="w-8 h-8 mt-2"
            src="/img/circleCheck.png"
            alt="circleCheck"
          />
        </div>
        <div className="w-80 ml-1 mt-2">
          <div className="font-medium text-color-card-header">
            Building List Import
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildingTypesWidget;
