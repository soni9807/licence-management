import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../Atoms/Buttons/PrimaryButton";
import Heading from "../Atoms/typography/Heading";

const LicenceManagment = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Heading heading={"Your are not logged in! Please Login First"} />
            <PrimaryButton buttonText="Generate Licence" onPress={() => { navigate("/generate-licence") }} />
            <PrimaryButton buttonText="Refresh Licence" onPress={() => { navigate("/refresh-licence") }} />
            <PrimaryButton buttonText="Disable Licence" onPress={() => { navigate("/disable-licence") }} />
            <PrimaryButton buttonText="Audit Licence" onPress={() => { navigate("/generate-audit-licence") }} />
            <PrimaryButton buttonText="Licence Management" onPress={() => { navigate("/licence-management") }} />
        </div>
    )
}

export default LicenceManagment;