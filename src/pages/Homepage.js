import Navbar from '../components/Navbar';
import Header from '../components/Header';
import About from '../components/About';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';

export default function Homepage() {
    return (
        <div className="Homepage">
            <div className='absolute z-10 w-full'>
                <Navbar />
            </div>
            <div className='relative z-0'>
                <Header />
            </div>
            <About />
            <Testimonial />
            <Footer />
        </div>
    );
}