import React, { useState } from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { MenuSelectionContext } from "../components/PageChange/MenuSelectionContext";
import DashboardPage from "../pages/admin/dashboard";

export default function Admin({ children }) {
  const [menuSelection, setMenuSelection] = useState("All");
  const updateMenuSelection = (menu) => {
    setMenuSelection(menu);
  };

  return (
    <>
      <MenuSelectionContext.Provider value={menuSelection}>
        <Sidebar
          updateMenuSelection={updateMenuSelection}
          menuSelection={menuSelection}
        />
        <div className="relative md:ml-64 custom-bg-color">
          <AdminNavbar />
          {/* Header */}
          <HeaderStats />
          <div className="px-4 md:px-10 mx-auto w-full -m-30">
            <DashboardPage menuSelection={menuSelection} />
            {/* {children} */}
            {/**<FooterAdmin /> **/}
          </div>
        </div>
      </MenuSelectionContext.Provider>
    </>
  );
}
