import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdowns/Dropdown.js";
import NabersRatingWidget from "widgets/NabersRatingWidget";
import { getApiDataFromAws } from "../api/dashboardDataService";

const PortfolioCertification = (props) => {
  const [certification, setCertification] = useState([]);
  const [filter, setFilter] = useState("All");

  const [rating, setRating] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("All");

  const [certificationData, setCertificationData] = useState([]);
  const [initialDataFetched, setInitialDataFetched] = useState(false);

  const setInitialData = async () => {
    try {
      const certFilter = await getApiDataFromAws(
        "functionName=verdeosDemoCertification"
      );
      setCertification(certFilter);

      const rateFilter = await getApiDataFromAws(
        "functionName=verdeosDemoRatingType"
      );
      setRating(rateFilter);

      setFilter(certFilter.length > 0 ? certFilter[0].name : "All");
      setRatingFilter(rateFilter.length > 0 ? rateFilter[0].name : "All");

      setInitialDataFetched(true);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const fetchData = async (buildingType, dateSpan, dataSet) => {
    if (initialDataFetched) {
      try {
        const response = await getApiDataFromAws(
          `buildingType=${buildingType}&functionName=verdeosDemoGetAllNabersRatings&ratingType=${ratingFilter}&certification=${filter}`
        );
        setCertificationData(response);
      } catch (error) {
        console.error("Error fetching certification data:", error);
      }
    }
  };

  // Fetch initial data when the component mounts
  useEffect(() => {
    setInitialData();
  }, []);

  // Fetch certification data once initial data has been fetched
  useEffect(() => {
    fetchData(props.buildingType, props.dateSpan, props.dataSet);
  }, [initialDataFetched, filter, ratingFilter, props.buildingType, props.dateSpan, props.dataSet]);

  const filteredData = certificationData.filter(
    (item) => filter === "All" || item.certification === filter
  );

  return (
    <div className="relative flex flex-col min-w-0 break-words text-white energy-usage-intensity-button-bg-color-content w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 pt-4 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="title_text">
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
      <hr className="md:min-w-full custom-divider" />
      <div className="flex flex-wrap ">
        <div className="w-full xl:w-12/12 xl:mb-0 px-4">
          <div className="p-1 w-full">
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
              <th style={{width:"20%", borderColor: "hsla(0, 0%, 56%, 0.3)"}} className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Certification
              </th>
              <th style={{width:"20%", borderColor: "hsla(0, 0%, 56%, 0.3)"}} className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Name
              </th>
              <th style={{width:"20%", borderColor: "hsla(0, 0%, 56%, 0.3)"}} className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Star Score
              </th>
              <th style={{width:"20%", borderColor: "hsla(0, 0%, 56%, 0.3)"}} className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                Rating Type
              </th>
              <th style={{width:"20%", borderColor: "hsla(0, 0%, 56%, 0.3)"}} className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
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
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-center"
                              style={{ fontSize: "14px", width:"20%" }}
                            >
                              {item.building}
                            </td>
                            <td
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-center"
                              style={{ fontSize: "14px", width:"20%"  }}
                            >
                              {item.certification}
                            </td>
                            <td
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-center"
                              style={{ fontSize: "14px", width:"20%"  }}
                            >
                              {item.starValue}
                            </td>
                            <td
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-center"
                              style={{ fontSize: "14px" , width:"20%" }}
                            >
                              {item.ratingType}
                            </td>
                            <td
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-center"
                              style={{ fontSize: "14px" , width:"20%" }}
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
