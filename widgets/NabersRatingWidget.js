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
      <div className="text-color-card-header p-4 mt-2 rounded shadow w-50">
        <img src="/energy/nabers.png" alt="NABERS Ratings" className="h-20" />
      </div>
      <div className="text-color-card-header p-4 rounded shadow">
        <div className="flex justify-between text-color-lable">
          <table>
            <tr>
              {nabersRatings &&
                Object.entries(nabersRatings).map(
                  ([rating, propertyCount], index) => (
                    <td>
                      <img
                        src="/energy/star.png"
                        alt="NABERS Ratings"
                        className="h-10"
                      />
                    </td>
                  )
                )}
            </tr>
            <tr>
              {nabersRatings &&
                Object.entries(nabersRatings).map(([rating, propertyCount]) => (
                  <td>
                    <p className="pl-4 pr-4 mr-2 text-white bg-slate-600 border border-white">
                      {propertyCount}
                    </p>
                  </td>
                ))}
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NabersRatingWidget;
