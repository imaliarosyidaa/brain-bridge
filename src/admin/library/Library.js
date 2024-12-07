import { Link } from "react-router-dom";
import logo from '../../brain-bridge-logo.png';
import { Download } from "lucide-react";

export default function Library({ books }) {
    return (
        <div>
            <Navbar />
            <div>
                <SearchBar />
                <BookList books={books} />
            </div>
        </div>
    );
}

function BookList({ books }) {
    return (
        <div className="grid grid-cols-3 gap-4 m-8">
            {books.map((book) => (<Book book={book} key={book.id} />))}
        </div>
    );
}

function Book({ book }) {
    return (
        <Link to="/class/meeting">
            <div className="w-full shadow rounded-lg p-4 hover:shadow-md transition">
                <div>
                    <img src={book.img} alt="Logo" className="w-full h-auto" />
                </div>
                <div className="grid grid-cols-2 pt-4">
                    <div>
                        <p className='pt-4 font-semibold'>{book.title}</p>
                    </div>
                    <div className="flex items-center justify-end">
                        <Download />
                        <button className="bg-yellow p-2 rounded-sm ml-4" >OPEN</button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function SearchBar() {
    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex w-full px-24 py-4">
                <input
                    type="text"
                    placeholder="Search your book"
                    className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring focus:ring-blue-200"
                />
                <button className="px-4 bg-blue text-white font-medium rounded-r-md hover:bg-sky-500">
                    Search
                </button>
            </div>

            {/* Categories Section */}
            <div className="flex gap-2 mt-4">
                {["General", "Math", "Science", "Social", "Fiction", "Language", "Jurnal"].map(
                    (category, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 ${category === "Language" ? "bg-blue-400 text-white" : ""
                                }`}
                        >
                            {category}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};


function Navbar() {
    return (
        <nav class="">
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px relative z-10 bg-gradient-to-b from-blue">
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
                        <Link to="/" class="rounded-md px-8 py-2 font-bold text-2xl text-gray-950" aria-current="page">E-Book Library</Link>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                                <Link to="/app" class="rounded-md px-3 py-2 text-sm uppercase bg-blue text-white hover:bg-sky-500 hover:text-white">BACK</Link>
                                <Link to="#" class="rounded-md px-3 py-2 text-sm bg-orange text-white hover:bg-gray-700 hover:text-white">Reading List</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sm:hidden" id="mobile-menu">
                <div class="space-y-1 px-2 pb-3 pt-2">
                    <Link to="/app" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Back</Link>
                    <Link to="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Reading Lisst</Link>
                </div>
            </div>
        </nav>
    );
}