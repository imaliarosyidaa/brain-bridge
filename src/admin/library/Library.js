// src/admin/library/Library.js
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

export default function Library() {
    const { auth } = useAuth();
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBooks() {
            setLoading(true);
            try {
                const response = await axios.get(
                    `/api/books?search=${encodeURIComponent(searchTerm)}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                        withCredentials: true,
                    }
                );
                setBooks(response?.data || []);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, [auth.accessToken, searchTerm]);

    // Handler perubahan search input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <Navbar />
            <div>
                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <BookList books={books} auth={auth} navigate={navigate} />
                )}
            </div>
        </div>
    );
}

function BookList({ books, auth, navigate }) {
    return (
        <div className="grid grid-cols-3 gap-4 m-8">
            {books.map((book) => (
                <Book book={book} key={book.id} auth={auth} navigate={navigate} />
            ))}
        </div>
    );
}

function Book({ book, auth, navigate }) {
    const handleDownload = async () => {
        try {
            const response = await axios.get(`/api/books/${book.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                withCredentials: true,
            });
            const fileUrl = response.data.file;
            window.location.href = fileUrl;
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    const handleOpen = () => {
        navigate(`/books/${book.id}`);
    };

    return (
        <div className="w-full shadow rounded-lg p-4 hover:shadow-md transition">
            <div>
                <img src={book.cover} alt={book.title} className="w-full h-auto" />
            </div>
            <div className="grid grid-cols-2 pt-4">
                <div>
                    <p className="pt-4 font-semibold">{book.title}</p>
                </div>
                <div className="flex items-center justify-end">
                    <Download onClick={handleDownload} className="cursor-pointer" />
                    <button
                        onClick={handleOpen}
                        className="bg-yellow-500 p-2 rounded-sm ml-4">
                        OPEN
                    </button>
                </div>
            </div>
        </div>
    );
}
