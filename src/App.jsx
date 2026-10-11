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
import LiquidCursor from './components/LiquidCursor';
import ScrollReel from './components/ScrollReel';
import { Analytics } from '@vercel/analytics/react';
export default function App() {
  return <div className="portfolio-site">
    <a className="skip-link" href="#portfolio">Skip to selected work</a>
    <Navbar /><Motion /><LiquidCursor />
    <main><Hero /><MarqueeBanner /><ScrollReel /><Portfolio /><About /><Skills /><Services /><Testimonials /><Contact /></main>
    <Footer />
    <Analytics mode={import.meta.env.PROD ? 'production' : 'development'} />
  </div>;
}
