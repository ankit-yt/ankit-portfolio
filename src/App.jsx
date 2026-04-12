
import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/hero/Hero";
import MarqueeBannere from "./components/MarqueeBanner";
import About from "./components/About";
import Skills from "./components/skills/Skills";
import Services from "./components/services/Services";
import Portfolio from "./components/portfolio/Portfolio";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
}

export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export const NAV_LINKS = ["About", "Skills", "Services", "Portfolio", "Contact" ,"testimonials"];


export default function App() {
  return (
    <div
      className="min-h-screen relative bg-slate-950 text-white antialiased overflow-x-hidden"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      <FontLoader />
      <Navbar />
      <main>
        <Hero />
        <MarqueeBannere />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer/>
    </div>
  );
}