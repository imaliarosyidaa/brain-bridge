import Sidebar, { SidebarItem } from '../components/Sidebar';
import { Outlet, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Navbar from '../components/Navbar';

export default function Dashboard() {
    const { auth } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    const mainSidebarItems = [
        { text: "Class", route: "/class" },
    ];

    const forumItems = [
        { text: "Tanya AI", route: "/dicussion" },
    ];

    const settingsItems = [
        { text: "Profile", route: "/profile" },
        ...(auth?.role === 'ADMIN'
            ? [
                { text: "Topik", route: "/topics" },
                { text: "Users", route: "/users" },
            ]
            : []),
    ];

    const sidebar = (
        <Sidebar>
            <div className="text-[#0f172a] text-sm px-4 pt-4 capitalize font-semibold">
                Mulai
            </div>
            {mainSidebarItems.map((item, index) => (
                <SidebarItem
                    key={index}
                    icon={item.icon}
                    text={item.text}
                    routes={item.route}
                    active={isActive(item.route)}
                />
            ))}
            <div className="text-[#0f172a] text-sm px-4 pt-4 capitalize font-semibold">
                AI
            </div>
            {forumItems.map((item, index) => (
                <SidebarItem
                    key={index}
                    icon={item.icon}
                    text={item.text}
                    routes={item.route}
                    active={isActive(item.route)}
                />
            ))}

            <div className="text-[#0f172a] text-sm px-4 pt-4 capitalize font-semibold">
                Settings
            </div>
            {settingsItems.map((item, index) => (
                <SidebarItem
                    key={index}
                    icon={item.icon}
                    text={item.text}
                    routes={item.route}
                    active={isActive(item.route)}
                />
            ))}
        </Sidebar>
    );

    return (
        <>
            <Navbar />
            <div className='block md:hidden'>
                {sidebar}
            </div>
            <div className="grid col-1 md:col-2">
                <div className='hidden md:block'>
                    {sidebar}
                </div>
                <main className={`md:ml-[50vh] flex-1 bg-white`}>
                    <div className="h-screen container mx-auto p-4">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}
