import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ allowedRoles }) {
    const { auth } = useAuth();
    const location = useLocation();

    const hasRequiredRole = allowedRoles?.includes(auth?.role)

    return (
        hasRequiredRole ? <Outlet />
            : auth?.user
                ? <Navigate to="/app" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}