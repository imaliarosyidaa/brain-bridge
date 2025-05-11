import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Plus } from 'lucide-react';
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";

export default function ClassList({ initialAsset }) {
    const { auth } = useAuth();
    const [topics, setTopics] = useState([]);
    const [styledTopics, setStyledTopics] = useState([]);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [assesment, setAssessment] = useState([]);
    const [assessmentCount, setAssessmentCount] = useState();
    const [joinedClass, setJoinedClass] = useState('')
    const [isJoined, setIsJoined] = useState(false)
    const [currentPage, setCurrentPage] = useState("class");
    const variants = ["light"];

    useEffect(() => {
        async function fetchData() {
            try {
                let response;
                if (auth.role === 'PENGAJAR') {
                    response = await axios.get(`/api/class/pengajar/${auth.id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: '*/*',
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                        withCredentials: true,
                    });
                } else if (auth.role === 'ADMIN') {
                    response = await axios.get('/api/class', {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: '*/*',
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                        withCredentials: true,
                    });
                } else {
                    response = await axios.get('/api/class', {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: '*/*',
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                        withCredentials: true,
                    });
                }

                setTopics(response.data);
            } catch (error) {
                console.error("Error fetching class data:", error.response?.data || error.message);
            }
        }

        if (auth?.accessToken && auth?.role) {
            fetchData();
        }
    }, [auth.accessToken, auth.role, auth.id]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/assesment/class', {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                const grouped = response.data.reduce((acc, assessment) => {
                    if (!acc[assessment.kelas_id]) {
                        acc[assessment.kelas_id] = [];
                    }
                    acc[assessment.kelas_id].push(assessment);
                    return acc;
                }, {});
                setAssessment(grouped);
            } catch (error) {
                console.error("Error fetching assessments:", error.response?.data || error.message);
            }
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
            setIsJoined(true)
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
            setIsJoined(false)
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
            {variants.map((variant) => (
                <Breadcrumbs underline="active" onAction={(key) => setCurrentPage(key)} key={variant} variant={variant}>
                    <BreadcrumbItem key="home" href="/">
                        Home
                    </BreadcrumbItem>
                    <BreadcrumbItem key="class" isCurrent={currentPage === "class"}>
                        Class
                    </BreadcrumbItem>
                </Breadcrumbs>
            ))}
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
                <div className='mb-8 flex justify-start'>
                    <Button type="button" name="Add Class" route="/class/add" icon={<Plus />} />
                </div>
            )}
            <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {styledTopics.map((topic, index) => (
                    <Card
                        topic={topic}
                        route={`/class/meeting/${topic.id}`}
                        key={topic.id || index}
                        auth={auth}
                        onDelete={deleteData}
                        assessments={assesment[topic.id] || []}
                        onJoin={joinClass}
                        joinedClass={joinedClass}
                        onLeave={leaveClass}
                        isJoined={isJoined}
                    />
                ))}
            </div>
        </>
    );
}

