import React from "react";
import Heading from "../Atoms/typography/Heading"
import Body from "../Atoms/typography/Body"

const Profile = ()=>{
    return(<div className="m-4">

        <Heading heading="Settings" weight="semibold"/>
        <div className="border-bottom w-full mb-4"/>
        <Body body={"Account settings"} />
        
    </div>)
}

export default Profile;

