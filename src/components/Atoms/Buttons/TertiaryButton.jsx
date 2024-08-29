import React from "react";
import Loader from "../../Atoms/loader/Loader";
import Heading from "../../Atoms/typography/Heading";
import Body from "../typography/Body";
import { theme } from "../../../util/theme";

const TertiaryButton = ({ buttonText, onPress, disabled, loading, customStyles, stretch }) => {
    return (
        <div
            onClick={!disabled ? onPress : null}
            className={`flex justify-center items-center cursor-pointer py-2 ${customStyles}
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
                ${stretch ? 'w-full' : 'w-fit'}
                ${
                    disabled || loading
                      ? "opacity-50 cursor-not-allowed"
                      : "transition-transform duration-200 ease-in-out transform hover:scale-105"
                  }`}
        >
            {loading && <Loader />}
            <Body body={buttonText} size="small" customStyles={{ textDecoration: "underline"}}/>
        </div>
    );
}

export default TertiaryButton;
