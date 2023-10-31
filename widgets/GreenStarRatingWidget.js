import React, { useState, useEffect } from "react";

import { getTotalPropertiesByGreenStarRatingDemo } from "../api/dashboardDataService";

const GreenStarRatingWidget = () => {
  const [greenStarRatings, setGreenStarRatings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getTotalPropertiesByGreenStarRatingDemo(19);
      setGreenStarRatings(resp);
    };

    fetchData();
  }, []);

  return (
    <div className="flex" style={{ height: "200px" }}>
      <div className="text-color-card-header p-4 mt-4 rounded shadow">
          <img
            src="/energy/greenstar.jpg"
            alt="NABERS Ratings"
            style={{height:"150px", width:"230px"}}
          />
        </div>
      <div className="text-color-card-header p-4 rounded shadow">
        <div className="space-y-4">
          <div className="flex justify-between text-color-lable">
            {greenStarRatings &&
              Object.entries(greenStarRatings).map(([rating, propertyCount], index) => (
                <div key={rating} style={{ position: 'relative' }} className="mr-4 mt-4">
                  <img src="/energy/greenstarRating1.png" alt="NABERS Ratings" className="h-20" />
                  <span style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', fontSize: '0.5rem' }}>{index + 1}</span>
                </div>
              ))
            }
          </div>
          <div className="flex justify-between">
            {greenStarRatings &&
              Object.entries(greenStarRatings).map(([rating, propertyCount]) => (
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

export default GreenStarRatingWidget;
