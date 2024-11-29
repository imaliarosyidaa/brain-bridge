import imalia from '../logo/testimoni.jpg';

export default function Testimonial() {
    return (
        <div id="testimonial" className='p-8 border-t-2'>
            <div className="grid h-96 grid-cols-1 lg:grid-cols-3">
                <div className="text-start">
                    <p className="text-[#2F327D] pb-4">TESTIMONIAL</p>
                    <h3 className="text-[#2F327D] text-bold text-3xl pb-4">What They Say?</h3>
                    <p className="text-[#696984]">BrainBridge has got more than 100k positive ratings from our users around the wordl.
                        <br /><br />
                        Some of the students and teachers were greatly helped by the BrainBridge.
                        <br /> <br />
                        Are you too? Please give your assessment
                    </p>
                </div>
                <div className='col-span-2 '>
                    <img className='w-[25%] border-2' src={imalia} alt="testimoni"></img>
                    <div className='bg-white'>
                        Sya sangat senang mengikuti kelas pembelakaran online di Brain Bridge. Materi yang mudah dipahami membuat saya semangat untuk belajar. Website ini adalah terobosan baru bagi dunia pendidikan.
                    </div>
                </div>
            </div>
        </div>
    );
}