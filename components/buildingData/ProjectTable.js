import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Modal } from 'antd';

// Define the columns with explicit widths
const columns = [
  {
    title: 'Projects',
    dataIndex: 'project',
    key: 'project',
    width: 200, // Add width
  },
  {
    title: 'Optimum Start-Stop',
    dataIndex: 'optimumStartStop',
    key: 'optimumStartStop',
    width: 150, // Add width
    render: (value) => <CustomCheckbox checked={value === '✔'} />,
  },
  {
    title: 'AHU Economy Mode',
    dataIndex: 'ahuEconomyMode',
    key: 'ahuEconomyMode',
    width: 150, // Add width
    render: (value) => <CustomCheckbox checked={value === '✔'} />,
  },
  {
    title: 'AHU_SAT-SP reset',
    dataIndex: 'ahuSatSpReset',
    key: 'ahuSatSpReset',
    width: 150, // Add width
    render: (value) => <CustomCheckbox checked={value === '✔'} />,
  },
  {
    title: 'AHU_SAP-SP reset',
    dataIndex: 'ahuSapSpReset',
    key: 'ahuSapSpReset',
    width: 150, // Add width
    render: (value) => <CustomCheckbox checked={value === '✔'} />,
  },
  {
    title: 'CHWS Lockout',
    dataIndex: 'chwsLockout',
    key: 'chwsLockout',
    width: 150, // Add width
    render: (value) => <CustomCheckbox checked={value === '✔'} />,
  },
  {
    title: 'Chiller LT-SP reset',
    dataIndex: 'chillerLtSpReset',
    key: 'chillerLtSpReset',
    width: 150, // Add width
    render: (value) => <CustomCheckbox checked={value === '✔'} />,
  },
  {
    title: 'CHW_DP-SP reset',
    dataIndex: 'chwDpSpReset',
    key: 'chwDpSpReset',
    width: 150, // Add width
    render: (value) => <CustomCheckbox checked={value === '✔'} />,
  },
  {
    title: 'CWLT-SP reset',
    dataIndex: 'cwltSpReset',
    key: 'cwltSpReset',
    width: 150, // Add width
    render: (value) => <CustomCheckbox checked={value === '✔'} />,
  },
  {
    title: 'CW Flow Reset',
    dataIndex: 'cwFlowReset',
    key: 'cwFlowReset',
    width: 150, // Add width
    render: (value) => <CustomCheckbox checked={value === '✔'} />,
  },
  {
    title: 'HHWS Lockout',
    dataIndex: 'hhwsLockout',
    key: 'hhwsLockout',
    width: 150, // Add width
    render: (value) => <CustomCheckbox checked={value === '✔'} />,
  },
];

// Define the dummy data
const data = [
  {
    key: '0',
    project: '1 Bligh St',
    optimumStartStop: '✔',
    ahuEconomyMode: '✔',
    ahuSatSpReset: '✔',
    ahuSapSpReset: '✔',
    chwsLockout: '',
    chillerLtSpReset: '✔',
    chwDpSpReset: '✔',
    cwltSpReset: '✔',
    cwFlowReset: '✔',
    hhwsLockout: '',
  },
  {
    key: '1',
    project: '1 Farrer Pl (GMT)',
    optimumStartStop: '✔',
    ahuEconomyMode: '✔',
    ahuSatSpReset: '✔',
    ahuSapSpReset: '✔',
    chwsLockout: '',
    chillerLtSpReset: '✔',
    chwDpSpReset: '✔',
    cwltSpReset: '✔',
    cwFlowReset: '✔',
    hhwsLockout: '',
  },
  {
    key: '2',
    project: '1 Farrer Pl (GPT)',
    optimumStartStop: '✔',
    ahuEconomyMode: '✔',
    ahuSatSpReset: '✔',
    ahuSapSpReset: '✔',
    chwsLockout: '',
    chillerLtSpReset: '✔',
    chwDpSpReset: '✔',
    cwltSpReset: '✔',
    cwFlowReset: '✔',
    hhwsLockout: '',
  },
  {
    key: '3',
    project: '1 Macquarie Pl / Gateway',
    optimumStartStop: '✔',
    ahuEconomyMode: '✔',
    ahuSatSpReset: '✔',
    ahuSapSpReset: '✔',
    chwsLockout: '',
    chillerLtSpReset: '✔',
    chwDpSpReset: '✔',
    cwltSpReset: '✔',
    cwFlowReset: '✔',
    hhwsLockout: '',
  },
  {
    key: '4',
    project: '2 Dawn Fraser',
    optimumStartStop: '✔',
    ahuEconomyMode: '',
    ahuSatSpReset: '✔',
    ahuSapSpReset: '✔',
    chwsLockout: '✔',
    chillerLtSpReset: '✔',
    chwDpSpReset: '✔',
    cwltSpReset: '',
    cwFlowReset: '',
    hhwsLockout: '✔',
  },
  {
    key: '5',
    project: '4 Dawn Fraser',
    optimumStartStop: '✔',
    ahuEconomyMode: '',
    ahuSatSpReset: '✔',
    ahuSapSpReset: '✔',
    chwsLockout: '✔',
    chillerLtSpReset: '✔',
    chwDpSpReset: '✔',
    cwltSpReset: '',
    cwFlowReset: '',
    hhwsLockout: '✔',
  },
  {
    key: '6',
    project: '5 Martin Pl',
    optimumStartStop: '✔',
    ahuEconomyMode: '✔',
    ahuSatSpReset: '✔',
    ahuSapSpReset: '✔',
    chwsLockout: '',
    chillerLtSpReset: '✔',
    chwDpSpReset: '✔',
    cwltSpReset: '✔',
    cwFlowReset: '',
    hhwsLockout: '✔',
  },
  {
    key: '7',
    project: '14 - 18 Lee',
    optimumStartStop: '',
    ahuEconomyMode: '',
    ahuSatSpReset: '✔',
    ahuSapSpReset: '✔',
    chwsLockout: '✔',
    chillerLtSpReset: '✔',
    chwDpSpReset: '',
    cwltSpReset: '',
    cwFlowReset: '',
    hhwsLockout: '✔',
  },
  {
    key: '8',
    project: '30 Hickson Rd',
    optimumStartStop: '✔',
    ahuEconomyMode: '',
    ahuSatSpReset: '✔',
    ahuSapSpReset: '✔',
    chwsLockout: '✔',
    chillerLtSpReset: '✔',
    chwDpSpReset: '',
    cwltSpReset: '✔',
    cwFlowReset: '',
    hhwsLockout: '',
  },
  {
    key: '9',
    project: '56 Pitt St',
    optimumStartStop: '',
    ahuEconomyMode: '',
    ahuSatSpReset: '',
    ahuSapSpReset: '',
    chwsLockout: '',
    chillerLtSpReset: '',
    chwDpSpReset: '',
    cwltSpReset: '',
    cwFlowReset: '',
    hhwsLockout: '',
  },
  {
    key: '10',
    project: '60 Castlereagh St',
    optimumStartStop: '',
    ahuEconomyMode: '',
    ahuSatSpReset: '',
    ahuSapSpReset: '',
    chwsLockout: '',
    chillerLtSpReset: '',
    chwDpSpReset: '',
    cwltSpReset: '',
    cwFlowReset: '',
    hhwsLockout: '',
  },
  {
    key: '11',
    project: '80 Collins - North',
    optimumStartStop: '✔',
    ahuEconomyMode: '✔',
    ahuSatSpReset: '✔',
    ahuSapSpReset: '✔',
    chwsLockout: '',
    chillerLtSpReset: '✔',
    chwDpSpReset: '✔',
    cwltSpReset: '',
    cwFlowReset: '',
    hhwsLockout: '',
  },
  {
    key: '12',
    project: '80 Collins - South',
    optimumStartStop: '✔',
    ahuEconomyMode: '✔',
    ahuSatSpReset: '✔',
    ahuSapSpReset: '✔',
    chwsLockout: '',
    chillerLtSpReset: '✔',
    chwDpSpReset: '✔',
    cwltSpReset: '',
    cwFlowReset: '',
    hhwsLockout: '',
  },
  {
    key: '13',
    project: '100 Harris St',
    optimumStartStop: '',
    ahuEconomyMode: '',
    ahuSatSpReset: '',
    ahuSapSpReset: '',
    chwsLockout: '',
    chillerLtSpReset: '',
    chwDpSpReset: '',
    cwltSpReset: '',
    cwFlowReset: '',
    hhwsLockout: '',
  },
];


// Custom Checkbox component
const CustomCheckbox = ({ checked }) => {
  return (
    <span className={`custom-checkbox ${checked ? 'checked' : 'unchecked'}`}>
      {checked ? <span className="checkmark">&#10003;</span> : <span className="empty-box" >&#10003;</span>}
    </span>
  );
};

// Component definition
const ProjectTable = ({ open, setOpen }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !open) {
    return null; // Don't render until mounted or the modal is meant to be open
  }

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  };

  return (
    <>
      <Modal
        title="Basic Energy Saving Strategies"
        centered
        open={open}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        width={1200}
      >
        <Table
          className="custom-scroll-table"
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 7 }}
          onChange={handleChange}
          scroll={{ x: 1200 }} // Increase scroll width
        />
      </Modal>
    </>
  );
};

export default ProjectTable;
