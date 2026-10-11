import { Reveal, useInView } from "../Reveal";
import SkillCard from "./SkillCard";

export default function Skills() {
  const [ref, visible] = useInView();
  const SKILLS = [
  { name: "Video Editing", sub: "CapCut PC", icon: "film", level: 95 },
  { name: "Short Form Content", sub: "Reels & Shorts", icon: "cut", level: 92 },
  { name: "Instagram Reels", sub: "Engagement edits", icon: "phone", level: 90 },
  { name: "YouTube Shorts", sub: "Viral formats", icon: "play", level: 88 },
  { name: "Poster Design", sub: "Visual identity", icon: "brush", level: 85 },
  { name: "Social Graphics", sub: "Brand assets", icon: "layers", level: 87 },
  { name: "PPT Design", sub: "Pitch decks", icon: "presentation", level: 83 },
  { name: "Minimal Design", sub: "Clean aesthetic", icon: "square", level: 93 },
];


  return (
    <section
      id="skills"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-white/1 border-t border-white/6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-teal-400 mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
              My Skills
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              What I{" "}
              <span className="bg-linear-to-r from-teal-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                do best
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          className="expertise-grid"
        >
          {SKILLS.map((s, i) => (
            <SkillCard key={s.name} skill={s} visible={visible} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}