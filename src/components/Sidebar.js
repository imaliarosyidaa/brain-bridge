import { createContext } from "react";
import { NavLink } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children, expanded, setExpanded }) {
    return (
        <div>
            <div className="md:hidden ">
                <nav
                    className={`h-fit w-full flex flex-col border-r bg-gray-50 shadow-sm`}
                >
                    <SidebarContext.Provider value={{ expanded, setExpanded }}>
                        <ul className="flex-1 p-3 space-y-2">{children}</ul>
                    </SidebarContext.Provider>
                </nav>
            </div>
            <aside className="md:block hidden h-full overflow-y-auto absolute left-0">
                <nav
                    className={`h-full flex flex-col border-r shadow-sm transition-all duration-300 w-[50vh]`}
                >
                    <SidebarContext.Provider value={{ expanded, setExpanded }}>
                        <ul className="flex-1 p-3 space-y-2">{children}</ul>
                    </SidebarContext.Provider>
                </nav>
            </aside>
        </div>
    );
}

export function SidebarItem({ icon, text, active, routes }) {
    return (
        <li>
            <NavLink
                to={routes}
                className={`mt-2 relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-slate-100 text-[#64748b]" : "hover:bg-slate-100 text-[#64748b]"}`}
            >
                {icon}
                <span className={`overflow-hidden transition-all ml-3 ${active ? "font-semibold text-sky-500" : ""}`}>{text}</span>
            </NavLink>
        </li>
    );
}
