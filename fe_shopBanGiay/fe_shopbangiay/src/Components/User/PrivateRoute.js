import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRole }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user || user.role.toUpperCase() !== allowedRole.toUpperCase()) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
