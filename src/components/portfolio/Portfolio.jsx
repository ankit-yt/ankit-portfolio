import { useState } from "react";
import PortfolioCard from "./PortfolioCard";
import { Reveal } from "../../App";


const PORTFOLIO_CATS = ["All", "Video Edits", "Poster Designs", "Presentations", "Social Graphics"];
const PORTFOLIO_ITEMS = [
 {
  cat: "Video Edits",
  type: "video",
  title: "Fitness | TheGymStart",
  sub: "Edit 01",
  url: "https://www.youtube.com/embed/VuVvbSFwpAk?si=ELxZuLxkQC1F-oGM",
  thumbnail: "/thumbnails/videos/gymstart1.png",
  badge: "New",
  badge_bg:"bg-green-400",
  bg: "from-teal-900/60 to-slate-950",
  accent: "text-teal-400",
  emoji: "💪",
},
  {
    cat: "Video Edits",
    type: "video",
    title: "Trading",
    sub: "Edit 02",
    url: "https://youtube.com/embed/gGeffTDX9oY?si=339gnQTv1HBmAr3M",
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
    sub: "Edit 03",
    url: "https://youtube.com/embed/4G_PEKFFZaI?si=r-xQb2uFjZgyYOUp",
    thumbnail: "/thumbnails/videos/2.png",
    bg: "from-teal-900/60 to-slate-950",
    accent: "text-teal-400",
    emoji: "▶",
  },
  {
    cat: "Video Edits",
    type: "video",
    title: "Join the Team",
    sub: "Edit 04",
    url: "https://youtube.com/embed/fYiP_EwDei4?si=SB6shGTCeVM-Reuu",
    thumbnail: "/thumbnails/videos/averixis.png",
    position: "100%_20%",
    bg: "from-teal-900/60 to-slate-950",
    accent: "text-teal-400",
    emoji: "▶",
  },
  {
    cat: "Video Edits",
    type: "video",
    title: "Trading",
    sub: "Edit 05",
    url: "https://youtube.com/embed/bUcazYqRMdc?si=oTI7BTBZlMFYr4nM",
    thumbnail: "/thumbnails/videos/1.png",
    position: "100%_50%",
    bg: "from-teal-900/60 to-slate-950",
    accent: "text-teal-400",
    emoji: "▶",
  },

  {
    cat: "Presentations",
    type: "presentation",
    title: "Principles of Maintenance",
    sub: "Presentation",
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
  sub: "Social Poster",
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
    <div className="relative mx-2" onClick={(e) => e.stopPropagation()}>
      {modal.type === "video" && (
        <>
          {modal.loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/80 rounded-3xl z-10">
              <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-teal-400 animate-spin" />
              <p className="text-xs text-slate-400 tracking-widest uppercase font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
                Loading...
              </p>
            </div>
          )}
          <iframe
            className="rounded-3xl"
            width="640"
            height="360"
            src={modal.url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setModal((prev) => ({ ...prev, loading: false }))}
          />
        </>
      )}

      {modal.type === "post" && (
        <img
          src={modal.url}
          className="w-72 rounded-3xl object-cover"
        />
      )}
    </div>

    {/* Click outside to close */}
    <div className="absolute inset-0 -z-10" onClick={() => setModal({ open: false })} />
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
