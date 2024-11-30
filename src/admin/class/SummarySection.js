import { LucideNotebookText } from "lucide-react";

export default function SummarySection() {
    return (
        <div className='bg-[#48CAE4] rounded-2xl m-4 overflow-y-auto h-full'>
            <div className='font-bold text-white px-4 pt-2 flex'>
                <LucideNotebookText fill='#FFD60A' color='#48CAE4' />
                Summary Course
            </div>
            <div className="m-2 rounded-lg text-xs p-1 bg-[#F5F5F5] min-h-full">
                Navigate legal complexities for businesses. Ensure compliance, manage risk, and make informed decisions.
            </div>
        </div>
    );
}