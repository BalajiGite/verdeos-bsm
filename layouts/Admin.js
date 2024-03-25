import React, { useState } from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { MenuSelectionContext } from "../components/PageChange/MenuSelectionContext";
import DashboardPage from "../pages/admin/dashboard";
import Navbar from '../components/Navbars/IndexNavbar';
export default function Admin({ children }) {
  const [menuSelection, setMenuSelection] = useState("All");
  const updateMenuSelection = (menu) => {
    setMenuSelection(menu);
  };

  return (
    <>
      <Navbar />
      <MenuSelectionContext.Provider value={menuSelection}>
        <Sidebar
          updateMenuSelection={updateMenuSelection}
          menuSelection={menuSelection}
        />
        <div className="relative md:ml-64">
          <div className="flex first-letter:items-center border border-gray-300 p-1 mx-14 border-[#8E8E8E] rounded-md mt-5">
            <img src="/img/Group.png" alt="Description of the image" className="mr-2 h-6 w-6 ml-6" />
            <span className="text-[#C5C5C5] mr-2 font-semibold">Automative Insights:</span>
            <input type="text" placeholder="Type a question about your data" className="text-[#C5C5C5] outline-none focus:outline-none flex-grow bg-transparent" />
          </div>

          <div className="flex mx-14 mt-5 background-color-linear p-4 border rounded border-[#8E8E8E] justify-between">
            <div className="border-r  border-[#8E8E8E] px-3">
              <p className="text-xl font-semibold text-[#C5C5C5]">Highlights<br/>
                Welcome back, Nicolas! </p>
                <p className="text-[#C5C5C5]">Since your last login on November 26th, you have:</p>
                <p className="text-[#C5C5C5]">154 sites connected</p>
            </div>
            <div className="mx-3 bg-[#0A1016] py-1 border border-[#8E8E8E] rounded">
              <p className="text-[#C5C5C5] py-1 px-3">2022 Environmental Sustainability Highlights</p>
             
              <hr className=" border-[#8E8E8E] w-full"/>
              <div className="flex px-4 mt-1">
                  <div className="flex items-center px-5 border-r border-[#8E8E8E]">
                    <img src="/img/Co2.png" className="h-10 w-10 object-contain" alt="Co2 group"/> 
                   <p className="text-[#C5C5C5] px-1"> Carbon Emissions <br/><span className="text-[#C5C5C5]">-86%</span></p>
                  </div>

                  <div className="flex items-center  border-r border-[#8E8E8E] px-5">
                    <img src="/img/Vector.png" className="h-10 w-10 object-contain" alt="Vector"/> 
                   <p className="text-[#C5C5C5] px-1"> Energy<br/><span className="text-[#C5C5C5]">-53%</span></p>
                  </div>

                  <div className="flex items-center px-5 ">
                    <img src="/img/Layer_1.png" className="h-10 w-10 object-contain" alt="Layer"/> 
                   <p className="text-[#C5C5C5] px-1"> Water<br/><span className="text-[#C5C5C5]">-60%</span></p>
                  </div>
              </div>
            </div>
            <div className=""> <img src="/img/close.png" className="h-6 w-6"/></div>
          </div>

          <AdminNavbar />
          {/* Header */}
          <HeaderStats />
          <div className="px-4 md:px-10 mx-auto w-full  -m-30">
            <DashboardPage menuSelection={menuSelection} />
            {/* {children} */}
            {/**<FooterAdmin /> **/}
          </div>
        </div>
      </MenuSelectionContext.Provider>
    </>
  );
}
