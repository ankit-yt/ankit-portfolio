import React, { useEffect, useState } from 'react'

function Navbar() {
  const NAV_LINKS = ["About", "Skills", "Services", "Portfolio", "Contact"];
   const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
  
    function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

    useEffect(() => {
      const fn = () => setScrolled(window.scrollY > 40);
      window.addEventListener("scroll", fn);
      return () => window.removeEventListener("scroll", fn);
    }, []);
  
    const handleNav = (section) => {  
      scrollTo(section.toLowerCase());
      setOpen(false);
    };
  
    return (
      <>
        <nav
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-16 h-16 sm:h-17 transition-all duration-500 ${
            scrolled
              ? "bg-slate-950/85 backdrop-blur-2xl border-b border-white/6"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="text-xl sm:text-2xl font-extrabold tracking-tight bg-linear-to-r from-teal-400 via-violet-400 to-pink-400 bg-clip-text text-transparent"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            AJ<span className="text-teal-400">.</span>
          </button>
  
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => handleNav(l)}
                className="text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-white transition-colors duration-200"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-linear-to-r from-teal-400 to-cyan-400 text-slate-950 shadow-[0_0_24px_rgba(79,255,232,0.35)] hover:shadow-[0_0_40px_rgba(79,255,232,0.55)] hover:-translate-y-0.5 transition-all duration-200"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Hire Me
            </button>
          </div>
  
          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-white text-xl p-1"
          >
            {open ? "✕" : "☰"}
          </button>
        </nav>
  
        {/* Mobile dropdown */}
        <div
          className={`md:hidden fixed top-16 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-2xl border-b border-white/[0.07] px-6 transition-all duration-300 ${
            open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="py-4 flex flex-col gap-0">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => handleNav(l)}
                className="text-left py-3.5 text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-teal-400 transition-colors border-b border-white/5 last:border-0"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => { scrollTo("contact"); setOpen(false); }}
              className="mt-4 mb-2 w-full px-5 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-linear-to-r from-teal-400 to-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(79,255,232,0.3)]"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Hire Me
            </button>
          </div>
        </div>
      </>
    );
}

export default Navbar
