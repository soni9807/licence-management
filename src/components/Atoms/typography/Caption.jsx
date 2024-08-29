import React from "react";

const Caption = ({ caption, color = "gray", size = "small", weight = "normal", customStyles, ...rest }) => {
    const sizes = {
        small: "12px",
        medium: "14px",
        large: "16px",
    };

    const weights = {
        normal: "400",
        semibold: "500",
        bold: "700",
    };

    const fontSize = sizes[size] || sizes.small;
    const fontWeight = weights[weight] || weights.normal;

    return (
        <p style={{ color, fontSize, fontWeight, ...customStyles }} {...rest}>
            {caption}
        </p>
    );
};

export default Caption;
