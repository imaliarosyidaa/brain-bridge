import { UsersRound } from 'lucide-react';
import { DoorClosed, Plus, ClipboardListIcon, XCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import programming from '../../logo/programming.png';
import ss from '../../logo/social-science.png';
import wd from '../../logo/website-development.png';
import stat from '../../logo/stat.png';
import math from '../../logo/math.png';

export default function ClassList({ initialAsset }) {
    const { auth } = useAuth();
    const [topics, setTopics] = useState([]);
    const [styledTopics, setStyledTopics] = useState([]);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [assesment, setAssessment] = useState([]);
    const [assessmentCount, setAssessmentCount] = useState();
    const [joinedClass, setJoinedClass] = useState('')

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/api/class', {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                withCredentials: true,
            });
            setTopics(response.data);
        }
        fetchData();
    }, [auth.accessToken]);

    useEffect(() => {
        const updatedTopics = topics.map((topic, index) => {
            const asset = initialAsset[index % initialAsset.length];
            return {
                ...topic,
                color: asset.color,
                img: asset.img,
            };
        });
        setStyledTopics(updatedTopics);
    }, [topics]);


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
            setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== id));
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            setErrorMessage("Failed to delete the class. Please try again.");
        }
    }

    async function joinClass(id) {
        console.log(auth.accessToken)
        try {
            const response = await axios.post(`/api/class/join/${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                withCredentials: true,
            });
            setJoinedClass(response?.data)
            setMessage("Success! You've joined the class successfully.");
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            setErrorMessage("Failed to join the class. Please try again.");
        }
    }

    async function leaveClass(id) {
        console.log(auth.accessToken)
        try {
            const response = await axios.delete(`/api/class/leave/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                withCredentials: true,
            });
            setJoinedClass(response?.data)
            setMessage("You have successfully left the class.");
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            setErrorMessage("Failed to leave the class. Please try again.");
        }
    }

    useEffect(() => {
        const count = assesment.length;
        setAssessmentCount(count)
    }, [assesment]);

    return (
        <>
            {message && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
                    {message}
                </div>
            )}
            {errorMessage &&
                <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-md">
                    {errorMessage}
                </div>
            }

            {(auth?.role === 'ADMIN' || auth.role === 'PENGAJAR') && (
                <button
                    type="button"
                    className="text-white mb-6 bg-blue rounded-full py-2 px-6 hover:shadow-sm hover:bg-sky-500"
                >
                    <Link to="/class/add" className="grid gap-2 grid-flow-col">
                        Add Class
                        <Plus />
                    </Link>
                </button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {styledTopics.map((topic, index) => (
                    <Topic
                        topic={topic}
                        color={topic.color}
                        image={topic.img}
                        key={topic.id || index}
                        auth={auth}
                        onDelete={deleteData}
                        onJoin={joinClass}
                        assessmentCount={assessmentCount}
                        joinedClass={joinedClass}
                        onLeave={leaveClass}
                    />
                ))}
            </div>
        </>
    );
}

function Topic({ topic, color, image, auth, onDelete, assessmentCount, onJoin, joinedClass, onLeave }) {
    return (
        <div
            style={{ backgroundColor: color }}
            className="w-full h-[237px] shadow rounded-lg p-4 hover:shadow-md transition relative z-0 flex flex-col justify-between"
        >
            {(auth?.role === 'ADMIN' || auth.role === 'PENGAJAR') && (
                <button
                    className="absolute top-4 right-4 rounded-full w-6 h-6 bg-red-500 text-white flex items-center justify-center text-xs leading-none hover:shadow-md transition"
                    onClick={() => onDelete(topic.id)}
                >
                    x
                </button>
            )}
            {joinedClass && (auth?.role === 'SISWA') && (
                <button
                    onClick={() => onJoin(topic.id)}
                    className="absolute top-4 right-4 rounded-full py-1 px-4 font-semibold bg-orange text-gray-700 flex items-center justify-center text-sm leading-none hover:shadow-md transition"
                >
                    join class
                </button>
            )}

            {!joinedClass && (auth?.role === 'SISWA') && (
                <button
                    onClick={() => onLeave(topic.id)}
                    className="absolute top-4 right-4 rounded-full py-1 px-4 font-semibold bg-red-400 text-red-700 flex items-center justify-center text-sm leading-none hover:shadow-md transition"
                >
                    leave class
                </button>
            )}
            <div>
                <div className="flex items-center justify-between">
                    <img src={image} alt="Logo" className="w-max h-auto" />
                </div>
                <p className="pt-4 font-semibold uppercase">{topic.name}</p>
            </div>

            <Link to={`/class/meeting/${topic.id}`} className="bg-white rounded-lg grid grid-cols-1 lg:grid-cols-2 p-2 lg:divide-x-2">
                <div className="flex justify-center text-sm">
                    <ClipboardListIcon />
                    <span className="px-2">Assessment: {assessmentCount}</span>
                </div>
                <div className="lowercase flex justify-center text-sm">
                    <UsersRound />
                    <span className="px-2">Student:</span> {topic.quantity}
                </div>
            </Link>
        </div>
    );
}
