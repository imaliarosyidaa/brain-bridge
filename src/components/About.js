import topic1 from '../logo/Topics 1.png';
import topic2 from '../logo/Topics 2.png';
import topic3 from '../logo/Topics 3.png';

export default function About() {
    return (
        <div id="About" className="w-full mb-12">
            <div className="pt-12 pb-9 px-8 text-center">
                <div className='w-full pb-12'>
                    <h1 className="text-bold text-4xl"> <span className="text-[#48CAE4]">Paket Lengkap</span> <span className="text-[#F48C06]">Brain Bridge</span></h1>
                    <p className="text-[#696984] lg:px-44 pt-4">BrainBridge adalah platform e-learning yang menyediakan kelas yang dapat menjembatani kesenjangan dalam pendidikan dan memberdayakan pembelajaran di mana saja.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 pt-12">
                    <div className="drop-shadow-2xl rounded-xl text-center p-8 bg-white flex flex-col items-center">
                        <img src={topic1} alt="topic1" className='w-max -mt-16'></img>
                        <h2 className="text-[#2F327D] pt-4 text-2xl uppercase">Matematika</h2>
                        <p className="text-[#696984] pt-8">Di kelas ini siswa dapat mempelajari konsep dasar hingga lanjutan, seperti aritmatika, aljabar, geometri, statistika, dan kalkulus</p>
                    </div>
                    <div className="drop-shadow-2xl rounded-xl text-center p-8 bg-white flex flex-col items-center">
                        <img src={topic3} alt="topic2" className='-mt-16'></img>
                        <h2 className="text-[#2F327D] pt-4 text-2xl uppercase">Sains</h2>
                        <p className="text-[#696984] pt-8">Materi meliputi berbagai cabang ilmu seperti Fisika, Kimia, Biologi, dan teknologi</p>
                    </div>
                    <div className="drop-shadow-2xl rounded-xl text-center p-8 bg-white flex flex-col items-center">
                        <img src={topic2} alt="topic3" className='-mt-16'></img>
                        <h2 className="text-[#2F327D] pt-4 text-2xl uppercase">sosial</h2>
                        <p className="text-[#696984] pt-8">Kelas ini bertujuan untuk meningkatkan wawasan siswa tentang hubungan antarindividu, masyarakat, dunia global, dan ekonomi</p>
                    </div>
                </div>
            </div>
        </div>
    );
}