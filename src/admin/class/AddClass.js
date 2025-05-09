import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";

export default function AddClass() {
    const [kelasId, setKelasId] = useState();
    const [name, setName] = useState("");
    const [topic_id, setTopic_id] = useState("");
    const [pengajar_id, setPengajar_id] = useState("");
    const [description, setDescription] = useState("");
    const { id } = useParams();
    const { auth } = useAuth();
    const [topics, setTopics] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [currentPage, setCurrentPage] = useState("add class");
    const variants = ["light"];

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/topic", {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                setTopics(response?.data || []);
            } catch (error) {
                console.error("Error response:", error.response?.data || error.message);
            }
        }
        fetchData();
    }, [auth.accessToken]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/user/pengajar", {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                setTeachers(response?.data || []);
            } catch (error) {
                console.error("Error response:", error.response?.data || error.message);
            }
        }
        fetchData();
    }, [auth.accessToken]);

    async function addClass(event) {
        event.preventDefault();

        if (!topic_id || topic_id < 1 || topic_id > 3) {
            alert("Please select a valid category (1 to 3).");
            return;
        }

        if (!pengajar_id || pengajar_id < 1 || pengajar_id > 3) {
            setPengajar_id(auth.id)
            return;
        }

        try {
            const response = await axios.post("/api/class",
                JSON.stringify({
                    kelasId,
                    name,
                    description,
                    topic_id,
                    pengajar_id,
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
            const errorMessage = error.response?.data?.message || "Failed to add class. Please try again.";
            alert(Array.isArray(errorMessage) ? errorMessage.join("\n") : errorMessage);
            console.error("Error response:", error.response?.data || error.message);
        }
    }

    return (
        <>
            {variants.map((variant) => (
                <Breadcrumbs underline="active" onAction={(key) => setCurrentPage(key)} key={variant} variant={variant}>
                    <BreadcrumbItem key="class" isCurrent={currentPage === "class"} href="/class">
                        Class
                    </BreadcrumbItem>
                    <BreadcrumbItem key="add class" isCurrent={currentPage === "add class"}>
                        Add Class
                    </BreadcrumbItem>
                </Breadcrumbs>
            ))}

            <div className="max-w-4xl mx-auto bg-white rounded-lg p-6">
                <h1 className="text-xl font-bold text-gray-800 mb-6">Add Class</h1>
                <form method="POST" onSubmit={addClass}>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Class Title <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter title"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
                            <textarea
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-28 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter description"
                            />
                        </div>

                        {auth.role === 'ADMIN' && (
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Teacher</label>
                                <select
                                    value={pengajar_id}
                                    onChange={(e) => setPengajar_id(parseInt(e.target.value, 10))}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="" disabled>
                                        Select Person
                                    </option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.id} : {teacher.first_name} {teacher.last_name} - {teacher.email}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                            <select
                                value={topic_id}
                                onChange={(e) => setTopic_id(parseInt(e.target.value, 10))}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="" disabled>
                                    Select category
                                </option>
                                {topics.map((topic) => (
                                    <option key={topic.id} value={topic.id}>
                                        {topic.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-[#FFA62B] text-white px-6 py-2 rounded-lg shadow hover:shadow-md transition"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
