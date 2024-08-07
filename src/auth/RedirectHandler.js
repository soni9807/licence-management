// src/components/RedirectHandler.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/authSlice';
import axios from 'axios';

const RedirectHandler = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        const userData = query.get('user');

        if (token && userData) {
            const user = JSON.parse(decodeURIComponent(userData));
            dispatch(setUser({ token, user }));

        } else {
            navigation.push('/error');  // Redirect to an error page if token or user data is missing
        }
    }, [dispatch, navigation]);

    return <div>Loading...</div>;
};

export default RedirectHandler;
