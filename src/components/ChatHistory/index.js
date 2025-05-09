import React from "react";
import ReactMarkdown from "react-markdown";

const ChatHistory = ({ ChatHistory }) => {
    return (
        <>
            {ChatHistory.map((message, index) => (
                <div
                    key={index}
                    className={`flex w-full py-2 px-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className={`rounded-lg px-4 py-2 max-w-[70%] ${message.type === "user"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                    >
                        {message.type === "user" && (
                            <span className="mr-2 font-bold text-gray-600">You:</span>
                        )}
                        <ReactMarkdown>{message.message}</ReactMarkdown>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatHistory;
