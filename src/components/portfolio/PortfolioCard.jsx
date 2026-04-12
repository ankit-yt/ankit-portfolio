import { useInView } from "../../App";

export default function PortfolioCard({ item, delay, openModal }) {
  const [ref, visible] = useInView(0.1);

const handleClick = () => {
  if (item.type === "video" || item.type === "post") {
    openModal({
      open: true,
      type: item.type,
      url: item.url || item.thumbnail,
      loading: item.type === "video", // only show loader for video
    });
  }

  if (item.type === "presentation") {
    window.open(item.url, "_blank");
  }
};

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`group relative bg-white/3 border border-white/[0.07] rounded-2xl overflow-hidden cursor-pointer hover:border-white/15 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: `${delay}s`,
        transition: "opacity 0.7s ease, transform 0.7s ease, border-color 0.3s",
      }}
    >
      <div
        className={`h-48 bg-linear-to-br ${item.bg} flex items-center justify-center relative overflow-hidden`}
      >
         {item.badge && (
    <span
      className={`absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${item.badge_bg} text-slate-950 shadow-[0_0_12px_rgba(79,255,232,0.5)]`}
      style={{ fontFamily: "Syne, sans-serif" }}
    >
      {item.badge}
    </span>
  )}
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{
              objectPosition: item.position
                ? item.position.replace("_", " ")
                : "center",
            }}
          />
        ) : (
          <span className="text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {item.emoji}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="p-4">
        <p
          className="text-sm font-bold text-white"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {item.title}
        </p>

        <p className={`text-xs mt-1 ${item.accent}`}>
          {item.sub}
        </p>
      </div>
    </div>
  );
}