import React from "react";

const MyBpmWidget = () => {
  return (
    <>
      <div className="flex mb-4">
        <div className="w-80 text-color-card-header font-medium uppercase">
          My BPM
        </div>
      </div>
      <div className=" flex overflow-hidden shadow-lg mb-2">
        <img
          src="https://media.licdn.com/dms/image/C5603AQFwM1ZQTMqYfQ/profile-displayphoto-shrink_800_800/0/1632541429558?e=1703116800&v=beta&t=hQDhHaqZpuJ6855siHdwBX-LuVh_i3mgIXCxHQHY1R4"
          alt="Nicolas Lianos"
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="px-6">
          <div className="font-bold text-md text-color-card-header mb-1">
            Nicolas Lianos
          </div>
          <p className="text-color-lable text-sm pb-2">Head of Real Estate</p>
        </div>
      </div>
      <div className="flex">
        <span className="text-xxs w-full text-color-lable flex items-center justify-end">
          <img
            alt="user"
            className="w-5 h-5 rounded-full mr-4"
            src="/img/Logout.png"
          />
          <p className="text-center">Sign Out</p>
        </span>
      </div>
    </>
  );
};

export default MyBpmWidget;
