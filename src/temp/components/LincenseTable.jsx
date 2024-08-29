import React from 'react';
import PropTypes from 'prop-types';
import "./GenerateModal.css";
import { disable_plan_config } from './plan_config.js';

const LincenseTable = ({ plan, data, isSubmitted }) => {
    // Early return if plan or data is not available
    if (!plan || !data[plan]) return null;

    const handleSelectValueChange = (updated_featureName, selectedValue, featureValuesDict) => {
        featureValuesDict[updated_featureName] = selectedValue;
    };

    return (
        <table className="custom-table" readOnly={isSubmitted}>
            <thead>
                <tr>
                    <th className="custom-th">Category</th>
                    <th className="custom-th">Feature Name</th>
                    <th className="custom-th">Value</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(data[plan]).flatMap((subcategory) => [
                    <tr key={subcategory}>
                        <td className="custom-td" rowSpan={Object.keys(data[plan][subcategory]).length + 1}>
                            {subcategory}
                        </td>
                    </tr>,
                    ...Object.keys(data[plan][subcategory]).map((subsubcategory) => {
                        const isDisabled = disable_plan_config[plan]?.[subcategory]?.[subsubcategory] === 'disable';
                        const options = data[plan][subcategory][subsubcategory];

                        return (
                            <tr key={`${subcategory}-${subsubcategory}`}>
                                <td className="custom-td">{subsubcategory}</td>
                                <td className="custom-td">
                                    <select
                                        className="custom-dropdown"
                                        disabled={isSubmitted || isDisabled}
                                        style={{
                                            color: 'black',
                                            backgroundColor: isDisabled ? 'lightgray' : 'white',
                                        }}
                                        onChange={(e) => handleSelectValueChange(subsubcategory, e.target.value)}
                                    >
                                        {options.map((value, index) => (
                                            <option key={index} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        );
                    }),
                ])}
            </tbody>
        </table>
    );
};

LincenseTable.propTypes = {
    plan: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
};

export default LincenseTable;