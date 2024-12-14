import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import MaterialList from "./class/MaterialList";
import PreviewSection from "./class/PreviewSection";
import SummarySection from "./class/SummarySection";
import VideoList from "./class/VideoList";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

export default function DetailClassLayout() {
    const { auth } = useAuth();
    const [detailMeetings, setDetailMeetings] = useState([]);
    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [materials, setMaterials] = useState([]);

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
                setDetailMeetings(response?.data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        }
        fetchData();
    }, [id, auth.accessToken]);

    useEffect(() => {
        if (detailMeetings) {
            const updatedVideos = [];
            let index = 1;
            while (detailMeetings[`vidio${index}`]) {
                updatedVideos.push({
                    vidio: detailMeetings[`vidio${index}`],
                    title_vid: detailMeetings[`title_vid${index}`],
                });
                index++;
            }
            setVideos(updatedVideos);
        }
    }, [detailMeetings]);

    useEffect(() => {
        if (detailMeetings) {
            const updatedMaterials = [];
            let index = 1;
            while (detailMeetings[`file_materi${index}`]) {
                updatedMaterials.push({
                    materi: detailMeetings[`file_materi${index}`],
                });
                index++;
            }
            setMaterials(updatedMaterials);
        }
    }, [detailMeetings]);

    return (
        <div className="grid grid-rows-2 grid-cols-3 gap-0 max-w-screen-lg max-h-screen mx-auto">
            {/* Kolom pertama: VideoList */}
            <div className="row-span-2 col-span-1">
                <VideoList videos={videos} />
            </div>

            {/* Kolom kedua: MaterialList */}
            <div className="row-span-1 col-span-1 mb-8">
                <MaterialList materials={materials} />
            </div>

            {/* Kolom ketiga: PreviewSection */}
            <div className="row-span-2 col-span-1">
                <PreviewSection />
            </div>

            {/* Kolom kedua, baris kedua: SummarySection */}
            <div className="row-span-1 col-span-1">
                <SummarySection summary={detailMeetings.summary} />
            </div>
        </div>
    );
}
