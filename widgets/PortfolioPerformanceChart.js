import React, { useState, useEffect, useRef } from "react";
import PortfolioPerformance from "./PortfolioPerformance";

import { getApiDataFromAws, getDates } from "../api/dashboardDataService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// const CustomDots = ({ slides, currentSlide, slideNames ,handleDotClick}) => {

//   return (
//     <ul style={{ display: 'flex', justifyContent: 'center' }}>
//       {slides.map((_, index) => (
//         <li key={index} style={{ margin: '0 5px' }}>
//           <button
//             style={{
//               width: '10px',
//               height: '10px',
//               borderRadius: '50%',
//               backgroundColor: currentSlide === index ? '#000' : '#ccc',
//               border: 'none',
//               outline: 'none',
//               cursor: 'pointer',
//             }}
//             onClick={() => handleDotClick(index)} // Add onClick handler here
//             >
//           </button>
//             {slideNames[index]}
//         </li>
//       ))}
//     </ul>
//   );
// };

const PortfolioPerformanceChart = (props) => {
  const [energyUsageBySite, setEnergyUsageBySite] = useState([]);
  const [carbonEmmisionBySite, setCarbonEmmisionBySite] = useState([]);
  const [waterUsgaeBySite, setWaterUsgaeBySite] = useState([]);
  const [totalAlarmsBySite, setTotalAlarmsBySite] = useState([]);
  const [totalBreakdownBySite, setTotalBreakdownBySite] = useState([]);
  const [totalovveridesBySite, setTotalovveridesBySite] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // State to track current slide index
  const [currentSlider1 , setCurrentSlider1] = useState(0);

  const sliderRef = useRef(null);
  const sliderRef1 = useRef(null);

  const fetchData = async (buildingType, dateSpan, dataSet) => {
    if (buildingType != null && dateSpan != null) {
      //alert("called from Portfolio Performance:" + buildingType + " " + dateSpan + " " + dataSet);
      const dates = getDates(dateSpan);
      const resp = await getApiDataFromAws(
        "startDateString=" +
        dates.start +
        "&endDateString=" +
        dates.end +
        "&buildingType=" + buildingType + "&dataSet=Electrical&functionName=verdeosDemoPortfolioPerformance"
      );
      setEnergyUsageBySite(resp);

      const carbonEmmision = await getApiDataFromAws(
        "startDateString=" +
        dates.start +
        "&endDateString=" +
        dates.end +
        "&buildingType=" +
        buildingType +
        "&dataSet=Emissions&functionName=verdeosDemoPortfolioPerformance"
      );
      setCarbonEmmisionBySite(carbonEmmision);

      const water = await getApiDataFromAws(
        "startDateString=" +
        dates.start +
        "&endDateString=" +
        dates.end +
        "&buildingType=" +
        buildingType +
        "&dataSet=Water&functionName=verdeosDemoPortfolioPerformance"
      );
      setWaterUsgaeBySite(water);

      const alarm = await getApiDataFromAws(
        "startDateString=" +
        dates.start +
        "&endDateString=" +
        dates.end +
        "&buildingType=" +
        buildingType +
        "&dataSet=Faults&functionName=verdeosDemoPortfolioPerformance"
      );
      setTotalAlarmsBySite(alarm);

      const ovverides = await getApiDataFromAws(
        "startDateString=" +
        dates.start +
        "&endDateString=" +
        dates.end +
        "&buildingType=" +
        buildingType +
        "&dataSet=Overrides&functionName=verdeosDemoPortfolioPerformance"
      );
      setTotalovveridesBySite(ovverides);

      const breakdown = await getApiDataFromAws(
        "startDateString=" +
        dates.start +
        "&endDateString=" +
        dates.end +
        "&buildingType=" +
        buildingType +
        "&dataSet=Insights&functionName=verdeosDemoPortfolioPerformance"
      );
      setTotalBreakdownBySite(breakdown);

    }
  };

  useEffect(() => {
    fetchData(props.buildingType, props.dateSpan, props.dataSet);
  }, [props.buildingType, props.dateSpan, props.dataSet]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // afterChange: () => setUpdateCount(updateCount + 1),
    beforeChange: (current, next) => setCurrentSlide(next)
  };

  const settings1 = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // afterChange: () => setUpdateCount(updateCount + 1),
    beforeChange: (current, next) => setCurrentSlider1(next)
  };

  const handleDotClick = (index,slider) => {
    if (slider === 1) {
      sliderRef.current?.slickGoTo(index);
      setCurrentSlide(index);
    }
    else if(slider === 2){
      sliderRef1.current?.slickGoTo(index);
      setCurrentSlider1(index)
    }
  };
  const portfolioName = ['Energy Usage', 'Carbon Emission', 'Water Usage'];
  const maintainceName = ['Faults', 'Insights', 'Overrides']
  
  return (
    <>
      <div className="text-color-card-header energy-usage-intensity-button-bg-color-content">
        <div className="p-3 border-bottom flex items-center font-semibold">
          <div className="title_text">
            Portfolio Performance by:
          </div>
          <ul style={{ display: 'flex' }} className="mx-2 mb-0">
            {portfolioName?.map((_, index) => (
              <li style={{ margin: '0 5px' }} className=" font-semibold text-xs leading-3">
                <button
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: currentSlide === index ? '#ccc':'#000',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    margin: '0px 5px'
                  }}
                  onClick={() => handleDotClick(index,1)} // Add onClick handler here
                >
                </button>
                {portfolioName[index]}
              </li>
            ))}
          </ul>
          <button className="ml-auto font-normal leading-3 text-[#4397F6] text-xs">Share My Report</button>
        </div>
        <Slider ref={sliderRef}  {...settings}>
          <div className="w-full p-3">
            {energyUsageBySite?.length > 0 && (
              <div>
                <div className="text-color-card-header font-normal text-xs leading-3  text-[#C5C5C5] mb-2">
                  Top 10 Industrial Buildings
                </div>

                <PortfolioPerformance data={energyUsageBySite} />
              </div>
            )}
          </div>
          {/* <div className="flex"> */}
          <div className="w-full  p-3 ">
            {carbonEmmisionBySite?.length > 0 && (
              <div className="p-1">
                <div className="text-color-card-header font-normal text-xs leading-3  text-[#C5C5C5] mb-2">
                  Top 10 Industrial Buildings
                </div>
                <PortfolioPerformance data={carbonEmmisionBySite} color={"color-1"} />
              </div>
            )}
          </div>
          <div className="w-full  p-3">
            {waterUsgaeBySite?.length > 0 && (
              <div className="p-1">
                <div className="text-color-card-header font-normal text-xs leading-3  text-[#C5C5C5] mb-2">
                  Top 10 Industrial Buildings
                </div>
                <PortfolioPerformance data={waterUsgaeBySite} />
              </div>
            )}
          </div>
        </Slider>
      </div>
      <div className="text-color-card-header energy-usage-intensity-button-bg-color-content mt-4">
        <div className="p-3 border-bottom flex items-center font-semibold">
          <div className="title_text">
            Maintenance by:
          </div>
          <ul style={{ display: 'flex' }} className="mx-2 mb-0">
            {maintainceName?.map((_, index) => (
              <li style={{ margin: '0 5px' }} className=" font-semibold text-xs leading-3">
                <button
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: currentSlider1 === index ? '#ccc':'#000',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    margin: '0px 5px'
                  }}
                  onClick={() => handleDotClick(index,2)} // Add onClick handler here
                >
                </button>
                {maintainceName[index]}
              </li>
            ))}
          </ul>
          <button className="ml-auto font-normal leading-3 text-[#4397F6] text-xs">Share My Report</button>
        </div>
        <Slider ref={sliderRef1} {...settings1}>
          <div className="w-full  p-3">
            {totalAlarmsBySite?.length > 0 && (
              <div className="p-1">
                {/* <div className="text-color-card-header font-medium">
                    Total Faults
                  </div> */}
                <div className="text-color-card-header font-normal text-xs leading-3  text-[#C5C5C5] mb-2">
                  Top 10 Industrial Buildings
                </div>
                <PortfolioPerformance data={totalAlarmsBySite} />
              </div>
            )}
          </div>
          <div className="w-full  p-3">
            {totalBreakdownBySite && totalBreakdownBySite?.length > 0 && (
              <div className="p-1">
                {/* <div className="te  xt-color-card-header font-medium">
                    Total Insights
                  </div> */}
                <div className="text-color-card-header font-normal text-xs leading-3  text-[#C5C5C5] mb-2">
                  Top 10 Industrial Buildings
                </div>
                <PortfolioPerformance data={totalBreakdownBySite} />
              </div>
            )}
          </div>
          <div className="w-full  p-3">
            {totalovveridesBySite?.length > 0 && (
              <div className=" p-1">
                {/* <div className="text-color-card-header font-medium">
                    Total Overrides
                  </div> */}
                <div className="text-color-card-header font-normal text-xs leading-3  text-[#C5C5C5] mb-2">
                  Top 10 Industrial Buildings
                </div>
                <PortfolioPerformance data={totalovveridesBySite} />
              </div>
            )}
          </div>
        </Slider>
      </div>
    </>
  );
};

export default PortfolioPerformanceChart;
