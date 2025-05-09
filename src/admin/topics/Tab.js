import { Link, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Tab() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex border-b mb-6">
            <Link to="/topics">
                <button
                    className={`px-4 py-2 font-semibold ${isActive("/topics")
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-blue-500"
                        }`}
                >
                    Topic List
                </button>
            </Link>
            <Link to="/topics/create">
                <button
                    className={`px-4 py-2 font-semibold flex ${isActive("/topics/create")
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-blue-500"
                        }`}
                >
                    Create New Topic
                    <span className="pl-1"><Plus /></span>
                </button>
            </Link>
        </div>
    );
}
