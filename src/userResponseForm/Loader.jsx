import React from 'react';
import './home.css';

const Loader = ({ size = "16px" }) => {
    return (
        <div className="spinner" style={{ height: size, width: size }} />
    );
};

export default Loader;
