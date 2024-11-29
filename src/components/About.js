import topic1 from '../logo/Topics 1.png';
import topic2 from '../logo/Topics 2.png';
import topic3 from '../logo/Topics 3.png';

export default function About() {
    return (
        <div id="About" className="w-full mb-12">
            <div className="pt-36 pb-9 px-8 text-center">
                <div className='w-full'>
                    <h1 className="text-bold text-4xl"> <span className="text-[#48CAE4]">All-In-One in</span> <span className="text-[#F48C06]">Brain Bridge</span></h1>
                    <p className="text-[#696984] px-44 pt-4">BrainBridge is a powerful e-learning platform that provides all the tools you need to succeed-bridging the gaps in education and empowering learning anywhere, from schools and communities to workplaces and beyond.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">
                    <div className="drop-shadow-2xl rounded-xl text-center p-8 bg-white flex flex-col items-center">
                        <img src={topic1} alt="topic1" className='w-max -mt-16'></img>
                        <h2 className="text-[#2F327D] pt-4 text-2xl">MATHEMATICS <br /> SCIENCES</h2>
                        <p className="text-[#696984] pt-8">Simple and secure control of your organization's financial and legal transactions. Send customized invoices and contracts</p>
                    </div>
                    <div className="drop-shadow-2xl rounded-xl text-center p-8 bg-white flex flex-col items-center">
                        <img src={topic2} alt="topic2" className='-mt-16'></img>
                        <h2 className="text-[#2F327D] pt-4 text-2xl">SCIENCE AND <br /> TECHNOLOGY</h2>
                        <p className="text-[#696984] pt-8">Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance</p>
                    </div>
                    <div className="drop-shadow-2xl rounded-xl text-center p-8 bg-white flex flex-col items-center">
                        <img src={topic3} alt="topic3" className='-mt-16'></img>
                        <h2 className="text-[#2F327D] pt-4 text-2xl">SOCIAL <br /> SCIENCES</h2>
                        <p className="text-[#696984] pt-8">Automate and track emails to individuals or groups. Skilline's built-in system helps organize your organization</p>
                    </div>
                </div>
            </div>
        </div>
    );
}