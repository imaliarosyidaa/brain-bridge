import { PencilIcon } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { useEffect, useState } from "react";

export default function SummarySection({ summary, setSummary }) {
    const { auth } = useAuth();
    const { id } = useParams();
    const [updatedSummary, setUpdatedSummary] = useState(summary || "");

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

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/meeting/id/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                setSummary(response?.data.summary || "");
                setUpdatedSummary(response?.data.summary || "");
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        }
        fetchData();
    }, [id, auth.accessToken, setSummary, summary]);

    return (
        <div className="h-fit">
            <div className="font-bold flex items-center">
                <h1 className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Summary Course</h1>
                {(auth?.role === "ADMIN" || auth.role === "PENGAJAR") && (
                    <Link
                        to={`/class/assesment/add/${id}`}
                        className="ml-2 flex items-center justify-center rounded-full bg-[#FFD60A] w-6 h-6"
                    >
                        <PencilIcon size={16} color="black" />
                    </Link>
                )}
            </div>

            <h2 className="inline-block mb-2 text-2xl font-reguler tracking-tight text-gray-900 dark:text-white">Introduction</h2>
            <div className="m-2 rounded-lg text-xs p-1 min-h-fit">
                {summary}
            </div>
        </div>
    );
}
