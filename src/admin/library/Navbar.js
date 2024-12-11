import { Link } from "react-router-dom";
import logo from '../../brain-bridge-logo.png';

export default function Navbar() {
    return (
        <nav className="">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px relative z-10 bg-gradient-to-b from-blue">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
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
                        <Link to="/" className="rounded-md px-8 py-2 font-bold text-2xl text-gray-950" aria-current="page">E-Book Library</Link>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link to="/app" className="rounded-md px-3 py-2 text-sm uppercase bg-blue text-white hover:bg-sky-500 hover:text-white">BACK</Link>
                                <Link to="#" className="rounded-md px-3 py-2 text-sm bg-orange text-white hover:bg-gray-700 hover:text-white">Reading List</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link to="/app" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Back</Link>
                    <Link to="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Reading Lisst</Link>
                </div>
            </div>
        </nav>
    );
}