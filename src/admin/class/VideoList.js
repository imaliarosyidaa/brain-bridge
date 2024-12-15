import { Link } from 'react-router-dom'
import { LayoutDashboard, Download, Play } from 'lucide-react'
import VideoCover from '../../logo/video-cover.png'

export default function VideoList({ videos }) {
    return (
        <div className='bg-[#48CAE4] rounded-2xl p-4 overflow-y-auto max-h-screen min-h-screen m-4'>
            <h1 className='font-bold text-white pb-4'>Video Section</h1>
            <div className='grid grid-cols-1 gap-4'>
                {videos.map((video, index) => (<Video video={video} key={index} />))}
            </div>
        </div>
    );
}

function Video({ video }) {
    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop();
        link.click();
    };

    return (
        <div className="h-fit bg-white shadow rounded-3xl px-3 pt-3 pb-6 hover:shadow-md transition grid grid-cols-1 gap-4">
            <div>
                <div className='relative'>
                    <img className='w-full' src={VideoCover} alt="video-cover" />
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                        <Play fill='#FFD60A' style={{ cursor: 'pointer'}} size={30} color='transparent' />
                    </div>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className='grid grid-flow-col'>
                    <LayoutDashboard color='#FFA62B' />
                    <p className='pl-2 capitalize'>{video.title_vid}</p>
                </div>
                <div className='px-4'>
                    <Download onClick={() => handleDownload(video.vidio)}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>
        </div>
    );
}