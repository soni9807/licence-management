import React from "react";
import Loader from "../../Atoms/loader/Loader";
import Body from "../typography/Body";
import { theme } from "../../../util/theme";

const SecondaryButton = ({ buttonText, onPress, disabled, loading, customStyles, stretch }) => {
    return (
        <div
            onClick={!disabled ? onPress : null}
            className={`flex justify-center items-center bg-gray-300   border-2 border-gray-300 rounded-md cursor-pointer py-2 px-6 ${customStyles}
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
                ${stretch ? 'w-full' : 'w-fit'} ${
                    disabled || loading
                      ? "opacity-50 cursor-not-allowed"
                      : "transition-transform duration-200 ease-in-out transform hover:scale-105"
                  }`}
        >
            {loading && <Loader />}
            <Body body={buttonText} size="medium" weight="semibold" />
        </div>
    );
}

export default SecondaryButton;
