import AssesmentList from "./class/AssesmentList";
import MeetingList from "./class/MeetingList";

export default function DetailClassLayout({ meetings, assessment }) {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <MeetingList meetings={meetings} />
            <AssesmentList assessment={assessment} />
        </div>
    );
}