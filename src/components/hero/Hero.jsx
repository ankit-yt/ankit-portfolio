import ChromeScene from './ChromeScene';
export default function Hero() {
  return <section id="hero" className="cinema-hero">
    <div className="hero-topline"><span>ANKIT JANGID / INDEPENDENT CREATIVE</span><span className="availability"><i /> Available for work</span></div>
    <div className="hero-composition">
      <div className="hero-copy">
        <p className="eyebrow hero-enter">VIDEO EDITOR & CREATIVE DESIGNER</p>
        <h1 className="hero-enter">Made to<br /><span className="chrome-type">move you.</span></h1>
        <p className="hero-intro hero-enter">Hi, I’m Ankit. I turn ideas into sharp edits, compelling stories, and visuals that leave an impression.</p>
        <div className="hero-actions hero-enter"><a className="button-primary magnetic" href="#portfolio">Explore my work <span aria-hidden="true">↗</span></a><a className="button-text" href="#contact">Let’s create together <span aria-hidden="true">↗</span></a></div>
      </div>
      <ChromeScene />
    </div>
    <div className="hero-bottom"><span>EDITING · MOTION · DESIGN</span><a href="#portfolio">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a><span>BASED IN RAJASTHAN, INDIA</span></div>
  </section>;
}
