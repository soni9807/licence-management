import React from 'react';
import { useSelector } from 'react-redux';
import ErrorPage from '../GlobalComponents/ErrorPage';

const PrivateRoute = ({ Component }) => {
    const token = useSelector((state) => state.auth.token);

    return token ? <Component /> : <ErrorPage />;
};

export default PrivateRoute;
