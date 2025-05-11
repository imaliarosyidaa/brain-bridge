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
    const [tittle, setTittle] = useState('')
    const [description, setDescription] = useState('')
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
                setDescription(response?.data?.description);
                setTittle(response?.data?.tittle);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        }
        fetchData();
    }, [id, auth.accessToken]);

    useEffect(() => {
        if (detailMeetings?.videos) {
            let parsedVideos = [];

            try {
                parsedVideos = JSON.parse(detailMeetings.videos);
            } catch (e) {
                console.error("Gagal parsing videos:", e);
                parsedVideos = [];
            }

            if (Array.isArray(parsedVideos)) {
                const updatedVideos = parsedVideos.map((video) => ({
                    vidio: video.key,
                    title_vid: video.title
                }));
                setVideos(updatedVideos);
                console.log(videos)
            }
        }
    }, [detailMeetings]);

    useEffect(() => {
        if (detailMeetings?.files) {
            let parsedFiles = [];

            try {
                parsedFiles = JSON.parse(detailMeetings.files);
            } catch (e) {
                console.error("Gagal parsing files:", e);
                parsedFiles = [];
            }

            if (Array.isArray(parsedFiles)) {
                const updatedMaterials = parsedFiles.map((file) => ({
                    materi: file.key,
                    name: file.name,
                }));
                setMaterials(updatedMaterials);
                console.log(materials)
            }
        }
    }, [detailMeetings]);


    return (
        <>
            {variants.map((variant) => (
                <Breadcrumbs underline="active" onAction={(key) => setCurrentPage(key)} key={variant} variant={variant}>
                    <BreadcrumbItem key="home" href="/">
                        Home
                    </BreadcrumbItem>
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
            {/* Page Title and Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 lg:px-8 py-6 border-b border-gray-200">
                <div>
                    <h1 className="text-3xl font-bold mb-2 capitalize ">{tittle}</h1>
                </div>
                <div className="flex items-center gap-4 mt-4 lg:mt-0">
                    <MaterialList materials={materials} />
                    {/* <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200">RSS</button>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-checked:bg-blue-500 rounded-full"></div>
                        <span className="ml-2 text-sm text-gray-600">Focus mode</span>
                    </label> */}
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 lg:px-8 py-6">
                <div className="lg:col-span-9">
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <div className="lg:col-span-9">
                    {/* <SummarySection summary={summary} setSummary={setSummary} /> */}
                    <VideoList videos={videos} />
                </div>
            </div>
        </>
    );
}
