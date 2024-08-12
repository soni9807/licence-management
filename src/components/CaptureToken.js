import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../reduxStore/slices/authSlice';


const CaptureToken = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigation = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            dispatch(setUser({ token, user: "hello" }));
            navigation("/form")
        }
    }, [location, dispatch]);

    return null;
};

export default CaptureToken;
