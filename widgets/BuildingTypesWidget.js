import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    getBuildingTypeDemo
  } from "../api/dashboardDataService"; 

const BuildingTypesWidget = () => {
  const [buildingTypes, setBuildingTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const resp = await getBuildingTypeDemo(2);
        setBuildingTypes(resp); 
      };
  
      fetchData();
  }, []);

  const getIconForBuildingType = (buildingType) => {
    switch (buildingType.toLowerCase()) {
      case 'warehouse':
        return '/buildingTypes/warehouse.svg';
      default:
        return '/default-icon.svg'; // Change this to a default icon or provide an empty string for no icon
    }
  };

  return (
    <ul className="md:flex-col md:min-w-full flex flex-col list-none font-montserrat">
        {buildingTypes.map(type => (
            <li key={type.id} className="flex items-center my-1">
            <a
                href="#pablo"
                className="text-xs font-bold py-2 flex items-center text-blueGray-700 hover:text-blueGray-500"
            >
                <span className="w-5 h-5 mr-2">
                <img
                    src={getIconForBuildingType(type.name)}
                    alt="Building Icon"
                    style={{ width: '25px', height: '25px', flexShrink: 0 }}
                />
                </span>
                <span>{type.name}</span>
            </a>
            </li>
        ))}
    </ul>
  );
};

export default BuildingTypesWidget;
