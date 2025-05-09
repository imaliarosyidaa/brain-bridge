import { useState, useEffect } from "react";
import Tab from "./Tab";
import { EyeIcon, EyeOff } from "lucide-react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

export default function ChangePassword() {
    const { auth } = useAuth();
    const [oldPassword, setOldPassword] = useState(auth.password);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleReset = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    async function updatePassword(event) {
        event.preventDefault();

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New password and confirmation do not match.');
            return;
        }

        try {
            const response = await axios.put('/api/profile/change-password',
                JSON.stringify({
                    oldPassword,
                    newPassword,
                    confirmPassword
                }), {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "*/*",
                    Authorization: `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            }
            );
            setMessage(response?.data?.message)
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            alert("update failed, please check your credentials.");
        }
    }
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
            <Tab />

            <form onSubmit={updatePassword} method="PUT">
                <div className="mb-4">
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-600">Old Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="oldPassword"
                            value={oldPassword}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-4 text-gray-600 focus:outline-none"
                        >
                            {showPassword ? <EyeOff /> : <EyeIcon />}
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">New Password</label>
                    <input
                        type="text"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm New Password</label>
                    <input
                        type="text"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Display error messages */}
                {error && <p className="text-red-500 text-sm my-2">{error}</p>}

                {/* Display success messages */}
                {message && <p className="text-green-700 text-sm my-4">{message}</p>}

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue text-white rounded hover:bg-sky-500"
                    >
                        Change Password
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};