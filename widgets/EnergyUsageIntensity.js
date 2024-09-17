import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Import from "chart.js/auto"
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { getApiDataFromAws, getDates } from "../api/dashboardDataService";
import EnergyIntensityWidget from "./EnergyIntensityWidget";
import { data } from "autoprefixer";
import { Spin  } from "antd";


export default function EnergyUsageIntensity(props) {
  const [chartData, setChartData] = useState(null);
  const [portfolioCompliance, setPortfolioCompliance] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (buildingType, dateSpan, dataSet) => {
    if (buildingType != null && dateSpan != null && dataSet != null) {
      const dates = getDates(dateSpan);
      const resp = await getApiDataFromAws(
        `startDateString=${dates.start}&endDateString=${dates.end}&buildingType=${buildingType}&dataSet=${dataSet}&functionName=verdeosDemoPortfolioComplianceData&regionDis=All&stateDis=null&horizontalRollup=null&horizontalRollupPassed=null&verticalRollupPassed=null`
      );
      if (resp !== undefined) {
        setChartData(resp[0]);
        const complianceJson = { "tarTitle": resp[0]?.tarTitle, "tarPerc": resp[0]?.tarPerc, "tarColor": resp[0]?.tarColor, "valTot": resp[0]?.valTot, "arrowIndex": resp[0]?.arrowIndex }
        setPortfolioCompliance(complianceJson)
      }
      setIsLoading(false);
    }
  };

  function formatDateToDayMonth(timestamp) {
    const date = new Date(timestamp); // Convert to Date object
    const day = date.getDate(); // Get day
    const month = date.toLocaleString('default', { month: 'short' }); // Get abbreviated month name
    return `${day} ${month}`; // Return formatted date
  }

  useEffect(() => {
    fetchData(props.buildingType, props.dateSpan, props.dataSet);
  }, [props.buildingType, props.dateSpan, props.dataSet]);

  useEffect(() => {
    if (chartData) {
      if (chartData.isError) {
        // Destroy existing chart if it exists
        if (window.myLine) {
          window.myLine.destroy();
        }
      } else {
        // Extract data from the fetched JSON
        const labels = chartData.ts;
        const datasets = chartData.datasets.map((dataset) => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor:
            dataset.label === "Industry Standards" || dataset.label === "Internal Standards"
              ? "#696565"
              : dataset.label === "Target Upper"
                ? "#1BC388"
                : dataset.label === "Target Lower"
                  ? "#4397F6"
                  : "rgb(127, 181, 57)",
          borderColor:
            dataset.label === "Industry Standards" || dataset.label === "Internal Standards"
              ? "#696565"
              : dataset.label === "Target Upper"
                ? "#1BC388"
                : dataset.label === "Target Lower"
                  ? "#4397F6"
                  : "rgb(127, 181, 57)",
          borderDash:
            dataset.label === "Target Upper" || dataset.label === "Target Lower"
              ? [5, 5]
              : [],
          fill: false,
        }));
        // Destroy existing chart if it exists
        if (window.myLine) {
          window.myLine.destroy();
        }
      };
    }
  }, [chartData]);

  console.log(chartData);
  let targetUper = [];
  let targetLower = [];
  let performance = [];
  let options = {}
  if(chartData?.hasOwnProperty('isError')){
   
  }else{
     targetUper = chartData?.datasets[0];
     targetLower = chartData?.datasets[1];
     performance = chartData?.datasets[2];

      options = {
      chart: {
        type: 'spline',
        height: 280,
        backgroundColor: 'transparent'
      },
      title: {
        text: '',
        align: 'left',
        style: {
          color: '#C5C5C5',  // Ensure the color value is in quotes
          fontFamily: 'Inter',  // Use camelCase for property names
          fontSize: '16px',  // Enclose pixel values in quotes
          fontStyle: 'normal',  // Enclose in quotes and use camelCase
          fontWeight: '600',  // Enclose in quotes and use numeric value for weight
          lineHeight: 'normal'  // Use camelCase and ensure value is in quotes
        }      
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories:  chartData?.ts?.map(ts => formatDateToDayMonth(ts)),
        lineColor: '#8E8E8E',
        labels: {
          style: {
            color: '#C5C5C5',// Set y-axis label color to white
            fontWeight: '400'
          }
        },
      },
      yAxis: [{
        gridLineWidth: 1, // Change gridline width
        gridLineColor: '#8E8E8E4D', // Change gridline color
        gridLineDashStyle: 'Dash', // Change gridline dash style
        title: {
          text: chartData?.unit,
          style: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400',    // Set font weight to 600
            fontSize: '12px',     // Set font size to 18 pixels
            lineHeight: '12.1px', // Set line height to 21.78 pixels
            color: '#C5C5C5',
            // Set title color to white
          }
        },
        labels: {
          style: {
            color: '#C5C5C5',// Set y-axis label color to white
            fontWeight: '400'
          }
        }
      }],
      legend: {
        //layout: 'horizontal',
        backgroundColor: 'transparent',
        itemStyle: {
          color: '#C5C5C5',
          fontWeight: 400,
          fontSize: "12px",
          fontfamily: 'Inter',
  
        },
        itemHoverStyle: {
          color: 'white' // Set legend text color to white on hover
        },
        align: 'right', // Align legend labels to the right
        verticalAlign: 'top',
        floating: true,
        // Align legend labels to top
        // Adjust vertical position of the legend
        // Highcharts.defaultOptions.legend.backgroundColor || // theme
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
        }
      },
      series: [{
        name: targetUper?.label,
        data: targetUper?.data?.map((value) => parseFloat(value)),
        marker: {
          enabled: false,// Hide the markers
        },
        dashStyle:'Dash'
      }, {
        name: targetLower?.label,
        data: targetLower?.data?.map((value) => parseFloat(value)),
        marker: {
          enabled: false // Hide the markers
        },
         dashStyle:'Dash'
      },
      {
        name: performance?.label,
        data: performance?.data?.map((value) => parseFloat(value)),
        marker: {
          enabled: false // Hide the markers
        }
      }]
    }
  }
 
  return (
    <>
      <Spin spinning={isLoading} size="large" indicator={<img src="/img/loader.gif" style={{ fontSize: 50}} alt="Custom Spin GIF" />}>
        <div className=" relative energy-usage-intensity-button-bg-color-content">
          <div className="w-full flex items-center space-x-3  border-bottom">
            <div className="p-3 title_text">Portfolio Compliance</div>
            <EnergyIntensityWidget data={portfolioCompliance} />
          </div>
          {chartData && !chartData.isError ? (
              <HighchartsReact highcharts={Highcharts} options={options} />
            ) : (
              <div className="text-center leading-3 text-[#C5C5C5] m-6">Chart data not available for selected measure</div>
            ) 
          }
        </div>
      </Spin>
    </>
  );
}