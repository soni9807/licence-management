import React, { useState } from 'react';

const CheckBox = ({ label, required, errorText = "This checkbox is required", checked, setChecked }) => {

    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const isChecked = e.target.checked;
        setChecked(isChecked);

        if (isChecked) {
            setError(false);
        } else {
            if (required) {
                setError(true);
            }
        }
    };

    return (
        <div className='flex justify-start items-center space-x-1'>
            <div className='checkboxDiv'>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                <p className='inputHeading'> {label}</p>
            </div>

            {error && <p className='errorText'>{errorText}</p>}
        </div>
    );
};

export default CheckBox;
