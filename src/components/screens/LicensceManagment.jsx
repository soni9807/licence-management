import React, { useState } from "react";
import Body from "../Atoms/typography/Body";
import SNYPR_LOGO from "../../assests/images/optimaLogo.png";
import { theme } from "../../util/theme";
import Tenants from "../../temp/license_management";
import Tenants_licensing_audit from "../../temp/license_management_audit";
import { TbLicense } from "react-icons/tb";
import Footer from "../Atoms/Footer";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { FaUserCog } from "react-icons/fa";
import Profile from "./Profile";


const LicenceManagment = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const menuOptions = [
    { id: 0, label: "Licence management", component: <Tenants /> },
    { id: 1, label: "Licence audit", component: <Tenants_licensing_audit /> },
    { id: 2, label: "Profile", component: <Profile /> },

  ];

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="w-full flex">
      <div
        className={`fixed h-screen transition-transform duration-300 ${
          isPanelOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: theme?.colors?.surface?.primary,
          width: "15%",
        }}
      >
        <img src={SNYPR_LOGO} className="px-4 h-15 my-4" />
        <Body
          weight="bold"
          className="uppercase pt-8 px-4"
          color={theme?.colors?.text?.invertPrimary}
          body={"Licence management"}
        />
        <div className="my-8 w-8/10 ">
          {menuOptions?.slice(0,2)?.map(({ id, label }) => (
            <div
              key={id}
              className={`flex justify-start space-x-2 items-center cursor-pointer p-4 ${
                activeTab === id ? "bg-gradient-to-r from-violet-800 to-fuchsia-700" : ""
              }`}
              onClick={() => {
                setActiveTab(id);
              }}
            >
              <TbLicense color={theme?.colors?.text?.invertPrimary} />
              <Body body={label} color={theme?.colors?.text?.invertPrimary} />
            </div>
          ))}
        </div>
        <Body
          weight="bold"
          className="uppercase pt-8 px-4 mb-4"
          color={theme?.colors?.text?.invertPrimary}
          body={"Settings"}
        />
        <div className={`flex justify-start space-x-2 items-center cursor-pointer p-4 ${
                activeTab === 2 ? "bg-gradient-to-r from-violet-800 to-fuchsia-700" : ""
              }`}
              onClick={() => {
                setActiveTab(2);
              }}>
          <FaUserCog color={theme?.colors?.text?.invertPrimary}/>
        <Body
          color={theme?.colors?.text?.invertPrimary}
          body={"Profile"}
        />
        </div>
      </div>

      <div
        className={`ml-auto  mr-4 transition-all duration-300 ${
          isPanelOpen ? "w-10/12" : "w-full"
        }`}
      >
        {menuOptions[activeTab]?.component}
        <Footer />
      </div>
      <div className="fixed bottom-0 p-4 cursor-pointer" onClick={togglePanel}>
        {isPanelOpen ? (
       <div className="flex justify-center items-center space-x-2">
           <LuPanelLeftClose
            color={!isPanelOpen ? theme?.colors?.surface?.primary : "white"}
            size="24"
          />
          <Body body={"Close"} color={theme?.colors?.text?.invertPrimary}/>
        </div>
        ) : (
          <div className="flex justify-center items-center space-x-2">
          <LuPanelLeftOpen
            color={!isPanelOpen ? theme?.colors?.surface?.primary : "white"}
            size="24"
          />
           <Body body={"Open"} color={theme?.colors?.text?.primary}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default LicenceManagment;
