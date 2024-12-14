import { useParams } from 'react-router-dom';
import { Mail, XCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

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
        <div className="bg-[#48CAE4] max-h-full h-full rounded-md p-6 m-4 overflow-y-auto">
            <div className='flex items-center mb-4'>
                <h1 className="font-bold text-white text-lg">Student</h1>
            </div>
            {students.length === 0 ? <p className='italic flex text-gray-500 justify-center relative top-1/2'>-No student joined the class-</p> :
                <div className="grid grid-cols-1 gap-6">
                    {students.map((item, index) => (
                        <SiswaKelasItem siswa={item} key={index} onDelete={deleteData} />
                    ))}
                </div>
            }
        </div>
    );
}

function SiswaKelasItem({ siswa, onDelete }) {
    return (
        <div className="bg-[#FFD60A] shadow rounded-lg p-2 hover:shadow-md transition duration-300 ease-in-out hover:bg-yellow-200">
            <div className="flex items-center justify-between">
                <div className='flex items-center'>
                    <div className=" bg-white rounded-sm w-12 h-12">
                        {/* <NotebookPenIcon color="#D7BC0B" /> */}
                        <image src={siswa.foto} alt={siswa.foto} />
                    </div>
                    <div className="pl-4">
                        <p className="font-bold text-gray-800">{siswa.name}</p>
                        <p className="font-light text-sm text-gray-800 grid-flow-col gap-2 grid"><Mail color='#FFD60A' fill='white' />{siswa.email}</p>
                    </div>
                </div>
                <button onClick={() => onDelete(siswa.id)}>
                    <XCircleIcon fill='red' color='#FFD60A' />
                </button>
            </div>
        </div>
    );
}