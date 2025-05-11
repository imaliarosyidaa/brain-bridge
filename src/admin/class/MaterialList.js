import { Link } from 'react-router-dom'
import { Download } from "lucide-react";
import List from '../../components/List';

export default function MaterialList({ materials }) {
    return (
        <div className='rounded-md m-4 max-h-full min-h-full'>
            <div className='grid grid-cols-1 gap-4'>
                {materials && materials.map((item, index) => {
                    return <Material key={index} material={item} />;
                })}
            </div>
        </div>
    );
}

function Material({ material }) {
    const handleDownload = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleDownload(material.materi)} target="_blank">
            Download PDF
        </button>
    );
}