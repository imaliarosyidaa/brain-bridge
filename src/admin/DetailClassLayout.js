import { useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AssesmentList from "./class/AssesmentList";
import MeetingList from "./class/MeetingList";
import SiswaClasses from "./class/SiswaClasses";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";


export default function DetailClassLayout({ topic, meetings, assessment }) {
    const { auth } = useAuth();
    const { state } = useLocation();
    const topicName = state?.topicName;
    const [currentPage, setCurrentPage] = useState("detail");
    const variants = ["light"];

    return (
        <>                        {variants.map((variant) => (
            <Breadcrumbs underline="active" onAction={(key) => setCurrentPage(key)} key={variant} variant={variant}>
                <BreadcrumbItem key="class" href="/class">
                    Class
                </BreadcrumbItem>
                <BreadcrumbItem key="class" isCurrent={currentPage === "detail"}>
                    Class Detail
                </BreadcrumbItem>
            </Breadcrumbs>
        ))}
            <div className="flex flex-row w-full lg:flex-row gap-12">
                <div className="min-w-0 flex-1 py-8 lg:pl-4 lg:pr-0">
                    <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white capitalize">{topicName}</h1>
                    <p className='text-normal text-slate-500 dark:text-slate-400'>
                        Pelajari kelas dengan modul-modul dibawah ini. Modul-modul ini dirancang khusus untuk meningkatkan skill dan kemampuan dari level Beginner hingga Advance. Pilih berdasarkan apa yang anda ingin pelajari.
                    </p>
                    <MeetingList meetings={meetings} />
                </div>
                {/* <div className="hidden lg:block lg:flex-1 lg:sticky lg:top-[4.75rem] lg:h-[calc(100vh-4.75rem)] py-8">
                    <div className={`h-fit mb-8 ${auth.role === 'SISWA' ? "row-span-2" : ""} additional-class`}>
                        <AssesmentList assessment={assessment} />
                    </div>
                </div> */}
            </div>
        </>
    );
}
