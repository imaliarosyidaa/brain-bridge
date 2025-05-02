import { Link } from 'react-router-dom'
import { Download } from "lucide-react";
import List from '../../components/List';

export default function MaterialList({ materials }) {
    return (
        <div className='rounded-md m-4 max-h-full min-h-full'>
            <h2 className="inline-block mb-2 text-base font-medium tracking-tight text-gray-900 dark:text-white">Download Pdf</h2>
            <div className='grid grid-cols-1 gap-4'>
                {materials.map((material, index) => (<Material material={material} key={index} />))}
            </div>
        </div>
    );
}

function Material({ material }) {
    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop();
        link.click();
    };
    return (
        <div className="h-fit flex justify-between items-center">
            <div>
                <ul className='truncate'>
                    <MateriName material={material} />
                </ul>
            </div>
            <div>
                <div className='pr-2'>
                    [
                    <button className='text-sky-500' onClick={() => handleDownload(material.materi)}>Download</button>
                    ]
                </div>
            </div>
        </div>
    );
}

function MateriName({ material }) {
    const url = material.materi;
    const fileName = url.split('/').pop();
    const sanitizeFileName = (fileName) => {
        return fileName.replace(/^[a-f0-9-]+-/, '').trim();
    };
    return (
        <List data={sanitizeFileName(fileName)}></List>
    );
}