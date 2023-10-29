import React, { useState, useEffect } from "react";
import axios from "axios";

import { getTotalPropertiesByNABERSRatingDemo } from "../api/dashboardDataService";

const NabersRatingWidget = () => {
  const [nabersRatings, setNabersRatings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getTotalPropertiesByNABERSRatingDemo(18);
      setNabersRatings(resp);
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <div className="text-color-card-header p-4 rounded shadow">
        <img src="/energy/nabers.png" alt="NABERS Ratings" className="h-12" />
      </div>
      <div className="text-color-card-header p-4 rounded shadow">
        <div className="space-y-4">
          <div className="flex justify-between text-color-lable">
            {nabersRatings &&
              Object.entries(nabersRatings).map(([rating, propertyCount]) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 2L9.77 8.54 4.52 9.29 7.5 14.11 6 17.5 12 15.5 18 17.5 16.5 14.11 19.48 9.29 14.23 8.54 12 2z"
                  ></path>
                </svg>
              ))}
          </div>
          <div className="flex justify-between">
            {nabersRatings &&
              Object.entries(nabersRatings).map(([rating, propertyCount]) => (
                <div
                  key={propertyCount}
                  className="pl-4 pr-4 text-white bg-slate-600 border border-white"
                >
                  <p>{propertyCount}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NabersRatingWidget;
