import { useParams } from 'react-router-dom';

export default function GradeDetails({ tasks }) {
    const { id } = useParams(); // Ambil ID dari URL
    const filteredTasks = tasks.filter(task => task.id === Number(id));

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Detail Nilai Tugas</h1>
            {filteredTasks.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-6 py-3 border-b border-gray-200">Nama Tugas</th>
                                <th className="px-6 py-3 border-b border-gray-200">Tanggal Deadline</th>
                                <th className="px-6 py-3 border-b border-gray-200">Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.map((task,index) => (
                                <tr
                                    key={task.id}
                                    className={`${index % 2 === 0 ? 'bg-[#48CAE4]' : 'bg-[#C0E0EF]'
                                        } text-gray-800`}
                                >
                                    <td className="px-6 py-4 border-b border-gray-200">{task.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">{task.deadline}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">{task.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600">Tidak ada detail untuk tugas ini.</p>
            )}
        </div>
    );
}
