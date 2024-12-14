import { useState } from "react";
import Tab from "./Tab";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

export default function ChangePassword() {
    const { auth } = useAuth();
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = () => {
        setName("");
        setError("");
        setMessage("");
    };

    async function createTopic(event) {
        event.preventDefault();

        try {
            const response = await axios.post('/api/topic',
                JSON.stringify({ name }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "*/*",
                        Authorization: `Bearer ${auth.accessToken}`
                    },
                    withCredentials: true
                }
            );
            setMessage(response?.data?.message || "Topic created successfully!");
            setError("");
        } catch (error) {
            setError(error.response?.data?.error || "An error occurred. Please try again.");
            setMessage("");
            console.error("Error response:", error.response?.data || error.message);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <Tab />

            <form onSubmit={createTopic} method="POST">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">Topic Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        Add Topic
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}