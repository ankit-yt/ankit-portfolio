import Icon from './Icon';
import { Reveal } from './Reveal';
export default function About() {
  return <section id="about" className="section-shell about-section">
    <Reveal className="about-portrait"><img src="/optimized/profile.webp" alt="Ankit, video editor and creative designer" width="600" height="750" loading="lazy" decoding="async" /><div className="portrait-caption"><span>THE PERSON BEHIND THE CUT</span><span>ANKIT JANGID <Icon name="arrow-up-right" /></span></div></Reveal>
    <div className="about-copy"><Reveal><p className="eyebrow">02 / BEHIND THE FRAMES</p><h2>Good visuals.<br /><span className="muted-type">Lasting impressions.</span></h2></Reveal>
      <Reveal delay={.08}><p>Hi, I’m Ankit from Rajasthan. I’m a 21-year-old B.Tech CSE student and a passionate creative professional. I work as a freelance video editor and graphic designer, helping creators and brands turn their ideas into visually engaging and professional content.</p></Reveal>
      <Reveal delay={.12}><p>I specialize in short-form and long-form video editing, social media post design, poster and graphic design, and modern PowerPoint presentation design. As a freelancer, my goal is to deliver clean, creative, and high-quality visuals that capture attention and help clients stand out on digital platforms.</p></Reveal>
      <Reveal><div className="about-facts"><span>Freelancer</span><span>1+ years experience</span><span>Rajasthan, India</span></div><a className="button-text" href="#contact">Start a conversation <Icon name="arrow-up-right" /></a></Reveal>
    </div>
  </section>;
}
