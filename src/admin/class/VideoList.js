import { Download } from 'lucide-react';

export default function VideoList({ videos }) {
    return (
        <div className="m-4">
            <h1 className="font-bold pb-4">Video Section</h1>
            <div className="grid grid-cols-1 gap-6">
                {videos.map((video, index) => (
                    <Video video={video} key={index} />
                ))}
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
        <div className="border rounded-lg shadow p-4 space-y-3">
            <div className="flex justify-between items-center">
                <p className="capitalize font-medium">{video.title_vid || 'Untitled Video'}</p>
                <Download onClick={() => handleDownload(video.vidio)} className="cursor-pointer" />
            </div>
            <video
                controls
                className="w-full rounded-md"
                src={video.vidio}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
