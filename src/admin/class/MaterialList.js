import { UsersRound } from 'lucide-react';
import { DoorClosed } from 'lucide-react';
import { Link } from 'react-router-dom'

export default function MaterialList({ materials }) {
    return (
        <div className='bg-[#48CAE4] rounded-md w-2/3 p-4 m-4'>
            <h1 className='font-bold text-white pb-4'>Materials</h1>
            <div className='grid grid-cols-1 gap-4'>
                {materials.map((material) => (<Material material={material} key={material.id} />))}
            </div>
        </div>
    );
}

function Material({ material }) {
    return (
            <Link to="/class/detail">
                <div className="uppercase h-fit bg-[#FFD60A] shadow rounded-lg p-4 hover:shadow-md transition grid grid-cols-1 lg:grid-cols-6 content-between">
                    <div className='col-span-5'>
                            {material.title}
                        <p className='lowercase'>{material.description}</p>
                    </div>
                    <div  className='col-span-1'>
                        <button>haloo</button>
                    </div>
                </div>
            </Link>
    );
}