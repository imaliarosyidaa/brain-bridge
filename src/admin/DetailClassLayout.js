import useAuth from "../hooks/useAuth";
import AssesmentList from "./class/AssesmentList";
import MeetingList from "./class/MeetingList";
import SiswaClasses from "./class/SiswaClasses";

export default function DetailClassLayout({ meetings, assessment }) {
    const { auth } = useAuth();

    return (
        <div className="grid lg:grid-cols-2 grid-rows-2 gap-4">
            {/* Kolom pertama: MeetingList s(span 2 rows) */}
            <div className="row-span-2">
                <MeetingList meetings={meetings} />
            </div>

            {/* Kolom kedua, baris kedua: AssesmentList */}
            <div className={`${auth.role === 'SISWA' ? "row-span-2" : ""} additional-class`}>
                <AssesmentList assessment={assessment} />
            </div>

            {/* Kolom kedua, baris pertama: SiswaClasses */}
            {auth.role === 'ADMIN' || auth.role === 'PENGAJAR' ? (
                <div>
                    <SiswaClasses />
                </div>
            ) : (
                <div />
            )}
        </div>
    );
}
