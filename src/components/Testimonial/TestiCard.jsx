import { Reveal } from "../../App";

export default function TestiCard({ t, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="group bg-white/3 border border-white/[0.07] rounded-2xl p-7 sm:p-8 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(79,255,232,0.08)] hover:border-teal-400/20 transition-all duration-300 h-full flex flex-col">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: t.stars }).map((_, k) => (
            <span key={k} className="text-amber-400 text-sm">★</span>
          ))}
        </div>

        <p className="text-slate-400 text-sm leading-relaxed flex-1 italic mb-6">
          "{t.text}"
        </p>

        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full bg-linear-to-br ${t.from} ${t.to} flex items-center justify-center text-xs font-extrabold text-white shrink-0`}
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {t.initials}
          </div>
          <div>
            <p className="text-sm font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
              {t.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}