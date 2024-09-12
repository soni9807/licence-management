import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../reduxStore/slices/authSlice';

const CaptureToken = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const paramObject = {};
        params.forEach((value, key) => {
            paramObject[key] = value;
        });

        const token = params.get('token');
        if (token) {
            dispatch(setUser({ token, user: paramObject.user || "defaultUser" }));
            navigate("/licence-management");
        }
    }, [location, dispatch, navigate]);

    return null;
};

export default CaptureToken;
