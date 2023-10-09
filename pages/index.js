
import React, { useState, useEffect } from 'react';
import awsExports from '../src/aws-exports';
import { Amplify, API, Auth, Storage, withSSRContext } from 'aws-amplify';

// components
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import Table from "components/buildingData/dataTbl.js"
import SiteInfo from "components/buildingData/SiteInfo.js"

// layout for page
import Admin from "layouts/Admin.js";

Amplify.configure({ ...awsExports, ssr: true });

export async function getServerSideProps() {
  try {
    const response = await API.get('apiDemoTest', '/items/1');
    const data = response;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        data: null,
      },
    };
  }
}

const Dashboard = ({ data }) => {
  let parsedData = null;
  if (data) {
    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  const { totalSitePer, totalReadings, sites } = parsedData;
  
  return (
    <>
      {/**<img
        src="/img/demo.png"
        alt="..."
  ></img>{" "}**/}
    
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-4/12 px-4">
          {/*<CardSocialTraffic />*/}
          <div className="container mx-auto p-4">
            <SiteInfo totalSitePer={totalSitePer} totalReadings={totalReadings} />
            {/* Render the table component here using the 'sites' data */}
          </div>
          <Table sites={sites} />
        </div>
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
Dashboard.layout = Admin;
