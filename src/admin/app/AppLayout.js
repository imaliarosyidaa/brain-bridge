import React from 'react';
import useAuth from '../../hooks/useAuth';

export default function Dashboard() {
    const { auth } = useAuth();

    return (
        <div className="min-h-screen">

            {auth.role === 'SISWA' &&
                <div div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                </div>
            }

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
        </div >
    );
}
