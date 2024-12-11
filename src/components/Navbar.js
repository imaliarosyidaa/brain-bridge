import logo from '../brain-bridge-logo.png';
import { Link } from "react-router-dom"
import useAuth from '../hooks/useAuth';

export default function Navbar() {
    const { auth } = useAuth();

    return (
        <nav className="" style={{
            background: "linear-gradient(to bottom, #48CAE6, #ffffff)",
            position: "fixed",
            top: "0",
            width: "100%",
            zIndex: "1000"
        }}>
            <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px relative z-10">
                <div className="relative flex h-20 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg className="block size-6" fill="none" viewBox="0 0 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img className="h-14 w-auto" src={logo} alt="Your Company"></img>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link to="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Home</Link>
                                <Link to="#" className="rounded-md px-3 py-2 text-sm font-bold text-[#1E1E1E] hover:bg-gray-900 hover:text-white">Topic</Link>
                                <Link to="#" className="rounded-md px-3 py-2 text-sm font-bold text-[#1E1E1E] hover:bg-gray-900 hover:text-white">Feature</Link>
                                <Link to="#" className="rounded-md px-3 py-2 text-sm font-bold text-[#1E1E1E] hover:bg-gray-900 hover:text-white">About Us</Link>
                            </div>
                        </div>
                        {auth.email &&
                            <Link to="/app" type="button" className="relative rounded-md px-3 py-2 ml-6 bg-[#FFA62B] text-white font-bold hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 px-2 py-1">
                                Dashboard
                            </Link>
                        }
                        {!auth.email &&
                            <Link to="/login" type="button" className="relative rounded-md px-3 py-2 ml-6 bg-[#FFA62B] text-white font-bold hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 px-2 py-1">
                                Login
                            </Link>
                        }
                        <div className="relative ml-3">
                            <div>
                                {!auth.email &&
                                    <Link to="/signup" type="button" className="relative rounded-md px-3 py-3 bg-[#FFD60A] text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 px-2 py-1" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        Sign Up
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link to="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Home</Link>
                    <Link to="#" className="rounded-md px-3 py-2 text-sm font-bold text-[#1E1E1E] hover:bg-gray-900 hover:text-white">Topic</Link>
                    <Link to="#" className="rounded-md px-3 py-2 text-sm font-bold text-[#1E1E1E] hover:bg-gray-900 hover:text-white">Feature</Link>
                    <Link to="#" className="rounded-md px-3 py-2 text-sm font-bold text-[#1E1E1E] hover:bg-gray-900 hover:text-white">About Us</Link>
                </div>
            </div>
        </nav>
    );
}