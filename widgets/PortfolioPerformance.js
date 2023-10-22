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
              data: chartData.data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }, [data]);

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      {data.map((chartData, index) => (
        <div key={index} className="mb-4">
          <canvas ref={chartRefs[index]}></canvas>
        </div>
      ))}
    </div>
  );
};

export default PortfolioPerformance;
