/* eslint-disable no-undef */
import React, { useState, useEffect, useCallback } from "react";
import axios from "../../api/axios"; // Pastikan path-nya benar
import useAuth from "../../hooks/useAuth";
import debounce from "lodash.debounce";
import { MessageSquareMoreIcon } from "lucide-react";

// Helper function untuk memformat waktu
const formatTime = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Mengubah 0 menjadi 12
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes; // Perbaiki template literal
    return `${hours}:${minutesStr} ${ampm}`; // Perbaiki template literal
};

const ChatApp = () => {
    const { auth } = useAuth(); // Mengambil data auth untuk mendapatkan email
    const [activeClass, setActiveClass] = useState("Mathematics Class");
    const [classes, setClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loadingClasses, setLoadingClasses] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(""); // Tambahkan state ini

    // Debounced search to prevent too many API calls
    const debouncedSearch = useCallback(
        debounce((value) => {
            setSearchTerm(value);
        }, 500),
        []
    );

    const handleSearchChange = (e) => {
        debouncedSearch(e.target.value);
    };

    // Fetch classes when component mounts and when searchTerm changes
    useEffect(() => {
        const fetchClasses = async () => {
            if (!auth.accessToken) {
                return; // Jangan lakukan permintaan jika token belum tersedia
            }

            setLoadingClasses(true);
            setError(null);
            try {
                const response = await axios.get("/api/class", {
                    // Gunakan baseURL dari axios
                    params: { search: searchTerm },
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`, // Perbaiki sintaks Authorization header
                        "Content-Type": "application/json",
                        Accept: "*/*",
                    },
                });

                setClasses(response.data);
                // Set default active class jika belum diatur
                if (!activeClass && response.data.length > 0) {
                    setActiveClass(response.data[0].name); // Menggunakan nama kelas pertama dari API
                } else if (activeClass) {
                    // Jika searchTerm mengubah daftar kelas dan activeClass tidak ada dalam hasil baru
                    const exists = response.data.find((cls) => cls.name === activeClass);
                    if (!exists) {
                        setActiveClass(
                            response.data.length > 0 ? response.data[0].name : ""
                        );
                        setMessages([]); // Reset messages jika kelas aktif tidak ditemukan
                    }
                }
            } catch (err) {
                console.error("Error fetching classes:", err);
                setError("Gagal memuat kelas.");
            } finally {
                setLoadingClasses(false);
            }
        };

        fetchClasses();
    }, [searchTerm, auth.accessToken, activeClass]);

    // Fetch messages when activeClass changes
    useEffect(() => {
        const fetchMessages = async () => {
            if (!activeClass || !auth.accessToken) {
                setMessages([]);
                return;
            }

            // Temukan id kelas berdasarkan nama kelas
            const selectedClass = classes.find((cls) => cls.name === activeClass);
            if (!selectedClass) {
                setMessages([]);
                return;
            }

            setLoadingMessages(true);
            setError(null);
            try {
                const response = await axios.get(
                    `/api/diskusi/kelas/${selectedClass.id}`, // Gunakan baseURL dari axios
                    {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`, // Perbaiki sintaks Authorization header
                            "Content-Type": "application/json",
                            Accept: "*/*",
                        },
                    }
                );

                console.log("Diskusi Kelas:", response.data); // Tambahkan ini untuk debugging

                // Transform data sesuai dengan template sederhana
                const transformedMessages = response.data.flatMap((msg) => {
                    // Pesan utama
                    const mainMessage = {
                        sender: msg.user.first_name,
                        text: msg.message,
                        time: formatTime(msg.comment_at),
                    };

                    // Pesan balasan jika ada
                    const replyMessages = msg.replies.map((reply) => ({
                        sender: reply.user.email === auth.email ? "user" : "bot",
                        text: reply.message,
                        time: formatTime(reply.comment_at),
                    }));

                    // Gabungkan pesan utama dan balasannya
                    return [mainMessage, ...replyMessages];
                });

                // Tambahkan pesan sambutan jika diperlukan
                const welcomeMessage = {
                    sender: "bot",
                    text: "Welcome to Discussion Forum! Pick a class or type a question.",
                    time: formatTime(new Date()),
                };

                setMessages([welcomeMessage, ...transformedMessages]);
            } catch (err) {
                console.error("Error fetching messages:", err);
                setError("Gagal memuat diskusi.");
                setMessages([]); // Reset messages on error
            } finally {
                setLoadingMessages(false);
            }
        };

        fetchMessages();
    }, [activeClass, auth.accessToken, classes, auth.email]);

    const handleClassChange = (clsName) => {
        setActiveClass(clsName);
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() && activeClass && auth.accessToken) {
            // Temukan id kelas berdasarkan nama kelas
            const selectedClass = classes.find((cls) => cls.name === activeClass);
            if (!selectedClass) {
                alert("Kelas yang dipilih tidak valid.");
                return;
            }

            const messageBody = {
                kelas_id: selectedClass.id,
                message: newMessage.trim(),
            };
            try {
                const response = await axios.post(
                    "/api/diskusi", // Gunakan baseURL dari axios
                    messageBody,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`, // Perbaiki sintaks Authorization header
                            "Content-Type": "application/json",
                            Accept: "*/*",
                        },
                    }
                );
                // Transform pesan yang dikembalikan oleh API sesuai dengan template
                const newMsg = {
                    sender: response.data.user.email === auth.email ? "user" : "bot",
                    text: response.data.message,
                    time: formatTime(response.data.comment_at),
                };
                setMessages((prevMessages) => [...prevMessages, newMsg]);
                setNewMessage(""); // Clear input setelah mengirim pesan
            } catch (err) {
                console.error("Error sending message:", err);
                alert("Gagal mengirim pesan.");
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className='flex h-screen'>
            {/* Sidebar */}
            <div className='w-1/3 bg-gray-100 border-r border-gray-300 flex flex-col'>
                {/* Header Sidebar */}
                <div className='flex bg-orange items-center h-16 p-4 text-gray-700 font-bold text-lg'>
                    Kelas
                </div>
                {/* Search Input */}
                <div className='p-4'>
                    <input
                        type='text'
                        placeholder='Cari kelas...'
                        onChange={handleSearchChange}
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-200'
                    />
                </div>
                {/* Class List */}
                <div className='mt-4 flex-1 overflow-y-auto'>
                    {loadingClasses ? (
                        <p className='text-center text-gray-500'>Memuat kelas...</p>
                    ) : classes.length > 0 ? (
                        classes.map((cls) => (
                            <div
                                key={cls.id}
                                className={`p-4 border-b border-gray-300 flex items-center cursor-pointer ${activeClass === cls.name
                                    ? "bg-gray-300 font-semibold"
                                    : "hover:bg-gray-200"
                                    }`}
                                onClick={() => handleClassChange(cls.name)}>
                                <span className='w-8 h-8 bg-white border-gray-300 border-1 border text-white rounded-full flex items-center justify-center mr-3'>
                                    <MessageSquareMoreIcon fill="#FFA62B" color="white" />
                                </span>
                                {cls.name}
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-gray-500'>
                            Tidak ada kelas ditemukan.
                        </p>
                    )}
                </div>
            </div>

            {/* Chat Section */}
            <div className='w-2/3 flex flex-col'>
                {/* Chat Header */}
                <div className='h-16 p-4 bg-orange text-gray-700 font-bold flex items-center justify-between'>
                    <div className='flex items-center'>
                        <span className='w-8 h-8 bg-white border-gray-300 border-1 border text-white rounded-full flex items-center justify-center mr-3'>
                            <MessageSquareMoreIcon fill="#FFA62B" color="white" />
                        </span>
                        {activeClass ? activeClass.split(" ")[0] : "Pilih Kelas"}
                    </div>
                </div>

                {/* Chat Messages */}
                <div className='flex-1 p-4 overflow-y-auto bg-gray-50'>
                    {loadingMessages ? (
                        <p className='text-center text-gray-500'>Memuat diskusi...</p>
                    ) : messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex items-start mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"
                                    }`}>
                                <div>
                                    <p className={`text-xs mt-1 ${msg.sender === "user" ? "hidden" : "text-gray-600"} font-semibold`}>
                                        {msg.sender}
                                    </p>
                                    <div
                                        className={`p-3 rounded-lg text-sm ${msg.sender === "user"
                                            ? "bg-blue text-white"
                                            : "bg-gray-200 text-gray-800"
                                            } max-w-xs`}>
                                        {msg.text}
                                    </div>
                                </div>
                                <div className='text-xs text-gray-500 ml-2 self-end'>
                                    {msg.time}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-gray-500'>Tidak ada pesan.</p>
                    )}
                </div>

                {/* Chat Input */}
                <div className='p-4 bg-white flex items-center border-t'>
                    <input
                        type='text'
                        placeholder='Tulis pesan...'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className='flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-200'
                    />
                    <button
                        onClick={handleSendMessage}
                        className='ml-4 p-2 bg-blue text-white rounded-md hover:bg-sky-500'>
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatApp;
