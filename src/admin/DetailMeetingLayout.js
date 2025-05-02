import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import MaterialList from "./class/MaterialList";
import SummarySection from "./class/SummarySection";
import VideoList from "./class/VideoList";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";

export default function DetailClassLayout() {
    const { auth } = useAuth();
    const [detailMeetings, setDetailMeetings] = useState([]);
    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [summary, setSummary] = useState('')
    const [currentPage, setCurrentPage] = useState("modul");
    const variants = ["ligth"];

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
                setSummary(response?.data?.summary);
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
        <>
            {variants.map((variant) => (
                <Breadcrumbs underline="active" onAction={(key) => setCurrentPage(key)} key={variant} variant={variant}>
                    <BreadcrumbItem key="class" href="/class">
                        Class
                    </BreadcrumbItem>
                    <BreadcrumbItem key="class" href={`/class/meeting/${id}`}>
                        Class Detail
                    </BreadcrumbItem>
                    <BreadcrumbItem key="modul" isCurrent={currentPage === "modul"}>
                        Modul
                    </BreadcrumbItem>
                </Breadcrumbs>
            ))}
            <div className="grid grid-rows-2 justify-items-center w-full gap-6 lg:grid-cols-1">
                <div className="w-full pt-6 px-4 lg:px-8 lg:pt-8">
                    <SummarySection summary={summary} setSummary={setSummary} />
                    <VideoList videos={videos} />
                </div>
                <div className="w-full max-w-2xl lg:sticky">
                    <MaterialList materials={materials} />
                </div>
            </div>
        </>
    );
}
