import { Link, useParams } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import List from '../../components/List';

export default function MeetingList() {
    const { auth } = useAuth();
    const [meetings, setMeetings] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/meeting/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                setMeetings(response?.data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        }
        fetchData();
    }, [id, auth.accessToken]);

    return (
        <div className="p-6 max-w-full min-w-full mx-auto max-h-screen">
            <div className='flex items-center mb-4'>
                <h1 className="font-semibold text-lg text-slate-800">Modul</h1>
                {(auth?.role === 'ADMIN' || auth.role === 'PENGAJAR') && (
                    <Link to={`/class/meeting/add/${id}`} className='ml-2'>
                        <PlusCircle fill='white' color='#48CAE4' aria-label="Add Meeting" />
                    </Link>)}
            </div>
            {meetings.length === 0 ? <p className='italic flex text-gray-500 justify-center relative top-1/2'>Pelajaran tidak ditemukan</p> :
                <ul className="grid grid-cols-1 gap-2 px-8">
                    {meetings.map((meeting) => (
                        <List route={`/class/meeting/detail/${meeting.id}`} data={meeting.tittle} />
                    ))}
                </ul>
            }
        </div>
    );
}
