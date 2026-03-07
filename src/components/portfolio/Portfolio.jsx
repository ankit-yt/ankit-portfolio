import { useState } from "react";
import PortfolioCard from "./PortfolioCard";
import { Reveal } from "../../App";


const PORTFOLIO_CATS = ["All", "Video Edits", "Poster Designs", "Presentations", "Social Graphics"];
const PORTFOLIO_ITEMS = [
  {
    cat: "Video Edits",
    type: "video",
    title: "Trading",
    sub: "Market Hustle",
    url: "https://mega.nz/embed/1DUQEYQT#JWci-uYYNyFthi3Lp7-ZtGVTh_dqBl5QG3VW0kbowk0",
    thumbnail: "/thumbnails/videos/1.png",
    bg: "from-teal-900/60 to-slate-950",
    accent: "text-teal-400",
    emoji: "▶",
  },
  {
    cat: "Video Edits",
    type: "video",
    title: "Trading",
    sub: "Trader Mindset",
    url: "https://mega.nz/embed/sCMRVKwR#2NCJFqYzjlb1_Xm0iKWXvxHiz7G0gQ0s-jy6Txsji5A",
    thumbnail: "/thumbnails/videos/3.png",
    position: "100%_20%",
    bg: "from-teal-900/60 to-slate-950",
    accent: "text-teal-400",
    emoji: "▶",
  },
  {
    cat: "Video Edits",
    type: "video",
    title: "Bull Run Edit",
    sub: "Trading Reel",
    url: "https://mega.nz/embed/JK0FXYgI#L-isaMty64wmCxTgspDn37g443HfqVTEqZScweG79qI",
    thumbnail: "/thumbnails/videos/2.png",
    bg: "from-teal-900/60 to-slate-950",
    accent: "text-teal-400",
    emoji: "▶",
  },
  {
    cat: "Video Edits",
    type: "video",
    title: "Join the Team",
    sub: "Hiring Campaign",
    url: "https://mega.nz/embed/wKkDiSia#xiZl3tWY0Pb4MFEDTs0MJwWz1Bs87Qgm45AZL8SkH5A",
    thumbnail: "/thumbnails/videos/averixis.png",
    position: "100%_20%",
    bg: "from-teal-900/60 to-slate-950",
    accent: "text-teal-400",
    emoji: "▶",
  },

  {
    cat: "Presentations",
    type: "presentation",
    title: "Principles of Maintenance",
    sub: "Need, Objectives & Characteristics",
    url: "https://www.canva.com/design/DAG38fdmMKk/8rrJIagmN8gt1PmeKWyBSQ/edit",
    thumbnail: "/thumbnails/presentation/1.jpg",
    bg: "from-pink-900/60 to-slate-950",
    accent: "text-pink-400",
    emoji: "✦",
  },

  {
  cat: "Social Graphics",
  type: "post",
  title: "Placement Announcement",
  sub: "PCTE Student Success Post",
  thumbnail: "/thumbnails/post/insta1.png",
  bg: "from-red-900/60 to-slate-950",
  accent: "text-red-400",
  emoji: "✦"
},

  {
    cat: "Poster Designs",
    type: "poster",
    title: "Product Launch",
    sub: "Social Poster",
    bg: "from-violet-900/60 to-slate-950",
    accent: "text-violet-400",
    emoji: "✦",
  },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("All");
 const [modal, setModal] = useState({
  open: false,
  type: null,
  url: null
});
  const filtered = activeTab === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((i) => i.cat === activeTab);

  return (
    <section
      id="portfolio"
      className=" py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-white/1 border-t border-white/6"
    >

    {modal.open && (
  <div
    onClick={() => setModal({ open: false })}
    className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-3xl"
  >
    {modal.type === "video" && (
      <iframe
        className="rounded-3xl mx-2"
        width="640"
        height="360"
        src={modal.url}
        allowFullScreen
      />
    )}

    {modal.type === "post" && (
      <img
        src={modal.url}
        className="w-72 rounded-3xl object-cover"
      />
    )}
  </div>
)}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-teal-400 mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
              Portfolio
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Selected{" "}
              <span className="bg-linear-to-r from-teal-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                work
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Category tabs */}
        <Reveal delay={0.12}>
          <div className="relative flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">

            {PORTFOLIO_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase border transition-all duration-200 ${activeTab === cat
                  ? "bg-teal-400 text-slate-950 border-teal-400 shadow-[0_0_20px_rgba(79,255,232,0.35)]"
                  : "bg-white/3 border-white/8 text-slate-400 hover:border-teal-400/40 hover:text-teal-400"
                  }`}
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {filtered.map((item, i) => (
            <PortfolioCard  openModal={setModal} key={item.title + i} item={item} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
