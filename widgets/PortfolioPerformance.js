import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useState,useEffect } from "react";
const PortfolioPerformance = ({ data, color }) => {
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    if (data) {
      const datas = data?.map((item) => item);
      let options = {
        chart: {
          type: 'column',
          height: 280,
          backgroundColor: 'transparent'
        },
        title: {
          text: '',
          align: 'left',
          style: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',    // Set font weight to 600
            fontSize: '18px',     // Set font size to 18 pixels
            lineHeight: '21.78px', // Set line height to 21.78 pixels
            color: '#C5C5C5'      // Set title color to white
          }
        },
        xAxis: {
          categories: datas[0].labels,
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
            text: '',
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
            fontfamily: 'Inter'         // Set legend text color to red
          },
          itemHoverStyle: {
            color: 'white' // Set legend text color to white on hover
          },
          // Highcharts.defaultOptions.legend.backgroundColor || // theme
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
          },
          column: {
            borderWidth: 0,
            pointWidth: 15,
            borderRadius: 10
          }
        },
        series: [{
          name: "",
          showInLegend: false,
          data: datas[0]?.data,
          color: color === "color-1" ? "#1BC388" : ""
        }]
      }
      setChartOptions(options);
    }
  }, [data]);
  // let datas = data?.map((item) => item);
  // console.log(datas);



  return (
    <div className="w-full">
      {chartOptions && (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />)
      }
    </div>
  );
};

export default PortfolioPerformance;
