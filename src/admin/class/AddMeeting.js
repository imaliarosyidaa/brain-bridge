import React, { useEffect, useState } from "react";
import { LayoutDashboardIcon, CloudUpload, Trash2 } from 'lucide-react';
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

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

    useEffect(() => {
        setKelasId(id);
    }, [id]);

    const handleVideoUpload = (event) => {
        const videoFile = event.target.files[0];
        if (!videoFile) return;

        setUploadingVideo(videoFile);
        setTimeout(() => {
            setUploadedVideos((prev) => [...prev, videoFile]);
            setUploadingVideo(null);
        }, 2000);
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

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadingFile(files[0]);

        setTimeout(() => {
            setUploadedFiles((prev) => [...prev, ...files]);
            setUploadingFile(null);
        }, 2000);
    };

    const handleFileRemove = (fileName) => {
        setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
    };

    async function addMeeting(event) {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('kelasId', kelasId);
            formData.append('tittle', title);
            formData.append('description', description);

            if (uploadedVideos) {
                uploadedVideos.forEach((video, index) => {
                    formData.append(`vidio${index + 1}`, video);
                    formData.append(`title_vid${index + 1}`, videoTitles[index] || "");
                });
            } else {
                setErrorMessage("Max. 1 upload video dan materi")
            }

            uploadedFiles.forEach((file, index) => {
                formData.append(`file_materi${index + 1}`, file);
            });

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
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
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
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Upload Videos
                            </label>
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
                                <div key={index} className="mb-4">
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
                                    <label className="block text-sm font-medium text-gray-600 mt-2">
                                        Video {index + 1} Title
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
    );
}
