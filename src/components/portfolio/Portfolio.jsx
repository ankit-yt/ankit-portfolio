import Icon from '../Icon';
import { useCallback, useState } from 'react';
import PortfolioCard from './PortfolioCard';
import ProjectViewer from './ProjectViewer';
import { Reveal } from '../Reveal';
const PORTFOLIO_CATS = ["All", "Video Edits", "Poster Designs", "Presentations", "Social Graphics"];
const PORTFOLIO_ITEMS = [
 {
  cat: "Video Edits",
  type: "video",
  title: "Fitness | TheGymStart",
  sub: "Edit 01",
  url: "https://www.youtube.com/embed/VuVvbSFwpAk?si=ELxZuLxkQC1F-oGM",
  thumbnail: "/optimized/gymstart1.webp",
  badge: "New",
  badge_bg:"bg-green-400",
  bg: "from-teal-900/60 to-slate-950",
  accent: "text-teal-400",
},
  {
    cat: "Video Edits",
    type: "video",
    title: "Trading",
    sub: "Edit 02",
    url: "https://youtube.com/embed/gGeffTDX9oY?si=339gnQTv1HBmAr3M",
    thumbnail: "/optimized/trading3.webp",
    position: "100%_20%",
    bg: "from-teal-900/60 to-slate-950",
    accent: "text-teal-400",
  },
  {
    cat: "Video Edits",
    type: "video",
    title: "Bull Run Edit",
    sub: "Edit 03",
    url: "https://youtube.com/embed/4G_PEKFFZaI?si=r-xQb2uFjZgyYOUp",
    thumbnail: "/optimized/bullrun.webp",
    bg: "from-teal-900/60 to-slate-950",
    accent: "text-teal-400",
  },
  {
    cat: "Video Edits",
    type: "video",
    title: "Join the Team",
    sub: "Edit 04",
    url: "https://youtube.com/embed/fYiP_EwDei4?si=SB6shGTCeVM-Reuu",
    thumbnail: "/optimized/averixis.webp",
    position: "100%_20%",
    bg: "from-teal-900/60 to-slate-950",
    accent: "text-teal-400",
  },
  {
    cat: "Video Edits",
    type: "video",
    title: "Trading",
    sub: "Edit 05",
    url: "https://youtube.com/embed/bUcazYqRMdc?si=oTI7BTBZlMFYr4nM",
    thumbnail: "/optimized/trading1.webp",
    position: "100%_50%",
    bg: "from-teal-900/60 to-slate-950",
    accent: "text-teal-400",
  },

  {
    cat: "Presentations",
    type: "presentation",
    title: "Principles of Maintenance",
    sub: "Presentation",
    url: "https://www.canva.com/design/DAG38fdmMKk/8rrJIagmN8gt1PmeKWyBSQ/edit",
    thumbnail: "/optimized/presentation.webp",
    bg: "from-pink-900/60 to-slate-950",
    accent: "text-pink-400",
  },

  {
  cat: "Social Graphics",
  type: "post",
  title: "Placement Announcement",
  sub: "Social Poster",
  thumbnail: "/optimized/placement.webp",
  bg: "from-red-900/60 to-slate-950",
  accent: "text-red-400",
},

  {
    cat: "Poster Designs",
    type: "poster",
    title: "Product Launch",
    sub: "Social Poster",
    bg: "from-violet-900/60 to-slate-950",
    accent: "text-violet-400",
  },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All');
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  const open = item => {
    if (item.type === 'presentation') window.open(item.url, '_blank', 'noopener,noreferrer');
    else setSelected(item);
  };
  const filtered = activeTab === 'All' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(item => item.cat === activeTab);
  return <section id="portfolio" className="work-section section-shell">
    <div className="section-heading"><Reveal><p className="eyebrow">01 / SELECTED WORK</p><h2>Every frame.<br /><span className="muted-type">A reason to stay.</span></h2></Reveal><Reveal><p>A selection of video edits, visual identities, and creative work. Made with intention. Built for attention.</p></Reveal></div>
    <div className="project-filters" aria-label="Filter selected work">{PORTFOLIO_CATS.map(cat => <button key={cat} aria-pressed={activeTab === cat} onClick={() => setActiveTab(cat)}>{cat}{activeTab === cat && <span aria-hidden="true"> <Icon name="arrow-up-right" /></span>}</button>)}</div>
    <div className="project-gallery" aria-live="polite">{filtered.map((item,index) => <PortfolioCard key={`${item.title}-${item.sub}`} item={item} index={index} openModal={open} />)}</div>
    {selected && <ProjectViewer item={selected} onClose={close} />}
  </section>;
}
