import { Reveal, useInView } from "../App";

export default function About() {
  const [ref, visible] = useInView();

  const stats = [
    { num: "200+", label: "Projects" },
    { num: "50+",  label: "Clients" },
    { num: "2+",   label: "Years" },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
      <div ref={ref} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Visual card */}
        <Reveal>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-4/5 bg-linear-to-br from-teal-500/8 via-slate-900 to-violet-500/10 border border-white/[0.07] flex items-center justify-center">
              {/* Avatar */}
              <div className="w-36 aspect-square overflow-hidden sm:w-72 rounded-full bg-linear-to-br from-teal-400 to-violet-500 flex items-center justify-center text-5xl sm:text-6xl font-extrabold text-slate-950 shadow-[0_0_60px_rgba(79,255,232,0.35)]"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                <img className="object-cover w-full h-full object-top scale-120"  src="/profile.jpeg"/>
              </div>
              {/* Inner glow */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent pointer-events-none" />
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 sm:-right-6 px-4 py-2 rounded-full bg-slate-900/90 border border-teal-400/30 text-teal-400 text-xs font-bold backdrop-blur-xl shadow-[0_0_20px_rgba(79,255,232,0.2)] animate-bounce"
              style={{ fontFamily: "Syne, sans-serif", animationDuration: "3s" }}
            >
              Freelancer
            </div>
            <div className="absolute -bottom-4 -left-4 sm:-left-6 px-4 py-2 rounded-full bg-slate-900/90 border border-violet-400/30 text-violet-400 text-xs font-bold backdrop-blur-xl shadow-[0_0_20px_rgba(155,127,255,0.2)] animate-bounce"
              style={{ fontFamily: "Syne, sans-serif", animationDuration: "3.8s", animationDelay: "0.5s" }}
            >
              1+ Years Exp
            </div>
          </div>
        </Reveal>

        {/* Text content */}
        <div className="space-y-6">
          <Reveal delay={0.05}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-teal-400" style={{ fontFamily: "Syne, sans-serif" }}>
              About Me
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight text-white"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Crafting visuals that{" "}
              <span className="bg-linear-to-r from-teal-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                leave an impression
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              I am a creative editor and designer who focuses on clean, minimal, and professional visuals. I specialise in short-form video editing, poster design, and modern presentation design.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
              My goal is to create visually engaging content that helps creators and brands stand out — combining precision with creativity in every frame, poster, and slide.
            </p>
          </Reveal>

          {/* Stats */}
          {/* <Reveal delay={0.25}>
            <div className="flex items-center gap-10 pt-4">
              {stats.map(({ num, label }) => (
                <div key={label}>
                  <div
                    className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent leading-none"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {num}
                  </div>
                  <div className="text-xs text-slate-500 mt-1.5">{label}</div>
                </div>
              ))}
            </div>
          </Reveal> */}
        </div>
      </div>
    </section>
  );
}