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
        <div className="flex w-1/2 border mr-1 bg-slate-600 border-slate-500">
          <div className="text-xxs w-40 text-color-lable pl-1 flex items-center justify-center h-full">
            <p className="text-center">Account Settings</p>
          </div>
          <img
            alt="user"
            className="w-5 h-5 rounded-full float-right mr-2 pt-1"
            src="https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
          />
        </div>
        <div className="flex w-1/2 border bg-slate-600 border-slate-500">
          <div className="text-xxs w-40 text-color-lable pl-1 flex items-center justify-center">
            <p className="text-center">Sign Out</p>
          </div>
          <img
            alt="user"
            className="w-5 h-5 rounded-full mr-4 pt-1"
            src="https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
          />
        </div>
      </div>
    </>
  );
};

export default MyBpmWidget;
