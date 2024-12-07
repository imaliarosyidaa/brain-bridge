import programming from '../logo/programming.png'
import ss from '../logo/social-science.png'
import wd from '../logo/website-development.png'
import stat from '../logo/stat.png'
import math from '../logo/math.png'
import book1 from "../logo/book-1.png"
import book2 from "../logo/book-2.png"
import book3 from "../logo/book-3.png"
import book4 from "../logo/book-4.png"
import book5 from "../logo/book-4.png"
import TopicList from "../admin/class/ClassList"
import MeetingList from '../admin/class/MeetingList'
import VideoList from '../admin/class/VideoList'
import VideoCover from '../logo/video-cover.png'
import MaterialList from '../admin/class/MaterialList'
import PreviewSection from '../admin/class/PreviewSection'
import SummarySection from '../admin/class/SummarySection'

export const initialClass = [
    { id: 1, description: "Programming", quantity: 2, img: programming, color: "#E1E2F6", closed: false },
    { id: 2, description: "Social Science", quantity: 12, img: ss, color: "#F8EFE2", closed: false },
    { id: 3, description: "Website Development", quantity: 3, img: wd, color: "#F3E4FF", closed: true },
    { id: 4, description: "Statistic", quantity: 1, img: stat, color: "#EFF7E2", closed: true },
    { id: 5, description: "Matematics", quantity: 1, img: math, color: "#C0E0EF", closed: true },
];

export const initialMeeting = [
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

export const initialAssesment = [
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

export const initialVideos = [
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

export const initialMaterials = [
    { id: 1, title: "Material 1" },
    { id: 2, title: "Material 2" },
    { id: 3, title: "Material 3" },
    { id: 4, title: "Material 4" },
];

export const initialBooks = [
    { id: 1, title: "All Benefits of PLUS", img: book1, },
    { id: 2, title: "Visible Learning", img: book2 },
    { id: 3, title: "The New Rules", img: book3 },
    { id: 4, title: "All Benefits of PLUS", img: book4 },
    { id: 4, title: "All Benefits of PLUS", img: book5 },
];

export const sampleData = [
    {
        id: 1,
        teacher: 'Imalia Rosyida',
        class: 'Matematika',
        averageScore: 85,
    },
    {
        id: 2,
        teacher: 'Ahmad Fauzi',
        class: 'Fisika',
        averageScore: 88,
    },
    {
        id: 3,
        teacher: 'Siti Aisyah',
        class: 'Biologi',
        averageScore: 90,
    },
];

export const sampleTasks = [
    { id: 1, name: 'Tugas 1', deadline: '2024-12-01', score: 85 },
    { id: 2, name: 'Tugas 2', deadline: '2024-12-05', score: 90 },
    { id: 3, name: 'Tugas 3', deadline: '2024-12-10', score: 75 },
];