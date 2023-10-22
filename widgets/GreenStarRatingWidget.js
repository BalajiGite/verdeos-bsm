import React, { useState, useEffect } from 'react';

import {
    getTotalPropertiesByGreenStarRatingDemo
  } from "../api/dashboardDataService"; 

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
    <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Green Star Ratings:</h2>
        <div className="space-y-4">
            <div className="flex justify-between">
                {greenStarRatings &&
                    Object.entries(greenStarRatings).map(([rating, propertyCount]) => (
                    <div key={rating}>
                        <p>{rating}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                {greenStarRatings &&
                    Object.entries(greenStarRatings).map(([rating, propertyCount]) => (
                    <div key={propertyCount}>
                        <p>{propertyCount}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default GreenStarRatingWidget;
