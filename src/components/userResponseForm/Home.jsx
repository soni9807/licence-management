
import DropdownMenu from "./InputBoxes/DropdownMenu";
import React, { useState } from "react";
import InputBox from "./InputBoxes/InputBox";
import PrimaryButton from "./Buttons/PrimaryButton";
import './home.css'
import { inputFields } from "../../util/inputfields";
import postUserResponseData from "../../APIs/postUserResponseData";
import Heading from "../../components/typography/Heading";
import withAuth from "../../auth/withAuth";

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
        <div className="homeHeroSectionm my-12 bg-gray-100 rounded-lg">
            <Heading heading="User response form" variant="large" customStyles="text-center my-5" />
            <div className="inputfieldsDiv">
                {userData.map(({ label, type, value, options, info }, index) => {
                    return type === "multi" ? (
                        <DropdownMenu
                            key={label}
                            heading={label}
                            options={options}
                            tooltip={info}
                            selectedOption={userData[index].selectedOption || ""}
                            setSelectedOption={(value) => handleDropdownChange(index, value)}
                        />
                    ) : (
                        <InputBox
                            key={label}
                            heading={label}
                            type={type}
                            value={value}
                            tooltip={info}
                            setValue={(text) => handleInputChange(index, text)}
                        />
                    );
                })}
            </div>
            <PrimaryButton buttonText={"Submit"} onPress={postUserData} loading={loading} />
        </div>
    );
};

export default withAuth(Home);
