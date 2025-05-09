import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from '../brain-bridge-logo.png';
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
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        };

        if (!auth?.accessToken) {
            verifyRefreshToken();
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [auth?.accessToken, refresh]);

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <img src={logo} alt="logo" className='w-40 animate-pulse' />
                    <div className="text-gray-500 font-medium">Loading</div>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default PersistLogin;
