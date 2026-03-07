import { useState } from "react";
import PortfolioCard from "./PortfolioCard";
import { Reveal } from "../../App";


const PORTFOLIO_CATS = ["All", "Video Edits", "Poster Designs", "Presentations", "Social Graphics"];

const PORTFOLIO_ITEMS = [
  { cat: "Video Edits", title: "Trading", sub: "Market Hustle", bg: "from-teal-900/60 to-slate-950", emoji: "▶", accent: "text-teal-400" ,type:"video", link:"https://mega.nz/embed/1DUQEYQT#JWci-uYYNyFthi3Lp7-ZtGVTh_dqBl5QG3VW0kbowk0" , thumbnail:"/thumbnails/videos/1.png" },
  { cat: "Video Edits", title: "Trading", sub: "Trader Mindset", bg: "from-teal-900/60 to-slate-950", emoji: "▶", accent: "text-teal-400" ,type:"video", link:"https://mega.nz/embed/sCMRVKwR#2NCJFqYzjlb1_Xm0iKWXvxHiz7G0gQ0s-jy6Txsji5A" , thumbnail:"/thumbnails/videos/3.png" },
    { cat: "Video Edits", title: "Trading", sub: "Bull Run Edit", bg: "from-teal-900/60 to-slate-950", emoji: "▶", accent: "text-teal-400" ,type:"video", link :"https://mega.nz/embed/JK0FXYgI#L-isaMty64wmCxTgspDn37g443HfqVTEqZScweG79qI" ,thumbnail:"/thumbnails/videos/2.png"},
    { cat: "Video Edits", title: "Join the Team", sub: "Averixis Hiring Campaign", bg: "from-teal-900/60 to-slate-950", emoji: "▶", accent: "text-teal-400" ,type:"video", link :"https://mega.nz/embed/cHMGxIQY#BVcOoFn3OySxiXpiW-GPfGjWlBoaHPtYhSp1CWG_IUE" ,thumbnail:"/thumbnails/videos/averixis.png" , postion:"top"} ,
  { cat: "Poster Designs", title: "Product Launch", sub: "Social Poster", bg: "from-violet-900/60 to-slate-950", emoji: "✦", accent: "text-violet-400" },
  { cat: "Presentations", title: "Startup Pitch", sub: "12-Slide Deck", bg: "from-pink-900/60 to-slate-950", emoji: "✦", accent: "text-pink-400" },
  { cat: "Social Graphics", title: "Story Pack", sub: "5-Part Series", bg: "from-amber-900/60 to-slate-950", emoji: "✦", accent: "text-amber-400" },

  { cat: "Poster Designs", title: "Event Poster", sub: "Print & Digital", bg: "from-violet-900/60 to-slate-950", emoji: "✦", accent: "text-violet-400" },
  { cat: "Social Graphics", title: "Brand Kit", sub: "Full Identity", bg: "from-pink-900/60 to-slate-950", emoji: "✦", accent: "text-pink-400" },
  { cat: "Presentations", title: "Investor Deck", sub: "Seed Round", bg: "from-amber-900/60 to-slate-950", emoji: "✦", accent: "text-amber-400" },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("All");
  const [videoOpen, setVideoOpen] = useState(false)
  const [url, setUrl] = useState("")
  const filtered = activeTab === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((i) => i.cat === activeTab);

  return (
    <section
      id="portfolio"
      className=" py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-white/1 border-t border-white/6"
    >

     {videoOpen && <div onClick={()=>setVideoOpen(false)} className="fixed bg-black/40 backdrop-blur-3xl z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen w-screen flex justify-center items-center">

        <iframe
          className="rounded-3xl md:px-0 mx-1"
          width="640"
          height="360"
          src={url}
          allowFullScreen
        ></iframe>

      </div>}

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
            <PortfolioCard setUrl={setUrl} setVideoOpen={setVideoOpen} key={item.title + i} item={item} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
