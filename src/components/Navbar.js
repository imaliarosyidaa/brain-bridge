import { useEffect, useState } from 'react';
import logo from '../brain-bridge-logo.png';
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth';

export default function Navbar() {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            setIsLogin(true);
        }
    }, [location.state, auth]);

    const handleLogout = () => {
        setIsLogin(false);
        setAuth('');
        navigate("/");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav>
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px relative z-10 bg-white border">
                <div class="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={menuOpen}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Burger Icon */}
                            <svg
                                className={`${menuOpen ? "hidden" : "block"} h-6 w-6`}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                            {/* Close Icon */}
                            <svg
                                className={`${menuOpen ? "block" : "hidden"} h-6 w-6`}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex shrink-0 items-center">
                            <Link to="/"><img class="h-14 w-auto" src={logo} alt="Your Company"></img></Link>
                        </div>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                                <Link to="/" class="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-slate-100" aria-current="page">Home</Link>
                                <Link to="/class" class="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-slate-100">Kelas</Link>
                                <Link to="/dicussion" class="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-slate-100">Tanya AI</Link>
                                <Link to="/topics" class="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-slate-100">Settings</Link>
                                {!isLogin && (
                                    <Link to="/signin" class="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-slate-100">
                                        Sign In
                                    </Link>
                                )}
                                {!isLogin && (
                                    <Link
                                        to="/signup"
                                        className="bg-[#FFD60A] text-black flex items-center justify-center font-semibold hover:bg-[#ffe254] focus:outline-none px-5 rounded-full"
                                    >
                                        Sign Up
                                    </Link>
                                )}
                                {isLogin && (
                                    <Link onClick={handleLogout} class="block rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-slate-100">
                                        Sign Out
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`${menuOpen ? "block" : "hidden"
                    } sm:hidden" id="mobile-menu`}
            >
                <div class="space-y-1 px-2 pb-3 pt-2">
                    <Link to="/" class="block rounded-md px-3 py-2 text-base font-medium text-[#1E1E1E] hover:bg-slate-100" aria-current="page">Home</Link>
                    <Link to="/class" class="block rounded-md px-3 py-2 text-base font-medium text-[#1E1E1E] hover:bg-slate-100">Kelas</Link>
                    <Link to="/dicussion" class="block rounded-md px-3 py-2 text-base font-medium text-[#1E1E1E] hover:bg-slate-100">Tanya AI</Link>
                    <Link to="/topics" class="block rounded-md px-3 py-2 text-base font-medium text-[#1E1E1E] hover:bg-slate-100">Topik</Link>
                    {!isLogin && (
                        <Link to="/signin" class="block rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-slate-100">
                            Sign In
                        </Link>
                    )}
                    {!isLogin && (
                        <Link to="/signup" className="bg-[#FFD60A] text-black flex items-center justify-center font-semibold hover:bg-amber-400 focus:outline-none px-5 rounded-full h-10">
                            Sign Up
                        </Link>
                    )}
                    {isLogin && (
                        <Link class="block rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-slate-100" onClick={handleLogout}>
                            Sign Out
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}