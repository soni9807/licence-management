import React, { useState } from 'react';
import '../home.css';
import { Tooltip } from 'react-tooltip';
import { ReactComponent as Info_svg } from "../../../assests/svgs/info.svg"

const InputBox = ({ type, heading, errorText = "Only valid input is allowed", value, setValue, tooltip }) => {
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const inputValue = e.target.value;

        if (type === 'numeric') {
            if (!isNaN(inputValue) || inputValue === '') {
                setValue(inputValue);
                setError(false);
            } else {
                setError(true);
            }
        } else if (type === 'date') {
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (datePattern.test(inputValue) || inputValue === '') {
                setValue(inputValue);
                setError(false);
            } else {
                setError(true);
            }
        } else {
            setValue(inputValue);
            setError(false);
        }
    };

    return (
        <div className='textInputBox'>
            <p className='inputHeading'>{heading}: </p>
            <div className='inputdiv'>
                <input
                    className={`text-sm border-2 border-gray-600 py-1 px-2 rounded-md ${!tooltip ? 'w-[90%]' : 'w-full'}`}
                    type={type === 'date' ? 'date' : 'text'}
                    value={value}
                    onChange={handleChange}
                    placeholder={type === 'numeric' ? 'Enter a number' : type === 'date' ? 'YYYY-MM-DD' : 'Enter text'}
                />
                {tooltip && <div data-tooltip-id="info-tooltip" className='infoIcon'>
                    <Info_svg />
                </div>}
                {error && <p className='errorText'>
                    {errorText}
                </p>}
            </div>
            {tooltip && <Tooltip id="info-tooltip"
                place='top'
                content={tooltip} />}
        </div>
    );
};

export default InputBox;
