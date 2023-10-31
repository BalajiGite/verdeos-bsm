import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://3m40b277z5.execute-api.ap-southeast-2.amazonaws.com/default"
const demoAPI = "https://day4cmh9h6.execute-api.ap-southeast-2.amazonaws.com/test"


export const getApiDataFromAws = async (item) => {
    try {
        const response = await axios.get(API_URL+"/verdeosSkysparkApiTest/?" + item);
        const data = response.data;
        return data;
    } catch (error) {
        return console.error('Error fetching data:', error);
    }
  }

export const getConnectedBuilding = async () => {
    try {
        const response = await axios.get(API_URL+"/verdeosSkysparkApiTest");
        
        const data = response.data;
        return data;
    } catch (error) {
        return console.error('Error fetching data:', error);
    }
}

export const getConnectedBuildingDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getDataSourcesDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTeamDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getImprvRecomondationDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getComplianceRepotingDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getDataSetsDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getGlobalPortfolioDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getPortfolioComplianceDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getPortfolioComplianceDataDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getEnergyUsageBySiteDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getWaterUsageBySiteDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTotalAlarmsBySiteDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTotalBreakdownBySiteDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTotalovveridesBySiteDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getPortfolioCertificationDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTotalPropertiesByNABERSRatingDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTotalPropertiesByGreenStarRatingDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getTotalPropertiesByStateRatingDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

export const getCarbonEmmisionBySiteDemo = async (item) => {
  try {
      const response = await axios.get(demoAPI+"/jsonData/" + item);
      const data = response.data;
      return data;
  } catch (error) {
      return console.error('Error fetching data:', error);
  }
}

