import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Import from "chart.js/auto"

import { getApiDataFromAws, getDates } from "../api/dashboardDataService";
import EnergyIntensityWidget from "./EnergyIntensityWidget";

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
      const complianceJson = {"tarTitle": resp[0].tarTitle,"tarPerc":resp[0].tarPerc, "tarColor":resp[0].tarColor, "valTot":resp[0].valTot}
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
            dataset.label === "Industry Standards" || dataset.label === "Internal Standards"
              ? [5, 5]
              : [],
          fill: false,
        }));

        // Destroy existing chart if it exists
        if (window.myLine) {
          window.myLine.destroy();
        }

        // Create the chart
        const config = {
          type: "line",
          data: {
            labels: labels,
            datasets: datasets,
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              title: {
                display: false,
                text: "Portfolio Compliance",
                color: "white",
              },
              legend: {
                display: true,
                labels: {
                  color: "white",
                },
                align: "end",
                position: "bottom",
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
            scales: {
              xAxes: 
                {
                  ticks: {
                    color: "white",
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 7,
                  },
                  display: true,
                  title: {
                    display: false,
                    text: "Date",
                    color: "white",
                  },
                  grid: {
                    display: true,
                    color: "#2A4456",
                    borderDash: [2],
                    borderDashOffset: [2],
                  },
              },
              yAxes: 
                {
                  ticks: {
                    color: "white",
                    maxTicksLimit: 10,
                    suggestedMin: 0,
                  },
                  display: true,
                  title: {
                    display: true,
                    text: chartData.unit,
                    color:"white"
                  },
                  grid: {
                    color: "#2A4456",
                    borderDash: [3],
                    borderDashOffset: [3],
                    drawBorder: true,
                    zeroLineColor: "white",
                    zeroLineBorderDash: [0],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              //],
            },
          },
        };

        const ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
      }
    }
  }, [chartData]);

  return (
    <>
      <div className="text-color-card-header font-medium uppercase">
        Portfolio Compliance
      </div>

      <div className="mt-3">
        <div className="border-b border-slate-500 mb-1 flex">
          <span className="text-color-card-header energy-usage-intensity-button-bg-color text-sm p-3 border bg-slate-600 border-slate-500">
            Standards
          </span>
          <span className="text-color-card-header energy-usage-intensity-target-button-bg-color text-sm p-3 border bg-slate-600 border-slate-500">
            Targets
          </span>
        </div>
      </div>
      {/* Your JSX for the chart */}
      <div className="relative flex flex-col min-w-0 break-words w-full">
        <div className="rounded-t mb-0 px-1 py-1 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full ">
              <EnergyIntensityWidget data={portfolioCompliance}/>
            </div>
          </div>
        </div>
        <div className="p-1 flex-auto">
          {/* Chart */}
          <div className="p-5 relative energy-usage-intensity-button-bg-color-content">
            <canvas id="line-chart" style={{ height: "350px" }}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
