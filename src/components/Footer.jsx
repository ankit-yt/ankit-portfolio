import { NAV_LINKS } from "../App";

export default function Footer() {
     function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
  return (
    <footer className="border-t border-white/6 px-6 sm:px-10 lg:px-16 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="text-lg font-extrabold bg-linear-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          AJ<span className="text-teal-400">.</span>
        </button>

        {/* Nav */}
        <div className="flex flex-wrap justify-center gap-5 sm:gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              className="text-[11px] font-bold tracking-widest uppercase text-slate-500 hover:text-teal-400 transition-colors"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-600" style={{ fontFamily: "Syne, sans-serif" }}>
          © 2026 Ankit ✦
        </p>
      </div>
    </footer>
  );
}