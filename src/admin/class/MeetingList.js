import { Link } from 'react-router-dom'

export default function MeetingList({ meetings }) {
    return (
        <div className='bg-[#48CAE4] rounded-md w-2/3 p-4 m-4 overflow-y-auto max-h-screen min-h-screen'>
            <h1 className='font-bold text-white pb-4'>Meetings</h1>
            <div className='grid grid-cols-1 gap-4'>
                {meetings.map((meeting) => (<Meeting meeting={meeting} key={meeting.id} />))}
            </div>
        </div>
    );
}

function Meeting({ meeting }) {
    return (
        <div className="h-fit bg-[#FFD60A] shadow rounded-lg p-4 hover:shadow-md transition grid grid-cols-1 lg:grid-cols-6 gap-4">
            <div className='col-span-5'>
                <p className='font-bold'>{meeting.title}</p>
                <p className='lowercase text-sm text-[#343A40]'>{meeting.description}</p>
            </div>
            <div className='col-span-1 content-center'>
                <button className="bg-white px-4 py-1 rounded-md">open</button>
            </div>
        </div>
    );
}