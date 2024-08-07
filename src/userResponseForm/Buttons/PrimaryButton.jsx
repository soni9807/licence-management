import React, { useState } from "react";
import '../home.css';
import Loader from "../Loader";

const PrimaryButton = ({ buttonText, onPress, disabled, loading }) => {

    return (
        <div
            onClick={!disabled ? onPress : null}
            className={`primaryButton ${disabled ? 'disabled' : ''}`}
        >
            {loading && <Loader />}
            <p>{buttonText}</p>
        </div>
    );
}

export default PrimaryButton;
