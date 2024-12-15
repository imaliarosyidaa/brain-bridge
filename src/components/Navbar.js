import logo from '../brain-bridge-logo.png';
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav>
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px relative z-10">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Open main menu</span>
                            <svg class="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg class="hidden size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex shrink-0 items-center">
                            <img class="h-14 w-auto" src={logo} alt="Your Company"></img>
                        </div>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                                <Link to="/" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Home</Link>
                                <Link to="#topic" class="rounded-md px-3 py-2 text-sm font-bold text-[#1E1E1E] hover:bg-gray-700 hover:text-white">Topic</Link>
                                <Link to="#testimonial" class="rounded-md px-3 py-2 text-sm font-bold text-[#1E1E1E] hover:bg-gray-700 hover:text-white">Testimonial</Link>
                                <Link to="#footer" class="rounded-md px-3 py-2 text-sm font-bold text-[#1E1E1E] hover:bg-gray-700 hover:text-white">About Us</Link>
                                <Link to="/login" class="relative rounded-sm w-16 h-10 items-center justify-center flex bg-[#FFA62B] hover:bg-[#FF8C1A] text-white font-bold hover:text-white focus:outline-none  px-2 py-1">
                                    Login
                                </Link>
                                <Link to="/signup" class="relative rounded-sm lg:w-20 w-full h-10 items-center justify-center flex bg-[#FFD60A] hover:bg-[#ffd60af4] text-white font-bold hover:text-white focus:outline-none px-2 py-1">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sm:hidden" id="mobile-menu">
                <div class="space-y-1 px-2 pb-3 pt-2">
                    <Link to="/" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Home</Link>
                    <Link to="#topic" class="block rounded-md px-3 py-2 text-base font-medium text-[#1E1E1E] hover:bg-gray-700 hover:text-white">Topic</Link>
                    <Link to="#testimonial" class="block rounded-md px-3 py-2 text-base font-medium text-[#1E1E1E] hover:bg-gray-700 hover:text-white">Testimonial</Link>
                    <Link to="#footer" class="block rounded-md px-3 py-2 text-base font-medium text-[#1E1E1E] hover:bg-gray-700 hover:text-white">About Us</Link>
                    <Link to="/login" class="relative rounded-sm lg:w-16 h-10 items-center lg:justify-center flex bg-[#FFA62B] hover:bg-[#FF8C1A] text-white font-medium hover:text-white focus:outline-none px-3 py-1">
                        Login
                    </Link>
                    <Link to="/signup" class="relative rounded-sm lg:w-20 h-10 items-center lg:justify-center flex bg-[#FFD60A] hover:bg-[#ffd60af4] text-white font-medium hover:text-white focus:outline-none focus:ring-2 px-3 py-1">
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
}