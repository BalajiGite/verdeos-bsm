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
      <div className="flex mt-2">
        <span className="text-xxs w-full text-color-lable flex items-center">
          <img
            alt="user"
            className="w-4 h-4 rounded-full mr-2"
            src="/img/UserAdded.png"
          />
          <p className="text-center">Contact Us</p>
        </span>
        <span className="text-xxs w-full ml-4 text-color-lable flex items-center justify-end energy-usage-intensity-target-button-bg-color rounded">
          <p className="text-center">Send to Signage</p>
          <img
            alt="user"
            className="w-4 h-4 rounded-full mr-2 ml-2"
            src="/img/Display.png"
          />
        </span>
      </div>
    </>
  );
};

export default Team;
