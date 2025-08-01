import React, { useEffect, useState } from "react";
import { CloudUpload, Trash2, LayoutDashboardIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";

export default function AddAssessment() {
    const [uploadedFile1, setUploadedFile1] = useState([]);
    const [uploadingFile1, setUploadingFile1] = useState(null);
    const [kelasId, setKelasId] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadlines, setDeadlines] = useState("");
    const { id } = useParams();
    const { auth } = useAuth();
    const [currentPage, setCurrentPage] = useState("add assessment");
    const variants = ["light"];

    useEffect(() => {
        setKelasId(id);
    }, [id]);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadingFile1(files[0]);

        setTimeout(() => {
            setUploadedFile1((prev) => [...prev, ...files]);
            setUploadingFile1(null);
        }, 2000);
    };

    const handleFileRemove = (fileName) => {
        setUploadedFile1((prev) => prev.filter((file) => file.name !== fileName));
    };

    async function addAssessment(event) {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('kelasId', kelasId);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('deadlines', deadlines);

            if (uploadedFile1.length > 0) {
                formData.append('file1', uploadedFile1[0]);
                formData.append('file2', uploadedFile1[1]);
                formData.append('file3', uploadedFile1[2]);
            }

            const response = await axios.post('/api/assesment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            });

            alert("Assessment added successfully!");
            setTitle('');
            setDescription('');
            setDeadlines('');
            setUploadedFile1([]);
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            alert("Failed to add assessment. Please try again.");
        }
    }

    return (
        <>
            {variants.map((variant) => (
                <Breadcrumbs underline="active" onAction={(key) => setCurrentPage(key)} key={variant} variant={variant}>
                    <BreadcrumbItem key="home" href="/">
                        Home
                    </BreadcrumbItem>
                    <BreadcrumbItem href="/class">
                        Class
                    </BreadcrumbItem>
                    <BreadcrumbItem href={`/class/meeting/${id}`}>
                        Class Detail
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrent={currentPage === "add assessment"}>
                        Add Assessment
                    </BreadcrumbItem>
                </Breadcrumbs>
            ))}
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="pr-4">
                        <LayoutDashboardIcon fill="#FFD60A" color="transparent" />
                    </span>
                    Add Assessment
                </h1>
                <form method="POST" onSubmit={addAssessment}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Title
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter title"
                            />

                            <label className="block font-semibold text-gray-700 mt-4 mb-2">Description
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter description"
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="date" className="block font-semibold text-gray-700 mb-2">
                                Deadline
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={deadlines}
                                onChange={(e) => setDeadlines(e.target.value)}
                                id="date"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <label className="block font-semibold text-gray-700 mt-4 mb-2">Upload File</label>
                            <div className="border-2 border-dashed border-blue-400 rounded-lg h-32 flex items-center justify-center cursor-pointer">
                                <label htmlFor="file-upload" className="flex flex-col items-center">
                                    <CloudUpload className="text-blue-400 mb-2" size={36} />
                                    <span className="text-gray-600">
                                        Drag & drop files or <span className="text-blue-500 underline">Browse</span>
                                    </span>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                </label>
                            </div>
                            <p class="my-2 text-xs text-gray-500">Only files with formats: PDF, or DOCX are allowed.</p>

                            {uploadingFile1 && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Uploading: {uploadingFile1.name}</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                                    </div>
                                </div>
                            )}

                            {uploadedFile1.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-semibold text-gray-700 mb-2">Uploaded Files</h3>
                                    <ul>
                                        {uploadedFile1.map((file, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 mb-2"
                                            >
                                                <span className="text-sm text-gray-600">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleFileRemove(file.name)}
                                                    className="focus:outline-none"
                                                >
                                                    <Trash2 className="text-red-500" size={18} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="bg-[#FFA62B] text-white px-6 py-2 rounded-lg shadow hover:shadow-md transition">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
