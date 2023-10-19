import { useState, useEffect } from 'react';
import {
  getComplianceRepotingDemo
  } from "../api/dashboardDataService"; 

const ComplianceReporting = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const resp = await getComplianceRepotingDemo(6);
        setData(resp); 
      };
  
      fetchData();
  }, []);


  const handleCheckboxChange = (recTypeIndex, paramIndex) => {
    const updatedData = data.map((item, index) => {
      if (index === recTypeIndex) {
        const updatedParam = item.param.map((param, i) => {
          if (i === paramIndex) {
            return {
              ...param,
              checked: param.checked === 'true' ? 'false' : 'true',
            };
          }
          return param;
        });
        return { ...item, param: updatedParam };
      }
      return item;
    });

    setData(updatedData);
  };

  return (
    <div className="text-white p-4 rounded">
      {data.map((item, recTypeIndex) => (
        <div key={recTypeIndex} className="mb-4">
          <div className="text-lg font-bold mb-2">{item.recType}</div>
          <ul className="ml-4">
            {item.param.map((param, paramIndex) => (
              <li key={paramIndex} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={param.checked === 'true'}
                  onChange={() => handleCheckboxChange(recTypeIndex, paramIndex)}
                />
                {param.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ComplianceReporting;
