import React, { useState } from "react";
import Body from "../Atoms/typography/Body";
import SNYPR_LOGO from "../../assests/images/optimaLogo.png";
import { theme } from "../../util/theme";
import Tenants from "../../temp/license_management";
import Tenants_licensing_audit from "../../temp/license_management_audit";
import { TbLicense } from "react-icons/tb";
import Footer from "../Atoms/Footer";

const LicenceManagment = () => {
  const [activeTab, setActiveTab] = useState(0);

  const menuOptions = [
    { id: 0, label: "Licence management", component: <Tenants /> },
    { id: 1, label: "Licence audit", component: <Tenants_licensing_audit /> },
  ];

  return (
    <div className="w-full flex justify-start items-start">
      <div
        className={`fixed py-4 h-screen w-2/10`}
        style={{ background: theme?.colors?.surface?.primary }}
      >
        <img src={SNYPR_LOGO} className="px-4 h-10 " />
        <Body
          weight="bold"
          className="uppercase pt-8 px-4"
          color={theme?.colors?.text?.invertPrimary}
          body={"Licence management"}
        />
        <div className="my-8 w-8/10 ">
          {menuOptions?.map(({ id, label }) => (
            <div
              key={id}
              className={`flex justify-start space-x-2 items-center cursor-pointer p-4 ${
                activeTab === id ? "bg-gray-800" : ""
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
      </div>
      <div className="ml-auto" style={{ width: "85%" }}>
        {menuOptions[activeTab]?.component}
        <Footer />
      </div>
    </div>
  );
};

export default LicenceManagment;
