import React, { useState } from 'react';
import '../home.css';
import { Tooltip } from 'react-tooltip';
import { ReactComponent as Info_svg } from "../../assests/svgs/info.svg"

const InputBox = ({ type, heading, errorText = "Only valid input is allowed", value, setValue }) => {
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
                    className='inputBox'
                    type={type === 'date' ? 'date' : 'text'}
                    value={value}
                    onChange={handleChange}
                    placeholder={type === 'numeric' ? 'Enter a number' : type === 'date' ? 'YYYY-MM-DD' : 'Enter text'}
                />
                <div data-tooltip-id="info-tooltip" className='infoIcon'>
                    <Info_svg />
                </div>
                {error && <p className='errorText'>
                    {errorText}
                </p>}
            </div>
            <Tooltip id="info-tooltip"
                place='top'
                content='Testing tooltip' />
        </div>
    );
};

export default InputBox;
