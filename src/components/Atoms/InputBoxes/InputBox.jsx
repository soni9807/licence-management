import React from "react";

const InputBox = ({
  type = "text",
  placeholder,
  errorText,
  customStyles,
  ...rest
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className={`py-1 px-2 rounded-md w-full border ${customStyles}`}
        placeholder={placeholder}
        {...rest}
      />

      {errorText && (
        <div className="text-red-500 mt-1 text-sm">{errorText}</div>
      )}
    </div>
  );
};

export default InputBox;
