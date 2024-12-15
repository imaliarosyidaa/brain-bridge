// src/admin/library/BookDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import Navbar from "./Navbar";
import useAuth from "../../hooks/useAuth";

export default function BookDetail() {
    const { auth } = useAuth();
    const { id } = useParams();
    const [previewUrl, setPreviewUrl] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // To prevent state updates after unmount
        async function fetchBookPreview() {
            setLoading(true);
            try {
                const response = await axios.get(`/api/books/${id}/preview`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true, // Include credentials if backend requires them
                    responseType: "blob", // Expect a blob (PDF)
                });

                // Create a Blob URL from the PDF data
                const url = URL.createObjectURL(
                    new Blob([response.data], { type: "application/pdf" })
                );
                if (isMounted) setPreviewUrl(url);
            } catch (error) {
                console.error("Error fetching book preview:", error);
                if (isMounted) setError("Failed to load book preview.");
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchBookPreview();

        // Cleanup Blob URL when component unmounts
        return () => {
            isMounted = false;
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [id, auth.accessToken, previewUrl]);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className='p-8 h-screen flex items-center justify-center'>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <div className='p-8 h-screen flex items-center justify-center'>
                    <p className='text-red-500'>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className='p-8 h-screen'>
                {previewUrl ? (
                    <embed
                        src={previewUrl}
                        type='application/pdf'
                        className='w-full h-full border-none'
                    />
                ) : (
                    <p>Preview not available.</p>
                )}
            </div>
        </div>
    );
}