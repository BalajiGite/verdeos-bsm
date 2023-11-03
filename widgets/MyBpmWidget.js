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
          src="/img/nick.jfif"
          alt="Nicolas Lianos"
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="px-6">
          <div className="font-bold text-md text-color-card-header mb-1">
            Nicholas Lianos
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
