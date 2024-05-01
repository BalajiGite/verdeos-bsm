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
  const [visiblenotification, setVisibleNotification] = useState(true);
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
          <div className="flex first-letter:items-center border border-gray-300 p-1 mx-14 border-[#8E8E8E] rounded-md mt-5 items-center">
            <img src="/img/ai.png" alt="Description of the image" className="mr-2 h-4 w-4 ml-6" />
            <span className="text-[#C5C5C5] mr-2 font-semibold">Automative Insights:</span>
            <input type="text" placeholder="Type a question about your data" className="text-[#C5C5C5] outline-none focus:outline-none flex-grow bg-transparent" />
          </div>
          {visiblenotification && (
            <div className="mx-14 mt-5 background-color-linear p-4 border rounded border-[#8E8E8E] relative">
              <div className="absolute top-0 right-0"><img src="/img/close.png" className="h-6 w-6 cursor-pointer" onClick={()=>setVisibleNotification(!visiblenotification)}/></div>
            <div className="flex justify-between">
            <div className="border-r pr-5 border-[#8E8E8E] px-3">
              <p className="text-xl font-semibold text-[#C5C5C5] mb-0 text-sm">Actionable Insights Summary</p>
              <p className="text-[#C5C5C5] mb-0 text-sm">Since your last login you have:</p>
              <p className="text-[#C5C5C5] mb-0 text-sm">11     Services calls initiated</p>
              <p className="text-[#C5C5C5] mb-0 text-sm">14    New sites connected</p>
              <p className="text-[#C5C5C5] mb-0 text-sm">154  Persistent alarms cleared</p>
            </div>
            <div className="mx-3 bg-[#0A1016] py-1 border border-[#8E8E8E] rounded">
              <p className="text-[#C5C5C5] py-1 px-3 mb-0">2022 Environmental Sustainability Highlights</p>

              <hr className=" border-[#8E8E8E] w-full" />
              <div className="flex px-4 mt-1">
                <div className="flex items-center px-5 border-r border-[#8E8E8E]">
                  <img src="/img/Co2.png" className="h-10 w-10 object-contain" alt="Co2 group" />
                  <p className="text-[#C5C5C5] px-1 mb-0"> Carbon Emissions <br /><span className="text-[#C5C5C5]">-86%</span></p>
                </div>

                <div className="flex items-center  border-r border-[#8E8E8E] px-5">
                  <img src="/img/Vector.png" className="h-10 w-10 object-contain" alt="Vector" />
                  <p className="text-[#C5C5C5] px-1 mb-0"> Energy<br /><span className="text-[#C5C5C5]">-53%</span></p>
                </div>

                <div className="flex items-center px-5 border-r border-[#8E8E8E]">
                  <img src="/img/Layer_1.png" className="h-10 w-10 object-contain" alt="Layer" />
                  <p className="text-[#C5C5C5] px-1 mb-0"> Water<br /><span className="text-[#C5C5C5]">-60%</span></p>
                </div>

                <div className="flex items-center px-5  border-[#8E8E8E]">
                  <img src="/img/trash.png" className="h-10 w-10 object-contain" alt="trash" />
                  <p className="text-[#C5C5C5] px-1 mb-0"> WDR <br /><span className="text-[#C5C5C5]">+9%</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-3 bg-[#0A1016] py-1 border border-[#8E8E8E] rounded mt-5">
              <p className="text-[#C5C5C5] py-1 px-3 mb-0">2024 Building Performance Summary (YTD)</p>

              <hr className=" border-[#8E8E8E] w-full" />
              <div className="flex px-4 mt-1">
                <div className="flex items-center px-5 border-r py-1 border-[#8E8E8E]">
                  <img src="/img/vector-1.png" className="h-10 w-10 object-contain" alt="Vector" />
                  <p className="text-[#C5C5C5] px-1 mb-0"> Portfolio Availability <br /><span className="text-[#C5C5C5]">+16%</span></p>
                </div>

                <div className="flex items-center  border-r border-[#8E8E8E] px-5">
                  <img src="/img/vector-2.png" className="h-10 w-10 object-contain" alt="Vector" />
                  <p className="text-[#C5C5C5] px-1 mb-0"> Electrical Costs<br /><span className="text-[#C5C5C5]">-18%</span></p>
                </div>

                <div className="flex items-center px-5 border-r border-[#8E8E8E]">
                  <img src="/img/vector-2.png" className="h-10 w-10 object-contain" alt="Layer" />
                  <p className="text-[#C5C5C5] px-1 mb-0">Water Costs<br /><span className="text-[#C5C5C5]">-29%</span></p>
                </div>

                <div className="flex items-center px-5 border-r border-[#8E8E8E]">
                  <img src="/img/vector-3.png" className="h-10 w-10 object-contain" alt="trash" />
                  <p className="text-[#C5C5C5] px-1 mb-0"> Data Quality <br /><span className="text-[#C5C5C5]">+68%</span></p>
                </div>

                <div className="flex items-center px-5  border-[#8E8E8E]">
                  <img src="/img/vector-4.png" className="h-10 w-10 object-contain" alt="trash" />
                  <p className="text-[#C5C5C5] px-1 mb-0"> Service Calls<br /><span className="text-[#C5C5C5]">-14%</span></p>
                </div>
              </div>
            </div>
          </div>
          )}
          {/* <AdminNavbar /> */}
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
