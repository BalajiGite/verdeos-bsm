import React from "react";

// components

import EnergyUsageIntensity from "widgets/EnergyUsageIntensity.js";
import PortfolioCertification from "widgets/PortfolioCertification.js";
import NabersRatingWidget from "widgets/NabersRatingWidget";
import GreenStarRatingWidget from "widgets/GreenStarRatingWidget";
import PortfolioPerformanceChart from "components/PortfolioPerformanceChart.js"
import MapExample from "components/Maps/MapExample";
import GoogleMap from 'components/Maps/GoogleMap.js';

export default function Dashboard() {
 

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <MapExample />
        </div>
      </div>

      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <EnergyUsageIntensity />
        </div>
      </div>
      
      <PortfolioPerformanceChart />
      
      
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-1">
          <PortfolioCertification />
        </div>
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-1">
          <NabersRatingWidget />
          <MapExample />
          <GreenStarRatingWidget />
        </div>
      </div>
    </>
  );
}
