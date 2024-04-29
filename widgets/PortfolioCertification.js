import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdowns/Dropdown.js"; // Create Dropdown component
import NabersRatingWidget from "widgets/NabersRatingWidget";
import { getApiDataFromAws } from "../api/dashboardDataService";

const PortfolioCertification = (props) => {
  const [certification, setCertification] = useState(null);
  const [filter, setFilter] = useState(null); // Set "All" as the initial filter

  const [rating, setRating] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null); // Set "All" as the initial filter

  const [certificationData, setCertificationData] = useState([]); // State to store the fetched data

  // Function to filter data based on the selected filter
  const filteredData = certificationData?.filter((item) =>
    filter === "All" ? true : item.certification === filter
  );

  const fetchData = async (buildingType, dateSpan, dataSet, isPageLoad) => {
    const resp = await getApiDataFromAws(
      "buildingType=" +
        buildingType +
        "&functionName=verdeosDemoGetAllNabersRatings&ratingType=" +
        ratingFilter +
        "&certification=" +
        filter
    );
    setCertificationData(resp);
  };

  useEffect(() => {
    fetchData(props.buildingType, props.dateSpan, props.dataSet, false);
  }, [props.buildingType, props.dateSpan, props.dataSet, filter, ratingFilter]); // Empty dependency array means this effect will run once when the component mounts

  const setInitialData = async () => {
    const certFilter = await getApiDataFromAws(
      "functionName=verdeosDemoCertification"
    );

    if(certFilter !==undefined){
      setCertification(certFilter);
      setFilter(certFilter[0]?.name);
    }
    
    const rateFilter = await getApiDataFromAws(
      "functionName=verdeosDemoRatingType"
    );

    if(rateFilter !==undefined){
      setRating(rateFilter);
      setRatingFilter(rateFilter[0]?.name);
    }
  };

  useEffect(() => {
    setInitialData();
    fetchData(props.buildingType, props.dateSpan, props.dataSet, true);
  }, []); // Empty dependency array means this effect will run once when the component mounts

  return (
    <div className="relative flex flex-col min-w-0 break-words text-white energy-usage-intensity-button-bg-color-content w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 pt-4 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              Portfolio Certifications
            </h3>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <div className="flex mb-2 justify-end w-full">
              <div className="mr-4">
                <Dropdown
                  className="table-bg-color"
                  selected={ratingFilter}
                  options={rating}
                  onSelect={(selectedFilter) =>
                    setRatingFilter(selectedFilter)
                  }
                />
              </div>
              <div className="mr-4">
                <Dropdown
                  className="table-bg-color"
                  selected={filter}
                  options={certification}
                  onSelect={(selectedFilter) => setFilter(selectedFilter)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="md:min-w-full" />
      <div className="flex flex-wrap ">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <div className="p-1 w-full bg-portfolio-certification">
            <NabersRatingWidget
              buildingType={props.buildingType}
              dateSpan={props.dateSpan}
              dataSet={ratingFilter}
            />
          </div>
          {/**<div className="m-2 mb-8 w-1/2 bg-portfolio-certification">
            <GreenStarRatingWidget
              buildingType={selectedBuildingType}
              dateSpan={selectedDateSpan}
              dataSet={selectedDataSet}
            />
          </div>**/}
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Certification
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Name
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Star Score
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Rating Type
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Valid Date
              </th>
            </tr>
          </thead>
        </table>
        <table className="items-center w-full bg-transparent border-collapse">
          <tbody>
            <tr className="w-full overflow-auto cert-table-body">
              <td className="w-full overflow-auto cert-table-body">
                <div
                  className="w-full overflow-auto cert-table-body"
                  style={{ maxHeight: "500px" }}
                >
                  <table className="items-center w-full bg-transparent border-collapse">
                    <tbody className="items-center w-full bg-transparent border-collapse">
                      {filteredData &&
                        filteredData?.map((item, index) => (
                          <tr
                            key={index}
                            className="items-center w-full bg-transparent border-collapse"
                          >
                            <td
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                              style={{ fontSize: "14px" }}
                            >
                              {item.building}
                            </td>
                            <td
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                              style={{ fontSize: "14px" }}
                            >
                              {item.certification}
                            </td>
                            <td
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                              style={{ fontSize: "14px" }}
                            >
                              {item.starValue}
                            </td>
                            <td
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                              style={{ fontSize: "14px" }}
                            >
                              {item.ratingType}
                            </td>
                            <td
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                              style={{ fontSize: "14px" }}
                            >
                              {item.certificateValidTo}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioCertification;
