import React from "react";
import Heading from "../Atoms/typography/Heading";
import Body from "../Atoms/typography/Body";
import InputBox from "../Atoms/InputBoxes/InputBox";

const Profile = () => {
  const inputfields = [
    { id: 0, label: "Email address", value: "ssoni@securonix.com" },
    { id: 1, label: "Name", value: "Saurabh Soni" },
    { id: 2, label: "Role", value: "viewer" },
  ];
  return (
    <div className="m-4">
      <Heading heading="Settings" weight="semibold" />
      <div className="border-bottom w-full mb-4" />
      <Body body={"Account settings"} />
      <div className="space-y-2 p-4 border rounded-md my-4">
        {inputfields?.map((item) => (
          <div className="space-y-1">
            <Body body={item?.label} />
            <InputBox
              value={item?.value}
              customStyles={"bg-gray-300 border-gray-400"}
            />
          </div>
        ))}
      </div>

      <Body body={"Notification settings"} />
      <div lassName="space-y-2 p-4 border rounded-md my-4">
        <input
          type="checkbox"
          className="form-check-input"
          id="formSwitchCheckChecked"
          checked=""
        />
      </div>
      <Body body={"Change password"} />
      <div className="space-y-2 p-4 border rounded-md my-4">
        {inputfields?.map((item) => (
          <div className="space-y-1">
            <Body body={item?.label} />
            <InputBox
              value={item?.value}
              customStyles={"bg-gray-300 border-gray-400"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
