import React, { useState, useEffect } from "react";
import axios from "axios";

import { getApiDataFromAws } from "../api/dashboardDataService";
import { auto } from "@popperjs/core";

const NabersRatingWidget = (props) => {
  const [nabersRatings, setNabersRatings] = useState(null);

  const fetchData = async (buildingType, dateSpan, dataSet) => {
    //alert("called from NABERS:" + buildingType + " " + dateSpan + " " + dataSet);
    const resp = await getApiDataFromAws(
      "buildingType=Hotel&functionName=verdeosDemoTotalPropertiesByNABERSRating&ratingType=Energy&certification=NABERS"
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
      <div
        className="text-color-card-header p-4 rounded shadow"
        style={{ overflowX: "auto" }}
      >
        <div className="flex justify-between text-color-lable">
          <table>
            <thead>
              <tr>
                {nabersRatings &&
                  Object.entries(nabersRatings).map(
                    ([rating, propertyCount], index) => (
                      <th key={index} style={{ position: "relative" }}>
                        <img
                          src="/energy/star.png"
                          alt="NABERS Ratings"
                          className="h-10"
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "54%",
                            left: "34%",
                            transform: "translate(-50%, -50%)",
                            color: "black",
                            fontSize: "0.5rem",
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
                        <p className="pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white">
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
