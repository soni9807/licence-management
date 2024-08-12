import React, { useState } from 'react';
import '../home.css';

import { ReactComponent as Info_svg } from "../../../assests/svgs/info.svg"
import { Tooltip } from 'react-tooltip';

const DropdownMenu = ({ heading, options, selectedOption, setSelectedOption, tooltip, errorText = "Please select an option" }) => {
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);

        if (value === "") {
            setError(true);
        } else {
            setError(false);
        }
    };

    return (
        <div className='textInputBox'>
            <p className='inputHeading'>{heading}:</p>
            <div className='inputdiv'>
                <select
                    className={`text-sm border-2 border-gray-600 py-1 px-2 rounded-md ${!tooltip ? 'w-[90%]' : 'w-full'} ${error ? 'border-red-600' : ''}`}
                    id="dropdown"
                    name="dropdown"
                    value={selectedOption}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select option</option>
                    {options.map(({ item, id }) => (
                        <option key={id} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                {tooltip && (
                    <div data-tooltip-id="info-tooltip" className='infoIcon'>
                        <Info_svg />
                    </div>
                )}
                {error && <p className='errorText'>{errorText}</p>}
            </div>
            {tooltip && (
                <Tooltip id="info-tooltip" place='top' content={tooltip} />
            )}
        </div>
    );
};

export default DropdownMenu;
