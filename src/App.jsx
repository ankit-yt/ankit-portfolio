import Navbar from './components/Navbar';
import Hero from './components/hero/Hero';
import MarqueeBanner from './components/MarqueeBanner';
import About from './components/About';
import Skills from './components/skills/Skills';
import Services from './components/services/Services';
import Portfolio from './components/portfolio/Portfolio';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Motion from './components/Motion';
import ScrollReel from './components/ScrollReel';
export default function App() {
  return <div className="portfolio-site">
    <a className="skip-link" href="#portfolio">Skip to selected work</a>
    <Navbar /><Motion />
    <main><Hero /><MarqueeBanner /><ScrollReel /><Portfolio /><About /><Skills /><Services /><Testimonials /><Contact /></main>
    <Footer />
  </div>;
}
