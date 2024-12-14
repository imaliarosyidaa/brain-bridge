import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Eye, ArrowUp, ArrowDown, Trash2Icon } from 'lucide-react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import Tab from './Tab';

export default function Topics() {
    const { auth } = useAuth();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const { id } = useParams();
    const [message, setMessage] = useState('');

    const rowsPerPage = 5;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/topic', {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching admin users:', error);
            }
        }
        fetchData();
    }, [auth.accessToken]);

    async function deleteData(id) {
        try {
            const response = await axios.delete(`/api/topic/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                withCredentials: true,
            });
            setMessage(response?.data?.message)
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            alert("update failed, please check your credentials.");
        }
    }

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
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <Tab />
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-6 py-3 border-b border-gray-200">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleSort('name')}
                                >
                                    <span>Id</span>
                                    {getSortIcon('name')}
                                </div>
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleSort('email')}
                                >
                                    <span>Name</span>
                                    {getSortIcon('email')}
                                </div>
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`${index % 2 === 0 ? 'bg-[#48CAE4]' : 'bg-[#C0E0EF]'
                                    } text-gray-800`}
                            >
                                <td className="px-6 py-4 border-b border-gray-200">{row.id}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{row.name}</td>
                                <td className="px-6 py-4 border-b border-gray-200">
                                    <button onClick={() => deleteData(row.id)}
                                        className="text-blue-500 flex text-red-500 items-center gap-2"
                                    >
                                        <Trash2Icon size={16} color="red" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {message && <p className="text-red-500 text-sm my-4">{message}</p>}
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
