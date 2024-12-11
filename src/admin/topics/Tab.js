import { Link, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Tab() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex border-b mb-6">
            <Link to="/topic">
                <button
                    className={`px-4 py-2 font-semibold ${isActive("/profile")
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-gray-500 hover:text-orange-500"
                        }`}
                >
                    Topic List
                </button>
            </Link>
            <Link to="/change/password">
                <button
                    className={`px-4 py-2 font-semibold flex ${isActive("/change/password")
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-gray-500 hover:text-orange-500"
                        }`}
                >
                    Create New Topic
                    <span className="pl-1"><Plus /></span>
                </button>
            </Link>
        </div>
    );
}
