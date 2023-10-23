import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { getPortfolioComplianceDataDemo } from "../api/dashboardDataService";

export default function EnergyUsageIntensity() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getPortfolioComplianceDataDemo(10);
      setChartData(resp);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData) {
      // Extract data from the fetched JSON
      const labels = chartData.ts;
      const datasets = chartData.datasets.map(dataset => ({
        label: dataset.label,
        data: dataset.data,
        borderColor: dataset.label === "Target Lower" || dataset.label === "Target Upper" ? "rgba(255, 255, 255, 0.5)" : getRandomColor(),
        borderDash: dataset.label === "Target Lower" || dataset.label === "Target Upper" ? [5, 5] : [],
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
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white",
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
                  fontColor: "rgba(255,255,255,.7)",
                  maxRotation: 0,
                  autoSkip: true,
                  maxTicksLimit: 7,
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Date",
                  fontColor: "white",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(0, 0, 0, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
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
                  color: "rgba(255, 255, 255, 0.15)",
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
      {/* Your JSX for the chart */}
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Portfolio Compliance
              </h6>
              <h2 className="text-white text-xl font-semibold">Energy Usage Intensity</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative">
            <canvas id="line-chart" style={{ height: "350px" }}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
