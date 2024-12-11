import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function Library() {
    const { auth } = useAuth();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/books',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            "Accept": "*/*",
                            Authorization: `Bearer ${auth.accessToken}`
                        },
                        withCredentials: true
                    }
                ); console.log("Full Response Data:", response.data);
                setBooks(response?.data);
                console.log("Book Title:", response.data[0].title);
                console.log("Book Cover:", response.data[0].cover);
                console.log("Book File:", response.data[0].file);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        }
        fetchData();
    }, [auth.accessToken]);

    return (
        <div>
            <Navbar />
            <div>
                <SearchBar />
                <BookList books={books} />
            </div>
        </div>
    );
}

function BookList({ books }) {
    return (
        <div className="grid grid-cols-3 gap-4 m-8">
            {books.map((book, index) => (
                <Book book={book} key={index} />
            ))}
        </div>
    );
}

function Book({ book }) {
    return (
        <div className="w-full shadow rounded-lg p-4 hover:shadow-md transition">
            <div>
                <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-auto"
                />
            </div>
            <div className="grid grid-cols-2 pt-4">
                <div>
                    <p className="pt-4 font-semibold">{book.title}</p>
                </div>
                <div className="flex items-center justify-end">
                    <Download />
                    <Link to={`/books/${book.id}`}>
                        <button className="bg-yellow p-2 rounded-sm ml-4">OPEN</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}