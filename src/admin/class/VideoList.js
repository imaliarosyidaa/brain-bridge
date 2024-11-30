import { Link } from 'react-router-dom'
import { LayoutDashboard, Download } from 'lucide-react'

export default function VideoList({ videos }) {
    return (
        <div className='bg-[#48CAE4] rounded-2xl p-4 overflow-y-auto max-h-screen min-h-screen m-4'>
            <h1 className='font-bold text-white pb-4'>Video Section</h1>
            <div className='grid grid-cols-1 gap-4'>
                {videos.map((video) => (<Video video={video} key={video.id} />))}
            </div>
        </div>
    );
}

function Video({ video }) {
    return (
        <div className="h-fit bg-white shadow rounded-3xl px-3 pt-3 pb-6 hover:shadow-md transition grid grid-cols-1 gap-4">
            <img src={video.cover} alt="video-cover" />
            <div className='flex justify-between'>
                <div className='flex'>
                    <LayoutDashboard color='#FFA62B' />
                    <p className='pl-2'>{video.title}</p>
                </div>
                <div>
                    <Download />
                </div>
            </div>
        </div>
    );
}