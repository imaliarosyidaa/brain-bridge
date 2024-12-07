import people from '../images/lovely-teenage-girl-with-curly-hair-posing-yellow-tshirt-min.png';
import calender from '../logo/calender-icon.png';
import stat from '../logo/stat.png';
import profile from '../logo/profile.png';
import video from '../logo/video.png';

export default function Header() {
    return (
        <div>
            <div className="lg:h-fit relative z-20 pl-6 bg-blue rounded-b-3xl">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    <div className="pt-24">
                        <h1 className="text-[#FFD60A] text-6xl font-bold pb-4">BRAIN BRIDGE :</h1>
                        <h2 className="text-[#343A40] text-6xl font-bold pb-4">Connecting Minds,</h2>
                        <h2 className="text-[#343A40] text-6xl font-bold">Building Futures</h2>
                        <p className="text-start mt-5">
                            Your ultimate gateway to accessible and inclusive learning—bridging gaps, empowering communities, and transforming education for everyone, everywhere.
                        </p>
                        <div className="mt-6">
                            <button
                                type="button"
                                className="flex justify-start bg-[#FFA62B] text-white font-bold hover:bg-[#FF8C1A] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 px-5 py-3 rounded-full"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center overflow-hidden">
                        <img className="w-full max-w-full lg:w-[75%] object-contain" src={people} alt="people" />
                    </div>
                </div>

                {/* Positioning elements responsively */}
                <div>
                    <div className="bg-neutral-100/80 w-fit text-start rounded-xl backdrop-blur-xl absolute left-6 bottom-6 lg:bottom-96 lg:left-[40rem] flex p-3 items-center px-6">
                        <div>
                            <img src={calender} alt="calender" />
                        </div>
                        <div className="pl-4 font-bold text-[#343A40]">
                            Study <br /> Planner
                        </div>
                    </div>
                    <div className="flex items-top py-3 px-4 bg-neutral-100/80 w-fit text-start rounded-xl backdrop-blur-xl absolute bottom-48 lg:bottom-12 lg:right-1/3">
                        <div>
                            <img src={profile} alt="stat" />
                        </div>
                        <div className="pl-4">
                            <p className="font-bold text-[#343A40]">Interactive Class</p>
                            <p>Today at 12.00 PM</p>
                            <div className="flex justify-center pt-3">
                                <div className="w-fit text-white rounded-full px-4 py-1 bg-[#FFA62B]">Join Now</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex p-1 items-center bg-neutral-100/80 w-fit text-start rounded-xl backdrop-blur-xl absolute right-6 bottom-24 lg:right-3 lg:bottom-64">
                        <div>
                            <img src={stat} alt="stat" />
                        </div>
                        <div className="pl-2">
                            <p className="font-bold text-[#343A40]">E-Book Library</p>
                            <p>Baca dan Unduh Buku Anda</p>
                        </div>
                    </div>
                    <div className="flex p-3 bg-neutral-100/80 w-fit text-start rounded-xl backdrop-blur-xl absolute right-6 lg:right-3 lg:bottom-12 md:right-3 bottom-[500px]">
                        <div>
                            <img src={video} alt="video" />
                        </div>
                        <div className="pl-2">
                            <p className="font-bold text-[#343A40]">Video</p>
                            <p>Choice Resolution & <br /> Unduh</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}