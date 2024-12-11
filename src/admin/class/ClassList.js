import { UsersRound } from 'lucide-react';
import { DoorClosed, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import programming from '../../logo/programming.png';
import ss from '../../logo/social-science.png';
import wd from '../../logo/website-development.png';
import stat from '../../logo/stat.png';
import math from '../../logo/math.png';

export default function ClassList() {
    const { auth } = useAuth();
    const [topics, setTopics] = useState([]);
    const [styledTopics, setStyledTopics] = useState([]);

    const initialAsset = [
        { id: 1, img: programming, color: "#E1E2F6" },
        { id: 2, img: ss, color: "#F8EFE2" },
        { id: 3, img: wd, color: "#F3E4FF" },
        { id: 4, img: stat, color: "#EFF7E2" },
        { id: 5, img: math, color: "#C0E0EF" },
    ];

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
    }, [topics, initialAsset]);

    return (
        <>
            <button
                type="button"
                className="text-white mb-6 bg-blue rounded-full py-2 px-6 hover:shadow-sm hover:bg-sky-500"
            >
                <Link to="/class/add" className="grid gap-2 grid-flow-col">
                    Add Class
                    <Plus />
                </Link>
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {styledTopics.map((topic, index) => (
                    <Topic
                        topic={topic}
                        color={topic.color}
                        image={topic.img}
                        key={topic.id || index}
                    />
                ))}
            </div>
        </>
    );
}

function Topic({ topic, color, image }) {
    return (
        <Link to={`/class/meeting/${topic.id}`}>
            <div
                style={{ backgroundColor: color }}
                className="uppercase w-full h-[237px] shadow rounded-lg p-4 hover:shadow-md transition grid content-between"
            >
                <div>
                    <img src={image} alt="Logo" className="w-max h-auto" />
                    <p className="pt-4 font-semibold">{topic.name}</p>
                </div>
                <div className="bg-white rounded-lg grid grid-cols-1 lg:grid-cols-2 p-2 divide-x-2">
                    <div
                        className={`flex justify-center ${
                            topic.closed ? 'text-black' : 'text-rose-500'
                        }`}
                    >
                        <DoorClosed />
                        <span className="px-2">
                            {topic.closed ? 'Open' : 'Closed'}
                        </span>
                    </div>
                    <div className="lowercase flex justify-center">
                        <UsersRound />
                        <span className="px-2">Student:</span> {topic.quantity}
                    </div>
                </div>
            </div>
        </Link>
    );
}
