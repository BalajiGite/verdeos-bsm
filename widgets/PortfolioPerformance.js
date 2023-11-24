import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import from "chart.js/auto" instead of "chart.js"

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
        type: "bar", // "horizontalBar" is changed to "bar"
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
          indexAxis: 'y',
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              display: false,
              text: "Portfolio Compliance",
              color: "white",
            },
            legend: {
              display: false,
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
                  maxRotation: 40,
                  autoSkip: true,
                  maxTicksLimit: 6,
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
