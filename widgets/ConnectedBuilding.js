import React, { useState, useEffect } from 'react';
import {
  getConnectedBuilding
} from "../api/dashboardDataService"; 

const ConnectedBuilding = () => {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getConnectedBuilding(1);
      setCartData(resp); 
    };

    fetchData();
  }, []);

  return (
    <div className="bg-orange p-4 rounded">
      <h2 className="text-white mb-4">Cart Widget</h2>
      {cartData && (
        <div>
          Total Site Percentage: {cartData.totalSitePer}
          <br />
          Total Readings: {cartData.totalReadings}
          <br />
          <div className="mt-4">
            <strong>Sites Connected:</strong>
            <ul>
              {cartData.sites.map((site) => (
                <li key={site.id} className={`text-${site.color}`}>
                  {site.name}: {site.readings}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectedBuilding;
