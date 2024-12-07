import React, { useState } from "react";
import { CloudUpload, Trash2 } from "lucide-react";

export default function AddAssesment() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadingFile, setUploadingFile] = useState(null);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadingFile(files[0]);

        // Simulasi proses upload
        setTimeout(() => {
            setUploadedFiles((prev) => [...prev, ...files]);
            setUploadingFile(null);
        }, 2000);
    };

    const handleFileRemove = (fileName) => {
        setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-xl font-bold text-gray-800 mb-6">Add Assignment</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Topics and Description */}
                <div>
                    <label className="block font-semibold text-gray-700 mb-2">Topics</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter topic"
                    />

                    <label className="block font-semibold text-gray-700 mt-4 mb-2">
                        Description
                    </label>
                    <textarea
                        rows="5"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter description"
                    ></textarea>
                </div>

                {/* Right Column: File Upload */}
                <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                        Upload File
                    </label>
                    <div className="border-2 border-dashed border-blue-400 rounded-lg h-32 flex items-center justify-center cursor-pointer">
                        <label htmlFor="file-upload" className="flex flex-col items-center">
                            <CloudUpload className="text-blue-400 mb-2" size={36} />
                            <span className="text-gray-600">Drag & drop files or <span className="text-blue-500 underline">Browse</span></span>
                            <input
                                id="file-upload"
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </label>
                    </div>

                    {/* Uploading Progress */}
                    {uploadingFile && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">
                                Uploading: {uploadingFile.name}
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                            </div>
                        </div>
                    )}

                    {/* Uploaded Files */}
                    {uploadedFiles.length > 0 && (
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-700 mb-2">Uploaded</h3>
                            <ul>
                                {uploadedFiles.map((file, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 mb-2"
                                    >
                                        <span className="text-sm text-gray-600">{file.name}</span>
                                        <button onClick={() => handleFileRemove(file.name)}>
                                            <Trash2 className="text-red-500" size={18} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
                <button className="w-full bg-yellow-500 text-white font-bold py-2 rounded-lg hover:bg-yellow-400">
                    Add
                </button>
            </div>
        </div>
    );
}
