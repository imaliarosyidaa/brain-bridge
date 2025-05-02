import { Link, useLocation } from "react-router-dom";

export default function Tab() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex border-b mb-6 gap-8">
            <Link to="/profile">
                <button
                    className={`py-2 font-semibold ${isActive("/profile")
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-blue-500"
                        }`}
                >
                    Account Setting
                </button>
            </Link>
            <Link to="/change/password">
                <button
                    className={`py-2 font-semibold ${isActive("/change/password")
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-blue-500"
                        }`}
                >
                    Password
                </button>
            </Link>
        </div>
    );
}
