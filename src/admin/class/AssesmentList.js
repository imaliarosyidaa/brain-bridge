import { Link, Route, useParams } from 'react-router-dom';
import { NotebookPenIcon, ArrowRight, BookOpen, Clock, PlusCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import List from '../../components/List';

export default function AssessmentList() {
    const { auth, setAuth } = useAuth();
    const [assessments, setAssessments] = useState([]);
    const [kelasSiswa, setKelasSiswa] = useState([]);
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
                console.error("Error response:", error.response?.data || error.message);
            }
        }
        fetchData();
    }, [id, auth.accessToken]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                setAuth((prevState) => ({
                    ...prevState,
                    id: response.data.id
                }));
            } catch (error) {
                console.error("Error response:", error.response?.data || error.message);
            }
        }
        fetchData();
    }, [setAuth, auth.accessToken]);

    // Ambil data kelas yang diikuti oleh siswa
    useEffect(() => {
        async function fetchKelasSiswa() {
            try {
                const response = await axios.get(`/api/kelas-siswa/user/${auth.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                setKelasSiswa(response?.data);  // Set kelas yang diikuti oleh siswa
            } catch (error) {
                console.error("Error response:", error.response?.data || error.message);
            }
        }
        fetchKelasSiswa();
    }, [auth.id, auth.accessToken]);

    // Ambil semua assessment berdasarkan kelas yang diikuti siswa
    const fetchAssessments = useCallback(
        async (item) => {
            try {
                const response = await axios.get(`/api/assesment/class/${item.kelas_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                setAssessments((prevAssessments) => {
                    const newAssessments = response?.data.filter(
                        (newItem) =>
                            !prevAssessments.some(
                                (existingItem) => existingItem.id === newItem.id
                            )
                    );
                    return [...prevAssessments, ...newAssessments];
                });
            } catch (error) {
                console.error("Error response:", error.response?.data || error.message);
            }
        },
        [auth.accessToken]
    );

    useEffect(() => {
        console.log(kelasSiswa);
        if (kelasSiswa.length === 0) return;
        kelasSiswa.forEach(fetchAssessments);
    }, [kelasSiswa, auth.accessToken, fetchAssessments]);

    return (
        <>
            <div className='flex items-center mb-4'>
                <h1 className="font-semibold text-slate-800 text-lg">Assesment</h1>
                {(auth?.role === 'ADMIN' || auth.role === 'PENGAJAR') && (
                    <Link to={`/class/assesment/add/${id}`} className='ml-2'>
                        <PlusCircle fill='white' color='#48CAE4' />
                    </Link>
                )}
            </div>
            {assessments.length === 0 ? <p className='italic flex text-gray-500 justify-center relative top-1/2'>-No assessment in this class-</p> :
                <div className="grid grid-cols-1 gap-2">
                    {assessments.map((item, index) => (
                        <List data={item.title} key={index} auth={auth} route={`/class/assessment/detail?assesment_id=${item.id}`} />
                    ))}
                </div>
            }
        </>
    );
}
