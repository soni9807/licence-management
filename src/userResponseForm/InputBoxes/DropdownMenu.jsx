import React from 'react';

import '../home.css'

const DropdownMenu = ({ heading, options, selectedOption, setSelectedOption }) => {


    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className='textInputBox'>
            <p className='inputHeading'>{heading}:</p>
            <select className='inputBox2' id="dropdown" name="dropdown" value={selectedOption} onChange={handleChange}>
                <option value="" disabled>Select option</option>
                {
                    options.map(({ item, id }) => (
                        <option key={id} value={item}>
                            {item}
                        </option>
                    ))
                }
            </select>
        </div>
    );
};


export default DropdownMenu;
