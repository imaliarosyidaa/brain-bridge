import imalia from '../logo/imalia.png';
import idho from '../logo/idho.png';
import kevin from '../logo/kevin.jpeg';

export default function Testimonial() {
    return (
        <div id="testimonial" className="p-8 border-t-2">
            <div className="grid h-96 grid-cols-1 lg:grid-cols-3 gap-6 cursor-grab">
                {/* Kolom Kiri: Teks Testimonial */}
                <div className="text-start">
                    <p className="text-[#2F327D] pb-4 font-medium uppercase">Testimonial</p>
                    <h3 className="text-[#2F327D] font-bold text-3xl pb-4">Apa pendapat mereka tentang BrainBridge?</h3>
                    <p className="text-[#696984] leading-relaxed">
                        BrainBridge mendapat lebih dari 1k+ ulasan positif dari pengguna di seluruh kabupaten/kota di Indonesia
                    </p>
                </div>

                {/* Kolom Kanan: Gambar dan Konten */}
                <div className="col-span-2 flex flex-row overflow-x-scroll gap-6">
                    {/* Testimoni 1 */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-4 w-80">
                        <img
                            className="w-40 h-40 object-cover border-2 rounded-md"
                            src={imalia}
                            alt="Testimonial"
                        />
                        <div className="bg-white min-h-[140px] p-4 rounded-lg shadow-md">
                            <p className="text-[#696984]">
                                Saya sangat senang mengikuti kelas pembelajaran online di BrainBridge.
                                Materi yang mudah dipahami membuat saya semangat untuk belajar.
                            </p>
                        </div>
                    </div>

                    {/* Testimoni 2 */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-4 w-80">
                        <img
                            className="w-40 h-40 border-2 rounded-md object-cover"
                            src={idho}
                            alt="Testimonial 2"
                        />
                        <div className="bg-white min-h-[140px] p-4 rounded-lg shadow-md">
                            <p className="text-[#696984]">
                                Kelas ini benar-benar membantu saya memahami materi yang sebelumnya sulit.
                                Website ini adalah terobosan baru bagi dunia pendidikan.
                            </p>
                        </div>
                    </div>

                    {/* Testimoni 3 */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-4 w-80">
                        <img
                            className="w-40 h-40 object-cover border-2 rounded-md"
                            src={kevin}
                            alt="Testimonial 3"
                        />
                        <div className="bg-white min-h-[140px] h-auto p-4 rounded-lg shadow-md">
                            <p className="text-[#696984]">
                                Pengalaman belajar yang menyenangkan! Fitur dan antarmuka yang mudah digunakan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}