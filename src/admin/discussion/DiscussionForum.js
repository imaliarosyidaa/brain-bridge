import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import ChatHistory from "../../components/ChatHistory";
import Loading from "../../components/Loading";
import { Button } from "@heroui/button";

export default function ChatApp() {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const ai = new GoogleGenAI({
        apiKey: "AIzaSyD54wEE9PimG5_hf3kZZ9IjcYysUJO3jcg",
    });

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        setChatHistory((prev) => [...prev, { type: "user", message: userInput }]);

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: userInput,
            });
            const text = await response.text;

            setChatHistory((prev) => [...prev, { type: "bot", message: text }]);
            setUserInput("");
        } catch (error) {
            console.error("Error generating response:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setChatHistory([]);
        setUserInput("");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-4">Tanya AI</h1>
            <div className="chat-container">
                <ChatHistory ChatHistory={chatHistory} />
                <Loading isLoading={isLoading} />
            </div>

            <div className="flex mt-4 gap-2">
                <input
                    type="text"
                    className="flex-grow px-4 py-2 rounded-lg border border-gray-300"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={handleUserInput}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button onPress={sendMessage} isLoading={isLoading} color="primary">
                    Send
                </Button>
            </div>

            <Button
                className="mt-4 text-white"
                color="default"
                onPress={clearChat}
            >
                Clear Chat
            </Button>
        </div>
    );
}
