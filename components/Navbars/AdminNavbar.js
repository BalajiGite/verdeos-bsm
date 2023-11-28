import React from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4 space-x-4">
          {/* Brand */}
          <div className="text-white p-4 rounded w-full bg-portfolio-certification">
            <h2 className="text-lg font-bold mb-2">
              Building Portfolio Manager
            </h2>
            <p className="text-sm">Demo Edition v1.0</p>
            {/* Add cart items or content here */}
          </div>

          <div className="text-white p-4 rounded bg-portfolio-certification w-full">
            <h2 className="text-lg font-bold mb-2">
              Grosvenor Engineering Group
            </h2>
            <p className="text-sm">IoT & Data Analytics</p>
            {/* Add cart items or content here */}
          </div>

          <div className="text-white p-4 rounded bg-portfolio-certification w-full">
            <div className="inline-block">
              <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full border border-white">
                <img
                  alt="..."
                  className="w-full rounded-full align-middle shadow-lg"
                  src="/img/team-1-800x800.jpg"
                />
              </span>
            </div>
            <div className="ml-2 inline-block">
              <h2 className="text-lg font-bold mb-2">Grosvenor</h2>
              <p className="text-sm text-white">Redefining Building Outcomes</p>
            </div>
          </div>
        </div>
      </nav>

      {/* End Navbar */}
    </>
  );
}
