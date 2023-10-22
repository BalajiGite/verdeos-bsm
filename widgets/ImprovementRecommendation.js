import { useState, useEffect } from "react";
import { getImprvRecomondationDemo } from "../api/dashboardDataService";

const ImprovementRecommendation = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getImprvRecomondationDemo(5);
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
              checked: param.checked === "true" ? "false" : "true",
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
    <>
      <div className="flex mb-4">
        <div className="w-80 text-color-card-header font-medium uppercase">
          Improvement Recommendations
        </div>
      </div>
      <div className="text-white pl-4 rounded shadow-lg">
        {data.map((item, recTypeIndex) => (
          <div key={recTypeIndex} className="mb-4">
            <div className="text-md font-bold text-color-lable mb-2">
              {item.recType}
            </div>
            <ul className="ml-4">
              {item.param.map((param, paramIndex) => (
                <li key={paramIndex} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={param.checked === "true"}
                    onChange={() =>
                      handleCheckboxChange(recTypeIndex, paramIndex)
                    }
                  />
                  <span className="text-color-lable text-sm">{param.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex pt-4">
        <div className="flex w=1/2 border mr-1 bg-slate-600 border-slate-500 rounded">
          <div className="text-xxs text-color-lable pl-1">
            Building Manager Notification
          </div>
          <img
            alt="user"
            className="w-5 h-5 mt-2 pr-1 rounded"
            src="https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
          />
        </div>
        <div className="flex w=1/2 border mr-1 bg-slate-600 border-slate-500 rounded">
          <div className="text-xxs text-color-lable pl-1">
            Building Services Partner
          </div>
          <img
            alt="user"
            className="w-5 h-5 mt-2 pr-1 rounded"
            src="https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
          />
        </div>
      </div>
    </>
  );
};

export default ImprovementRecommendation;
