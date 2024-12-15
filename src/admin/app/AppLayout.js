import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const { auth } = useAuth();
    const [classData, setClassData] = useState([]);

    useEffect(() => {
        async function fetchClassData() {
            try {
                const response = await axios.get('/api/class', {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });

                const classesWithMembers = await Promise.all(
                    response.data.map(async (kelas) => {
                        const anggotaResponse = await axios.get(`/api/class/${kelas.id}/anggota`, {
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: '*/*',
                                Authorization: `Bearer ${auth.accessToken}`,
                            },
                            withCredentials: true,
                        });

                        return {
                            name: kelas.name,
                            memberCount: anggotaResponse.data.length,
                        };
                    })
                );

                setClassData(classesWithMembers);
            } catch (error) {
                console.error('Error fetching class data:', error);
            }
        }

        fetchClassData();
    }, [auth.accessToken]);

    const chartData = {
        labels: classData.map((item) => item.name),
        datasets: [
            {
                label: 'Number of Members',
                data: classData.map((item) => item.memberCount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Class Members Statistics',
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="min-h-screen px-6 py-6">
            <h3 className="text-lg font-bold mb-4">Class Statistics</h3>
            <div className="bg-white rounded-lg shadow p-4 w-1/2 h-80">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}
