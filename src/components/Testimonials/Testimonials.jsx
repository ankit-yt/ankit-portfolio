import { Reveal } from "../../App";
import TestiCard from "./TestiCard";




const TESTIMONIALS = [
  {
  name: "TheGymStart",
  role: "Gym & Fitness Content Creator",
  initials: "GS",
  from: "from-red-500",
  to: "to-violet-600",
  text: "Working with this editor has been a game-changer. They put a lot of effort into every frame, and the quality is so high that I rarely need any corrections. They are quick, reliable, and consistently deliver great work. If you're looking for someone to get your project on board and moving fast, this is the person.",
  screenshot: "/testimonials/gymstart.png",
  stars: 5,
},
 {
  name: "Aman Verma",
  role: "Crypto & Trading Content Creator",
  initials: "AV",
  from: "from-teal-500",
  to: "to-violet-600",
  text: "I sent Ankit a rough idea for a trading reel and honestly didn’t expect much. The final edit was way better than what I had imagined. The transitions were smooth and the pacing matched the beat perfectly.",

  stars: 5,
},
{
  name: "Sneha Malhotra",
  role: "Lifestyle Creator",
  initials: "SM",
  from: "from-violet-500",
  to: "to-pink-600",
  text: "Working with Ankit was really easy. I just shared my clips and reference style, and he handled the rest. The reel looked clean and professional, and it definitely performed better than my usual posts.",
  stars: 5,
},

];


export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 sm:mb-16">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-teal-400 mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
              Testimonials
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              What clients{" "}
              <span className="bg-linear-to-r from-teal-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                say
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestiCard key={t.name} t={t} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
