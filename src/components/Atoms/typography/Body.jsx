import React from "react";

const Body = ({ body, color = "black", size = "medium", weight = "normal", customStyles, ...rest }) => {
    const sizes = {
        small: "14px",
        medium: "16px",
        large: "18px",
    };

    const weights = {
        normal: "400",
        semibold: "600",
        bold: "800",
    };

    const fontSize = sizes[size] || sizes.medium;
    const fontWeight = weights[weight] || weights.normal;

    return (
        <p style={{ color, fontSize, fontWeight, ...customStyles }} {...rest}>
            {body}
        </p>
    );
};

export default Body;
