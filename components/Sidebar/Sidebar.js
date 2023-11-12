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
  const router = useRouter();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl custom-bg-color flex flex-wrap items-center justify-between relative md:w-72 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/">
            <a
              href="#pablo"
              className="md:block text-left text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold px-0"
            >
              <img
                alt="..."
                className="w-full rounded-full align-middle border-none"
                src="/img/logo.png"
              ></img>
            </a>
          </Link>
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

            <hr className="my-4 md:min-w-full" />
            <div className="flex ml-2">
              <div className="w-20">
                <img className="w-8 h-8 mt-2" src="/img/Home.png" alt="home" />
              </div>
              <div className="w-80 ml-4">
                <div className="font-medium text-color-card-header">
                  Administrative
                </div>
                <div className="font-medium text-color-card-header">
                  Team Homepage
                </div>
              </div>
            </div>

            <hr className="my-4 md:min-w-full" />
            <MyBpmWidget />
            <hr className="my-4 md:min-w-full" />

            <BuildingTypesWidget {...props} />

            <hr className="my-4 md:min-w-full" />

            <ConnectedBuilding />

            <hr className="my-4 md:min-w-full" />

            <DataSourceWidget />

            <hr className="my-4 md:min-w-full" />

            <Team />

            <hr className="my-4 md:min-w-full" />

            <ImprovementRecommendation />
            <hr className="my-4 md:min-w-full" />

            <ComplianceReporting />
            <hr className="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
    </>
  );
}
