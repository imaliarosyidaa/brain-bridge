import Navbar from '../components/Navbar';
import Header from '../components/Header';
import About from '../components/About';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';

export default function Homepage() {
    return (
        <div className="Homepage">
            <Navbar />
            <Header />
            <About />
            <Testimonial />
            <Footer />
        </div>
    );
}