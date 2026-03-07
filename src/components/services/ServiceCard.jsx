import { Reveal } from "../../App";

export default function ServiceCard({ sv, delay }) {
  return (
    <Reveal delay={delay}>
      <div className={`group relative bg-white/3 border border-white/[0.07] ${sv.border} rounded-3xl p-8 sm:p-9 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300 h-full`}>
    
        <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-radial ${sv.glow} blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="text-4xl mb-5">{sv.icon}</div>
        <h3
          className="text-lg sm:text-xl font-extrabold text-white mb-3 tracking-tight"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {sv.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">{sv.desc}</p>

        <ul className="space-y-2.5">
          {sv.items.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-slate-400">
              <span className={`w-5 h-5 rounded-full border bg-white/3 flex items-center justify-center text-[10px] shrink-0 ${sv.accent} border-current/40`}>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}