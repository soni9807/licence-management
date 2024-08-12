import React from "react";

const Heading = ({ heading, color = "black", variant = "medium", customStyles }) => {

    const styles = {
        small: {
            fontSize: "16px",
            fontWeight: "400",
        },
        medium: {
            fontSize: "20px",
            fontWeight: "500",
        },
        large: {
            fontSize: "24px",
            fontWeight: "700",
        },
    };

    const { fontSize, fontWeight } = styles[variant] || styles.medium;

    return (
        <p style={{ color, fontSize, fontWeight }} className={customStyles}>
            {heading}
        </p>
    );
};

export default Heading;