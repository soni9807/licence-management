
import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import Caption from "../typography/Caption";
import { theme } from "../../../util/theme";
import { MdOutlineInfo, MdOutlineCancel } from "react-icons/md";
import { BiError } from "react-icons/bi";

const InputBox = ({
  type,
  placeholder,
  errorText,
  tooltip,
  customStyles,
  ...rest
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center space-x-2">
        <input
          id="inputBox"
          type={type}
          className={`py-1 px-2 rounded-md w-full ${customStyles}`}
          placeholder={placeholder}
          {...rest}
        />

        {tooltip && (
          <div data-tooltip-id="info-inputbox-tooltip" className="infoIcon">
            <MdOutlineInfo color={theme.colors.surface.primary} size={24} />
          </div>
        )}
      </div>
      {errorText && (
        <div className="flex justify-start items-center space-x-1 mt-1">
          <BiError color={theme.colors.error.primary} />
          <Caption caption={errorText} color={theme.colors.error.primary} />
        </div>
      )}
      {tooltip && (
        <Tooltip id="info-inputbox-tooltip" place="bottom" content={tooltip} />
      )}
    </div>
  );
};

export default InputBox;
