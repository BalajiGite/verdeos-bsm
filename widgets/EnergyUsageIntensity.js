import React, { useEffect, useState } from "react";
import Chart from "chart.js";

import { getApiDataFromAws, getDates } from "../api/dashboardDataService";
import EnergyIntensityWidget from "./EnergyIntensityWidget";

export default function EnergyUsageIntensity(props) {
  const [chartData, setChartData] = useState(null);

  const fetchData = async (buildingType, dateSpan, dataSet) => {
    //alert("called from Energy Usage:" + buildingType + " " + dateSpan + " " + dataSet);

    if(buildingType !=null && dateSpan !=null && dataSet !=null)
    {
      const dates = getDates(dateSpan)
      const resp = await getApiDataFromAws(
        "startDateString="+dates.start+"&endDateString="+dates.end+"&buildingType="+buildingType+
        "&dataSet="+dataSet+"&functionName=verdeosDemoTimeseriesDataGen&regionDis=All&stateDis=null&horizontalRollup=null&horizontalRollupPassed=null&verticalRollupPassed=null"
      );
      setChartData(resp[0]);
    }
  };

  useEffect(() => {
    fetchData(props.buildingType, props.dateSpan, props.dataSet);
  }, [props.buildingType, props.dateSpan, props.dataSet]);

  useEffect(() => {
    if (chartData) {
      // Extract data from the fetched JSON
      const labels = chartData.ts;
      const datasets = chartData.datasets.map((dataset) => ({
        label: dataset.label,
        data: dataset.data,
        borderColor:
          dataset.label === "Target Lower" || dataset.label === "Target Upper"
            ? "rgba(255, 255, 255, 0.5)"
            : getRandomColor(),
        borderDash:
          dataset.label === "Target Lower" || dataset.label === "Target Upper"
            ? [5, 5]
            : [],
        fill: false,
      }));

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
          title: {
            display: false,
            text: "Sales Charts",
            fontColor: "black",
          },
          legend: {
            labels: {
              fontColor: "black",
            },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "black",
                  maxRotation: 0,
                  autoSkip: true,
                  maxTicksLimit: 7,
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Date",
                  fontColor: "black",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "black",
                  zeroLineColor: "black",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "black",
                  maxTicksLimit: 5,
                  //stepSize: 40,
                  suggestedMin: 70,
                  //suggestedMax: 100,
                  //beginAtZero: true,
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                  fontColor: "white",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "black",
                  zeroLineColor: "rgba(33, 37, 41, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };

      const ctx = document.getElementById("line-chart").getContext("2d");
      window.myLine = new Chart(ctx, config);
    }
  }, [chartData]);

  // Helper function to generate random colors for dataset borders
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

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
              <EnergyIntensityWidget />
            </div>
          </div>
        </div>
        <div className="p-1 flex-auto">
          {/* Chart */}
          <div className="relative bg-white">
            <canvas id="line-chart" style={{ height: "350px" }}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
