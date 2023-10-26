import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const PortfolioPerformance = ({ data }) => {
  const chartRefs = data.map(() => useRef());

  useEffect(() => {
    data.forEach((chartData, index) => {
      const ctx = chartRefs[index].current.getContext("2d");
      new Chart(ctx, {
        type: "horizontalBar",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Dataset 1",
              data: chartData.data,
              backgroundColor: "rgba(54, 162, 235, 1)", // Set the background color to blue (54, 162, 235)
              borderColor: "rgba(54, 162, 235, 1)", // Set the border color to blue (54, 162, 235)
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true, // Ensure that the x-axis starts at zero
                },
              },
            ],
          },
          maintainAspectRatio: false,
        },
      });
    });
  }, [data]);

  return (
    <div className="w-full">
      {data.map((chartData, index) => (
        <div key={index} className="rounded border border-4 border-blue-900">
          <canvas ref={chartRefs[index]} style={{ height: "250px" }}></canvas>
        </div>
      ))}
    </div>
  );
};

export default PortfolioPerformance;
