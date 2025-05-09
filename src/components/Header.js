import { Link } from 'react-router-dom';

export default function Header() {
    const images = [
        {
            src: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/543000/543370-chicago.jpg",
            alt: "Chicago",
        },
        {
            src: "https://bravaradio.com/wp-content/uploads/2024/01/New-York-City_GettyImages-1347979016-scaled.webp",
            alt: "New York",
        },
    ];
    return (
        <div className="lg:h-fit">
            <div id="default-carousel" className="absolute z-0 w-full bg-slate-900" data-carousel="slide">
                <div className="relative h-56 overflow-hidden md:h-96">
                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src="https://i.natgeofe.com/n/6c531f9e-081f-45cb-ae6c-42bed4c67f45/chicago-travel_4x3.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                    </div>
                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src="https://bravaradio.com/wp-content/uploads/2024/01/New-York-City_GettyImages-1347979016-scaled.webp" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                    </div>
                </div>
            </div>
            <div className="h-96 flex justify-center items-center text-center relative z-20 bg-slate-950 bg-opacity-75 md:bg-opacity-95">
                <div className='lg:px-72 px-6 '>
                    <h1 className="text-[#FFD60A] text-3xl font-bold pb-4">BrainBridge <span className="text-[#94A3b8] font-bold pb-4">menghubungkan pikiran untuk membangun masa depan.</span></h1>
                    <p className="text-[#94A3b8]">
                        Gerbang utama menuju pembelajaran yang mudah diakses dan inklusif—menjembatani kesenjangan pendidikan di Indonesia
                    </p>
                    <div className="mt-6 flex justify-center items-center">
                        <button
                            type="button"
                            className=" bg-[#FFA62B] text-black font-semibold hover:bg-[#fbad3f] focus:outline-none px-5 h-10 rounded-full"
                        >
                            <Link to="/signin">
                                Mulai Sekarang
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}