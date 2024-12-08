import { UsersRound } from 'lucide-react';
import { DoorClosed, Plus } from 'lucide-react';
import { Link } from 'react-router-dom'

export default function ClassList({ topics }) {
    return (
        <>
            <button type='button' className='text-white mb-6 bg-blue rounded-full py-2 px-6 hover:shadow-sm hover:bg-sky-500'>
                <Link to="/class/add" className='grid gap-2 grid-flow-col'>
                    Add Class
                    <Plus />
                </Link>
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topics.map((topic) => (<Topic topic={topic} key={topic.id} />))}
            </div>
        </>
    );
}

function Topic({ topic }) {
    return (
        <Link to="/class/meeting">
            <div style={{ 'backgroundColor': topic.color, }} className="uppercase w-full h-[237px] shadow rounded-lg p-4 hover:shadow-md transition grid content-between">
                <div>
                    <img src={topic.img} alt="Logo" className="w-max h-auto" />
                    <p className='pt-4 font-semibold'>{topic.description}</p>
                </div>
                <div className='bg-white rounded-lg grid grid-cols-1 lg:grid-cols-2 p-2 divide-x-2'>
                    <div className={`flex justify-center ${topic.closed ? 'text-black' : 'text-rose-500'}`}> <DoorClosed /><span className='px-2'> {topic.closed ? 'Open' : 'Closed'}</span></div>
                    <div className='lowercase flex justify-center'><UsersRound /><span className='px-2'>Student:</span> {topic.quantity}</div>
                </div>
            </div>
        </Link>
    );
}