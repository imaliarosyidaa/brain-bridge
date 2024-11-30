import Sidebar, { SidebarItem } from '../components/Sidebar'
import Layout, { ContentArea } from "./Layout"
import { useState } from "react"

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
} from "lucide-react"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [expanded, setExpanded] = useState(true);
    const navigate = useNavigate();

    function handleRoute(route) {
        navigate(route)
    }

    const sidebar = (
        <Sidebar expanded={expanded} setExpanded={setExpanded}>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" alert active="true" onClick={() => handleRoute('/')} />
            <SidebarItem icon={<Users size={20} />} text="Class" alert></SidebarItem>
            <SidebarItem icon={<CalendarDays size={20} />} text="Class Schedule" alert />
            <SidebarItem icon={<ClipboardList size={20} />} text="Task" alert />
            <SidebarItem icon={<FileBarChart size={20} />} text="Grades & Raports" alert />
            <SidebarItem icon={<AlarmClock size={20} />} text="Study Plan" alert />
            <SidebarItem icon={<BookCheckIcon size={20} />} text="E-Book Library" alert />
            <SidebarItem icon={<Fingerprint size={20} />} text="Attendance" alert />
            <SidebarItem icon={<Settings size={20} />} text="Profile" alert />
            <SidebarItem icon={<MessageCircleMore size={20} />} text="Message" alert />
        </Sidebar>
    );
    return (
        <div className="flex h-screen">
            {sidebar}
            <main
                className={`transition-all duration-300 ${expanded ? "ml-64" : "ml-16"
                    } flex-1 bg-gray-50 overflow-auto`}
            >
                <Layout className="container mx-auto p-4">
                    <ContentArea />
                </Layout>
            </main>
        </div>
    );
}