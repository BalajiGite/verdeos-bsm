import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const PortfolioPerformance = ({ data }) => {
  const chartRefs = data.map(() => useRef());

  useEffect(() => {
    // Destroy previous charts before rendering new ones
    chartRefs.forEach((chartRef) => {
      const chartInstance = chartRef.current.chart;
      if (chartInstance) {
        chartInstance.destroy();
      }
    });

    // Create new charts
    data.forEach((chartData, index) => {
      const ctx = chartRefs[index].current.getContext("2d");
      const newChartInstance = new Chart(ctx, {
        type: "horizontalBar",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "",
              data: chartData.data,
              backgroundColor: "rgba(54, 162, 235, 1)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Unit",
                fontColor: "white",
              },  
            }]
          },
          maintainAspectRatio: false,
        },
      });

      // Attach the chart instance to the chartRef
      chartRefs[index].current.chart = newChartInstance;
    });
  }, [data]);

  return (
    <div className="w-full">
      {data.map((chartData, index) => (
        <div key={index}>
          <canvas ref={chartRefs[index]} style={{ height: "250px" }}></canvas>
        </div>
      ))}
    </div>
  );
};

export default PortfolioPerformance;
