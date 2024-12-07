import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowUp, ArrowDown } from 'lucide-react';

export default function Grades({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const rowsPerPage = 5;

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const key = sortConfig.key;
        if (sortConfig.direction === 'asc') {
            return a[key] > b[key] ? 1 : -1;
        } else {
            return a[key] < b[key] ? 1 : -1;
        }
    });

    const currentData = sortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const toggleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? (
            <ArrowUp size={16} />
        ) : (
            <ArrowDown size={16} />
        );
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Daftar Pengajar</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-6 py-3 border-b border-gray-200">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleSort('teacher')}
                                >
                                    <span>Pengajar</span>
                                    {getSortIcon('teacher')}
                                </div>
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleSort('class')}
                                >
                                    <span>Kelas</span>
                                    {getSortIcon('class')}
                                </div>
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleSort('averageScore')}
                                >
                                    <span>Rata-rata Nilai</span>
                                    {getSortIcon('averageScore')}
                                </div>
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`${index % 2 === 0 ? 'bg-[#48CAE4]' : 'bg-[#C0E0EF]'
                                    } text-gray-800`}
                            >
                                <td className="px-6 py-4 border-b border-gray-200">{row.teacher}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{row.class}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{row.averageScore}</td>
                                <td className="px-6 py-4 border-b border-gray-200">
                                    <Link
                                        to={`/grades/detail/${row.id}`}
                                        className="text-blue-500 flex items-center gap-2"
                                    >
                                        <Eye size={16} />
                                        Lihat Detail
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    className={`px-4 py-2 bg-[#48CAE4] text-white rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <p className="text-gray-700">
                    Halaman {currentPage} dari {totalPages}
                </p>
                <button
                    className={`px-4 py-2 bg-[#48CAE4] text-white rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
