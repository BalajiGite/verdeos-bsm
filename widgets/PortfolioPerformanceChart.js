import React, { useState, useEffect } from "react";
import PortfolioPerformance from "./PortfolioPerformance";

import { getApiDataFromAws, getDates } from "../api/dashboardDataService";

const PortfolioPerformanceChart = (props) => {
  const [energyUsageBySite, setEnergyUsageBySite] = useState([]);
  const [carbonEmmisionBySite, setCarbonEmmisionBySite] = useState([]);
  const [waterUsgaeBySite, setWaterUsgaeBySite] = useState([]);
  const [totalAlarmsBySite, setTotalAlarmsBySite] = useState([]);
  const [totalBreakdownBySite, setTotalBreakdownBySite] = useState([]);
  const [totalovveridesBySite, setTotalovveridesBySite] = useState([]);

  const fetchData = async (buildingType, dateSpan, dataSet) => {
    if (buildingType != null && dateSpan != null) {
      //alert("called from Portfolio Performance:" + buildingType + " " + dateSpan + " " + dataSet);
      const dates = getDates(dateSpan);
      const resp = await getApiDataFromAws(
        "startDateString=" +
          dates.start +
          "&endDateString=" +
          dates.end +
          "&buildingType=" +
          buildingType +
          "&dataSet=Electrical&functionName=verdeosDemoPortfolioPerformance"
      );
      setEnergyUsageBySite(resp);

      const carbonEmmision = await getApiDataFromAws(
        "startDateString=" +
          dates.start +
          "&endDateString=" +
          dates.end +
          "&buildingType=" +
          buildingType +
          "&dataSet=Emissions&functionName=verdeosDemoPortfolioPerformance"
      );
      setCarbonEmmisionBySite(carbonEmmision);

      const water = await getApiDataFromAws(
        "startDateString=" +
          dates.start +
          "&endDateString=" +
          dates.end +
          "&buildingType=" +
          buildingType +
          "&dataSet=Water&functionName=verdeosDemoPortfolioPerformance"
      );
      setWaterUsgaeBySite(water);

      const alarm = await getApiDataFromAws(
        "startDateString=" +
          dates.start +
          "&endDateString=" +
          dates.end +
          "&buildingType=" +
          buildingType +
          "&dataSet=Faults&functionName=verdeosDemoPortfolioPerformance"
      );
      setTotalAlarmsBySite(alarm);

      const ovverides = await getApiDataFromAws(
        "startDateString=" +
          dates.start +
          "&endDateString=" +
          dates.end +
          "&buildingType=" +
          buildingType +
          "&dataSet=Overrides&functionName=verdeosDemoPortfolioPerformance"
      );
      setTotalovveridesBySite(ovverides);

      const breakdown = await getApiDataFromAws(
        "startDateString=" +
          dates.start +
          "&endDateString=" +
          dates.end +
          "&buildingType=" +
          buildingType +
          "&dataSet=Insights&functionName=verdeosDemoPortfolioPerformance"
      );
      setTotalBreakdownBySite(breakdown);

    }
  };

  useEffect(() => {
    fetchData(props.buildingType, props.dateSpan, props.dataSet);
  }, [props.buildingType, props.dateSpan, props.dataSet]);

  return (
    <>
      <div className="text-color-card-header font-medium uppercase">
        Portfolio Performance
      </div>
      <div className="mt-3">
        <div className="border-b border-slate-500 mb-1 flex">
          <span className="text-color-card-header text-sm p-3 border bg-slate-600 border-slate-500">
            Performance
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="w-full sm:w-1/2 md:w-4/12 lg:w-4/12 xl:w-1/3 p-1">
          <div className="rounded-lg shadow-lg">
            {energyUsageBySite.length > 0 && (
              <div className="p-1 rounded border border-4 chart-border-color">
                <div className="p-1">
                  <div className="text-color-card-header font-medium">
                    Energy Usage
                  </div>
                  <div className="text-color-card-header text-sm">
                    Top 10 Total Building Energy Usage by Site
                  </div>
                </div>
                <PortfolioPerformance data={energyUsageBySite} />
              </div>
            )}
            <div className="float-right">
              <span className="text-color-lable text-xs uppercase rounded chart-button-color p-4">
                Share My Report
              </span>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-4/12 lg:w-4/12 xl:w-1/3 p-1">
          <div className="rounded-lg shadow-lg">
            {carbonEmmisionBySite.length > 0 && (
              <div className="p-1 p-1 rounded border border-4 chart-border-color">
                <div className="p-1">
                  <div className="text-color-card-header font-medium">
                    Carbon Emission
                  </div>
                  <div className="text-color-card-header text-sm">
                    Top 10 Total Building Emission by Site
                  </div>
                </div>
                <PortfolioPerformance data={carbonEmmisionBySite} />
              </div>
            )}
            <div className="float-right">
              <span className="text-color-lable text-xs uppercase rounded chart-button-color p-4">
                Share My Report
              </span>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-4/12 lg:w-4/12 xl:w-1/3 p-1">
          <div className="rounded-lg shadow-lg">
            {waterUsgaeBySite.length > 0 && (
              <div className="p-1 rounded border border-4 chart-border-color">
                <div className="p-1">
                  <div className="text-color-card-header font-medium">
                    Water Usage
                  </div>
                  <div className="text-color-card-header text-sm">
                    Top 10 Total Building Water Usage by Site
                  </div>
                </div>
                <PortfolioPerformance data={waterUsgaeBySite} />
              </div>
            )}
            <div className="float-right">
              <span className="text-color-lable text-xs uppercase rounded chart-button-color p-4">
                Share My Report
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="border-b border-slate-500 mb-1 flex">
          <span className="text-color-card-header text-sm p-3 border bg-slate-600 border-slate-500">
            Maintenance
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="w-full sm:w-1/2 md:w-4/12 lg:w-4/12 xl:w-1/3 p-1">
          <div className="rounded-lg shadow-lg">
            {totalAlarmsBySite.length > 0 && (
              <div className="p-1 rounded border border-4 chart-border-color">
                <div className="p-1">
                  <div className="text-color-card-header font-medium">
                    Total Faults
                  </div>
                  <div className="text-color-card-header text-sm">
                    Top 10 Building Faults by Site
                  </div>
                </div>
                <PortfolioPerformance data={totalAlarmsBySite} />
              </div>
            )}
            <div className="float-right">
              <span className="text-color-lable text-xs uppercase rounded chart-button-color p-4">
                Share My Report
              </span>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-4/12 lg:w-4/12 xl:w-1/3 p-1">
          <div className="rounded-lg shadow-lg">
            {totalBreakdownBySite && totalBreakdownBySite.length > 0 && (
              <div className="p-1 rounded border border-4 chart-border-color">
                <div className="p-1">
                  <div className="text-color-card-header font-medium">
                    Total Insights
                  </div>
                  <div className="text-color-card-header text-sm">
                    Top 10 Building Insights by Site
                  </div>
                </div>
                <PortfolioPerformance data={totalBreakdownBySite} />
              </div>
            )}
            <div className="float-right">
              <span className="text-color-lable text-xs uppercase rounded chart-button-color p-4">
                Share My Report
              </span>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-4/12 lg:w-4/12 xl:w-1/3 p-1">
          <div className="rounded-lg shadow-lg">
            {totalovveridesBySite.length > 0 && (
              <div className="p-1 rounded border border-4 chart-border-color">
                <div className="p-1">
                  <div className="text-color-card-header font-medium">
                    Total Overrides
                  </div>
                  <div className="text-color-card-header text-sm">
                    Top 10 Building Overrides by Site
                  </div>
                </div>
                <PortfolioPerformance data={totalovveridesBySite} />
              </div>
            )}
            <div className="float-right">
              <span className="text-color-lable text-xs uppercase rounded chart-button-color p-4">
                Share My Report
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPerformanceChart;
