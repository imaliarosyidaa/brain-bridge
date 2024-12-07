import logo from '../brain-bridge-logo.png';
import email from '../logo/email.png';
import phone from '../logo/phone.png';
import linkedin from '../logo/linkedin.png';
import facebook from '../logo/facebook.png';
import instagram from '../logo/instagram.png';
import youtube from '../logo/youtube.png';

export default function Footer() {
    return (
        <div
            id="footer"
            className="bg-[#48CAE4] p-8 grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-4"
        >
            {/* Logo Section */}
            <div className="text-center lg:text-start">
                <img src={logo} alt="logo" className="mx-auto lg:mx-0" />
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
                        <img src={email} alt="email" className="w-6 h-6" />
                        <p className="pl-2">Brainbridge@gmail.com</p>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start">
                        <img src={phone} alt="phone" className="w-6 h-6" />
                        <p className="pl-2">+62 82334907089</p>
                    </div>
                </div>
            </div>

            {/* Social Media Section */}
            <div className="text-center lg:text-start">
                <p className="font-medium text-xl text-[#343A40]">Follow Us</p>
                <div className="flex justify-center lg:justify-start gap-4 pt-4">
                    <img src={linkedin} alt="linkedin" className="w-8 h-8" />
                    <img src={facebook} alt="facebook" className="w-8 h-8" />
                    <img src={instagram} alt="instagram" className="w-8 h-8" />
                    <img src={youtube} alt="youtube" className="w-8 h-8" />
                </div>
            </div>
        </div>
    );
}