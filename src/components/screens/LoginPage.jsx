import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../Atoms/typography/Heading";
import PrimaryButton from "../Atoms/Buttons/PrimaryButton";
import Body from "../Atoms/typography/Body";
import { theme } from "../../util/theme";
import InputBox from "../Atoms/InputBoxes/InputBox";
import { MdEmail, MdOutlineWifiPassword } from "react-icons/md";
import TertiaryButton from "../Atoms/Buttons/TertiaryButton";
import SecondaryButton from "../Atoms/Buttons/SecondaryButton";

const Login = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState([
    {
      id: 0,
      leftIcon: <MdEmail color={theme.colors.surface.primary} size={32} />,
      error: "",
      tooltipInfo: "testing",
      value: "",
      placeholder: "Enter email or username",
    },
    {
      id: 1,
      leftIcon: (
        <MdOutlineWifiPassword color={theme.colors.surface.primary} size={32} />
      ),
      error: "",
      tooltipInfo: "testing",
      value: "",
      placeholder: "Enter password",
    },
  ]);

  const handleInputChange = (id, newValue) => {
    setInputData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, value: newValue } : item
      )
    );
  };

  return (
    <div className="rounded-md overflow-hidden">
      <div className="bg-gray-100 p-8 mt-16 space-y-2 rounded-t-md ">
        <Heading
          heading="Login to Licence management"
          size="large"
          weight="semibold"
          color={theme.colors.surface.primary}
        />
        <Body
          body="Sign in to your account"
          size="medium"
          color={theme.colors.text.secondary}
        />
        <div>
          {inputData?.map((item) => (
            <div
              key={item.id}
              className="flex justify-start items-start space-x-4 py-2"
            >
              {item?.leftIcon}
              <InputBox
                value={item?.value}
                onChange={(e) => handleInputChange(item.id, e.target.value)}
                placeholder={item?.placeholder}
                tooltip={item?.tooltipInfo}
                errorText={item?.error}
              />
            </div>
          ))}
        </div>
        <TertiaryButton buttonText="Forget password?" customStyles="ml-auto" />
        <div className="flex space-x-4 mt-4">
          <PrimaryButton stretch buttonText="Login" />
          <SecondaryButton stretch buttonText="Signup" />
        </div>
      </div>
      <div className={`bg-[${theme.colors.surface.primary}] p-8 pb-16`}>
        <Body
          body="Having trouble signing in?"
          color="white"
          className="text-center"
        />
        <Body
          body="Contact us through our slack channel or view the sign up steps"
          color="white"
          className="text-center"
        />
        <div className="flex space-x-4 mt-4">
          <SecondaryButton stretch buttonText="Slack channel" />
          <SecondaryButton stretch buttonText="Documentation" />
        </div>
      </div>
    </div>
  );
};

export default Login;
