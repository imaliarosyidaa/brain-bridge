import logo from '../brain-bridge-logo.png';

export default function Footer() {
    return (
        <footer>
            <div
                id="footer"
                className="bg-[#48CAE4] p-8 grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-4"
            >
                {/* Logo Section */}
                <div className="text-center lg:text-start col-span-auto">
                    <img src={logo} alt="logo" className="mx-auto lg:mx-0 w-36" />
                </div>

                {/* Address & Contact Section */}
                <div className="lg:col-span-2 text-center lg:text-start border-l-0 lg:border-l-2 border-[#343A40] lg:pl-4">
                    <p>
                        Jl. Otto Iskandardinata No.64C 1, RT.1/RW4. Bidara Cina, Kecamatan
                        Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13330
                    </p>
                    <h3 className="font-bold text-xl text-[#343A40] pt-4">Contact Us</h3>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 pt-2">
                        <div className="flex items-center justify-center lg:justify-start">
                            <div>
                                <i class="block mb-0 text-2xl rounded uil uil-envelope text-slate-800 dark:text-white"></i>
                            </div>
                            <p className="pl-2">Brainbridge@gmail.com</p>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start">
                            <div>
                                <i class="block mb-0 text-2xl rounded uil uil-phone text-slate-800  dark:text-white"></i>
                            </div>
                            <p className="pl-2">+62 82334907089</p>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="text-center lg:text-start">
                    <p className="font-medium text-xl text-[#343A40]">Follow Us</p>
                    <ul className="flex justify-center lg:justify-start gap-4 pt-4 list-none">
                        <li>
                            <a
                                href="https://id-id.facebook.com/PolstatSTIS/"
                                className="btn btn-icon btn-sm border rounded-md p-1 border-slate-700 dark:border-slate-800 hover:border-[#277ca1] bg-slate-800 dark:bg-gray-900 hover:bg-[#277ca1] dark:hover:bg-[#277ca1] text-gray-400 hover:text-white"
                            >
                                <i className="uil uil-facebook-f"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.instagram.com/polstatstis/?hl=en"
                                className="btn btn-icon btn-sm border rounded-md border-slate-700 p-1 dark:border-slate-800 hover:border-[#277ca1] bg-slate-800 dark:bg-gray-900 hover:bg-[#277ca1] dark:hover:bg-[#277ca1] text-gray-400 hover:text-white"
                            >
                                <i className="uil uil-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://twitter.com/STISJKT?s=20&t=wetF8_8CJ2OuhNVS1J27Yg"
                                className="btn btn-icon btn-sm border rounded-md border-slate-700 p-1 dark:border-slate-800 hover:border-[#277ca1] bg-slate-800 dark:bg-gray-900 hover:bg-[#277ca1] dark:hover:bg-[#277ca1] text-gray-400 hover:text-white"
                            >
                                <i className="uil uil-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://id.linkedin.com/school/politeknik-statistika-stis/"
                                className="btn btn-icon btn-sm border rounded-md border-slate-700 p-1 dark:border-slate-800 hover:border-[#277ca1] bg-slate-800 dark:bg-gray-900 hover:bg-[#277ca1] dark:hover:bg-[#277ca1] text-gray-400 hover:text-white"
                            >
                                <i className="uil uil-linkedin"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bg-slate-800 py-2">
                <div class="text-center">
                    <p class="text-gray-400">
                        ©
                        <script>
                            document.write(new Date().getFullYear());
                        </script>
                        Brain Bridge <i class="text-gray-400 mdi mdi-at"></i>
                    </p>
                </div>
            </div>
        </footer>
    );
}