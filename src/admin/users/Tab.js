import { Link, useLocation } from "react-router-dom";

export default function Tab() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex border-b mb-6">
            <Link to="/users">
                <button
                    className={`px-4 py-2 font-semibold ${isActive("/users")
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-gray-500 hover:text-orange-500"
                        }`}
                >
                    Account admin
                </button>
            </Link>
            <Link to="/users/siswa">
                <button
                    className={`px-4 py-2 font-semibold ${isActive("/users/siswa")
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-gray-500 hover:text-orange-500"
                        }`}
                >
                    Account siswa
                </button>
            </Link>
            <Link to="/users/pengajar">
                <button
                    className={`px-4 py-2 font-semibold ${isActive("/users/pengajar")
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-gray-500 hover:text-orange-500"
                        }`}
                >
                    Account pengajar
                </button>
            </Link>
        </div>
    );
}