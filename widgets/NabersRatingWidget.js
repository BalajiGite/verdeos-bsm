import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    getTotalPropertiesByNABERSRatingDemo
  } from "../api/dashboardDataService"; 

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
    <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">NABERS Ratings:</h2>
        <div className="space-y-4">
            <div className="flex justify-between">
                {nabersRatings &&
                    Object.entries(nabersRatings).map(([rating, propertyCount]) => (
                    <div key={rating}>
                        <p>{rating}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                {nabersRatings &&
                    Object.entries(nabersRatings).map(([rating, propertyCount]) => (
                    <div key={propertyCount}>
                        <p>{propertyCount}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default NabersRatingWidget;
