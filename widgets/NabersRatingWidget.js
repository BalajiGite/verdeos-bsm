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
    <div className="flex" style={{ height: "200px" }}>
      <div className="text-color-card-header p-4 mt-2 rounded shadow w-50">
        <img src="/energy/nabers.png" alt="NABERS Ratings" 
        style={{height:"150px", width:"200px"}}/>
      </div>
      <div className="text-color-card-header p-4 rounded shadow">
        <div className="space-y-4">
          <div className="flex justify-between text-color-lable">
            {nabersRatings &&
              Object.entries(nabersRatings).map(([rating, propertyCount], index) => (
                <div key={rating} style={{ position: 'relative' }} className="mr-4 mt-4">
                  <img src="/energy/star.png" alt="NABERS Ratings" className="h-16" />
                  <span style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', fontSize: '0.5rem' }}>{index + 1}</span>
                </div>
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
