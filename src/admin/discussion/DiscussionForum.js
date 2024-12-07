import React, { useState } from "react";

const ChatApp = () => {
    const [activeClass, setActiveClass] = useState("Mathematics");
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Welcome to LiveChat! Pick a topic or type a question.", time: "02:10 PM" },
        { sender: "user", text: "Hello Nice", time: "02:10 PM" },
        { sender: "bot", text: "Welcome!", time: "02:12 PM" },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handleClassChange = (className) => {
        setActiveClass(className);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = { sender: "user", text: newMessage, time: "02:13 PM" };
            setMessages([...messages, newMsg]);
            setNewMessage("");
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/3 bg-gray-100 border-r border-gray-300">
                {/* Header Sidebar */}
                <div className="flex bg-orange items-center h-16 p-4 text-gray-700 font-bold text-lg">
                    Class
                </div>
                {/* Search Input */}
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Search from courses..."
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-200"
                    />
                </div>
                {/* Class List */}
                <div className="mt-4">
                    {["Mathematics Class", "Programming Class", "Social Science Class"].map((cls) => (
                        <div
                            key={cls}
                            className={`p-4 border-b border-black flex items-center cursor-pointer ${activeClass === cls ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
                                }`}
                            onClick={() => handleClassChange(cls)}
                        >
                            <span className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center mr-3">
                                💬
                            </span>
                            {cls}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Section */}
            <div className="w-2/3 flex flex-col">
                {/* Chat Header */}
                <div className="h-16 p-4 bg-orange text-gray-700 font-bold flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="w-8 h-8 bg-white text-orange-400 rounded-full flex items-center justify-center mr-3">
                            💬
                        </span>
                        {activeClass.split(" ")[0]}
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-start mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`p-3 rounded-lg text-sm ${msg.sender === "user"
                                        ? "bg-blue text-white"
                                        : "bg-gray-200 text-gray-800"
                                    } max-w-xs`}
                            >
                                {msg.text}
                            </div>
                            <div className="text-xs text-gray-500 ml-2 self-end">{msg.time}</div>
                        </div>
                    ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white flex items-center border-t">
                    <input
                        type="text"
                        placeholder="Write a message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-200"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-4 p-2 bg-blue text-white rounded-md hover:bg-sky-500"
                    >
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatApp;