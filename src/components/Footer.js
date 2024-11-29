import logo from '../brain-bridge-logo.png';
import email from '../logo/email.png';
import phone from '../logo/phone.png';
import linkedin from '../logo/linkedin.png';
import facebook from '../logo/facebook.png';
import instagram from '../logo/instagram.png';
import youtube from '../logo/youtube.png';

export default function Footer() {
    return (
        <div id="footer" className="bg-[#48CAE4] p-8 grid grid-cols-1 lg:grid-cols-4">
            <div className='col-span-1 pr-8'>
                <img src={logo} alt="logo"></img>
            </div>
            <div className='col-span-2 text-start pr-12 border-l-2 border-[#343A40] pl-4'>
                <p>Jl. Otto Iskandardinata No.64C 1, RT.1/RW4. Bidara Cina, Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarata 13330</p>
                <h3 className='font-bold text-xl text-[#343A40] pt-4'>Contact Us</h3>
                <div className='grid grid-cols-2 pt-2'>
                    <div className='flex'>
                        <img src={email} alt="email"></img>
                        <p className='pl-2'>Brainbridge@gmail.com</p>
                    </div>
                    <div className='flex'>
                        <img src={phone} alt="email"></img>
                        <p className='pl-2'>+62 82334907089</p>
                    </div>
                </div>
            </div>
            <div className='col-span-1'>
                <p className='font-medium text-xl text-[#343A40]'>Follow Us</p>
                <div className='grid grid-cols-4 gap-2 pt-4'>
                    <img src={linkedin} alt="linkedin"></img>
                    <img src={facebook} alt="facebook"></img>
                    <img src={instagram} alt="instagram"></img>
                    <img src={youtube} alt="youtube"></img>
                </div>
            </div>
        </div>
    );
}