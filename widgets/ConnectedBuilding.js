import React, { useState, useEffect } from "react";
import { getApiDataFromAws } from "../api/dashboardDataService";

const ConnectedBuilding = (props) => {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const fetchData = async (buildingType) => {
      const resp = await getApiDataFromAws(
        "buildingType="+buildingType+"&functionName=verdeosDemoSiteConnected"
      );
      setCartData(resp[0]);
    };

    fetchData(props.menuSelection);
  }, [props.menuSelection]);

  return (
    <>
      {cartData && (
        <div>
          <div className="flex">
            <div className="w-80 text-color-card-header font-medium uppercase">
              Sites Connected
            </div>
            <div className="w-20 ml-auto flex bg-black items-center justify-end">
              <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center"></div>
              <span className="ml-2 text-color-lable-value font-medium">
                {cartData.totalSite}
              </span>
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-80 text-color-lable"></div>
            <div className="w-20 float-left bg-black flex items-center justify-start">
              <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center"></div>
              <span className="ml-2 text-color-lable-value">
                {cartData.totalReadings}
              </span>
            </div>
          </div>
          {cartData.sites.map((site) => (
            <div className="flex" key={site.id}>
              <div className="w-80 text-color-lable">{site.name}</div>
              <div className="w-20 float-right flex items-center justify-start bg-black">
                <div
                  style={{ background: site.color }}
                  className="w-3 h-3 rounded-full flex items-center justify-center"
                ></div>
                <span className="ml-2 text-color-lable-value">
                  {site.readings}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ConnectedBuilding;
