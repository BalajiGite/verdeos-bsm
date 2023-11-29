import React, { useState, useEffect } from "react";
import { getDates,getApiDataFromAws } from "../api/dashboardDataService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
      <div className="text-color-card-header p-4 mt-4 rounded shadow w-80">
        <img src="/energy/nabers.png" alt="NABERS Ratings"  />
      </div>
      <div className="w-full text-color-card-header p-4 rounded shadow" style={{ overflowX: "auto" }}>
        <div className="justify-between text-color-lable">
          <table className="w-full">
            <thead>
              <tr>
                {nabersRatings && 
                  <>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.zeroColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {0}
                      </span>
                    </th>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.zerofiveColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {0.5}
                      </span>
                    </th>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.oneColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {1}
                      </span>
                    </th>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.onehalfColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {1.5}
                      </span>
                    </th>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.twoColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {2}
                      </span>
                    </th>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.twofiveColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {2.5}
                      </span>
                    </th>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.threeColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {3}
                      </span>
                    </th>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.threefiveColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {3.5}
                      </span>
                    </th>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.fourColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {4}
                      </span>
                    </th>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.fourfiveColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {4.5}
                      </span>
                    </th>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.fiveColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {5}
                      </span>
                    </th>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.fivefiveColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {5.5}
                      </span>
                    </th>
                    <th style={{ position: "relative" }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: nabersRatings.sixColor, fontSize: "70px" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "54%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "0.8rem",
                        }}
                      >
                        {6}
                      </span>
                    </th>
                  </>
                
               }
              </tr>
            </thead>
            <tbody>
              <tr>
                {nabersRatings &&
                  <>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.zero}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.zerofive}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.one}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.onehalf}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.two}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.twofive}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.three}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.threefive}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.four}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.fourfive}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.five}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.fivefive}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white text-center">
                          {nabersRatings.six}
                        </p>
                      </td>
                    </>
                  }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NabersRatingWidget;
