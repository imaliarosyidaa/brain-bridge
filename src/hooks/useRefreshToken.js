import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {
            console.log("Refreshing token...");
            const { refreshToken } = auth;

            if (!refreshToken) {
                throw new Error("No refresh token available");
            }

            const response = await axios.post('/api/auth/refresh-token',
                { refreshToken },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            setAuth(prev => ({
                ...prev,
                role: response.data.role,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            }));

            console.log("Token refreshed successfully:", response.data.accessToken);
            return response.data.accessToken;
        } catch (error) {
            console.error("Error refreshing token:", error.message);
            throw error;
        }
    };

    return refresh;
};

export default useRefreshToken;
