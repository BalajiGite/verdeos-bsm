import React, { useState, useEffect } from "react";
import { getTeamDemo } from "../api/dashboardDataService";

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
    <>
      <div className="flex mb-4">
        <div className="w-80 text-color-card-header font-medium uppercase">
          Meet the Team
        </div>
      </div>
      {teamData.map((member) => (
        <div
          key={member.id}
          className=" flex max-w-xs rounded-lg overflow-hidden shadow-lg mb-2"
        >
          <img
            src={member.profileImg}
            alt={member.name}
            className="w-10 h-10 object-cover rounded "
          />
          <div className="px-6">
            <div className="font-bold text-md text-color-card-header mb-1">
              {member.name}
            </div>
            <p className="text-color-lable text-sm pb-2">{member.Title}</p>
          </div>
        </div>
      ))}
      <div className="flex ml-1 mt-2">
        <div className="ml-1 mt-2">
          <div className="text-sm text-color-lable italic-font">
            Your Real Estate Management Team’s welcome message for new users
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
