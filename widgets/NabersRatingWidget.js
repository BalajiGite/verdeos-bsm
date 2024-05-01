import React, { useState, useEffect } from "react";
import { getDates,getApiDataFromAws } from "../api/dashboardDataService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const NabersRatingWidget = (props) => {
  const [nabersRatings, setNabersRatings] = useState(null);

  const fetchData = async (buildingType, dateSpan, dataSet) => {
    const dates = getDates(dateSpan)
    const resp = await getApiDataFromAws(
      "buildingType="+buildingType+
      "&functionName=verdeosDemoTotalPropertiesByNABERSRating&ratingType="+dataSet+"&certification=NABERS"
    );

    if(resp !== undefined){
      const objNabersData = {
        "zeroOne": resp[0].zero + resp[0].zerofive + resp[0].one,
        "oneTwo": resp[0].onehalf + resp[0].two,
        "twoThree": resp[0].twofive + resp[0].three,
        "threeFour": resp[0].threefive + resp[0].four,
        "fourFive": resp[0].fourfive + resp[0].five,
        "fiveSix": resp[0].fivefive + resp[0].six
      }
      setNabersRatings(objNabersData);
    }
    
  };

  useEffect(() => {
    fetchData(props.buildingType, props.dateSpan, props.dataSet);
  }, [props.buildingType, props.dateSpan, props.dataSet]);

  let count = -0.5;
  return (
    <div className="flex">
      <div className="text-color-card-header p-4 mt-12 rounded">
        <img src="/energy/nabers/NABERS_Logo.svg" alt="NABERS Ratings"  />
      </div>
      <div className="w-full text-color-card-header p-2 rounded shadow" style={{ overflowX: "auto" }}>
        <div className="justify-between text-color-lable">
          <table className="w-full">
            <thead>
              <tr>
                {nabersRatings && 
                  <>
                    <th style={{ position: "relative", textAlign:"-webkit-center" }}>
                      <div className="parent-grid">
                        <img src="/energy/nabers/Star_1.svg" alt="NABERS Ratings"  />
                        <div class="dotted-vertical-line"></div>
                      </div>
                    </th>
                    <th style={{ position: "relative", textAlign:"-webkit-center" }}>
                      <div className="parent-grid">
                        <img src="/energy/nabers/Star_2.svg" alt="NABERS Ratings"  />
                        <div class="dotted-vertical-line"></div>
                      </div>
                    </th>
                    <th style={{ position: "relative", textAlign:"-webkit-center" }}>
                      <div className="parent-grid">
                        <img src="/energy/nabers/Star_3.svg" alt="NABERS Ratings"  />
                        <div class="dotted-vertical-line"></div>
                      </div>
                    </th>
                    <th style={{ position: "relative", textAlign:"-webkit-center" }}>
                      <div className="parent-grid">
                        <img src="/energy/nabers/Star_4.svg" alt="NABERS Ratings"  />
                        <div class="dotted-vertical-line"></div>
                      </div>
                    </th>
                    <th style={{ position: "relative", textAlign:"-webkit-center" }}>
                      <div className="parent-grid">
                        <img src="/energy/nabers/Star_5.svg" alt="NABERS Ratings"  />
                        <div class="dotted-vertical-line"></div>
                      </div>
                    </th>
                    <th style={{ position: "relative", textAlign:"-webkit-center", height:"140px" }}>
                      <div className="parent-grid">
                        <img src="/energy/nabers/Star_6.svg" alt="NABERS Ratings"  />
                        <div class="dotted-vertical-line"></div>  
                      </div>
                    </th>
                  </>
                
               }
              </tr>
            </thead>
            <tbody>
              <tr>
                {nabersRatings &&
                  <>
                      <td>
                        <p className="text-center nabers_text">
                          <span>(0-1)<br/>Poor<br/>{nabersRatings.zeroOne + " Buildings"}<br/>found</span>
                        </p>
                      </td>
                      <td>
                        <p className="nabers_text text-center">
                          <span>(1-2)<br/>Below Average<br/>{nabersRatings.oneTwo + " Buildings"}<br/>found</span>
                        </p>
                      </td>
                      <td>
                        <p className="nabers_text text-center">
                          <span>(2-3)<br/>Average<br/>{nabersRatings.twoThree + " Buildings"}<br/>found</span>
                        </p>
                      </td>
                      <td>
                        <p className="nabers_text text-center">
                          <span>(3-4)<br/>Good<br/>{nabersRatings.threeFour + " Buildings"}<br/>found</span>
                        </p>
                      </td>
                      <td>
                        <p className="nabers_text text-center">
                          <span>(4-5)<br/>Excellent<br/>{nabersRatings.fourFive + " Buildings"}<br/>found</span>
                        </p>
                      </td>
                      <td>
                        <p className="nabers_text text-center">
                          <span>(5-6)<br/>Market Leaders<br/>{nabersRatings.fiveSix + " Buildings"}<br/>found</span>
                        </p>
                      </td>          
                    </> 
                  }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NabersRatingWidget;
