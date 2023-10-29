import React, { useState, useEffect } from "react";
import PortfolioPerformance from "../widgets/PortfolioPerformance";
import {
  getEnergyUsageBySiteDemo,
  getWaterUsageBySiteDemo,
  getTotalAlarmsBySiteDemo,
  getTotalBreakdownBySiteDemo,
  getTotalovveridesBySiteDemo,
  getCarbonEmmisionBySiteDemo,
} from "../api/dashboardDataService";

const PortfolioPerformanceChart = () => {
  const [energyUsageBySite, setEnergyUsageBySite] = useState([]);
  const [waterUsgaeBySite, setWaterUsgaeBySite] = useState([]);
  const [totalAlarmsBySite, setTotalAlarmsBySite] = useState([]);
  const [totalBreakdownBySite, setTotalBreakdownBySite] = useState([]);
  const [totalovveridesBySite, setTotalovveridesBySite] = useState([]);
  const [carbonEmmisionBySite, setCarbonEmmisionBySite] = useState([]);

  useEffect(() => {
    // Fetch data using axios.get
    const fetchData = async () => {
      const resp = await getEnergyUsageBySiteDemo(11);
      setEnergyUsageBySite(resp);

      const water = await getWaterUsageBySiteDemo(11);
      setWaterUsgaeBySite(water);

      const alarm = await getTotalAlarmsBySiteDemo(11);
      setTotalAlarmsBySite(alarm);

      const breakdown = await getTotalBreakdownBySiteDemo(11);
      setTotalBreakdownBySite(breakdown);

      const ovverides = await getTotalovveridesBySiteDemo(11);
      setTotalovveridesBySite(ovverides);

      const carbonEmmision = await getCarbonEmmisionBySiteDemo(11);
      setCarbonEmmisionBySite(carbonEmmision);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="text-color-card-header font-medium uppercase">
        Portfolio Performance
      </div>
      <div className="border-b border-slate-500 p-3 mt-4 mb-2">
        <span className="text-color-card-header text-sm p-3 border bg-slate-600 border-slate-500">
          Performance
        </span>
      </div>
      <div class="flex">
        <div class="w-full sm:w-1/2 md:w-4/12 lg:w-4/12 xl:w-1/4 p-1">
          <div class="rounded-lg shadow-lg">
            {energyUsageBySite.length > 0 && (
              <div className="p-1 rounded border border-4 chart-border-color">
                <div className="p-1">
                  <div className="text-color-card-header font-medium">
                    Energy Usage
                  </div>
                  <div className="text-color-card-header text-sm">
                    Top 9 Total Building Energy Usage by Site
                  </div>
                </div>
                <PortfolioPerformance data={energyUsageBySite} />
              </div>
            )}
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-4/12 lg:w-4/12 xl:w-1/4 p-1">
          <div class="rounded-lg shadow-lg">
            {carbonEmmisionBySite.length > 0 && (
              <div className="p-1 p-1 rounded border border-4 chart-border-color">
                <div className="p-1">
                  <div className="text-color-card-header font-medium">
                    Carbon Emission
                  </div>
                  <div className="text-color-card-header text-sm">
                    Top 9 Total Building Emission by Site
                  </div>
                </div>
                <PortfolioPerformance data={carbonEmmisionBySite} />
              </div>
            )}
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-4/12 lg:w-4/12 xl:w-1/4 p-1">
          <div class="rounded-lg shadow-lg">
            {totalovveridesBySite.length > 0 && (
              <div className="p-1 rounded border border-4 chart-border-color">
                <div className="p-1">
                  <div className="text-color-card-header font-medium">
                    Water Usage
                  </div>
                  <div className="text-color-card-header text-sm">
                    Top 9 Total Building Water Usage by Site
                  </div>
                </div>
                <PortfolioPerformance data={totalovveridesBySite} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-b border-slate-500 p-3 mt-4 mb-2">
        <span className="text-color-card-header text-sm p-3 border bg-slate-600 border-slate-500">
          Maintenance
        </span>
      </div>
      <div class="flex">
        <div class="w-full sm:w-1/2 md:w-4/12 lg:w-4/12 xl:w-1/4 p-1">
          <div class="rounded-lg shadow-lg">
            {totalBreakdownBySite.length > 0 && (
              <div className="p-1 rounded border border-4 chart-border-color">
                <div className="p-1">
                  <div className="text-color-card-header font-medium">
                    Total Overrides
                  </div>
                  <div className="text-color-card-header text-sm">
                    Top 9 Building Alarms by Site
                  </div>
                </div>
                <PortfolioPerformance data={totalBreakdownBySite} />
              </div>
            )}
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-4/12 lg:w-4/12 xl:w-1/4 p-1">
          <div class="rounded-lg shadow-lg">
            {totalBreakdownBySite.length > 0 && (
              <div className="p-1 rounded border border-4 chart-border-color">
                <div className="p-1">
                  <div className="text-color-card-header font-medium">
                    Total Breakdowns
                  </div>
                  <div className="text-color-card-header text-sm">
                    Top 9 Building Alarms by Site
                  </div>
                </div>
                <PortfolioPerformance data={totalBreakdownBySite} />
              </div>
            )}
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-4/12 lg:w-4/12 xl:w-1/4 p-1">
          <div class="rounded-lg shadow-lg">
            {totalBreakdownBySite.length > 0 && (
              <div className="p-1 rounded border border-4 chart-border-color">
                <div className="p-1">
                  <div className="text-color-card-header font-medium">
                    Total Overrides
                  </div>
                  <div className="text-color-card-header text-sm">
                    Top 9 Building Alarms by Site
                  </div>
                </div>
                <PortfolioPerformance data={totalBreakdownBySite} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPerformanceChart;
