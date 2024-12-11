import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

export default function AddClass() {
    const [kelasId, setKelasId] = useState();
    const [name, setName] = useState("");
    const [topic_id, setTopic_id] = useState("");
    const { id } = useParams();
    const { auth } = useAuth();

    useEffect(() => {
        setKelasId(id);
    }, [id]);

    const initialTopics = [
        { id: 1, name: "Mathematic Science" },
        { id: 2, name: "Science & Technology" },
        { id: 3, name: "Social Science" },
    ];

    async function addClass(event) {
        event.preventDefault();

        try {
            const response = await axios.post(
                "/api/class",
                JSON.stringify({
                    kelasId,
                    name,
                    topic_id: parseInt(topic_id, 10),
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                }
            );
            alert("Class added successfully!");
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            alert("Failed to add class. Please try again.");
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-xl font-bold text-gray-800 mb-6">Add Class</h1>
            <form method="POST" onSubmit={addClass}>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Class Title</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter title"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Category</label>
                        <select
                            value={topic_id}
                            onChange={(e) => setTopic_id(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="" disabled>Select category</option>
                            {initialTopics.map((topic) => (
                                <option key={topic.id} value={topic.id}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <button type="submit" className="bg-[#FFA62B] text-white px-6 py-2 rounded-lg shadow hover:shadow-md transition">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
