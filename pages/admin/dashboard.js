import React from "react";

// components

import EnergyUsageIntensity from "widgets/EnergyUsageIntensity.js";
import PortfolioCertification from "widgets/PortfolioCertification.js";
import NabersRatingWidget from "widgets/NabersRatingWidget";
import GreenStarRatingWidget from "widgets/GreenStarRatingWidget";
import PortfolioPerformanceChart from "components/PortfolioPerformanceChart.js";
import MapExample from "components/Maps/PortfolioMap";
import GoogleMap from "components/Maps/GoogleMap.js";

export default function Dashboard() {
  return (
    <>
      
      <div className="flex flex-wrap">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-2">
          <MapExample />
        </div>
      </div>
      <hr className="my-4 md:min-w-full" />

      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <EnergyUsageIntensity />
        </div>
      </div>
      <hr className="my-4 md:min-w-full" />
      
      <PortfolioPerformanceChart />
      <hr className="my-4 md:min-w-full" />
      <div
        className="grid w-full"
        style={{
          display: "grid",
          "gridTemplateColumns": "repeat(2, 1fr)",
          gap: "0.5rem",
        }}
      >

        <div className="p-1 w-full">
          <PortfolioCertification />
        </div>

        <div className="p-1 w-full">
          <div className="m-2 mb-8 bg-portfolio-certification">
            <NabersRatingWidget />
          </div>
         {/**  <div className="m-2">
            <MapExample />
          </div>
          */}
          <div className="m-2 bg-portfolio-certification">
            <GreenStarRatingWidget />
          </div>
        </div>
      </div>
    </>
  );
}
