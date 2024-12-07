import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import logo from '../logo/white-logo.png'
import { Link, NavLink } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children, expanded, setExpanded }) {
    //const [expanded, setExpanded] = useState(true);

    // Detect screen size and set sidebar to collapsed on smaller screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setExpanded(false);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <aside className="h-screen fixed top-0 left-0">
            <nav
                className={`h-full flex flex-col bg-[#48CAE4] border-r shadow-sm transition-all duration-50 ${expanded ? "w-64" : "w-16"
                    }`}
            >
                <div className="p-4 pb-2 flex justify-between items-center">
                    <Link to={"/"}>
                        <img
                            src={logo}
                            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                                }`}
                            alt="Logo"
                        /></Link>
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, alert, routes }) {
    const { expanded } = useContext(SidebarContext);
    return (
        <li>
            <NavLink to={routes}
                className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active
                    ? "bg-gradient-to-r from-orange from-60% text-white"
                    : "hover:bg-gradient-to-r hover:from-[#FFA62B] text-white"
                    }`} >
                {icon}
                <span
                    className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "hidden"
                        }`}
                >
                    {text}
                </span>

                {!expanded && (
                    <div
                        className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-0 translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                    >
                        {text}
                    </div>
                )}
            </NavLink>
        </li>
    );
}
