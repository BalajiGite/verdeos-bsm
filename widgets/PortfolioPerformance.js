import { useContext } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { UserContext } from "pages/admin/dashboard";

const PortfolioPerformance = ({ data, color }) => {
  // const [open, setOpen] = useState(false);
let popup = useContext(UserContext);
  const handleClick = () => {
   popup.setOpen(true)
  };

  const datas = data?.map((item) => item);

  const chartOptions = {
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
    credits: {
      enabled: false
    },
    xAxis: {
      categories: datas[0]?.labels,
      lineColor: '#8E8E8E',
      labels: {
        style: {
          color: '#C5C5C5', // Set x-axis label color
          fontWeight: '400'
        }
      },
    },
    yAxis: [{
      gridLineWidth: 1, // Change gridline width
      gridLineColor: '#8E8E8E4D', // Change gridline color
      gridLineDashStyle: 'Dash', // Change gridline dash style
      title: {
        text: datas[0].unit,
        style: {
          fontFamily: 'Inter, sans-serif',
          fontWeight: '400', 
          fontSize: '12px',
          lineHeight: '12.1px',
          color: '#C5C5C5'
        }
      },
      labels: {
        style: {
          color: '#C5C5C5', // Set y-axis label color
          fontWeight: '400'
        }
      }
    }],
    legend: {
      backgroundColor: 'transparent',
      itemStyle: {
        color: '#C5C5C5',
        fontWeight: 400,
        fontSize: "12px",
        fontfamily: 'Inter' 
      },
      itemHoverStyle: {
        color: 'white'
      }
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
        borderRadius: 10,
        events: {
          click: () => handleClick()
        }
      }
    },
    series: [{
      name: "",
      showInLegend: false,
      data: datas[0]?.data,
      color: color === "color-1" ? "#1BC388" : ""
    }]
  };

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
    
  );
};

export default PortfolioPerformance;
