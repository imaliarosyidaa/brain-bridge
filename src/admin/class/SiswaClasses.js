import { useParams } from 'react-router-dom';
import { Mail, XCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import List from '../../components/List';

export default function SiswaClasses({ assessment }) {
    const { auth } = useAuth();
    const [students, setStudents] = useState([]);
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function deleteData(id) {
        try {
            const response = await axios.delete(`/api/class/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                withCredentials: true,
            });
            setMessage(response?.data?.message);
            setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            setErrorMessage("Failed to delete the class. Please try again.");
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/class/${id}/anggota`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                setStudents(response?.data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        }
        fetchData();
    }, [id, auth.accessToken]);

    return (
        <div className="max-w-full min-w-full mx-auto max-h-screen">
            <div className='flex items-center mb-4'>
                <h1 className="font-semibold text-slate-800 text-lg">Student</h1>
            </div>
            {students.length === 0 ? <p className='italic flex text-gray-500 justify-center relative top-1/2'>-No student joined the class-</p> :
                <div className="grid grid-cols-1 gap-6">
                    {students.map((item, index) => (
                        <List data={item.name} key={index} onDelete={deleteData} />
                    ))}
                </div>
            }
        </div>
    );
}