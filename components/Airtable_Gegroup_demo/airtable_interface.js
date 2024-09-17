import React, {  useContext, useState } from 'react';
import { UserContext } from 'pages/admin/dashboard';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Button, Space, Table, Row, Col, Card, Modal } from 'antd';

const data = [
  {
    key: '1',
    name: 'Vertical Transport Life cycle upgrade',
    age: "$5,345,000",
    address: '$4,970',
    totalCost:"1,075.5",
    payBack:"Under Investigation"
  
  },
  {
    key: '2',
    name: 'Mechanical life cycle and SIPs upgrade',
    age: "$4,077,275",
    address: '$13,745',
    totalCost:"296",
    payBack:"To Be Implemented"
  },
  {
    key: '3',
    name: 'Electrical and SIPS Upgrade FY19-FY',
    age: "$2,904,648",
    address: '$5,265',
    totalCost:"551",
    payBack:"To Be Implemented"
  },
  {
    key: '4',
    name: 'Chiller upgrade and Maintenance works',
    age: "$1,170,547",
    address: '$33,446',
    totalCost:"35",
    payBack:"Implemented"
  },
  {
    key: '5',
    name: 'OP - 13470-01 - Heating and Boiler Upgrade Project',
    age: "$1,055,247",
    address: '$44,443',
    totalCost:"10",
    payBack:"Implemented"
  },
  {
    key: '6',
    name: 'Upgrade EOT Facility',
    age: "$819,440",
    address: '--',
    totalCost:"--",
    payBack:"Not To Be Implemented"
  },
  {
    key: '7',
    name: 'Water treatment and package unit upgrade',
    age: "$395,000",
    address: '$23,456',
    totalCost:"--",
    payBack:"Implemented"
  },
  {
    key: '8',
    name: 'Chiller 2 replacement',
    age: "$284,156",
    address: '$1,234',
    totalCost:"140",
    payBack:"Implemented"
  },
  
];

export default function Airtable() {
  let popup = useContext(UserContext);
  const handleCancel = () => {
    popup.setOpen(false);
  };
  // demo highcharts // 
  let options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent'

    },
    credits:{
      enabled:false
    },
    title: {
      text: 'Proposed by VerdeOS',
      align: 'left',
      style: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',    // Set font weight to 600
        fontSize: '18px',     // Set font size to 18 pixels
        lineHeight: '21.78px', // Set line height to 21.78 pixels
        color: '#C5C5C5'      // Set title color to white
      },

    }, 
    subtitle: {
      text: '', // Empty subtitle
      useHTML: true, // Enable HTML for subtitle
      floating: true, // Allow subtitle to float above the chart
      margin: 0, // Remove margin to make the line fit closely under the title
      style: {
          textDecoration: 'underline', // Underline the subtitle
          color: '#C5C5C5', // Line color
          fontSize: '0px' // Hide the subtitle text
      }
  },

    xAxis: {
      categories: ['VerdeOS', 'Non-VerdeOS'],
      gridLineColor: '#C5C5C5',
      crosshair: true,
      accessibility: {
        description: 'Countries'
      },
      labels: {
        style: {
          color: '#C5C5C5', // Set x-axis label color
          fontWeight: '400'
        }
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
        gridLineWidth: 1, // Change gridline width
        gridLineColor: '#8E8E8E4D',
      }
    },
    tooltip: {
      valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        pointWidth: 150
      }
    },
    series: [
      {
        name: '',
        data: [21, 27],
        

      },
      {
        name: '',
        data: [],
       
      }

    ]
  }
  // Pie Demo chart // 
  let options2 = {
    chart: {
      type: 'pie',
      backgroundColor:''
    },
    credits:{
      enabled:false
    },
    title: {
      text: 'CAPEX vs OPEX Split',
      align: 'left',
      style: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',    // Set font weight to 600
        fontSize: '18px',     // Set font size to 18 pixels
        lineHeight: '21.78px', // Set line height to 21.78 pixels
        color: '#C5C5C5'      // Set title color to white
      },
    },
    tooltip: {
      valueSuffix: '%'
    },

    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: true,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [
      {
        name: `CAPEX/OPEX/Wishlist:`,
        colorByPoint: true,
        data: [
          {
            name: 'Wishlist (21)',
            y: 55
          },
          {
            name: 'OPEX (1)',
            sliced: false,
            selected: true,
            y: 26.71
          },
          {
            name: 'CAPEX (26)',
            y: 1.09
          },

        ]
      }
    ]
  };
  // antd Table Dummy dada // 
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const columns = [
    {
      title: 'Item',
      dataIndex: 'name',
      key: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      width: 300, // Add width
    },
    {
      title: 'Total Implementation Cost ($)',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Total Cost Savings ($)',
      dataIndex: 'address',
      key: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Payback Period (months)',
      dataIndex: 'totalCost',
      key: 'totalCost',
      sorter: (a, b) => a.totalCost - b.totalCost,
      sortOrder: sortedInfo.columnKey === 'totalCost' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'payBack',
      key: 'payBack',
      sorter: (a, b) => a.payBack - b.payBack,
      sortOrder: sortedInfo.columnKey === 'payBack' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  return (
    <>
      {/* <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button> */}
      <Modal
        title="Energy & Water Opportunities"
        centered
        open={popup}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
      <div className="section-color">
        <Row gutter={[16, 16]} align="middle"  style={{ columnGap: 8 , justifyContent:'space-around'}}>
          <Col span={8} className="background-linear py-3 px-2">
            <h2>Total Opportunities</h2>
            <p>48</p>
          </Col>
          <Col span={8} className="background-linear py-3 px-2">
            <h2>Implemented</h2>
            <p>8</p>
          </Col>
          <Col span={7} className="background-linear py-3 px-2">
            <h2>Not to be implemented</h2>
            <p>10</p>
          </Col>
          <Col span={12} className="background-linear">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Col>
          <Col span={11} className="background-linear">
            <HighchartsReact highcharts={Highcharts} options={options2} />
          </Col>
          <Col span={24} style={{marginLeft:5, marginRight:5}}>
            <Table columns={columns} dataSource={data} onChange={handleChange} pagination={8}/>
          </Col>
        </Row>
      </div>
      </Modal>
    </>
  );
}