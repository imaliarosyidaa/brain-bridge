import React, { useEffect, useState } from "react";
import { LayoutDashboardIcon } from 'lucide-react'
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

export default function AddMeeting() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [kelasId, setKelasId] = useState();
    const [tittle, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [vidio1, setVidio1] = useState("");
    const [title_vid1, setTitleVid1] = useState("");
    const [vidio2, setVidio2] = useState("");
    const [title_vid2, setTitleVid2] = useState("");
    const [vidio3, setVidio3] = useState("");
    const [title_vid3, setTitleVid3] = useState("");
    const [file_materi1, setFileMateri1] = useState(null);
    const [file_materi2, setFileMateri2] = useState(null);
    const [file_materi3, setFileMateri3] = useState(null);
    const { id } = useParams();
    const { auth } = useAuth();

    useEffect(() => {
        setKelasId(id)
    }, [id])

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles([...uploadedFiles, ...files]);
    };

    const handleVideoUpload = (e) => {
        setSelectedVideo(e.target.files[0]);
    };

    const removeFile = (fileName) => {
        setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName));
    };

    async function addMeeting(event) {
        event.preventDefault();

        try {
            const response = await axios.post('/api/meeting',
                JSON.stringify({
                    kelasId,
                    tittle,
                    description,
                    vidio1,
                    title_vid1,
                    vidio2,
                    title_vid2,
                    vidio3,
                    title_vid3,
                    file_materi1,
                    file_materi2,
                    file_materi3,
                }), {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "*/*",
                    Authorization: `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            }
            );
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            alert("update failed, please check your credentials.");
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

            <form onSubmit={addMeeting} method="POST">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="mb-4">
                            <label htmlFor="topic" className="block text-sm font-medium text-gray-600 mb-1">
                                Tittle
                            </label>
                            <input
                                type="text"
                                id="tittle"
                                value={tittle}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Database"
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
                                Upload Video Materi
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-100 border border-dashed border-gray-400 rounded-lg p-4 flex items-center justify-center w-20 h-20">
                                    <img
                                        src="/path/to/video-placeholder.png"
                                        alt="Video Placeholder"
                                        className="w-12 h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Please upload a square image, size less than 100KB
                                    </label>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoUpload}
                                        className="text-sm"
                                    />
                                    <p className="text-gray-500 mt-1 text-sm">
                                        {selectedVideo ? selectedVideo.name : "No File Chosen"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Upload Materi
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                                <p className="text-blue-600 font-medium cursor-pointer">
                                    Drag & drop files or <span className="underline">Browse</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Supported formats: PDF, PPT, WORD
                                </p>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {uploadedFiles.length > 0 && (
                            <>
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-600">Uploading - {uploadedFiles.length} file(s)</h4>
                                    <div className="h-2 bg-blue-400 rounded-md w-full mt-1" />
                                </div>

                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-600">Uploaded</h4>
                                    <ul className="mt-2">
                                        {uploadedFiles.map((file, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2 mb-2"
                                            >
                                                <span className="text-gray-700 text-sm">{file.name}</span>
                                                <button
                                                    onClick={() => removeFile(file.name)}
                                                    className="text-red-600 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
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
    );
}
