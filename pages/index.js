
import React, { useState, useEffect } from 'react';
import awsExports from '../api/aws-exports';
import { Amplify, API, Auth, Storage, withSSRContext } from 'aws-amplify';

// components
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import Table from "components/buildingData/dataTbl.js"
import SiteInfo from "components/buildingData/SiteInfo.js"
import DashboardPage from "pages/admin/dashboard.js" 

// layout for page
import Admin from "layouts/Admin.js";

Amplify.configure({ ...awsExports, ssr: true });
/**
export async function getServerSideProps() {
  try {
    const hearder = {
      headers: {
        'x-api-key': awsExports.apiKey // Replace with your API key
      }
    };
    const response = await API.get('verdeosSkysparkApiTest-API', '/verdeosSkysparkApiTest', hearder);
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
**/

const Dashboard = () => {
  
  return (
    <>
      <DashboardPage/>    
    </>
  );
}

export default Dashboard;
Dashboard.layout = Admin;
