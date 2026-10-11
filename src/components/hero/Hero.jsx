import Icon from '../Icon';

export default function Hero() {
  return <section id="hero" className="reference-hero">
    <div className="reference-grid" aria-hidden="true" />
    <div className="reference-top"><span>INDEPENDENT VIDEO EDITOR & DESIGNER</span><span className="availability"><i /> Available for work</span></div>
    <div className="portfolio-composition">
      <div className="hero-portrait"><img src="/optimized/hero-cutout.webp" alt="Ankit Jangid" width="423" height="1152" fetchPriority="high" /><span className="portrait-credit">THE CREATIVE BEHIND THE CUT</span></div>
      <div className="portfolio-lockup">
        <p className="hero-signature">Ankit<span>Jangid.</span><Icon name="sparkles" size={18} /></p>
        <h1 className="portfolio-title" aria-label="Ankit Jangid — Video editor portfolio"><span className="port-word" aria-hidden="true">PORT</span><span className="folio-selection" aria-hidden="true"><span className="folio-word">FOLIO</span><i className="handle handle-tl"/><i className="handle handle-tr"/><i className="handle handle-bl"/><i className="handle handle-br"/><span className="selection-label">CREATIVITY, SELECTED</span><svg className="selection-cursor" viewBox="0 0 40 48"><path d="M4 2v37l10-10 8 15 7-4-8-14h15Z" fill="currentColor" stroke="#07080d" strokeWidth="2"/></svg></span></h1>
        <div className="hero-discipline-tags" aria-label="Creative disciplines"><span>video editing</span><span>motion</span><span>reels</span><span>graphic design</span></div>
        <div className="hero-editor-tools" aria-hidden="true"><Icon name="brush"/><Icon name="square"/><Icon name="layers"/></div>
      </div>
      <div className="hero-side-note"><span className="side-note-line"/><span>RAJASTHAN, INDIA</span><span className="side-note-year">2026</span></div>
      <div className="hero-timecode" aria-hidden="true"><span>REC</span><i/> 00:00:01:24</div>
    </div>
    <div className="reference-bottom"><div><p>YOUR STORY. <span>MY TIMELINE.</span></p><span>Sharp edits. Bold visuals. Made to leave a mark.</span></div><div className="reference-actions"><a className="button-primary magnetic" href="#portfolio">Explore my work <Icon name="arrow-up-right" /></a><a className="button-text" href="#contact">Let’s talk <Icon name="arrow-up-right" /></a></div></div>
    <a className="reference-scroll" href="#scroll-reel"><span>SCROLL TO PLAY</span><Icon name="arrow-down" size={16}/></a>
  </section>;
}
