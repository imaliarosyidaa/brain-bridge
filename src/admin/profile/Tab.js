import { Link, useLocation } from "react-router-dom";

export default function Tab() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex border-b mb-6">
            <Link to="/profile">
                <button
                    className={`px-4 py-2 font-semibold ${isActive("/profile")
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-gray-500 hover:text-orange-500"
                        }`}
                >
                    Account Setting
                </button>
            </Link>
            <Link to="/change/password">
                <button
                    className={`px-4 py-2 font-semibold ${isActive("/change/password")
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-gray-500 hover:text-orange-500"
                        }`}
                >
                    Password
                </button>
            </Link>
        </div>
    );
}
