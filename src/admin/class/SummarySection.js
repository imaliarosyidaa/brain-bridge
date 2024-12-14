import { LucideNotebookText, PencilIcon } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { useState } from "react";

export default function SummarySection({ summary }) {
    const { auth } = useAuth();
    const { id } = useParams();
    const [updatedSummary, setUpdatedSummary] = useState(summary || "");
    const [isEditing, setIsEditing] = useState(false);

    async function updateSummary(e) {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("summary", updatedSummary);

            const response = await axios.put(`/api/meeting/${id}`, formData, {
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                alert("Summary updated successfully!");
            }
        } catch (error) {
            console.error("Error updating summary:", error);
            alert("Failed to update summary.");
        }
    }

    return (
        <div className="bg-[#48CAE4] rounded-2xl m-4 overflow-y-auto h-full">
            {/* Header */}
            <div className="font-bold text-white px-4 pt-2 flex items-center">
                <LucideNotebookText fill="#FFD60A" color="#48CAE4" />
                <span className="ml-2">Summary Course</span>
                {(auth?.role === "ADMIN" || auth.role === "PENGAJAR") && (
                    <Link
                        to={`/class/assesment/add/${id}`}
                        className="ml-2 flex items-center justify-center rounded-full bg-[#FFD60A] w-6 h-6"
                    >
                        <PencilIcon size={16} color="black" />
                    </Link>
                )}
            </div>

            {/* Editable Summary Section */}
            <div className="m-2 rounded-lg text-xs p-1 bg-[#F5F5F5] min-h-full">
                <form method="PUT" onSubmit={updateSummary}>
                    <textarea
                        className={`w-full h-96 bg-transparent p-2 rounded-md border-none focus:outline-none ${isEditing ? "border border-gray-300 focus:ring-2 focus:ring-blue-500" : ""
                            }`}
                        value={updatedSummary}
                        readOnly={!isEditing}
                        onClick={() => setIsEditing(true)}
                        onChange={(e) => setUpdatedSummary(e.target.value)}
                        placeholder="There is no summary in this meeting"
                    />
                    {isEditing && (
                        <div className="flex justify-end mt-2">
                            <button
                                type="submit"
                                className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
