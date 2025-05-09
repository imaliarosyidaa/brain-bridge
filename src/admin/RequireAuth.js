import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export default function RequireAuth({ allowedRoles }) {
    const { auth } = useAuth();
    const location = useLocation();
    // Decode token to extract role
    let decoded;
    try {
        decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : null;
    } catch (error) {
        console.error("Failed to decode token:", error);
        decoded = null;
    }

    const role = decoded?.role; // Adjust based on your token structure

    const hasRequiredRole = allowedRoles?.includes(role)

    return (
        hasRequiredRole ? <Outlet />
            : auth?.user
                ? <Navigate to="/" state={{ from: location }} replace />
                : <Navigate to="/signin" state={{ from: location }} replace />
    )
}