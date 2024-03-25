import React from "react";
import Link from "next/link";
// components
import { useState, useEffect } from "react";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import Dropdown from "../../components/Dropdowns/Dropdown";
import { MenuSelectionContext } from "../../components/PageChange/MenuSelectionContext";
import {getApiDataFromAws} from "../../api/dashboardDataService";
export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [selectedDataSet, setSelectedDataSet] = useState(null);
  const [dateSet, setDateSet] = useState(null);

  const fetchDataInitial = async () => {
    // const buildingTypeJson = await getApiDataFromAws(
    //   "functionName=verdeosDemoBuildingType"
    // );
    // setBuildingType(buildingTypeJson);
    // setSelectedBuildingType(buildingTypeJson[0].name);

    // const dateSpan = await getApiDataFromAwsDemo("21");
    // setDateSpan(dateSpan);
    // setSelectedDateSpan(dateSpan[4].name);

    const dataSets = await getApiDataFromAws(
      "functionName=verdeosDemoDataSets"
    );
    setDateSet(dataSets);
    setSelectedDataSet(dataSets[0].name);
  };

  useEffect(() => {
    fetchDataInitial();
  }, []);
  const handleOptionSelect = (option) => {
    setSelectedDataSet(option);
  };

  return (
    <>
      <nav className="top-0 sticky  z-50 w-full flex relative flex-wrap items-center justify-between px-6 py-3 navbar-expand-lg custom-bg-color box-shadow ">
        {/* {brand} */}
        <Link href="/">
          <a
            href="#pablo"
            className="md:block text-left text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold px-0"
          >
            <img
              alt="..."
              className="w-44 h-12 rounded-full align-middle border-none"
              src="/img/VerdeOS Logo.png"
            ></img>
          </a>
        </Link>
        <Dropdown
          selected={selectedDataSet}
          options={dateSet}
          onSelect={handleOptionSelect}
        />            <div className="flex">
          <section className="mr-3">
            <img src="./img/notification.png" alt="notification png" />
          </section>
          <section>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" style={{ cursor: 'pointer', width: "auto", height: "30px" }}>
              <circle cx="20" cy="20" r="20" fill="#1B2228" />
              <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle" fontSize="14" fill="#fff">{ }</text>
            </svg>
          </section>

        </div>
      </nav>
    </>
  );
}
