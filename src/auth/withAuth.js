import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../util/routes";

const withAuth = (WrappedComponent) => {
    const ComponentWithAuth = (props) => {
        const navigate = useNavigate();
        const { token } = useSelector((state) => state.auth);

        useEffect(() => {
            if (!token) {
                navigate(ROUTES.LOGIN);
            }
        }, [token, navigate]);

        if (token === null) {
            return null;
        }

        return token ? <WrappedComponent {...props} /> : null;
    };

    return ComponentWithAuth;
};

export default withAuth;
