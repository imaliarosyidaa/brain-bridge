import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error("Error refreshing token:", error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (!auth?.accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
    }, [auth?.accessToken, refresh]);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`Auth Access Token: ${auth?.accessToken ? auth.accessToken : "undefined"}`);
    }, [isLoading, auth?.accessToken]);

    return (
        <>
            {isLoading ? <p>Loading...</p> : <Outlet />}
        </>
    );
};

export default PersistLogin;
