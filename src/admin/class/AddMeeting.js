import React, { useEffect, useState } from "react";
import { LayoutDashboardIcon, CloudUpload, Trash2 } from 'lucide-react';
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";

export default function AddMeeting() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadingFile, setUploadingFile] = useState(null);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [uploadingVideo, setUploadingVideo] = useState(null);
    const [videoTitles, setVideoTitles] = useState({});
    const [kelasId, setKelasId] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = useParams();
    const { auth } = useAuth();
    const [currentPage, setCurrentPage] = useState("add meeting");
    const variants = ["light"];

    useEffect(() => {
        setKelasId(id);
    }, [id]);

    const getSignedUrl = async (file, type) => {
        try {
            const response = await axios.post('/api/s3/upload-url', {
                fileName: file.name,
                fileType: file.type,
                type, // "video" atau "file"
            }, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                }
            });

            return response.data; // { url, key }
        } catch (error) {
            console.error("Error getting signed URL:", error);
            throw error;
        }
    };

    const handleVideoUpload = async (event) => {
        const videoFile = event.target.files[0];
        if (!videoFile) return;

        setUploadingVideo(videoFile);

        try {
            const { url, key } = await getSignedUrl(videoFile, "video");
            await axios.put(url, videoFile, {
                headers: { 'Content-Type': videoFile.type }
            });

            setUploadedVideos(prev => [...prev, { file: videoFile, key }]);
        } catch (error) {
            console.error("Upload to S3 failed:", error);
        } finally {
            setUploadingVideo(null);
        }
    };


    const handleTitleChange = (index, value) => {
        setVideoTitles((prev) => ({ ...prev, [index]: value }));
    };

    const handleVideoRemove = (index) => {
        setUploadedVideos((prev) => prev.filter((_, i) => i !== index));
        setVideoTitles((prev) => {
            const updatedTitles = { ...prev };
            delete updatedTitles[index];
            return updatedTitles;
        });
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploadingFile(file);

        try {
            const { url, key } = await getSignedUrl(file, "file");
            await axios.put(url, file, {
                headers: { 'Content-Type': file.type }
            });

            setUploadedFiles(prev => [...prev, { file, key }]);
        } catch (error) {
            console.error("Upload to S3 failed:", error);
        } finally {
            setUploadingFile(null);
        }
    };


    const handleFileRemove = (fileName) => {
        setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
    };

    async function addMeeting(event) {
        event.preventDefault();

        try {
            const formData = {
                kelasId,
                tittle: title,
                description,
                videos: uploadedVideos.map((v, i) => ({
                    key: v.key,
                    title: videoTitles[i] || ""
                })),
                files: uploadedFiles.map((f) => ({
                    key: f.key,
                    name: f.file.name
                }))
            };

            const response = await axios.post('/api/meeting', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            });
            setMessage("Meeting added successfully");
        } catch (error) {
            setErrorMessage(error.response?.data.message)
            console.error("Error response:", error.response?.data || error.message);
        }
    }


    return (
        <>
            {variants.map((variant) => (
                <Breadcrumbs underline="active" onAction={(key) => setCurrentPage(key)} key={variant} variant={variant}>
                    <BreadcrumbItem href="/class">
                        Class
                    </BreadcrumbItem>
                    <BreadcrumbItem href={`/class/meeting/${id}`}>
                        Class Detail
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrent={currentPage === "add meeting"}>
                        Add Meeting
                    </BreadcrumbItem>
                </Breadcrumbs>
            ))}
            <div className="max-w-5xl mx-auto bg-white rounded-lg overflow-hidden p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="pr-4">
                        <LayoutDashboardIcon fill="#FFD60A" color="transparent" />
                    </span>
                    Add Meeting
                </h1>
                {message && (
                    <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
                        {message}
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-md">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={addMeeting} method="POST">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">
                                    Title
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Title"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows="5"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter meeting description here..."
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">
                                    Upload Videos
                                    <span className="text-red-500">*</span>
                                </label>
                                <p className="my-2 text-xs text-gray-500">Only files with formats: MP4, MKV, AVI, or MOV are allowed.</p>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideoUpload}
                                    className="text-sm mb-4"
                                />
                                {uploadingVideo && (
                                    <p className="text-gray-500">Uploading: {uploadingVideo.name}</p>
                                )}

                                {uploadedVideos.map((video, index) => (
                                    <div key={index} className="mb-2">
                                        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
                                            <span className="text-sm text-gray-600">{video.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleVideoRemove(index)}
                                                className="focus:outline-none"
                                            >
                                                <Trash2 className="text-red-500" size={18} />
                                            </button>
                                        </div>
                                        <label className="block text-sm font-medium mb-2 text-gray-600 mt-2">
                                            Video {index + 1} Title
                                            <span className="pl-1 text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={videoTitles[index] || ""}
                                            onChange={(e) => handleTitleChange(index, e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder={`Enter title for video ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mt-4 mb-2">Upload File
                                <span className="text-red-500">*</span>
                            </label>
                            <p className="my-2 text-xs text-gray-500">Only files with formats: PDF, or DOCX are allowed.</p>
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

                            {uploadingFile && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Uploading: {uploadingFile.name}</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                                    </div>
                                </div>
                            )}

                            {uploadedFiles.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-semibold text-gray-700 mb-2">Uploaded Files</h3>
                                    <ul>
                                        {uploadedFiles.map((file, index) => (
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
