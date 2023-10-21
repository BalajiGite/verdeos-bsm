import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import PortfolioCertification from "widgets/PortfolioCertification.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import PortfolioPerformanceChart from "components/PortfolioPerformanceChart.js"

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      
      <PortfolioPerformanceChart />
      
      
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <PortfolioCertification />
        </div>
        <div className="w-full xl:w-6/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
