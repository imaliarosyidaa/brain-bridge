import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Eye } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

export default function SubmitedList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [jawaban, setJawaban] = useState([]);
    const { auth } = useAuth();
    const { id } = useParams();

    console.log(id)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/jawaban/assesment/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                setJawaban(response.data.data);
            } catch (error) {
                console.error("Error fetching assessments:", error.response?.data || error.message);
            }
        }
        fetchData();
    }, [auth.accessToken, id]);

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Daftar Jawaban</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-6 py-3 border-b border-gray-200">ID</th>
                            <th className="px-6 py-3 border-b border-gray-200">Assessment ID</th>
                            <th className="px-6 py-3 border-b border-gray-200">Siswa ID</th>
                            <th className="px-6 py-3 border-b border-gray-200">Nilai</th>
                            <th className="px-6 py-3 border-b border-gray-200">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jawaban.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`${index % 2 === 0 ? 'bg-[#48CAE4]' : 'bg-[#C0E0EF]'} text-gray-800`}
                            >
                                <td className="px-6 py-4 border-b border-gray-200">{row.id}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{row.assesment_id}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{row.siswa_id}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{row.nilai || 'Belum Dinilai'}</td>
                                <td className="px-6 py-4 border-b border-gray-200">
                                    <Link
                                        to={row.file}
                                        className="text-blue-500 flex items-center gap-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Eye size={16} />
                                        Lihat Jawaban
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
