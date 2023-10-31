import { useEffect, useState } from "react";
import axios from "axios";
import { getApiDataFromAws } from "../api/dashboardDataService";

const BuildingTypesWidget = () => {
  const [buildingTypes, setBuildingTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getApiDataFromAws("functionName=verdeosDemoBuildingType");
      setBuildingTypes(resp);
    };

    fetchData();
  }, []);

  const getIconForBuildingType = (buildingType) => {
    switch (buildingType.toLowerCase()) {
      case "warehouse":
        return "/buildingTypes/warehouse.svg";
      default:
        return "/buildingTypes/warehouse.svg"; // Change this to a default icon or provide an empty string for no icon
    }
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
              className="font-bold py-2 flex items-center hover:text-orange-500 "
            >
              <span className="w-6 h-6 mr-2">
                <img
                  src={getIconForBuildingType(type.name)}
                  alt="Building Icon"
                  style={{ width: "25px", height: "25px", flexShrink: 0 }}
                />
              </span>
              <span className="text-sm text-color-lable">{type.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BuildingTypesWidget;
