import React, { useState, useEffect } from 'react';
import PortfolioPerformance from '../widgets/PortfolioPerformance';
import {
  getEnergyUsageBySiteDemo,
  getWaterUsageBySiteDemo,
  getTotalAlarmsBySiteDemo,
  getTotalBreakdownBySiteDemo,
  getTotalovveridesBySiteDemo,
  getCarbonEmmisionBySiteDemo
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
    <div className="flex flex-wrap mt-4 border">
      {energyUsageBySite.length > 0 && (
        <div className="w-full xl:w-4/12 px-4 py-6 border">
          <PortfolioPerformance data={energyUsageBySite} />
        </div>
      )}
      {carbonEmmisionBySite.length > 0 && (
        <div className="w-full xl:w-4/12 px-4 py-6 border">
          <PortfolioPerformance data={carbonEmmisionBySite} />
        </div>
      )}
      {waterUsgaeBySite.length > 0 && (
        <div className="w-full xl:w-4/12 px-4 py-6 border">
          <PortfolioPerformance data={waterUsgaeBySite} />
        </div>
      )}
      {totalAlarmsBySite.length > 0 && (
        <div className="w-full xl:w-4/12 px-4 py-6 border">
          <PortfolioPerformance data={totalAlarmsBySite} />
        </div>
      )}
      {totalBreakdownBySite.length > 0 && (
        <div className="w-full xl:w-4/12 px-4 py-6 border">
          <PortfolioPerformance data={totalBreakdownBySite} />
        </div>
      )}
      {totalovveridesBySite.length > 0 && (
        <div className="w-full xl:w-4/12 px-4 py-6 border">
          <PortfolioPerformance data={totalovveridesBySite} />
        </div>
      )}
    </div>
  );
};

export default PortfolioPerformanceChart;
