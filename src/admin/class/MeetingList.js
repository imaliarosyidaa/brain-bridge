import { Link, useParams } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

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
        <div className="bg-[#48CAE4] rounded-md p-6 m-4 max-w-4xl mx-auto overflow-y-auto max-h-screen min-h-screen">
            <div className='flex items-center mb-4'>
                <h1 className="font-bold text-white text-lg">Meetings</h1>
                <Link to={`/class/meeting/add/${id}`} className='ml-2'>
                    <PlusCircle fill='white' color='#48CAE4' aria-label="Add Meeting" />
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {meetings.map((meeting) => (
                    <MeetingItem meeting={meeting} key={meeting.id || meeting.title} />
                ))}
            </div>
        </div>
    );
}

function MeetingItem({ meeting }) {
    return (
        <div className="bg-[#FFD60A] shadow-md rounded-lg p-5 hover:shadow-lg transition duration-300 ease-in-out">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                {/* Content */}
                <div className="lg:col-span-5">
                    <p className="font-bold text-gray-800 text-lg">{meeting.tittle}</p>
                    <p className="text-sm text-[#343A40] mt-2">{meeting.description}</p>
                </div>
                {/* Action Button */}
                <div className="lg:col-span-1 flex justify-end">
                    <Link to={`/class/meeting/detail/${meeting.id}`} aria-label={`Open meeting ${meeting.title}`}>
                        <button className="bg-white text-sm font-medium text-gray-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition">
                            Open
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
