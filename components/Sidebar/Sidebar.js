import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import BuildingTypesWidget from "../../widgets/BuildingTypesWidget";
import ConnectedBuilding from "../../widgets/ConnectedBuilding";
import DataSourceWidget from "../../widgets/DataSourceWidget";
import ImprovementRecommendation from "../../widgets/ImprovementRecommendation";
import ComplianceReporting from "../../widgets/ComplianceReporting";
import MyBpmWidget from "../../widgets/MyBpmWidget";
import Team from "../../widgets/Team";

export default function Sidebar(props) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 mt-16 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl custom-bg-color flex flex-wrap items-center justify-between relative md:w-72 z-10 py-4 px-6 scrollbar">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
        
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a
                      href="#pablo"
                      className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    >
                      VerdeOS
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* <hr className="my-4 md:min-w-full" /> */}
            <div className="mt-4 space-y-8">
              <div className="text-center flex">
                <img className="w-6 h-6 mr-3" src="/img/portfolio.png" alt="portfolio" />
                <p className=" text-[#C5C5C5] font-medium">  Portfolio Manager</p>
              </div>

              <div className="text-center flex">
                <img className="w-6 h-6 mr-3" src="/img/system_Management.png" alt="system_management" />
                <p className=" text-[#8E8E8E] font-medium">  Systems Manager</p>
              </div>

              <div className="text-center flex">
                <img className="w-6 h-6 mr-3" src="/img/maintenance.png" alt="maintenance" />
                <p className="  text-[#8E8E8E] font-medium"> Maintenance Manager</p>
              </div>

              <div className="text-center flex">
                <img className="w-6 h-6 mr-3" src="/img/sustainable.png" alt="sustainable" />
                <p className="  text-[#8E8E8E] font-medium"> Sustainable Manager</p>
              </div>

              <div className="text-center flex">
                <img className="w-6 h-6 mr-3 " src="/img/DataPla.png" alt="data_Platform" />
                <p className="  text-[#8E8E8E] font-medium"> Data Platform</p>
              </div>
              {/* <div className="w-80 ml-4">
                <div className="font-medium text-color-card-header">
                 
                </div>
                <div className="font-medium text-color-card-header">
                  Team Homepage
                </div>
              </div> */}

              <hr className=" md:min-w-full custom-text-color " />
              <div className="flex items-center">
                <img className="h-4 w-4 mr-3" src="/img/Settings.png" alt="setting" />
                <p className=" text-[#8E8E8E]">Settings</p>
              </div>

              <div className="flex items-center">
                <img className="h-4 w-4 mr-3" src="/img/support.png" alt="setting" />
                <p className=" text-[#8E8E8E]">Supports</p>
              </div>
            </div>
            <div className="background-linear p-2 space-y-4 mt-4">
              <p className=" font-medium text-[#C5C5C5]">Total Alarms </p>
              <div className="flex text-[#8E8E8E] custom-border-color rounded border-2 w-36 px-2">last 30 days
                <span class="pointer-events-none  inset-y-0 right-0 ml-1 flex items-center pr-2">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              
              <div className="flex custom-border-color rounded border-2 w-40 px-2">
              <div className=" text-[#8E8E8E] flex border-r">121
                <span class="pointer-events-none  inset-y-0 right-0 ml-1 flex items-center pr-2">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <div className=" text-[#8E8E8E] flex border-r">18
                <span class="pointer-events-none  inset-y-0 right-0 ml-1 flex items-center pr-2">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <div className=" text-[#8E8E8E] flex">18
                <span class="pointer-events-none  inset-y-0 right-0 ml-1 flex items-center pr-2">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              </div>
              <hr/>
              <p className="font-medium text-[#C5C5C5]" >Sev 2</p>
              <div className="grid gap-4 grid-cols-2">
                <p className="text-[#C5C5C5]">AFC 5</p>
                <button className="text-[#C5C5C5] border-2	 rounded-md border-inherit">HVAC</button>
              </div>
              <div className="grid gap-4 grid-cols-2">
              <p className="text-[#C5C5C5]">AFC 3</p>
                <button className="text-[#C5C5C5] border-2	 rounded-md border-inherit">Electrical</button>
                </div>
                <div className="grid gap-4 grid-cols-2">
                <p className="text-[#C5C5C5]">AFC 12</p>
                <button className="text-[#C5C5C5] border-2	 rounded-md border-inherit">Water</button>
                  </div>
                  <hr/>
                  <p className="font-medium text-[#C5C5C5]" >Sev 1</p>
              <div className="grid gap-4 grid-cols-2">
                <p className="text-[#C5C5C5]">AFC 5</p>
                <button className="text-[#C5C5C5] border-2	 rounded-md border-inherit">HVAC</button>
              </div>
              <div className="grid gap-4 grid-cols-2">
              <p className="text-[#C5C5C5]">AFC 3</p>
                <button className="text-[#C5C5C5] border-2	 rounded-md border-inherit">Electrical</button>
                </div>
                <div className="grid gap-4 grid-cols-2">
                <p className="text-[#C5C5C5]">AFC 12</p>
                <button className="text-[#C5C5C5] border-2	 rounded-md border-inherit">Water</button>
                  </div>
                  <hr/>
                  <button className="text-[#C5C5C5] text-xs border-2	 rounded-md border-inherit w-full text-center p-1">Maintenance Manager Notification</button>
                  <button className="text-[#C5C5C5] text-sm border-2	 rounded-md border-inherit w-full text-center p-1">Building Services Partner</button>
            </div>
            {/**
              <MyBpmWidget />  
            */}
           
            <hr className="my-4 md:min-w-full" />
            <BuildingTypesWidget {...props} />
            {/**
            <hr className="my-4 md:min-w-full" />

            <ConnectedBuilding {...props} />

            <hr className="my-4 md:min-w-full" />

            <DataSourceWidget />

            <hr className="my-4 md:min-w-full" />

            <Team />

            <hr className="my-4 md:min-w-full" />

            <ImprovementRecommendation />
            <hr className="my-4 md:min-w-full" />

            <ComplianceReporting />
            */}
            <hr className="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
    </>
  );
}
