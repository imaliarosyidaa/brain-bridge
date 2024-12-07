import { useState } from "react";
import Tab from "./Tab";

export default function ChangePassword() {
    // State to store form values
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New password and confirmation do not match.');
            return;
        }

        // Clear error message if validation passes
        setError('');

        // Call API or function to change password here
        console.log('Password change request:', { oldPassword, newPassword });

        // Provide success feedback (you could redirect or clear the form)
        alert('Password changed successfully!');
    };

    const handleReset = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <Tab />
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-600">Old Password</label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">New Password</label>
                    <input
                        type="password"
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
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Display error messages */}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button
                        onClick={handleSubmit}
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