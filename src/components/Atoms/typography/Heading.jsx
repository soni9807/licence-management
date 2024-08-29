import React from "react";

const Heading = ({ heading, color = "black", size = "medium", weight = "normal", customStyles, ...rest }) => {
    const sizes = {
        small: "20px",
        medium: "24px",
        large: "32px",
    };

    const weights = {
        normal: "500",
        semibold: "700",
        bold: "900",
    };

    const fontSize = sizes[size] || sizes.medium;
    const fontWeight = weights[weight] || weights.normal;

    return (
        <p style={{ color, fontSize, fontWeight }} {...rest}>
            {heading}
        </p>
    );
};

export default Heading;
