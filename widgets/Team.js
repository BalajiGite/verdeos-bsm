import React, { useState, useEffect } from 'react';
import {
    getTeamDemo
  } from "../api/dashboardDataService"; 

const Team = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const resp = await getTeamDemo(4);
        setTeamData(resp); 
      };
  
      fetchData();
  }, []);

  return (
    <div className="bg-blue-800 text-white p-4 rounded">
      <h2 className="text-2xl font-bold mb-4">Team</h2>
      <ul>
        {teamData.map(member => (
          <li key={member.id} className="mb-4 flex items-center">
            <img
              src={member.profileImg}
              alt={member.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-xl font-bold">{member.name}</p>
              <p className="text-md">{member.Title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );  
};

export default Team;
