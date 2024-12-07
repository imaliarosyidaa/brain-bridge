import MaterialList from "./class/MaterialList";
import PreviewSection from "./class/PreviewSection";
import SummarySection from "./class/SummarySection";
import VideoList from "./class/VideoList";

export default function DetailClassLayout({ videos, materials }) {
    return (
        <div className='lg:max-h-screen grid lg:grid-rows-2 grid-rows-4 lg:grid-flow-col gap-4 lg:gap-0'>
            <div className='lg:row-span-2'>
                <VideoList videos={videos} />
            </div>
            <div className='lg:col-span-1'>
                <MaterialList materials={materials} />
            </div>
            <div className='lg:col-span-1'>
                <SummarySection />
            </div>
            <div className='lg:row-span-2'>
                <PreviewSection />
            </div>
        </div>
    );
}