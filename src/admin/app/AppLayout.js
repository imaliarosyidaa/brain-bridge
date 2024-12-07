import React from 'react';

export default function Dashboard() {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button className="text-2xl">&#9776;</button>
                    <h1 className="text-lg font-semibold">Hello Imalia, Welcome 👋</h1>
                </div>
                <input
                    type="text"
                    placeholder="Search from courses..."
                    className="bg-gray-200 px-4 py-2 rounded-full w-64 outline-none"
                />
            </header>

            {/* Content */}
            <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Overview Cards */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Programming', 'Science', 'Statistics'].map((subject, idx) => (
                        <div
                            key={idx}
                            className={`rounded-lg p-4 text-white ${idx === 0 ? 'bg-purple-300' : idx === 1 ? 'bg-orange-200' : 'bg-green-200'}`}
                        >
                            <h3 className="text-lg font-semibold">{subject}</h3>
                            <div className="flex gap-4 mt-2">
                                <p className="text-sm">24 lessons</p>
                                <p className="text-sm">8 assignments</p>
                                <p className="text-sm">99 students</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Upcoming Class */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-bold">Upcoming Class</h3>
                    <div className="mt-4">
                        <p className="font-semibold">Analisis Peubah Ganda</p>
                        <p className="text-sm text-gray-500">09:20 - 11:40 AM Monday</p>
                    </div>
                    <hr className="my-2" />
                    <div>
                        <p className="font-semibold">Rekayasa Perangkat Lunak</p>
                        <p className="text-sm text-gray-500">07:00 - 09:30 AM Friday</p>
                    </div>
                </div>
            </div>

            {/* Semester Grades and Study */}
            <div className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Semester Grades */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-bold">Semester Grades</h3>
                    {/* Placeholder for Chart */}
                    <div className="mt-4 h-40 bg-gray-200 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">Chart goes here</p>
                    </div>
                </div>

                {/* Study Hours */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-bold">Study Hours</h3>
                    {/* Placeholder for Gauge */}
                    <div className="mt-4 h-40 bg-gray-200 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">Gauge goes here</p>
                    </div>
                    <p className="text-center mt-4 font-semibold">Your Hours: 8 Hours</p>
                </div>
            </div>

            {/* Material Recommendations */}
            <div className="px-6 py-6">
                <h3 className="text-lg font-bold mb-4">Material Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="bg-white shadow rounded-lg p-4">
                            <div className="bg-gray-200 h-32 mb-4 rounded-md"></div>
                            <h4 className="font-semibold">Programming</h4>
                            <p className="text-sm text-gray-500 mt-2">Lorem ipsum dolor sit amet</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
