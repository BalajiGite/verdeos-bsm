import React from 'react';

const SiteInfo = ({ totalSitePer, totalReadings }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-2">
        <p className="ml-2">Sites Connected </p>
        <div className="w-2 h-2 rounded-full bg-orange-500 mr-2 ml-2"></div>
        <p className="text-orange-500 font-bold">{totalSitePer}</p>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-gray-300 mr-2"></div>
        <p>{totalReadings}</p>
      </div>
    </div>
  );
};

export default SiteInfo;
