import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Navbar from "./Navbar";
import useAuth from "../../hooks/useAuth";

export default function BookDetail() {
    const { auth } = useAuth();
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        async function fetchBook() {
            try {
                const response = await axios.get(`/api/books/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.accessToken}` // Token jika diperlukan
                    },
                });
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        }
        fetchBook();
    }, [id, auth.accessToken]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div class="p-8 h-screen">
                <embed src="https://drive.google.com/file/d/1Rwp85wH9Ztwo181vnE_4eb2UIOyBjJVI/view?usp=sharing" type="application/pdf" class="w-full h-full border-none" />
            </div>
        </div>
    );
}
