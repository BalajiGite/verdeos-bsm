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
    <div className="flex">
      <div className="text-color-card-header p-4 mt-2 rounded shadow md:w-4/12">
        <img
          src="/energy/greenstar.jpg"
          alt="NABERS Ratings"
          className="h-20"
        />
      </div>
      <div className="text-color-card-header p-4 rounded shadow md:w-8/12">
        <div className="flex justify-between text-color-lable">
          <table className="w-full">
            <thead>
              <tr>
                {greenStarRatings &&
                  Object.entries(greenStarRatings).map(
                    ([rating, propertyCount], index) => (
                      <th key={index}>
                        <img
                          src="/energy/greenstarRating1.png"
                          alt="NABERS Ratings"
                          className="h-10"
                        />
                      </th>
                    )
                  )}
              </tr>
            </thead>
            <tbody>
              <tr>
                {greenStarRatings &&
                  Object.entries(greenStarRatings).map(
                    ([rating, propertyCount], index) => (
                      <td key={index}>
                        <p className="pl-1 pr-1 mr-1 text-white bg-slate-600 border border-white">
                          {propertyCount}
                        </p>
                      </td>
                    )
                  )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GreenStarRatingWidget;
