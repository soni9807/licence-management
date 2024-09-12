import React, { useState } from "react";
import Body from "../Atoms/typography/Body";
import SNYPR_LOGO from "../../assests/images/optimaLogo.png";
import { theme } from "../../util/theme";
import Tenants from "../../temp/license_management";
import TenantsLicensingAudit from "../../temp/license_management_audit";
import { TbLicense } from "react-icons/tb";
import Footer from "../Atoms/Footer";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { FaUserCog } from "react-icons/fa";
import Profile from "./Profile";

const menuOptions = [
  { id: 0, label: "Licence management", component: <Tenants /> },
  { id: 1, label: "Licence audit", component: <TenantsLicensingAudit /> },
  { id: 2, label: "Profile", component: <Profile /> },
];

const LicenceManagment = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const togglePanel = () => {
    setIsPanelOpen(prevState => !prevState);
  };

  return (
    <div className="flex w-full">
      <aside
        className={`fixed h-screen transition-transform duration-300 ${
          isPanelOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: theme?.colors?.surface?.primary, width: "15%" }}
        aria-label="Sidebar"
      >
        <img src={SNYPR_LOGO} alt="SNYPR Logo" className="px-4 h-15 my-4" />
        <Body
          weight="bold"
          className="uppercase pt-8 px-4"
          color={theme?.colors?.text?.invertPrimary}
          body="Licence management"
        />
        <nav className="my-8 w-8/10">
          {menuOptions.slice(0, 2).map(({ id, label }) => (
            <div
              key={id}
              className={`flex items-center space-x-2 cursor-pointer p-4 ${
                activeTab === id ? "bg-gradient-to-r from-violet-800 to-fuchsia-700" : ""
              }`}
              onClick={() => setActiveTab(id)}
            >
              <TbLicense color={theme?.colors?.text?.invertPrimary} />
              <Body body={label} color={theme?.colors?.text?.invertPrimary} />
            </div>
          ))}
        </nav>
        <Body
          weight="bold"
          className="uppercase pt-8 px-4 mb-4"
          color={theme?.colors?.text?.invertPrimary}
          body="Settings"
        />
        <div
          className={`flex items-center space-x-2 cursor-pointer p-4 ${
            activeTab === 2 ? "bg-gradient-to-r from-violet-800 to-fuchsia-700" : ""
          }`}
          onClick={() => setActiveTab(2)}
        >
          <FaUserCog color={theme?.colors?.text?.invertPrimary} />
          <Body color={theme?.colors?.text?.invertPrimary} body="Profile" />
        </div>
      </aside>

      <main
        className={`ml-auto mr-4 transition-all duration-300 ${
          isPanelOpen ? "w-10/12" : "w-full"
        }`}
        aria-label="Main Content"
      >
        {menuOptions[activeTab]?.component}
        <Footer />
      </main>

      <button
        className="fixed bottom-0 p-4 cursor-pointer bg-transparent border-none"
        onClick={togglePanel}
        aria-label={isPanelOpen ? "Close panel" : "Open panel"}
      >
        {isPanelOpen ? (
          <div className="flex items-center space-x-2 px-2 py-1">
            <LuPanelLeftClose
              color={!isPanelOpen ? theme?.colors?.surface?.primary : "white"}
              size="24"
            />
            <Body body="Close" color={theme?.colors?.text?.invertPrimary} />
          </div>
        ) : (
          <div className="flex items-center space-x-2 border-2 border-blue-500 rounded-md px-2 py-1"
          style={{ background: theme?.colors?.surface?.secondary}}>
            <LuPanelLeftOpen
              color={!isPanelOpen ? theme?.colors?.surface?.primary : "white"}
              size="24"
            />
            <Body body="Open" color={theme?.colors?.text?.primary} />
          </div>
        )}
      </button>
    </div>
  );
};

export default LicenceManagment;
