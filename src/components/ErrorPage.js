// src/components/ErrorPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from './Atoms/typography/Heading';
import Body from './Atoms/typography/Body';
import PrimaryButton from './Atoms/Buttons/PrimaryButton';
import { BiSolidError } from "react-icons/bi";
import { TbError404 } from "react-icons/tb";

const ErrorPage = () => {
    const navigation = useNavigate();
    const handleBackToHome = () => {
        navigation('/');
    };

    return (
        <div className='bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full h-screen flex justify-center items-center'>
           <div className='self-center'>
            <div>
                <BiSolidError size={72}/>
                <TbError404  size={72}/>
            </div>
           <Heading heading={"Error"}/>
            <Body body="There was an issue. Please try again or contact support."/>
            <PrimaryButton buttonText="Back to home" onPress={handleBackToHome}/>
           </div>
        </div>
    );
};
export default ErrorPage;
