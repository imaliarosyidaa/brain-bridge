import Sidebar, { SidebarItem } from '../components/Sidebar';
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    FileBarChart,
    BookCheckIcon,
    Settings,
    MessageCircleMore,
    SquareChartGanttIcon,
    UserCog2,
    LucideLogOut
} from "lucide-react";
import useAuth from '../hooks/useAuth';

export default function Dashboard() {
    const [expanded, setExpanded] = useState(true);
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const isActive = (path) => location.pathname.startsWith(path);

    function handleLogout() {
        setAuth('');
        navigate("/");
    }

    const mainSidebarItems = [
        { icon: <LayoutDashboard size={20} />, text: "Dashboard", route: "/app" },
        { icon: <Users size={20} />, text: "Class", route: "/class" },
        ...(auth?.role === 'SISWA'
            ? [
                { icon: <ClipboardList size={20} />, text: "Task", route: "/task" },
            ]
            : []),
        { icon: <FileBarChart size={20} />, text: "Grades & Reports", route: "/grades" },
        { icon: <BookCheckIcon size={20} />, text: "E-Book Library", route: "/library" },
    ];

    const forumItems = [
        { icon: <MessageCircleMore size={20} />, text: "Discussion Forum", route: "/forum" },
    ];

    const settingsItems = [
        { icon: <Settings size={20} />, text: "Profile", route: "/profile" },
        ...(auth?.role === 'ADMIN'
            ? [
                { icon: <SquareChartGanttIcon size={20} />, text: "Topics", route: "/topic" },
                { icon: <UserCog2 size={20} />, text: "Users", route: "/users" },
            ]
            : []),
    ];

    const sidebar = (
        <Sidebar expanded={expanded} setExpanded={setExpanded}>
            {mainSidebarItems.map((item, index) => (
                <SidebarItem
                    key={index}
                    icon={item.icon}
                    text={item.text}
                    routes={item.route}
                    alert
                    active={isActive(item.route)}
                />
            ))}

            {expanded && (
                <>
                    <div className="text-white text-sm px-4 pt-4 uppercase font-bold">
                        Forum Discussion
                    </div>
                    {forumItems.map((item, index) => (
                        <SidebarItem
                            key={index}
                            icon={item.icon}
                            text={item.text}
                            routes={item.route}
                            alert
                            active={isActive(item.route)}
                        />
                    ))}

                    <div className="text-white text-sm px-4 pt-4 uppercase font-bold">
                        Settings
                    </div>
                    {settingsItems.map((item, index) => (
                        <SidebarItem
                            key={index}
                            icon={item.icon}
                            text={item.text}
                            routes={item.route}
                            alert
                            active={isActive(item.route)}
                        />
                    ))}
                </>
            )}
        </Sidebar>
    );

    return (
        <div className="flex h-screen">
            {sidebar}
            <main
                className={`transition-all duration-300 ${expanded ? "ml-64" : "ml-16"
                    } flex-1 bg-gray-50`}
            >
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 hover:text-blue ${expanded ? "bg-transparent text-blue" : "bg-blue text-white"}`}
                            onClick={() => setExpanded(!expanded)}
                        >
                            <button className="text-2xl" onClick={() => setExpanded((curr) => !curr)}>&#9776;</button>
                        </div>
                        <h1 className="text-lg font-semibold">Hello {auth.nama}, Welcome 👋</h1>
                    </div>
                    <div className='flex items-center'>
                        {/* <input
                            type="text"
                            placeholder="Search from courses..."
                            className="bg-gray-200 px-4 py-2 rounded-full w-64 outline-none"
                        /> */}
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu((prev) => !prev)}
                                className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
                            >
                                {/* Profile Icon (e.g., initials or an image) */}
                                <span className="text-gray-700 font-semibold">P</span>
                            </button>

                            {/* Dropdown Menu */}
                            {showMenu && (
                                <div className="absolute z-10 right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2">
                                    <button
                                        onClick={() => handleLogout()}
                                        className="px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left flex"
                                    >
                                        <LucideLogOut />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
                <div className="h-full container mx-auto p-4">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
