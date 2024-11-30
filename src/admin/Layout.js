import programming from '../logo/programming.png'
import ss from '../logo/social-science.png'
import wd from '../logo/website-development.png'
import stat from '../logo/stat.png'
import math from '../logo/math.png'
import TopicList from './class/TopicList'
import MaterialList from './class/MaterialList'
import { Route, Routes } from 'react-router-dom'

const initialClass = [
    { id: 1, description: "Programming", quantity: 2, img: programming, color: "#E1E2F6", closed: false },
    { id: 2, description: "Social Science", quantity: 12, img: ss, color: "#F8EFE2", closed: false },
    { id: 3, description: "Website Development", quantity: 3, img: wd, color: "#F3E4FF", closed: true },
    { id: 4, description: "Statistic", quantity: 1, img: stat, color: "#EFF7E2", closed: true },
    { id: 5, description: "Matematics", quantity: 1, img: math, color: "#C0E0EF", closed: true },
];

const initialMaterials = [
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

export function ContentArea(topics) {
    return (
        <div>
            {/* <TopicList topics={initialClass} /> */}
            <MaterialList materials={initialMaterials} />
        </div>
    );
}
