import React from "react";
import Loader from "../../Atoms/loader/Loader";
import Body from "../typography/Body";
import { theme } from "../../../util/theme";

const PrimaryButton = ({ buttonText, onPress, disabled, loading, customStyles, stretch }) => {
    return (
        <div
            onClick={!disabled ? onPress : null}
            className={`flex justify-center items-center px-6 bg-[${theme.colors.surface.primary}] border border-[${theme.colors.surface.primary}] rounded-md cursor-pointer p-2 ${customStyles}
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
                ${stretch ? 'w-full' : 'w-fit'} 
                ${
                    disabled || loading
                      ? "opacity-50 cursor-not-allowed"
                      : "transition-transform duration-200 ease-in-out transform hover:scale-105"
                  }`
            }
        >
            {loading && <Loader />}
            <Body body={buttonText} size="medium" weight="semibold" color="white" />
        </div>
    );
}

export default PrimaryButton;
