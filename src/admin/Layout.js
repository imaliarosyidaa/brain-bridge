import programming from '../logo/programming.png'
import ss from '../logo/social-science.png'
import wd from '../logo/website-development.png'
import stat from '../logo/stat.png'
import math from '../logo/math.png'
import TopicList from './class/TopicList'
import MeetingList from './class/MeetingList'
import { Route, Routes } from 'react-router-dom'
import AssesmentList from './class/AssesmentList'
import VideoList from './class/VideoList'
import VideoCover from '../logo/video-cover.png'
import MaterialList from './class/MaterialList'
import PreviewSection from './class/PreviewSection'
import SummarySection from './class/SummarySection'

const initialClass = [
    { id: 1, description: "Programming", quantity: 2, img: programming, color: "#E1E2F6", closed: false },
    { id: 2, description: "Social Science", quantity: 12, img: ss, color: "#F8EFE2", closed: false },
    { id: 3, description: "Website Development", quantity: 3, img: wd, color: "#F3E4FF", closed: true },
    { id: 4, description: "Statistic", quantity: 1, img: stat, color: "#EFF7E2", closed: true },
    { id: 5, description: "Matematics", quantity: 1, img: math, color: "#C0E0EF", closed: true },
];

const initialMeeting = [
    {
        id: 1, title: "Dasar-Dasar JavaScript: Pondasi Pemrograman Web",
        description: "Materi ini mencakup pengenalan JavaScript, mulai dari cara kerja, sintaks dasar, hingga konsep fundamental seperti variabel, tipe data, operator, fungsi, dan pengendalian alur (if-else, loop)."
    },
    {
        id: 2, title: "Manipulasi DOM: Menghidupkan Halaman Web dengan JavaScript",
        description: "Materi ini mencakup memanipulasi DOM (Document Object Model) menggunakan JavaScript untuk menciptakan halaman web yang interaktif."
    },
    {
        id: 3, title: "Pemrograman Berorientasi Objek di JavaScript (OOP)",
        description: "menerapkan paradigma Pemrograman Berorientasi Objek (Object-Oriented Programming) di JavaScript. Materi mencakup konsep seperti kelas, prototipe, pewarisan (inheritance), enkapsulasi, dan polimorfisme."
    },
    {
        id: 4, title: "Pemrograman Berorientasi Objek di JavaScript (OOP)",
        description: "menerapkan paradigma Pemrograman Berorientasi Objek (Object-Oriented Programming) di JavaScript. Materi mencakup konsep seperti kelas, prototipe, pewarisan (inheritance), enkapsulasi, dan polimorfisme."
    },
];

const initialAssesment = [
    {
        id: 1,
        title: "Tugas Pertemuan Pertama",
        material: "Dasar-Dasar JavaScript: Pondasi Pemrograman Web",
        due_date: "23-07-2024",
        closed: false
    },
    {
        id: 2,
        title: "Tugas Pertemuan Kedua",
        material: "Manipulasi DOM: Menghidupkan Halaman Web dengan JavaScript",
        due_date: "23-07-2024",
        closed: false
    },
    {
        id: 3,
        title: "Tugas Pertemuan Ketiga",
        material: "Pemrograman Berorientasi Objek di JavaScript (OOP)",
        due_date: "23-07-2024",
        closed: false
    },
    {
        id: 4,
        title: "Tugas Pertemuan Ketiga",
        material: "Pemrograman Berorientasi Objek di JavaScript (OOP)",
        due_date: "23-07-2024",
        closed: false
    },
    {
        id: 5,
        title: "Tugas Pertemuan Ketiga",
        material: "Pemrograman Berorientasi Objek di JavaScript (OOP)",
        due_date: "23-07-2024",
        closed: false
    }
];

const initialVideos = [
    {
        id: 1, title: "Part 1",
        cover: VideoCover
    },
    {
        id: 2, title: "Part 2",
        cover: VideoCover
    },
    {
        id: 3, title: "Part 3",
        cover: VideoCover
    },
    {
        id: 4, title: "Part 4",
        cover: VideoCover
    },
];

const initialMaterials = [
    { id: 1, title: "Material 1" },
    { id: 2, title: "Material 2" },
    { id: 3, title: "Material 3" },
    { id: 4, title: "Material 4" },
];

export default function Layout({ sidebar, children }) {
    return (
        <div className="flex h-screen">
            <main className="flex-1 bg-gray-50 overflow-auto">
                <div className="container mx-auto p-4">{children}</div>
            </main>
        </div>
    );
}

export function ContentArea(pages) {
    return (
        <div>
            {/* <TopicList topics={initialClass} /> */}
            {/* <div className='flex'>
                <MeetingList meetings={initialMaterials} />
                <AssesmentList assessment={initialAssesment} />
            </div> */}
            <div className='max-h-screen grid grid-cols-3 grid-rows-2'>
                <div className='row-span-2'>
                    <VideoList videos={initialVideos} />
                </div>
                <div className='row-span-1'>
                    <MaterialList materials={initialMaterials} />
                </div>
                <div className='row-span-2'>
                    <PreviewSection />
                </div>
                <div className=''>
                    <SummarySection />
                </div>
            </div>
        </div>
    );
}
