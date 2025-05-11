import { Download } from 'lucide-react';
import { useEffect } from 'react';

export default function VideoList({ videos }) {

    return (
        <div className="m-4">
            <h1 className="font-bold pb-4">Video Section</h1>
            <div className="grid grid-cols-1 gap-6">
                {videos && videos.map((item, index) => {
                    return <Video key={index} video={item.vidio} />;
                })}
            </div>
        </div>
    );
}

function Video({ video }) {

    return (
        <div className="border rounded-lg shadow p-4 space-y-3">
            <video
                controls
                className="w-full rounded-md"
                src={video}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
