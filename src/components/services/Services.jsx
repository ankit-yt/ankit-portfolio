import { Reveal } from "../Reveal";
import ServiceCard from "./ServiceCard";

export default function Services() {
    
const SERVICES = [
  {
    icon: "film",
    title: "Short Form Video Editing",
    glow: "from-teal-400/20 to-transparent",
    accent: "text-teal-400",
    border: "border-teal-400/20",
    items: ["Instagram Reels", "YouTube Shorts", "TikTok Style Edits"],
    desc: "Crisp, engaging short-form content optimised for maximum retention and algorithmic reach.",
  },
  {
    icon: "brush",
    title: "Poster Design",
    glow: "from-violet-400/20 to-transparent",
    accent: "text-violet-400",
    border: "border-violet-400/20",
    items: ["Promotional Posters", "Social Media Posts", "Business Advertisements"],
    desc: "Eye-catching visuals that stop the scroll and communicate your brand instantly.",
  },
  {
    icon: "presentation",
    title: "Presentation Design",
    glow: "from-pink-400/20 to-transparent",
    accent: "text-pink-400",
    border: "border-pink-400/20",
    items: ["Startup Pitch Decks", "Business Presentations", "Clean Minimal Slides"],
    desc: "Polished decks that elevate ideas into compelling narratives for any audience.",
  },
];
  return (
    <section id="services" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 sm:mb-16">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-teal-400 mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
              Services
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              How I can{" "}
              <span className="bg-linear-to-r from-teal-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                help you
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="services-list">
          {SERVICES.map((sv, i) => (
            <ServiceCard key={sv.title} sv={sv} index={i} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}