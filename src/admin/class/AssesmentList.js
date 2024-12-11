import { Link, useParams } from 'react-router-dom';
import { NotebookPenIcon, ArrowRight, BookOpen, Clock, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

export default function AssessmentList({ assessment }) {
    const { auth } = useAuth();
    const [assessments, setAssessments] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/assesment/class/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                setAssessments(response?.data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        }
        fetchData();
    }, [id, auth.accessToken]);

    return (
        <div className="bg-[#48CAE4] max-h-screen rounded-md p-6 m-4 overflow-y-auto">
            <div className='flex items-center mb-4'>
                <h1 className="font-bold text-white text-lg">Assesment</h1>
                <Link to={`/class/assesment/add/${id}`} className='ml-2'>
                    <PlusCircle fill='white' color='#48CAE4' />
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {assessments.map((item, index) => (
                    <AssessmentItem assessment={item} key={index} />
                ))}
            </div>
        </div>
    );
}

function AssessmentItem({ assessment }) {
    return (
        <Link
            to="/class/assessment/detail"
            className="bg-[#FFD60A] shadow rounded-lg p-2 hover:shadow-md transition duration-300 ease-in-out hover:bg-yellow-200"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                {/* Icon */}
                <div className='flex items-center'>
                    <div className=" bg-white rounded-sm p-2 w-max h-max">
                        <NotebookPenIcon color="#D7BC0B" />
                    </div>
                    {/* Title */}
                    <div className="pl-4">
                        <p className="font-bold text-gray-800">{assessment.title}</p>
                    </div>
                </div>
                {/* Arrow Icon */}
                <div className="col-span-1 flex justify-end items-center">
                    <ArrowRight />
                </div>
            </div>

            {/* Footer */}
            <div className="pt-1 flex items-center flex-wrap gap-1">
                <div className="text-sm flex items-center text-gray-700">
                    <span className="p-2">
                        <BookOpen />
                    </span>
                    {assessment.material}
                </div>
                <div className="text-sm flex items-center text-gray-700">
                    <span className="p-2">
                        <Clock />
                    </span>
                    {assessment.deadline}
                </div>
            </div>
        </Link>
    );
}
