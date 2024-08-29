import React from "react";
import Heading from "./typography/Heading";

const Header = ({heading}) => {
  return (
    <div className="bg-[#1F3651] fixed top-0 left-0 w-full z-10">
      <Heading
        heading={heading}
        color="white"
        // customStyles="py-4 px-20"
        variant="large"
      />
    </div>
  );
};
export default Header;
