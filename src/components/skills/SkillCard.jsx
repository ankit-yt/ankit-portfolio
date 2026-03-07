export default function SkillCard({ skill, visible, delay }) {
  return (
    <div
      className={`group bg-white/3 border border-white/[0.07] rounded-2xl p-5 hover:-translate-y-1.5 hover:border-teal-400/25 hover:shadow-[0_0_28px_rgba(79,255,232,0.1)] transition-all duration-300 cursor-default ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transition: "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s, border-color 0.3s", transitionDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-3">
          <span className="text-xl">{skill.icon}</span>
          <div>
            <p className="text-sm font-bold text-white leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>
              {skill.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{skill.sub}</p>
          </div>
        </div>
        <span className="text-sm font-extrabold text-teal-400" style={{ fontFamily: "Syne, sans-serif" }}>
          {skill.level}%
        </span>
      </div>
      {/* Bar */}
      <div className="h-1 rounded-full bg-white/6 overflow-hidden">
        <div
          className="h-full rounded-full bg-linear-to-r from-teal-400 to-violet-500 shadow-[0_0_10px_rgba(79,255,232,0.5)] transition-all duration-1200 ease-out"
          style={{ width: visible ? `${skill.level}%` : "0%", transitionDelay: `${delay + 0.1}s` }}
        />
      </div>
    </div>
  );
}