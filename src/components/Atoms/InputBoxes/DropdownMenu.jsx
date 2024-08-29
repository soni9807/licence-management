import React, { useState } from 'react';


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
        <div className='flex justify-start items-center space-x-1 w-fit'>
            <p className='text-xs font-bold w-[10vw]'>{heading}:</p>
            <div className='flex justify-center items-center'>
                <select
                    className={`text-xs border border-gray-200 py-1 px-2 rounded-md w-[15vw]  ${error ? 'border-red-600' : ''}`}
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
