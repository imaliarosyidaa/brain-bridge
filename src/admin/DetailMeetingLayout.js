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
                const response = await axios.get(`/api/meeting/${id}`, {
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
        if (detailMeetings.length > 0) {
            const extractedVideos = detailMeetings.flatMap(meeting => {
                const videoArray = [];
                if (meeting.vidio1) {
                    videoArray.push({ url: meeting.vidio1, title: meeting.title_vid1 });
                }
                if (meeting.vidio2) {
                    videoArray.push({ url: meeting.vidio2, title: meeting.title_vid2 });
                }
                if (meeting.vidio3) {
                    videoArray.push({ url: meeting.vidio3, title: meeting.title_vid3 });
                }
                return videoArray;
            });
            setVideos(extractedVideos);
        }
    }, [detailMeetings]);

    useEffect(() => {
        if (detailMeetings.length > 0) {
            const extractedMaterials = detailMeetings.flatMap(meeting => {
                const materiArray = [];
                if (meeting.file_materi1) {
                    materiArray.push({ materi: meeting.file_materi1 });
                }
                if (meeting.file_materi2) {
                    materiArray.push({ materi: meeting.file_materi2 });
                }
                if (meeting.file_materi3) {
                    materiArray.push({ materi: meeting.file_materi3 });
                }
                return materiArray;
            });
            setMaterials(extractedMaterials);
        }
    }, [detailMeetings]);

    return (
        <div className='lg:max-h-screen grid lg:grid-rows-2 grid-rows-4 lg:grid-flow-col gap-4 lg:gap-0'>
            <div className='lg:row-span-2'>
                <VideoList videos={videos} />
            </div>
            <div className='lg:col-span-1'>
                <MaterialList materials={materials} />
            </div>
            <div className='lg:col-span-1'>
                <SummarySection />
            </div>
            <div className='lg:row-span-2'>
                <PreviewSection />
            </div>
        </div>
    );
}