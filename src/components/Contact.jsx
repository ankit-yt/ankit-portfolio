
import { Reveal } from "../App";

const SOCIAL_LINKS = [
  { label: "𝕏",  href: "#" },
  { label: "in", href: "https://www.linkedin.com/in/ankitdevitor/" },
  { label: "▶",  href: "#" },
];


export default function Contact() {
 

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-white/1 border-t border-white/6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-teal-400 mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
              Contact
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Let's{" "}
              <span className="bg-linear-to-r from-teal-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                work together
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              Have a project in mind? Drop me a message and let's create something amazing.
            </p>
          </Reveal>
        </div>

        <div className=" items-start">
          {/* Info panel */}
          <Reveal delay={0.1} className="md:col-span-2">
            <div className="bg-white/3 border border-white/[0.07] rounded-2xl p-7 sm:p-8 mb-5 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">
             <div>
               <p
                className="text-2xl font-extrabold text-white mb-1"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Ankit
              </p>
              <p className="text-sm font-semibold text-teal-400 mb-5" style={{ fontFamily: "Syne, sans-serif" }}>
                Video Editor & Designer
              </p>
              <div className="w-10 h-0.5 bg-teal-400 rounded-full mb-5" />
              <p className="text-sm text-slate-500 leading-relaxed">
                Available for freelance projects, long-term collaborations, and creative partnerships.
              </p>
             </div>
             <div className="w-32 h-32 flex my-10 md:my-0 justify-center items-center overflow-hidden scale-140 rounded-xl">
              <img className="scale-130" src="/qr.png"/>
             </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <a
                target={s.href != "#" ? "_blank" : ""} rel="noopener noreferrer"
                  key={s.label}
                  href={s.href}
                  className="w-10 h-10 rounded-xl bg-white/3 border border-white/8 flex items-center justify-center text-slate-400 text-sm hover:border-teal-400/50 hover:text-teal-400 hover:bg-teal-400/6 transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}
              
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/ankitjangid._?igsh=d280ajV2N3hmZ3B1"
                  className=" w-44 h-10 rounded-xl bg-teal-400 border border-white/8 flex items-center justify-center text-black text-sm hover:border-teal-400/50 hover:text-teal-400 hover:bg-teal-400/6 transition-all duration-200"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Send Message <span className="ml-2">↗</span>
                </a>
            </div>
          </Reveal>

         
                
             
        </div>
      </div>
    </section>
  );
}