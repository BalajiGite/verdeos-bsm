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
          Team
        </div>
      </div>
      {teamData.map((member) => (
        <div
          key={member.id}
          class=" flex max-w-xs rounded-lg overflow-hidden shadow-lg mb-2"
        >
          <img
            src={member.profileImg}
            alt={member.name}
            class="w-10 h-10 object-cover rounded "
          />
          <div class="px-6">
            <div class="font-bold text-md text-color-card-header mb-1">
              {member.name}
            </div>
            <p class="text-color-lable text-sm pb-2">{member.Title}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Team;
