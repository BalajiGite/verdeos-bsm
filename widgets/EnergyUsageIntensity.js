import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Import from "chart.js/auto"
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { getApiDataFromAws, getDates } from "../api/dashboardDataService";
import EnergyIntensityWidget from "./EnergyIntensityWidget";
import { data } from "autoprefixer";

export default function EnergyUsageIntensity(props) {
  const [chartData, setChartData] = useState(null);
  const [portfolioCompliance, setPortfolioCompliance] = useState({});

  const fetchData = async (buildingType, dateSpan, dataSet) => {
    if (buildingType != null && dateSpan != null && dataSet != null) {
      const dates = getDates(dateSpan);
      const resp = await getApiDataFromAws(
        `startDateString=${dates.start}&endDateString=${dates.end}&buildingType=${buildingType}&dataSet=${dataSet}&functionName=verdeosDemoPortfolioComplianceData&regionDis=All&stateDis=null&horizontalRollup=null&horizontalRollupPassed=null&verticalRollupPassed=null`
      );
      setChartData(resp[0]);
      const complianceJson = { "tarTitle": resp[0]?.tarTitle, "tarPerc": resp[0]?.tarPerc, "tarColor": resp[0]?.tarColor, "valTot": resp[0]?.valTot, "arrowIndex": resp[0]?.arrowIndex }
      setPortfolioCompliance(complianceJson)

    }
  };

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
  let targetUper = chartData?.datasets[0];
  let targetLower = chartData?.datasets[1];
  let performance = chartData?.datasets[2];

  let options = {
    chart: {
      type: 'spline',
      height: 280,
      backgroundColor: 'transparent'
    },
    title: {
      text: 'Portfolio Compliance',
      align: 'left',
      // Allow title to float

      // Adjust vertical position of the title
      style: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',    // Set font weight to 600
        fontSize: '15px',     // Set font size to 18 pixels
        lineHeight: '21.78px', // Set line height to 21.78 pixels
        color: '#C5C5C5'      // Set title color to white
      }
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: chartData?.ts,
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
        text: 'Temperature (°C)',
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
      data: targetUper?.data.map((value) => parseFloat(value)),
      marker: {
        enabled: false,// Hide the markers
      },
    }, {
      name: targetLower?.label,
      data: targetLower?.data.map((value) => parseFloat(value)),
      marker: {
        enabled: false // Hide the markers
      }
    },
    {
      name: performance?.label,
      data: performance?.data.map((value) => parseFloat(value)),
      marker: {
        enabled: false // Hide the markers
      }
    }]
  }
  
  return (
    <>
      <div className=" relative energy-usage-intensity-button-bg-color-content">
        <div className="relative w-full">
          <EnergyIntensityWidget data={portfolioCompliance} />
        </div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}

// const config = {
//   type: "line",
//   data: {
//     labels: labels,
//     datasets: datasets,
//   },
//   options: {
//     maintainAspectRatio: false,
//     responsive: true,
//     plugins: {
//       title: {
//         display: false,
//         text: "Portfolio Compliance",
//         color: "white",
//       },
//       legend: {
//         display: true,
//         labels: {
//           color: "white",
//         },
//         align: "end",
//         position: "bottom",
//       },
//       tooltip: {
//         mode: "index",
//         intersect: false,
//       },
//     },
//     scales: {
//       xAxes:
//         {
//           ticks: {
//             color: "white",
//             maxRotation: 0,
//             autoSkip: true,
//             maxTicksLimit: 7,
//           },
//           display: true,
//           title: {
//             display: false,
//             text: "Date",
//             color: "white",
//           },
//           grid: {
//             display: true,
//             color: "#2A4456",
//             borderDash: [2],
//             borderDashOffset: [2],
//           },
//       },
//       yAxes:
//         {
//           ticks: {
//             color: "white",
//             maxTicksLimit: 10,
//             suggestedMin: 0,
//           },
//           display: true,
//           title: {
//             display: true,
//             text: chartData.unit,
//             color:"white"
//           },
//           grid: {
//             color: "#2A4456",
//             borderDash: [3],
//             borderDashOffset: [3],
//             drawBorder: true,
//             zeroLineColor: "white",
//             zeroLineBorderDash: [0],
//             zeroLineBorderDashOffset: [2],
//           },
//         },
//       //],
//     },
//   },
// };

// const ctx = document.getElementById("line-chart").getContext("2d");
// window.myLine = new Chart(ctx, config);