import Sidebar, { SidebarItem } from '../components/Sidebar'
import {
    LayoutDashboard,
} from "lucide-react"

export default function Dashboard() {
    return (
        <main>
            <Sidebar>
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" alert />
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Class" alert />
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Class Schedule" alert />
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Task" alert />
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Grades & Raports" alert />
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Study Plan" alert />
                <SidebarItem icon={<LayoutDashboard size={20} />} text="E-Book Library" alert />
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Attendance" alert />
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Profile" alert />
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Message" alert />
            </Sidebar>
        </main>
    );
}