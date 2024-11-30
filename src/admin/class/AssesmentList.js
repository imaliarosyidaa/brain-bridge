import { Link } from 'react-router-dom'
import { NotebookPenIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react';
import { BookOpen } from 'lucide-react'
import { Clock } from 'lucide-react';

export default function AssesmentList({ assessment }) {
    return (
        <div className='bg-[#48CAE4] max-h-screen min-h-screen rounded-md w-1/3 p-4 m-4 overflow-y-auto'>
            <h1 className='font-bold text-white pb-4'>Assesment</h1>
            <div className='grid grid-cols-1 gap-4'>
                {assessment.map((assessment) => (<Assesment assessment={assessment} key={assessment.id} />))}
            </div>
        </div>
    );
}

function Assesment({ assessment }) {
    return (
        <Link to="/class/detail" className='h-max bg-[#FFD60A] shadow rounded-lg p-4 hover:shadow-md transition'>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 hover:bg-yellow-200">
                <div className='col-span-1 bg-white rounded-sm p-2 w-max h-max'>
                    <NotebookPenIcon color='#D7BC0B' />
                </div>
                <div className='col-span-3'>
                    <p className='font-bold'>{assessment.title}</p>
                </div>
                <div className='col-span-1'>
                    <ArrowRight />
                </div>
            </div>
            <div className='pt-4'>
                <p className='text-sm flex'><span className='p-2'><BookOpen /> </span>{assessment.material} </p>
                <p className='text-sm flex pt-4'><span className='p-2'>< Clock /></span>{assessment.due_date}</p>
            </div>
        </Link>
    );
}