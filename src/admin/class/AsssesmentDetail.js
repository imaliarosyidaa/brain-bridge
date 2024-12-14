import { NotebookPenIcon, Edit } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { Form, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';

export default function AssesmentDetail() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadingFile, setUploadingFile] = useState(null);
    const { auth } = useAuth();
    const [assessment, setAssessment] = useState('');
    const [jawaban, setJawaban] = useState('');
    const [jawabanText, setJawabanText] = useState('');
    const { id } = useParams();
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [showInput, setShowInput] = useState(false)
    const [updatedNilai, setUpdatedNilai] = useState()

    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadingFile(files[0]);

        setTimeout(() => {
            setUploadedFiles((prev) => [...prev, ...files]);
            setUploadingFile(null);
        }, 2000);
    };

    async function handleUpload(event) {
        event.preventDefault();
        if (!uploadedFiles) {
            setError("No file selected.");
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("assesmentId", id)
            formData.append("file", uploadedFiles[0]);
            formData.append("jawaban", jawabanText);

            const response = await axios.post(`/api/jawaban`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                withCredentials: true,
            });
            setJawaban(response?.data);
            setSuccess("File uploaded successfully!")
            setMessage("Task successfully submitted!");
        } catch (error) {
            setErrorMessage("Task submission failed. Please try again");
            setError("Failed to upload file. Please try again.");
            console.error("Error response:", error.response?.data || error.message);
        } finally {
            setUploading(false);
        }
    };
    async function addNilai(event) {
        event.preventDefault();
        setError(null);
        setMessage(null);

        if (!updatedNilai) {
            setErrorMessage("Please enter a grade value.");
            return;
        }

        try {
            const response = await axios.put(`/api/jawaban/${id}/nilai`,
                { nilai: updatedNilai },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                }
            );
            setJawaban(response?.data);
            setMessage("Grade updated successfully!");
            setShowInput(false);
        } catch (error) {
            setErrorMessage("Failed to update grade. Please try again.");
            console.error("Error response:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/assesment/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                setAssessment(response?.data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        }
        fetchData();
    }, [id, auth.accessToken]);

    useEffect(() => {
        setUpdatedNilai(jawaban.nilai)
    }, [jawaban.nilai]);

    return (
        <>
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
            <div className="border-2 p-4 rounded-md">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
                    <div className="col-span-4 rounded-md">
                        <div className="flex items-center bg-blue px-4 py-2 rounded-md capitalize">
                            <div className="bg-white rounded-sm p-2">
                                <NotebookPenIcon color="#D7BC0B" />
                            </div>
                            <div className="pl-4">
                                <p className="font-bold text-white">{assessment.title}</p>
                            </div>
                        </div>
                        <h2 className="font-bold pt-3 text-gray-800">Description</h2>
                        <p className="font-medium text-gray-600">{assessment.description}</p>
                    </div>

                    <div className="col-span-2">
                        <div className='bg-orange p-4 rounded-md'>
                            <h3 className="font-bold text-[#343A40]">Deadline</h3>
                            <p className='text-white'>{assessment.deadline}</p>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-bold">Document</h3>
                            <ul className="list-disc list-inside">
                                <li>Document 1</li>
                                <li>Document 2</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <form method="POST" onSubmit={handleUpload} className="grid gap-4">
                        <h2 className="font-bold pt-3 text-gray-800">Description</h2>
                        <div className="h-40 bg-pink p-2 rounded-md overflow-auto">
                            <textarea
                                id="jawabanText"
                                name="jawabanText"
                                value={jawabanText}
                                onChange={(e) => setJawabanText(e.target.value)}
                                className="w-full h-full bg-transparent focus:outline-none"
                                placeholder="Input here..">
                            </textarea>
                        </div>

                        <div>
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                            <input
                                id="file-upload"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                                className="shadow-md px-4 py-2 rounded-md block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-[1px] file:text-sm file:font-semibold file:bg-white file:border-[#10B981] file:text-blue-700 hover:file:bg-teal-50"
                            />
                            {uploadingFile && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Uploading: {uploadingFile.name}</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <form method='PUT' onSubmit={addNilai}>
                                <div className="flex items-center bg-orange text-white px-4 py-2 rounded-md">
                                    <span className="font-bold mr-2">Grade:</span>
                                    {auth.role === 'ADMIN' || auth.role === 'PENGAJAR' ? (
                                        <>
                                            {!showInput ? (
                                                <>
                                                    <p className="mr-2">{jawaban.nilai ?? 0}</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowInput(true)}>
                                                        <Edit />
                                                    </button>
                                                </>
                                            ) : (
                                                <form method='PUT' onSubmit={addNilai}>
                                                    <input
                                                        type="number"
                                                        onChange={(e) => setUpdatedNilai(e.target.value)}
                                                        value={updatedNilai}
                                                        className="w-16 text-black px-2 py-1 rounded-md"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="bg-green-500 text-white px-2 py-1 rounded-md font-bold hover:bg-green-600 ml-2">
                                                        Save Changes
                                                    </button>
                                                </form>
                                            )}
                                        </>
                                    ) : (
                                        <p>{jawaban.nilai ?? 0}</p>
                                    )}
                                </div>

                            </form>
                            <button
                                type="submit"
                                onClick={handleUpload}
                                disabled={uploading}
                                className="bg-yellow text-white px-4 py-2 rounded-md font-bold hover:bg-yellow">
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}