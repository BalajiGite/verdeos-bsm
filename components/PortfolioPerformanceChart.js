import React, { useState, useEffect } from 'react';
import PortfolioPerformance from '../widgets/PortfolioPerformance';
import {
  getEnergyUsageBySiteDemo
} from "../api/dashboardDataService"; 

const PortfolioPerformanceChart = () => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // Fetch data using axios.get
    const fetchData = async () => {
      const resp = await getEnergyUsageBySiteDemo(11);
      setPerformanceData(resp); 
    };

    fetchData();

  }, []);

  return (
    <div className="flex flex-wrap mt-4">
      {performanceData.length > 0 && (
        <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4 py-6 border">
          <PortfolioPerformance data={performanceData} />
        </div>
      )}
      {performanceData.length > 0 && (
        <div className="w-full xl:w-4/12 px-4 py-6 border">
          <PortfolioPerformance data={performanceData} />
        </div>
      )}
      {performanceData.length > 0 && (
        <div className="w-full xl:w-4/12 px-4 py-6 border">
          <PortfolioPerformance data={performanceData} />
        </div>
      )}
      {performanceData.length > 0 && (
        <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4 py-6 border">
          <PortfolioPerformance data={performanceData} />
        </div>
      )}
      {performanceData.length > 0 && (
        <div className="w-full xl:w-4/12 px-4 py-6 border">
          <PortfolioPerformance data={performanceData} />
        </div>
      )}
      {performanceData.length > 0 && (
        <div className="w-full xl:w-4/12 px-4 py-6 border">
          <PortfolioPerformance data={performanceData} />
        </div>
      )}
    </div>

  
  );
};

export default PortfolioPerformanceChart;
