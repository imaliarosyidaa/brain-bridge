import { Link } from 'react-router-dom'
import { Download, LucideBookDown } from "lucide-react";

export default function MaterialList({ materials }) {
    return (
        <div className='rounded-md m-4 overflow-y-auto max-h-full min-h-full'>
            <div className='grid grid-cols-1 gap-4'>
                {materials.map((material,index) => (<Material material={material} key={index} />))}
            </div>
        </div>
    );
}

function Material({ material }) {
    return (
        <div className="h-fit bg-[#FFD60A] shadow rounded-lg p-2 hover:shadow-md transition grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className='col-span-2'>
                <div className='flex items-center justify-start'>
                    <div className='pr-2'>
                        <LucideBookDown fill='#374957' color='#FFD60A' />
                    </div>
                    <MateriName material={material}/>
                </div>
            </div>
            <div className='col-span-2'>
                <div className='flex items-center justify-end'>
                    <div className='pr-2'>
                        <Download />
                    </div>
                    <div>
                        <button className="bg-white px-4 py-1 rounded-md">open</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MateriName({ material }) {
    const url = material.materi;
    const fileName = url.split('/').pop();
    
    return (
        <p className="font-bold text-[#343A40]">{fileName}</p>
    );
}