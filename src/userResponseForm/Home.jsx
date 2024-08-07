
import DropdownMenu from "./InputBoxes/DropdownMenu";
import React, { useState } from "react";
import InputBox from "./InputBoxes/InputBox";
import PrimaryButton from "./Buttons/PrimaryButton";
import './home.css'
import postUserResponseData from "../APIs/postUserResponseData";
import { inputFields } from "../util/inputfields";

const Home = () => {
    const [userData, setUserData] = useState(inputFields);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (index, value) => {
        const newUserData = [...userData];
        newUserData[index].value = value;
        setUserData(newUserData);
    };

    const handleDropdownChange = (index, value) => {
        const newUserData = [...userData];
        newUserData[index].selectedOption = value;
        setUserData(newUserData);
    };

    const postUserData = async () => {
        const payload = userData.reduce((acc, { label, value, selectedOption }) => {
            acc[label] = selectedOption || value;
            return acc;
        }, {});

        setLoading(true);
        await postUserResponseData(payload);
        setLoading(false);
    };

    return (
        <div className="homeHeroSection">
            <p className="heading">User response form</p>
            <div className="inputfieldsDiv">
                {userData.map(({ label, type, value, options }, index) => {
                    return type === "multi" ? (
                        <DropdownMenu
                            key={label}
                            heading={label}
                            options={options}
                            selectedOption={userData[index].selectedOption || ""}
                            setSelectedOption={(value) => handleDropdownChange(index, value)}
                        />
                    ) : (
                        <InputBox
                            key={label}
                            heading={label}
                            type={type}
                            value={value}
                            setValue={(text) => handleInputChange(index, text)}
                        />
                    );
                })}
            </div>
            <PrimaryButton buttonText={"Submit"} onPress={postUserData} loading={loading} />
        </div>
    );
};

export default Home;
