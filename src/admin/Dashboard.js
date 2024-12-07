import Sidebar, { SidebarItem } from '../components/Sidebar';
import Layout, { ContentArea } from "./ClassLayout";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    CalendarDays,
    ClipboardList,
    FileBarChart,
    AlarmClock,
    BookCheckIcon,
    Fingerprint,
    Settings,
    MessageCircleMore
} from "lucide-react";

export default function Dashboard() {
    const [expanded, setExpanded] = useState(true);
    const [active, setActive] = useState(false);

    function handleClick() {
        setActive(true)
    }

    const sidebar = (
        <Sidebar expanded={expanded} setExpanded={setExpanded}>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" alert routes={"/app"} active={active} onClickNav={handleClick} />
            <SidebarItem icon={<Users size={20} />} text="Class" alert routes={"/class"} />
            <SidebarItem icon={<ClipboardList size={20} />} text="Task" routes={"/task"} alert />
            <SidebarItem icon={<FileBarChart size={20} />} text="Grades & Raports" routes={"/grades"} alert />
            <SidebarItem icon={<BookCheckIcon size={20} />} text="E-Book Library" routes={"/library"} alert />
            <SidebarItem icon={<Settings size={20} />} text="Profile" routes={"/profile"} alert />
            {/* <h1 className='text-white text-xs px-3 pt-8 font-bold'>FORUM DISCUSSION</h1> */}
            <SidebarItem icon={<MessageCircleMore size={20} />} text="Discussion Forum" routes={"/forum"} alert />
        </Sidebar>
    );

    return (
        <div className="flex h-screen">
            {sidebar}
            <main
                className={`transition-all duration-300 ${expanded ? "ml-64" : "ml-16"
                    } flex-1 bg-gray-50 overflow-auto`}
            >
                <div className="flex h-screen container mx-auto p-4">
                    <main className="flex-1 bg-gray-50 overflow-auto">
                        <div className="container mx-auto p-4">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </main>
        </div>
    );
}
