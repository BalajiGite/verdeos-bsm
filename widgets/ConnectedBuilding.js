import React, { useState, useEffect } from "react";
import { getApiDataFromAws } from "../api/dashboardDataService";

const ConnectedBuilding = (props) => {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const fetchData = async (buildingType) => {
      const resp = await getApiDataFromAws(
        "buildingType="+buildingType+"&functionName=verdeosDemoSiteConnected"
      );
      if(resp !==undefined){
        setCartData(resp[0]);
      }
    };

    fetchData(props.menuSelection);
  }, [props.menuSelection]);

  return (
    <>
      {cartData &&  (
        <div>
          <div className="flex">
            <div className="w-80 text-color-card-header font-medium uppercase">
              Sites Connected
            </div>
            <div className="w-20 ml-auto flex bg-black items-center justify-end">
              <div className="w-3 h-3 rounded-full flex items-center justify-center"  style={{ background: cartData.color }}></div>
              <span className="ml-2 text-color-lable-value font-medium">
                {cartData.totalSite}
              </span>
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-80 text-color-card-header font-medium uppercase" style={{fontSize:"14px"}}>
               Data Sources Connected
            </div>
          </div>  

          {cartData.sites.map((site) => (
            <div className="flex" key={site.id}>
              <div className="w-80 text-color-lable">{site.name}</div>
              <div className="float-right flex items-center justify-start bg-black" style={{width:"11rem"}}>
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
          <div className="flex mb-4">
            <div className="w-80 text-color-lable">Total</div>
            <div className="float-left bg-black flex items-center justify-start" style={{width:"11rem"}}>
              <div className="w-3 h-3  rounded-full flex items-center justify-center"  style={{ background: cartData.color }}></div>
              <span className="ml-2 text-color-lable-value">
                {cartData.totalReadings}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectedBuilding;
