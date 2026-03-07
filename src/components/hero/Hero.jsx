import HeroCanvas from "./HeroCanvas";

export default function Hero() {

 function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
 }  
  
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <HeroCanvas />

      {/* Ambient orbs */}
      <div className="absolute -top-32 -left-32 w-125 h-125 rounded-full bg-teal-500/5 blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-112.5 h-112.5 rounded-full bg-violet-500/[0.07] blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 right-10 w-62.5 h-62.5 rounded-full bg-pink-500/4 blur-[80px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        {/* Available badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/4 border border-white/8 backdrop-blur-md mb-8 opacity-0 animate-[fadeSlideDown_0.7s_ease_0.1s_forwards]">
          <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_var(--color-teal-400)] animate-pulse" />
          <span
            className="text-[11px] font-bold tracking-[0.18em] uppercase text-teal-400"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Available for Work
          </span>
        </div>

        {/* Name */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-[0.95] tracking-tight mb-5 opacity-0 animate-[fadeSlideDown_0.8s_ease_0.2s_forwards]"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Hi, I'm{" "}
          <span className="bg-linear-to-r from-teal-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            Ankit
          </span>
        </h1>

        {/* Title */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-slate-400 font-medium mb-4 opacity-0 animate-[fadeSlideDown_0.8s_ease_0.35s_forwards]"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Video Editor & Creative Designer
        </p>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed mb-10 opacity-0 animate-[fadeSlideDown_0.8s_ease_0.45s_forwards]">
          I create clean, modern, and engaging visual content that helps creators and brands stand out.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 opacity-0 animate-[fadeSlideDown_0.8s_ease_0.55s_forwards]">
          <button
            onClick={() => scrollTo("portfolio")}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-bold tracking-wider uppercase bg-linear-to-r from-teal-400 to-cyan-400 text-slate-950 shadow-[0_0_28px_rgba(79,255,232,0.4)] hover:shadow-[0_0_44px_rgba(79,255,232,0.6)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            View Work <span>→</span>
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-bold tracking-wider uppercase text-white border border-white/12 hover:border-teal-400/50 hover:text-teal-400 hover:-translate-y-0.5 transition-all duration-200"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span
          className="text-[10px] font-bold tracking-[0.2em] uppercase"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Scroll
        </span>
        <div className="w-px h-10 bg-linear-to-b from-teal-400 to-transparent animate-pulse" />
      </div>

      {/* Keyframes injected once */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}