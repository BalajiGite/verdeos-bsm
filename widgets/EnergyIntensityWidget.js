import React, { useState, useEffect } from 'react';
import { getPortfolioComplianceDemo } from "../api/dashboardDataService";
import Dropdown from "../components/Dropdowns/Dropdown.js"; // Create Dropdown component

const EnergyIntensityWidget = () => {
  const [jsonData, setJsonData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Option 1'); // Set your initial selected option here
  const options = ['Option 1', 'Option 2', 'Option 3']; // Define your dropdown options

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getPortfolioComplianceDemo(9);
      setJsonData(resp);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 rounded shadow text-white secondary-bg-color">
      <div className="flex mb-8 justify-end">
        <div className="mr-4">
          <Dropdown selected={selectedOption} options={options} onSelect={handleOptionSelect} />
        </div>
        <div className="mr-4">
          <Dropdown selected={selectedOption} options={options} onSelect={handleOptionSelect} />
        </div>
        <div>
          <Dropdown selected={selectedOption} options={options} onSelect={handleOptionSelect} />
        </div>
      </div>
      <div className="flex justify-between">
        {jsonData &&
          Object.entries(jsonData).map(([key, value]) => (
            <div key={key} className="w-1/6">
              <p className="text-center font-medium">{key}</p>
              <p className={`text-center text-${jsonData[`${key}Color`]}`}>{value}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EnergyIntensityWidget;
