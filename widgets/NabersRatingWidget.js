import React, { useState, useEffect } from "react";
import { getDates,getApiDataFromAws } from "../api/dashboardDataService";

const NabersRatingWidget = (props) => {
  const [nabersRatings, setNabersRatings] = useState(null);

  const fetchData = async (buildingType, dateSpan, dataSet) => {
    const dates = getDates(dateSpan)
    const resp = await getApiDataFromAws(
      "buildingType="+buildingType+
      "&functionName=verdeosDemoTotalPropertiesByNABERSRating&ratingType=Energy&certification=NABERS"
    );
    setNabersRatings(resp && resp[0]);
  };

  useEffect(() => {
    fetchData(props.buildingType, props.dateSpan, props.dataSet);
  }, [props.buildingType, props.dateSpan, props.dataSet]);

  let count = -0.5;
  return (
    <div className="flex">
      <div className="text-color-card-header p-4 mt-2 rounded shadow w-60">
        <img src="/energy/nabers.png" alt="NABERS Ratings" className="h-20" />
      </div>
      <div className="w-full text-color-card-header p-4 rounded shadow" style={{ overflowX: "auto" }}>
        <div className="justify-between text-color-lable">
          <table className="w-full">
            <thead>
              <tr>
                {nabersRatings &&
                  Object.entries(nabersRatings).map(
                    ([rating, propertyCount], index) => (
                      <th key={index} style={{ position: "relative" }}>
                        <img
                          src="/energy/star.png"
                          alt="NABERS Ratings"
                          className="h-14"
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "54%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "black",
                            fontSize: "0.8rem",
                          }}
                        >
                          {(count = count + 0.5)}
                        </span>
                      </th>
                    )
                  )}
              </tr>
            </thead>
            <tbody>
              <tr>
                {nabersRatings &&
                  Object.entries(nabersRatings).map(
                    ([rating, propertyCount], index) => (
                      <td key={index}>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {propertyCount}
                        </p>
                      </td>
                    )
                  )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NabersRatingWidget;
