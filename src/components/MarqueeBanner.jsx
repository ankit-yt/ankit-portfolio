export default function MarqueeBannere() {
    const MARQUEE_ITEMS = [
  "Video Editing", "Poster Design", "PPT Design",
  "Instagram Reels", "YouTube Shorts", "Social Graphics",
  "Brand Identity", "Short Form Content",
];

  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-t border-b border-white/6 bg-white/1.5 py-3.5">
      <div
        className="flex w-max"
        style={{ animation: "marqueeScroll 22s linear infinite" }}
      >
        {items.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-0 whitespace-nowrap text-[11px] font-bold tracking-[0.15em] uppercase text-slate-500 px-8"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {t}
            <span className="ml-8 text-teal-500">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
