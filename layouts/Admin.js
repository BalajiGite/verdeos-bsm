import React, { useState, useEffect  } from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Footer from "components/Footers/Footer.js";
import { MenuSelectionContext } from "../components/PageChange/MenuSelectionContext";
import DashboardPage from "../pages/admin/dashboard";
import Navbar from '../components/Navbars/IndexNavbar';
import { getApiDataFromAws, getDates } from "../api/dashboardDataService";
import { Spin  } from "antd";

export default function Admin({ children }) {
  const [menuSelection, setMenuSelection] = useState("All");
  const [visiblenotification, setVisibleNotification] = useState(true);
  const updateMenuSelection = (menu) => {
    setMenuSelection(menu);
  };
  const [isLoading, setIsLoading] = useState(true);
  const [emissions, setEmissions] = useState("");
  const [energy, setEnergy] = useState("");
  const [water, setWater] = useState("");
  const [sitesConnected, setSitesConnected] = useState("");
  const [connectorFaults, setConnectorFaults] = useState("");
  const [dataQuality, setDataQuality] = useState("");
  const [insights, setInsights] = useState("");
  const [faults, setFaults] = useState("");
  const [overrides, setOverrides] = useState("");

  
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async (buildingType) => {
      const dataResp = await getApiDataFromAws(
        "buildingType=Industrial&functionName=verdeosDataQualityHighlighter"
      );

      if (dataResp !== undefined) {
        setConnectorFaults(dataResp[0].dataConnectorsInFault)
        setDataQuality(dataResp[0].timeSeriesDataQuality)
      }

      const resp = await getApiDataFromAws(
        "buildingType="+buildingType+"&functionName=verdeosDemoSiteConnected"
      );
      if(resp !==undefined){
        const per = (parseFloat(resp[0].totalReadings.split("/")[0])/parseFloat(resp[0].totalReadings.split("/")[1]))*100
        setSitesConnected(per.toFixed(0)+"%");
      }

      if (buildingType != null) {
        const dates = getDates("Last Month");
        const Electrical = await getApiDataFromAws(
          `startDateString=${dates.start}&endDateString=${dates.end}&buildingType=${buildingType}&dataSet=Electrical&functionName=verdeosDemoPortfolioComplianceData&regionDis=All&stateDis=null&horizontalRollup=null&horizontalRollupPassed=null&verticalRollupPassed=null`
        );

        const Water = await getApiDataFromAws(
          `startDateString=${dates.start}&endDateString=${dates.end}&buildingType=${buildingType}&dataSet=Water&functionName=verdeosDemoPortfolioComplianceData&regionDis=All&stateDis=null&horizontalRollup=null&horizontalRollupPassed=null&verticalRollupPassed=null`
        );

        const Insights = await getApiDataFromAws(
          `startDateString=${dates.start}&endDateString=${dates.end}&buildingType=${buildingType}&dataSet=Insights&functionName=verdeosDemoPortfolioComplianceData&regionDis=All&stateDis=null&horizontalRollup=null&horizontalRollupPassed=null&verticalRollupPassed=null`
        );

        const Emissions = await getApiDataFromAws(
          `startDateString=${dates.start}&endDateString=${dates.end}&buildingType=${buildingType}&dataSet=Emissions&functionName=verdeosDemoPortfolioComplianceData&regionDis=All&stateDis=null&horizontalRollup=null&horizontalRollupPassed=null&verticalRollupPassed=null`
        );

        /**const Overrides = await getApiDataFromAws(
          `startDateString=${dates.start}&endDateString=${dates.end}&buildingType=${buildingType}&dataSet=Overrides&functionName=verdeosDemoPortfolioComplianceData&regionDis=All&stateDis=null&horizontalRollup=null&horizontalRollupPassed=null&verticalRollupPassed=null`
        );*/

        const Faults = await getApiDataFromAws(
          `startDateString=${dates.start}&endDateString=${dates.end}&buildingType=${buildingType}&dataSet=Faults&functionName=verdeosDemoPortfolioComplianceData&regionDis=All&stateDis=null&horizontalRollup=null&horizontalRollupPassed=null&verticalRollupPassed=null`
        );

        if (Electrical !== undefined) {
          setEmissions(Emissions[0].tarPerc)
          setEnergy(Electrical[0].tarPerc)
          setWater(Water[0].tarPerc)
          setFaults(Faults[0]?.valTot?.replace(null, ""))
          setIsLoading(false)
        }
        if (Insights !== undefined) {
          setInsights(Insights[0]?.valTot?.replace(null, ""))
        }

      }

      //setOverrides(resp);
    };

    fetchData(menuSelection);
  }, [menuSelection]);

  return (
    <>
      <Navbar />
      <MenuSelectionContext.Provider value={menuSelection}>
        <Sidebar
          updateMenuSelection={updateMenuSelection}
          menuSelection={menuSelection}
        />
        <div className="relative md:ml-64">
          {/** <div className="flex first-letter:items-center border border-gray-300 p-1 mx-14 border-[#8E8E8E] rounded-md mt-5 items-center">
            <img src="/img/ai.png" alt="Description of the image" className="mr-2 h-4 w-4 ml-6" />
            <span className="text-[#C5C5C5] mr-2 font-semibold">Automative Insights:</span>
            <input type="text" placeholder="Type a question about your data" className="text-[#C5C5C5] outline-none focus:outline-none flex-grow bg-transparent" />
            </div>
           */}
          {visiblenotification && (
            <div className="mx-14 mt-5 background-color-linear p-4 border rounded border-[#8E8E8E] relative">
            <Spin spinning={isLoading} size="large" indicator={<img src="/img/loader.gif" style={{ fontSize: 50}} alt="Custom Spin GIF" />}>              
              <div className="absolute top-0 right-0"><img src="/img/close.png" className="h-6 w-6 cursor-pointer" onClick={() => setVisibleNotification(!visiblenotification)} /></div>
                <div className=" justify-between grid grid-cols-2 gap-x-1 mt-1">
                <div className=" bg-[#0A1016] py-1 border border-[#8E8E8E] rounded">
                    <p className="text-[#C5C5C5] py-1 px-3 mb-0">Strategic Improvement Plan Highlights (YTD)</p>
                    <hr className=" border-[#8E8E8E] w-full" />
                    <div className="flex px-4 mt-1 justify-between w-full">
                      <div className="flex-1 flex items-center justify-center border-r border-[#8E8E8E]">
                        <p className="text-[#C5C5C5] px-1 mb-0"> Completed Optimizations <br />
                          <span className="flex items-center">
                            <span style={{ background: "Green" }} className="w-3 h-3 rounded-full flex items-center justify-center"></span>
                            <span className="ml-1 title_text text-[#C5C5C5]">10 (+12% YoY)</span>
                          </span>
                        </p>
                      </div>

                      <div className="flex-1 flex items-center justify-center border-r border-[#8E8E8E]">
                        <p className="text-[#C5C5C5] px-1 mb-0"> Cost Savings Realized<br />
                          <span className="flex items-center">
                            <span style={{ background: "Green" }} className="w-3 h-3 rounded-full flex items-center justify-center"></span>
                            <span className="ml-1 title_text text-[#C5C5C5]">$46k (+6% YoY)</span>
                          </span>
                        </p>
                      </div>

                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-[#C5C5C5] px-1 mb-0">Opportunities In Review<br />
                          <span className="flex items-center">
                            <span className="ml-1 title_text text-[#C5C5C5]">13</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" bg-[#0A1016] py-1 border border-[#8E8E8E] rounded">
                    <p className="text-[#C5C5C5] py-1 px-3 mb-0">Environmental Sustainability Highlights (YTD)</p>

                    <hr className=" border-[#8E8E8E] w-full" />
                    <div className="flex px-4 mt-1 justify-between w-full">
                      <div className="flex-1 flex items-center justify-center border-r border-[#8E8E8E] px-2">
                        <img src="/img/Co2.png" className="h-10 w-10 object-contain" alt="Co2 group" />
                        <p className="text-[#C5C5C5] px-1 mb-0"> 
                          Emissions <br />
                          <span className="flex items-center">
                            <span style={{ background: parseFloat(emissions?.replace("%","")) > 150? "Red": parseFloat(emissions?.replace("%","")) > 100? "Orange":"Green" }} className="w-3 h-3 rounded-full flex items-center justify-center"></span>
                            <span className="ml-1 title_text text-[#C5C5C5]">{emissions}</span>
                          </span>
                        </p>
                      </div>
                      <div className="flex-1 flex items-center justify-center border-r border-[#8E8E8E] px-2">
                        <img src="/img/energy.png" className="h-10 w-10 object-contain" alt="Vector" />
                        <p className="text-[#C5C5C5] px-1 mb-0"> Energy<br />
                          <span className="flex items-center">
                            <span style={{ background: parseFloat(energy?.replace("%","")) > 150? "Red": parseFloat(energy?.replace("%","")) > 100? "Orange":"Green" }} className="w-3 h-3 rounded-full flex items-center justify-center"></span>
                            <span className="ml-1 title_text text-[#C5C5C5]">{energy}</span>

                          </span>
                        </p>
                      </div>

                      <div className="flex-1 flex items-center justify-center px-2">
                        <img src="/img/water.png" className="h-10 w-10 object-contain" alt="Layer" />
                        <p className="text-[#C5C5C5] px-1 mb-0"> Water<br />
                          <span className="flex items-center">
                            <span style={{ background: parseFloat(water?.replace("%","")) > 150? "Red": parseFloat(water?.replace("%","")) > 100? "Orange":"Green" }} className="w-3 h-3 rounded-full flex items-center justify-center"></span>
                            <span className="ml-1 title_text text-[#C5C5C5]">{water}</span>

                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              
              <div className="mt-1 grid grid-cols-2 gap-x-1 ">
                <div className="border border-[#8E8E8E] rounded bg-[#0A1016]">
                  <p className="text-[#C5C5C5] py-1 px-3 mb-0">Data Performance Summary (YTD)</p>
                  <hr className=" border-[#8E8E8E] w-full" />

                  <div className="flex justify-between w-full">
                    <div className="flex flex-1 items-center px-2 py-1 border-r border-[#8E8E8E] justify-center">
                      <img src="/img/sites.png" className="h-10 w-10 object-contain" alt="Sites Connected" />
                      <p className="text-[#C5C5C5] px-1 mb-0">
                        Sites Connected
                        <br />
                        <span className="flex items-center">
                            <span style={{ background: "Green" }} className="w-3 h-3 rounded-full flex items-center justify-center"></span>
                            <span className="ml-1 title_text text-[#C5C5C5]">{sitesConnected}</span>
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-1 items-center px-2 py-1 border-r border-[#8E8E8E] justify-center">
                      <img src="/img/data.png" className="h-10 w-10 object-contain" alt="Data Connector Down" />
                      <p className="text-[#C5C5C5] px-1 mb-0">
                         Connector Faults
                        <br />
                        <span className="flex items-center">
                            <span style={{ background: "Green" }} className="w-3 h-3 rounded-full flex items-center justify-center"></span>
                            <span className="ml-1 title_text text-[#C5C5C5]">{connectorFaults}</span>
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-1 items-center px-2 py-1 justify-center">
                      <img src="/img/dataQuality.png" className="h-10 w-10 object-contain" alt="TimeSeries Data Quality" />
                      <p className="text-[#C5C5C5] px-1 mb-0">
                         Data Quality
                        <br />
                        <span className="flex items-center">
                            <span style={{ background: "Green" }} className="w-3 h-3 rounded-full flex items-center justify-center"></span>
                            <span className="ml-1 title_text text-[#C5C5C5]">{dataQuality}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border border-[#8E8E8E] rounded bg-[#0A1016] ">
                  <p className="text-[#C5C5C5] py-1 px-3 mb-0"> Building Mainteance Summary (YTD)</p>
                  <hr className=" border-[#8E8E8E] w-full" />

                  <div className="flex justify-between w-full">
                    <div className="flex flex-1 items-center px-2 py-1 border-r border-[#8E8E8E] justify-center">
                      <img src="/img/insights.png" className="h-10 w-10 object-contain" alt="Insights" />
                      <p className="text-[#C5C5C5] px-1 mb-0">
                        Insights
                        <br />
                        <span className="flex items-center">
                            <span className="ml-1 title_text text-[#C5C5C5]">{insights}</span>
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-1 items-center px-2 py-1 border-r border-[#8E8E8E] justify-center">
                      <img src="/img/overrides.svg" className="h-10 w-10 object-contain" alt="Overrides" />
                      <p className="text-[#C5C5C5] px-1 mb-0">
                        Overrides
                        <br />
                        <span className="flex items-center">
                            <span className="ml-1 title_text text-[#C5C5C5]">0{/*overrides*/}</span>
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-1 items-center px-2 py-1 justify-center">
                      <img src="/img/fault.png" className="h-10 w-10 object-contain" alt="Faults" />
                      <p className="text-[#C5C5C5] px-1 mb-0">
                        Faults
                        <br />
                        <span className="flex items-center">
                            <span className="ml-1 title_text text-[#C5C5C5]">{faults}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Spin>
          </div>
          )}
          {/* <AdminNavbar /> */}
          {/* Header */}
          <HeaderStats />
          <div className="px-4 md:px-10 mx-auto w-full  -m-30">
            <DashboardPage menuSelection={menuSelection} />
            {/* {children} */}
            {/*<FooterAdmin /> */}
            <Footer />
          </div>
        </div>
      </MenuSelectionContext.Provider>
    </>
  );
}
