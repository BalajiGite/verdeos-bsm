import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp,faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {
  getPortfolioComplianceDemo,
  getApiDataFromAws,
} from "../api/dashboardDataService";
import Dropdown from "../components/Dropdowns/Dropdown.js"; // Create Dropdown component

const EnergyIntensityWidget = (props) => {
  const [portfolioCompliance, setPortfolioCompliance] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
     
    };

    fetchData();
  }, []);

  return (
    <div className="p-2 rounded shadow text-white energy-usage-intensity-button-bg-color-content">
      {/**<div className="flex w-full">
        <div className="flex justify-start w-full">
          <div>
            <div className="flex">
              <span className="text-color-card-header border-b border-slate-500 text-sm p-1 energy-usage-intensity-button-bg-color border border-slate-500 energy-usage-intensity-tab">
                Energy Usage Intensity
              </span>
              <span className="flex">
                <img
                  alt="user"
                  className="w-8 h-8"
                  style={{ marginTop: "-11px" }}
                  src="/img/warehouse.png"
                />
                <span className="text-color-card-header ml-4 text-sm p-1 energy-usage-intensity-tab">
                  Warehouse(48 - 236)
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>**/}

      <div className="flex justify-start">
        {props.data && (
          <>
            <table>
              <tbody>
                <tr>
                  <td className="text-center font-medium mr-4 ml-4">{props.data.tarTitle}</td>
                  <td className="text-center font-medium mr-4 ml-4">YoY Trend</td>                 
                </tr>
                <tr>
                  <td>
                    <p className="text-center mr-4 ml-4 energy-usage-intensity-button-bg p-3 w-30 rounded flex">
                      <span
                        style={{ background: props.data.tarColor }}
                        className="w-3 h-3 rounded-full mt-1 flex items-center justify-center"
                      ></span>
                      <span className="flex items-center justify-center ml-2">
                        {props.data.valTot}
                      </span>
                    </p>
                  </td>
                  <td>
                    <p className="text-center mr-4 ml-4 energy-usage-intensity-button-bg p-3 w-30 rounded flex">
                      <span
                        style={{ background: props.data.tarColor }}
                        className="w-3 h-3 rounded-full mt-1 flex items-center justify-center"
                      ></span>
                      <span className="flex items-center justify-center ml-2">
                        {props.data.tarPerc}
                      </span>
                    </p>
                  </td>
                 
                  <td>
                    <div className="text-center mr-4 ml-4 energy-usage-intensity-button-bg p-3 w-30 rounded" >
                     {props.data.arrowIndex == 1? <div><FontAwesomeIcon icon={faCaretUp} size="xl" style={{color: props.data.tarColor, margin: "0"}} /></div>
                      :<div><FontAwesomeIcon icon={faCaretDown} size="xl" style={{color: props.data.tarColor,  margin: "0"}}/></div>
                      }
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default EnergyIntensityWidget;
